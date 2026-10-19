<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Material;
use App\Models\Question;
use App\Models\TryoutSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // If administrator, redirect directly to the admin panel
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        // All sessions for this user
        $allSessions = TryoutSession::where('user_id', $user->id)
            ->latest('completed_at')
            ->get();

        $totalSessionsCount = $allSessions->count();
        $passedSessionsCount = $allSessions->where('is_passed', true)->count();

        // Latest session
        $latestSession = $allSessions->first();

        // Recent 5 sessions
        $recentSessions = $allSessions->take(5)->map(function ($s) {
            $completedDate = $s->completed_at ?? $s->created_at;
            return [
                'id' => $s->id,
                'title' => $s->title,
                'date' => $completedDate ? $completedDate->translatedFormat('d M Y') : '-',
                'score' => $s->total_score,
                'max' => 550,
                'status' => $s->is_passed ? 'LULUS PG' : 'TIDAK LULUS',
                'passing' => (bool) $s->is_passed,
                'twk_score' => $s->twk_score,
                'tiu_score' => $s->tiu_score,
                'tkp_score' => $s->tkp_score,
            ];
        })->values()->all();

        // Total questions answered across all sessions
        $totalQuestionsAnswered = 0;
        foreach ($allSessions as $s) {
            if (is_array($s->answers)) {
                $totalQuestionsAnswered += count($s->answers);
            }
        }

        // Sessions and questions this week
        $sessionsThisWeek = $allSessions->filter(function ($s) {
            $date = $s->completed_at ?? $s->created_at;
            return $date && $date->greaterThanOrEqualTo(now()->startOfWeek());
        });
        $sessionsThisWeekCount = $sessionsThisWeek->count();

        $questionsThisWeek = 0;
        foreach ($sessionsThisWeek as $s) {
            if (is_array($s->answers)) {
                $questionsThisWeek += count($s->answers);
            }
        }

        // Score difference compared to previous session
        $scoreDiff = 0;
        if ($allSessions->count() >= 2) {
            $scoreDiff = (int) $allSessions[0]->total_score - (int) $allSessions[1]->total_score;
        }

        // Average score
        $avgScore = $totalSessionsCount > 0
            ? round($allSessions->avg('total_score'))
            : 0;

        // Accuracy rate based on score achieved / max score 550
        $accuracyRate = $totalSessionsCount > 0 && $avgScore > 0
            ? round(($avgScore / 550) * 100)
            : 0;

        // Bank and materials stats
        $totalQuestionsInBank = Question::where('is_active', true)->count();
        $totalMaterialsCount = Material::where('is_published', true)->count();

        // Categories with material counts for progress widget
        $categories = Category::withCount(['materials' => function ($q) {
            $q->where('is_published', true);
        }])->orderBy('order')->get();

        // Calculate active streak days
        $completedDates = $allSessions->map(function ($s) {
            return ($s->completed_at ?? $s->created_at)->toDateString();
        })->unique()->values()->all();

        $streakDays = 0;
        $checkDate = now()->toDateString();
        if (in_array($checkDate, $completedDates)) {
            $streakDays = 1;
            $current = now()->subDay();
            while (in_array($current->toDateString(), $completedDates)) {
                $streakDays++;
                $current->subDay();
            }
        } elseif (in_array(now()->subDay()->toDateString(), $completedDates)) {
            $streakDays = 1;
            $current = now()->subDays(2);
            while (in_array($current->toDateString(), $completedDates)) {
                $streakDays++;
                $current->subDay();
            }
        }

        // 28-day activity grid
        $activityGrid = [];
        for ($i = 27; $i >= 0; $i--) {
            $date = now()->subDays($i)->toDateString();
            $activityGrid[] = in_array($date, $completedDates);
        }

        // Package Tracking Data
        $packagesConfig = [
            [
                'id' => 'profiling-full',
                'title' => 'Simulasi Lengkap Profiling ASN (Semua 4 Sesi BKN)',
                'short_title' => 'Simulasi Lengkap 4 Sesi',
                'category' => 'SEMUA',
                'badge' => '15 Subtes / 713 Soal',
                'total_subtest' => 15,
                'total_soal' => 713,
                'durasi' => 120,
                'description' => 'Simulasi menyeluruh mencakup semua 4 kategori resmi: Tes Potensi (465 soal), Manajerial & Soskultur (45 soal), Literasi Digital (35 soal), dan Preferensi Karir (168 soal).',
            ],
            [
                'id' => 'potensi-drill',
                'title' => 'Sesi 1: Tes Potensi Kognitif & Figural',
                'short_title' => 'Sesi 1: Tes Potensi Kognitif',
                'category' => 'POTENSI',
                'badge' => '5 Subtes / 465 Soal',
                'total_subtest' => 5,
                'total_soal' => 465,
                'durasi' => 90,
                'description' => 'Mencakup 5 subtes resmi: Figural (45 soal), Numerik (300 soal), Berpikir Kritis (30 soal), Kepribadian (45 soal), dan Kemampuan Belajar Cepat (45 soal).',
            ],
            [
                'id' => 'manajerial-drill',
                'title' => 'Sesi 2: Manajerial & Sosio-Kultural (SJT MenPAN-RB)',
                'short_title' => 'Sesi 2: Manajerial & Soskultur',
                'category' => 'MANAJERIAL',
                'badge' => '2 Subtes / 45 Soal',
                'total_subtest' => 2,
                'total_soal' => 45,
                'durasi' => 40,
                'description' => 'Mencakup 2 subtes PermenPAN-RB: Manajerial (23 butir soal) dan Sosio Kultural (22 butir soal) berbasis skenario situasional birokrasi & integritas.',
            ],
            [
                'id' => 'digital-drill',
                'title' => 'Sesi 3: Literasi & Keamanan Digital ASN',
                'short_title' => 'Sesi 3: Literasi Digital ASN',
                'category' => 'DIGITAL',
                'badge' => '4 Subtes / 35 Soal',
                'total_subtest' => 4,
                'total_soal' => 35,
                'durasi' => 30,
                'description' => 'Mencakup 4 pilar kecakapan digital: Digital Skill (9 butir), Digital Culture (9 butir), Digital Ethics (9 butir), dan Digital Safety (8 butir).',
            ],
            [
                'id' => 'karir-drill',
                'title' => 'Sesi 4: Preferensi & Tripatha Karir ASN',
                'short_title' => 'Sesi 4: Preferensi Tripatha Karir',
                'category' => 'KARIR',
                'badge' => '4 Subtes / 168 Soal',
                'total_subtest' => 4,
                'total_soal' => 168,
                'durasi' => 45,
                'description' => 'Mencakup 4 instrumen minat & bakat: Minat (42 butir), Nilai Pribadi (42 butir), Aspirasi (42 butir), dan Pengalaman Kerja (42 butir).',
            ],
        ];

        $packageTracking = [];
        $completedPackagesCount = 0;

        foreach ($packagesConfig as $pkg) {
            $completedSession = $allSessions->first(function ($s) use ($pkg) {
                return $s->completed_at !== null && (
                    $s->title === $pkg['title'] 
                    || str_contains($s->title, $pkg['title'])
                    || ($pkg['id'] === 'profiling-full' && str_contains($s->title, 'Simulasi Profiling 4 Subtes'))
                );
            });

            $inProgressSession = $allSessions->first(function ($s) use ($pkg) {
                return $s->completed_at === null && (
                    $s->title === $pkg['title'] 
                    || str_contains($s->title, $pkg['title'])
                    || (isset($s->category_scores['package_id']) && $s->category_scores['package_id'] === $pkg['id'])
                );
            });

            if ($completedSession) {
                $completedPackagesCount++;
                $isCompleted = true;
                $isInProgress = false;
                $progressPercentage = 100;
                $currentSubtest = $pkg['total_subtest'];
                $currentQuestion = $pkg['total_soal'];
                $answeredCount = $pkg['total_soal'];
                $subtestTitle = null;
                $session = $completedSession;
                $completedDate = $completedSession->completed_at ?? $completedSession->created_at;
            } elseif ($inProgressSession) {
                $isCompleted = false;
                $isInProgress = true;
                $currSub = (int) ($inProgressSession->category_scores['current_subtest_index'] ?? 0);
                $currQ = (int) ($inProgressSession->category_scores['current_question_index'] ?? 0);
                $subtestTitle = $inProgressSession->category_scores['subtest_title'] ?? null;
                $answeredCount = is_array($inProgressSession->answers) ? count($inProgressSession->answers) : (int) ($inProgressSession->category_scores['answered_count'] ?? 0);
                
                $currentSubtest = $currSub;
                $currentQuestion = $currQ;
                $progressPercentage = $pkg['total_soal'] > 0 
                    ? (int) min(99, max(1, round(($answeredCount / $pkg['total_soal']) * 100))) 
                    : (int) min(99, max(1, round((($currSub + 1) / $pkg['total_subtest']) * 100)));
                $session = $inProgressSession;
                $completedDate = null;
            } else {
                $isCompleted = false;
                $isInProgress = false;
                $progressPercentage = 0;
                $currentSubtest = 0;
                $currentQuestion = 0;
                $answeredCount = 0;
                $subtestTitle = null;
                $session = null;
                $completedDate = null;
            }

            $packageTracking[] = [
                'id' => $pkg['id'],
                'title' => $pkg['title'],
                'short_title' => $pkg['short_title'],
                'category' => $pkg['category'],
                'badge' => $pkg['badge'],
                'total_subtest' => $pkg['total_subtest'],
                'total_soal' => $pkg['total_soal'],
                'durasi' => $pkg['durasi'],
                'description' => $pkg['description'],
                'is_completed' => $isCompleted,
                'is_in_progress' => $isInProgress,
                'current_subtest' => $currentSubtest,
                'current_question' => $currentQuestion,
                'subtest_title' => $subtestTitle,
                'answered_count' => $answeredCount,
                'progress_percentage' => $progressPercentage,
                'session_id' => $session?->id,
                'completed_at' => $completedDate ? $completedDate->translatedFormat('d M Y, H:i') : null,
                'score' => $session?->total_score,
                'talent_quadrant' => $session?->talent_quadrant,
                'career_recommendation' => $session?->career_recommendation,
                'is_passed' => $session ? (bool) $session->is_passed : null,
            ];
        }

        $overallProgressPercent = count($packagesConfig) > 0 
            ? round(($completedPackagesCount / count($packagesConfig)) * 100) 
            : 0;

        return Inertia::render('dashboard', [
            'latestSession' => $latestSession,
            'recentSessions' => $recentSessions,
            'totalSessionsCount' => $totalSessionsCount,
            'passedSessionsCount' => $passedSessionsCount,
            'totalQuestionsAnswered' => $totalQuestionsAnswered,
            'sessionsThisWeek' => $sessionsThisWeekCount,
            'questionsThisWeek' => $questionsThisWeek,
            'scoreDiff' => $scoreDiff,
            'accuracyRate' => $accuracyRate,
            'avgScore' => $avgScore,
            'streakDays' => $streakDays,
            'activityGrid' => $activityGrid,
            'totalQuestionsInBank' => $totalQuestionsInBank,
            'totalMaterialsCount' => $totalMaterialsCount,
            'categories' => $categories,
            'packageTracking' => $packageTracking,
            'completedPackagesCount' => $completedPackagesCount,
            'totalPackagesCount' => count($packagesConfig),
            'overallProgressPercent' => $overallProgressPercent,
        ]);
    }
}
