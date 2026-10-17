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
                    'kategori' => $q->category->code ?? 'POTENSI',
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

        $catScores = [
            'POTENSI' => 0,
            'MANAJERIAL' => 0,
            'DIGITAL' => 0,
            'KARIR' => 0,
        ];
        $catMax = [
            'POTENSI' => 0,
            'MANAJERIAL' => 0,
            'DIGITAL' => 0,
            'KARIR' => 0,
        ];

        // Tripatha Karir tally
        $karirTally = [
            'STRUKTURAL' => 0,
            'FUNGSIONAL' => 0,
            'OPERASIONAL' => 0,
        ];
        $karirCount = 0;

        foreach ($questions as $index => $q) {
            $catCode = $q->category->code ?? 'MANAJERIAL';
            if (!isset($catScores[$catCode])) {
                $catScores[$catCode] = 0;
                $catMax[$catCode] = 0;
            }

            $catMax[$catCode] += 5; // standard base 5 points per question

            $selected = $answers[$q->id] ?? ($answers[$index] ?? null);

            if ($selected !== null) {
                $selected = (int) $selected;

                if ($catCode === 'KARIR') {
                    $karirCount++;
                    // Map option index: 0 => STRUKTURAL, 1 => FUNGSIONAL, 2 => OPERASIONAL
                    if ($selected === 0) {
                        $karirTally['STRUKTURAL']++;
                    } elseif ($selected === 1) {
                        $karirTally['FUNGSIONAL']++;
                    } elseif ($selected === 2) {
                        $karirTally['OPERASIONAL']++;
                    } else {
                        $karirTally['FUNGSIONAL']++;
                    }
                    $catScores['KARIR'] += 5;
                } else {
                    if (!empty($q->scores) && is_array($q->scores) && isset($q->scores[$selected])) {
                        $catScores[$catCode] += (int) $q->scores[$selected];
                    } else {
                        if ($selected === (int) $q->correct_answer) {
                            $catScores[$catCode] += 5;
                        }
                    }
                }
            }
        }

        // Calculate normalized scores (percentage 0-100) for standard dimensions
        $normalizedScores = [];
        foreach (['POTENSI', 'MANAJERIAL', 'DIGITAL'] as $code) {
            $max = $catMax[$code] > 0 ? $catMax[$code] : 25;
            $normalizedScores[$code] = round(($catScores[$code] / $max) * 100);
        }

        // Calculate Tripatha Career breakdown percentages
        $totalKarirVotes = max($karirCount, 1);
        $strukturalPct = round(($karirTally['STRUKTURAL'] / $totalKarirVotes) * 100);
        $fungsionalPct = round(($karirTally['FUNGSIONAL'] / $totalKarirVotes) * 100);
        $operasionalPct = round(($karirTally['OPERASIONAL'] / $totalKarirVotes) * 100);

        // Determine dominant career recommendation
        $dominant = 'FUNGSIONAL';
        $maxVotes = $karirTally['FUNGSIONAL'];

        if ($karirTally['STRUKTURAL'] > $maxVotes) {
            $dominant = 'STRUKTURAL';
            $maxVotes = $karirTally['STRUKTURAL'];
        }
        if ($karirTally['OPERASIONAL'] > $maxVotes) {
            $dominant = 'OPERASIONAL';
        }

        $careerRecommendation = 'Jalur Fungsional Keahlian & Riset Kebijakan';
        if ($dominant === 'STRUKTURAL') {
            $careerRecommendation = 'Jalur Kepemimpinan & Manajerial (Struktural / JPT)';
        } elseif ($dominant === 'OPERASIONAL') {
            $careerRecommendation = 'Jalur Pelayanan & Keterampilan Teknis (Operasional Prosedural)';
        }

        $careerBreakdown = [
            'dominant' => $dominant,
            'recommendation' => $careerRecommendation,
            'tally' => $karirTally,
            'percentages' => [
                'struktural' => $strukturalPct,
                'fungsional' => $fungsionalPct,
                'operasional' => $operasionalPct,
            ],
            'roles' => [
                'STRUKTURAL' => ['Pejabat Pimpinan Tinggi (JPT)', 'Administrator Eselon III', 'Pengawas Strategis'],
                'FUNGSIONAL' => ['Analis Kebijakan Ahli', 'Perencana Ahli', 'Pranata Komputer Ahli', 'Peneliti Kebijakan'],
                'OPERASIONAL' => ['Pengelola Layanan Operasional', 'Arsiparis', 'Verifikator Keuangan', 'Pranata Humas'],
            ],
        ];

        // 9 BOX SIMATA - PETA TALENTA ASN
        // Axis X: Potensial (Potensi Kognitif & Literasi Digital)
        $axisX = round(($normalizedScores['POTENSI'] * 0.5) + ($normalizedScores['DIGITAL'] * 0.5));
        // Axis Y: Kinerja (Manajerial & Sosio-Kultural)
        $axisY = $normalizedScores['MANAJERIAL'];

        $talentQuadrant = 'Box 1: Kinerja Rendah Potensial Rendah';
        if ($axisY >= 80) {
            if ($axisX >= 80) {
                $talentQuadrant = 'Box 9: Kinerja Tinggi Potensial Tinggi (Talenta Unggul)';
            } elseif ($axisX >= 60) {
                $talentQuadrant = 'Box 7: Kinerja Tinggi Potensial Menengah';
            } else {
                $talentQuadrant = 'Box 4: Kinerja Tinggi Potensial Rendah';
            }
        } elseif ($axisY >= 60) {
            if ($axisX >= 80) {
                $talentQuadrant = 'Box 8: Kinerja Sesuai Potensial Tinggi';
            } elseif ($axisX >= 60) {
                $talentQuadrant = 'Box 5: Kinerja Sesuai Potensial Menengah';
            } else {
                $talentQuadrant = 'Box 2: Kinerja Sesuai Potensial Rendah';
            }
        } else {
            if ($axisX >= 80) {
                $talentQuadrant = 'Box 6: Kinerja Rendah Potensial Tinggi';
            } elseif ($axisX >= 60) {
                $talentQuadrant = 'Box 3: Kinerja Rendah Potensial Menengah';
            } else {
                $talentQuadrant = 'Box 1: Kinerja Rendah Potensial Rendah';
            }
        }

        $competencyLevels = [
            'Tes Potensi Kognitif' => $normalizedScores['POTENSI'] >= 80 ? 'Level 4 (Tinggi)' : ($normalizedScores['POTENSI'] >= 65 ? 'Level 3 (Sedang)' : 'Level 2 (Dasar)'),
            'Manajerial & Sosio-Kultural' => $normalizedScores['MANAJERIAL'] >= 80 ? 'Level 4 (Mahir)' : ($normalizedScores['MANAJERIAL'] >= 65 ? 'Level 3 (Mampu)' : 'Level 2 (Dasar)'),
            'Literasi Digital ASN' => $normalizedScores['DIGITAL'] >= 80 ? 'Level 4 (Mahir & Cakap SPBE)' : ($normalizedScores['DIGITAL'] >= 65 ? 'Level 3 (Mampu)' : 'Level 2 (Dasar)'),
            'Preferensi Karir Utama' => $careerRecommendation,
        ];

        $totalScore = $catScores['POTENSI'] + $catScores['MANAJERIAL'] + $catScores['DIGITAL'] + $catScores['KARIR'];
        $avgScore = round(($normalizedScores['POTENSI'] + $normalizedScores['MANAJERIAL'] + $normalizedScores['DIGITAL']) / 3);

        $session = TryoutSession::create([
            'user_id' => $user->id,
            'title' => $validated['title'] ?? 'Simulasi Profiling 4 Subtes #' . (TryoutSession::where('user_id', $user->id)->count() + 1),
            'twk_score' => $normalizedScores['POTENSI'],
            'tiu_score' => $normalizedScores['MANAJERIAL'],
            'tkp_score' => $normalizedScores['DIGITAL'],
            'total_score' => $totalScore,
            'category_scores' => array_merge($normalizedScores, ['KARIR' => 100]),
            'competency_levels' => $competencyLevels,
            'talent_quadrant' => $talentQuadrant,
            'career_recommendation' => $careerRecommendation,
            'career_breakdown' => $careerBreakdown,
            'is_passed' => $avgScore >= 70,
            'answers' => $answers,
            'time_spent_seconds' => $validated['time_spent'] ?? 3600,
            'completed_at' => now(),
        ]);

        return back()->with([
            'success' => 'Hasil asesmen profiling dan pemetaan Tripatha Karir berhasil diproses!',
            'session' => $session,
        ]);
    }
}
