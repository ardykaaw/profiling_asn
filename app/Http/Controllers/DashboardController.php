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
        ]);
    }
}
