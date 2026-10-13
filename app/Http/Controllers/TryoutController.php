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
                    'kategori' => $q->category->code ?? 'TWK',
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

        $twkScore = 0;
        $tiuScore = 0;
        $tkpScore = 0;

        $questions = Question::with('category')->where('is_active', true)->get();

        foreach ($questions as $index => $q) {
            $catCode = $q->category->code ?? 'TWK';
            // User answer can be keyed by question ID or index
            $selected = $answers[$q->id] ?? ($answers[$index] ?? null);

            if ($selected !== null) {
                $selected = (int) $selected;
                if ($catCode === 'TWK') {
                    if ($selected === (int) $q->correct_answer) {
                        $twkScore += 5;
                    }
                } elseif ($catCode === 'TIU') {
                    if ($selected === (int) $q->correct_answer) {
                        $tiuScore += 5;
                    }
                } elseif ($catCode === 'TKP') {
                    // TKP tiered score (1-5)
                    $scoresArray = $q->scores ?: [5, 4, 3, 2, 1];
                    $point = isset($scoresArray[$selected]) ? (int) $scoresArray[$selected] : 3;
                    $tkpScore += $point;
                }
            }
        }

        $totalScore = $twkScore + $tiuScore + $tkpScore;
        $isPassed = ($twkScore >= 65) && ($tiuScore >= 80) && ($tkpScore >= 166);

        $session = TryoutSession::create([
            'user_id' => $user->id,
            'title' => $validated['title'] ?? 'Simulasi SKD Mandiri #'.(TryoutSession::where('user_id', $user->id)->count() + 1),
            'twk_score' => $twkScore,
            'tiu_score' => $tiuScore,
            'tkp_score' => $tkpScore,
            'total_score' => $totalScore,
            'is_passed' => $isPassed,
            'answers' => $answers,
            'time_spent_seconds' => $validated['time_spent'] ?? 3600,
            'completed_at' => now(),
        ]);

        return back()->with([
            'success' => 'Simulasi berhasil disimpan!',
            'session' => $session,
        ]);
    }
}
