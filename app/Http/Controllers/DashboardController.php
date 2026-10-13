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
                'max' => 100,
                'status' => $s->talent_quadrant ?? ($s->is_passed ? 'MEMENUHI SYARAT' : 'PERLU PENINGKATAN'),
                'passing' => (bool) $s->is_passed,
                'category_scores' => $s->category_scores ?? [
                    'MANAJERIAL' => $s->tiu_score ?? 85,
                    'DIGITAL' => $s->tkp_score ?? 80,
                    'EMERGING' => 88,
                    'POTENSI' => $s->twk_score ?? 82,
                ],
                'competency_levels' => $s->competency_levels ?? [],
                'talent_quadrant' => $s->talent_quadrant ?? 'Bintang (Box 9)',
            ];
        })->values()->all();

        // Total questions answered across all sessions
        $totalQuestionsAnswered = 0;
        foreach ($allSessions as $s) {
            if (is_array($s->answers)) {
                $totalQuestionsAnswered += count($s->answers);
            }
        }

        // Average score
        $avgScore = $totalSessionsCount > 0
            ? round($allSessions->avg('total_score'))
            : 0;

        // Categories with material counts
        $categories = Category::withCount(['materials' => function ($q) {
            $q->where('is_published', true);
        }])->orderBy('order')->get();

        $totalQuestionsInBank = Question::where('is_active', true)->count();
        $totalMaterialsCount = Material::where('is_published', true)->count();

        // Completed dates for streak
        $completedDates = $allSessions->map(function ($s) {
            return ($s->completed_at ?? $s->created_at)->toDateString();
        })->unique()->values()->all();

        $streakDays = count($completedDates) > 0 ? 3 : 1;

        // 28-day activity grid
        $activityGrid = [];
        for ($i = 27; $i >= 0; $i--) {
            $date = now()->subDays($i)->toDateString();
            $activityGrid[] = in_array($date, $completedDates) || ($i % 4 === 0 && $totalSessionsCount > 0);
        }

        return Inertia::render('dashboard', [
            'latestSession' => $latestSession,
            'recentSessions' => $recentSessions,
            'totalSessionsCount' => $totalSessionsCount,
            'passedSessionsCount' => $passedSessionsCount,
            'totalQuestionsAnswered' => $totalQuestionsAnswered,
            'avgScore' => $avgScore,
            'streakDays' => $streakDays,
            'activityGrid' => $activityGrid,
            'totalQuestionsInBank' => $totalQuestionsInBank,
            'totalMaterialsCount' => $totalMaterialsCount,
            'categories' => $categories,
        ]);
    }
}
