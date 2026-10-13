<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Question;
use App\Models\TryoutSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TryoutController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get all active questions with categories
        $questions = Question::with('category')
            ->where('is_active', true)
            ->get()
            ->map(function ($q) {
                return [
                    'id' => $q->id,
                    'kategori' => $q->category->code ?? 'MANAJERIAL',
                    'category_name' => $q->category->name ?? '',
                    'subkategori' => $q->sub_category,
                    'soal' => $q->question,
                    'pilihan' => $q->options,
                    'jawaban' => $q->correct_answer,
                    'scores' => $q->scores,
                    'pembahasan' => $q->explanation,
                ];
            });

        // User sessions history
        $sessions = TryoutSession::where('user_id', $user->id)
            ->latest('completed_at')
            ->take(10)
            ->get();

        $categories = Category::orderBy('order')->get();

        return Inertia::render('tryout', [
            'dbQuestions' => $questions,
            'sessions' => $sessions,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string',
            'answers' => 'required|array', // key: question_id or index, value: option index (0-4)
            'time_spent' => 'nullable|integer',
        ]);

        $user = $request->user();
        $answers = $validated['answers'];

        $questions = Question::with('category')->where('is_active', true)->get();
        $categories = Category::all()->keyBy('code');

        $catScores = [
            'MANAJERIAL' => 0,
            'DIGITAL' => 0,
            'EMERGING' => 0,
            'POTENSI' => 0,
        ];
        $catMax = [
            'MANAJERIAL' => 0,
            'DIGITAL' => 0,
            'EMERGING' => 0,
            'POTENSI' => 0,
        ];

        foreach ($questions as $index => $q) {
            $catCode = $q->category->code ?? 'MANAJERIAL';
            if (!isset($catScores[$catCode])) {
                $catScores[$catCode] = 0;
                $catMax[$catCode] = 0;
            }

            $catMax[$catCode] += 5; // Each question max 5 points

            $selected = $answers[$q->id] ?? ($answers[$index] ?? null);

            if ($selected !== null) {
                $selected = (int) $selected;
                if (!empty($q->scores) && is_array($q->scores) && isset($q->scores[$selected])) {
                    $catScores[$catCode] += (int) $q->scores[$selected];
                } else {
                    if ($selected === (int) $q->correct_answer) {
                        $catScores[$catCode] += 5;
                    }
                }
            }
        }

        // Calculate normalized scores (percentage 0-100)
        $normalizedScores = [];
        foreach ($catScores as $code => $score) {
            $max = $catMax[$code] > 0 ? $catMax[$code] : 25;
            $normalizedScores[$code] = round(($score / $max) * 100);
        }

        $totalScore = array_sum($catScores);
        $avgPercentage = round(array_sum($normalizedScores) / max(count($normalizedScores), 1));

        // Determine 9-Box Talent Grid
        $talentQuadrant = 'Memenuhi Syarat (Optimum)';
        if ($avgPercentage >= 85) {
            $talentQuadrant = 'Bintang / Box 9 (High Potential & High Performance)';
        } elseif ($avgPercentage >= 75) {
            $talentQuadrant = 'Penampil Unggul / Box 8 (High Performance)';
        } elseif ($avgPercentage >= 65) {
            $talentQuadrant = 'Potensi Berkembang / Box 7 (Medium Potential)';
        } else {
            $talentQuadrant = 'Perlu Peningkatan / Box 4 (Need Development)';
        }

        $competencyLevels = [
            'Manajerial & Sosio-Kultural' => $normalizedScores['MANAJERIAL'] >= 80 ? 'Level 4 (Mahir)' : 'Level 3 (Mampu)',
            'Literasi Digital ASN' => $normalizedScores['DIGITAL'] >= 80 ? 'Level 4 (Mahir)' : 'Level 3 (Mampu)',
            'Emerging Skills & Analitis' => $normalizedScores['EMERGING'] >= 80 ? 'Level 4 (Optimal)' : 'Level 3 (Berkembang)',
            'Potensi Kognitif & Figural' => $normalizedScores['POTENSI'] >= 80 ? 'Level 4 (Tinggi)' : 'Level 3 (Sedang)',
        ];

        $session = TryoutSession::create([
            'user_id' => $user->id,
            'title' => $validated['title'] ?? 'Asesmen Profiling Mandiri #'.(TryoutSession::where('user_id', $user->id)->count() + 1),
            'twk_score' => $normalizedScores['POTENSI'],
            'tiu_score' => $normalizedScores['MANAJERIAL'],
            'tkp_score' => $normalizedScores['DIGITAL'],
            'total_score' => $totalScore,
            'category_scores' => $normalizedScores,
            'competency_levels' => $competencyLevels,
            'talent_quadrant' => $talentQuadrant,
            'is_passed' => $avgPercentage >= 70,
            'answers' => $answers,
            'time_spent_seconds' => $validated['time_spent'] ?? 3600,
            'completed_at' => now(),
        ]);

        return back()->with([
            'success' => 'Hasil asesmen profiling berhasil diproses!',
            'session' => $session,
        ]);
    }
}
