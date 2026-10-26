<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\TryoutSession;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PembahasanController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $isAdmin = $user->isAdmin();

        // 1. Get all active questions with categories
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
                    'image_url' => $q->image_url,
                    'pilihan' => $q->options,
                    'jawaban' => $q->correct_answer,
                    'scores' => $q->scores,
                    'pembahasan' => $q->explanation,
                ];
            });

        // Helper to match package ID from title
        $determinePackageId = function (?string $title): string {
            $t = (string) $title;
            if (str_contains($t, 'Sesi 1') || str_contains($t, 'Potensi')) return 'potensi-drill';
            if (str_contains($t, 'Sesi 2') || str_contains($t, 'Manajerial')) return 'manajerial-drill';
            if (str_contains($t, 'Sesi 3') || str_contains($t, 'Digital')) return 'digital-drill';
            if (str_contains($t, 'Sesi 4') || str_contains($t, 'Karir')) return 'karir-drill';
            return 'profiling-full';
        };

        $determinePackageCategory = function (?string $title): string {
            $t = (string) $title;
            if (str_contains($t, 'Sesi 1') || str_contains($t, 'Potensi')) return 'POTENSI';
            if (str_contains($t, 'Sesi 2') || str_contains($t, 'Manajerial')) return 'MANAJERIAL';
            if (str_contains($t, 'Sesi 3') || str_contains($t, 'Digital')) return 'DIGITAL';
            if (str_contains($t, 'Sesi 4') || str_contains($t, 'Karir')) return 'KARIR';
            return 'SEMUA';
        };

        // 2. Fetch my completed sessions
        $completedSessions = TryoutSession::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->latest('completed_at')
            ->get();

        // 3. Fetch my in-progress session if any
        $inProgressSession = TryoutSession::where('user_id', $user->id)
            ->whereNull('completed_at')
            ->latest('updated_at')
            ->first();

        // 4. Build my personal history list
        $myHistoryList = [];

        if ($inProgressSession) {
            $rawAnswers = $inProgressSession->answers;
            $inProgAnswers = is_array($rawAnswers) ? $rawAnswers : [];
            $rawScores = $inProgressSession->category_scores;
            $scores = is_array($rawScores) ? $rawScores : [];
            $inProgCount = count($inProgAnswers) > 0 ? count($inProgAnswers) : (int) ($scores['answered_count'] ?? 0);
            
            $pkgId = (string) ($scores['package_id'] ?? $determinePackageId($inProgressSession->title));
            $upDate = $inProgressSession->updated_at instanceof CarbonInterface 
                ? $inProgressSession->updated_at->translatedFormat('d M Y, H:i') 
                : null;

            $myHistoryList[] = [
                'id' => $inProgressSession->id,
                'user_name' => $user->name,
                'user_email' => $user->email,
                'package_id' => $pkgId,
                'package_cat' => $determinePackageCategory($inProgressSession->title),
                'title' => $inProgressSession->title,
                'status' => 'IN_PROGRESS',
                'answered_count' => $inProgCount,
                'score' => null,
                'talent_quadrant' => null,
                'career_recommendation' => null,
                'is_passed' => null,
                'date' => $upDate,
                'answers' => $inProgAnswers,
            ];
        }

        foreach ($completedSessions as $s) {
            $rawAnswers = $s->answers;
            $sAnswers = is_array($rawAnswers) ? $rawAnswers : [];
            $date = $s->completed_at instanceof CarbonInterface 
                ? $s->completed_at->translatedFormat('d M Y, H:i') 
                : ($s->created_at instanceof CarbonInterface ? $s->created_at->translatedFormat('d M Y, H:i') : null);

            $myHistoryList[] = [
                'id' => $s->id,
                'user_name' => $user->name,
                'user_email' => $user->email,
                'package_id' => $determinePackageId($s->title),
                'package_cat' => $determinePackageCategory($s->title),
                'title' => $s->title,
                'status' => 'COMPLETED',
                'answered_count' => count($sAnswers),
                'score' => $s->total_score,
                'talent_quadrant' => $s->talent_quadrant,
                'career_recommendation' => $s->career_recommendation,
                'is_passed' => (bool) $s->is_passed,
                'date' => $date,
                'answers' => $sAnswers,
            ];
        }

        // 5. If admin, also fetch all participants' sessions
        $allParticipantHistory = [];
        if ($isAdmin) {
            $allParticipantHistory = TryoutSession::with('user')
                ->latest('updated_at')
                ->take(200)
                ->get()
                ->map(function ($s) use ($determinePackageId, $determinePackageCategory) {
                    $rawAnswers = $s->answers;
                    $sAnswers = is_array($rawAnswers) ? $rawAnswers : [];
                    $isDone = $s->completed_at !== null;
                    
                    $rawScores = $s->category_scores;
                    $scores = is_array($rawScores) ? $rawScores : [];
                    $ansCount = count($sAnswers) > 0 ? count($sAnswers) : (int) ($scores['answered_count'] ?? 0);

                    $date = $s->completed_at instanceof CarbonInterface 
                        ? $s->completed_at->translatedFormat('d M Y, H:i') 
                        : ($s->updated_at instanceof CarbonInterface ? $s->updated_at->translatedFormat('d M Y, H:i') : null);

                    return [
                        'id' => $s->id,
                        'user_id' => $s->user_id,
                        'user_name' => $s->user?->name ?? 'Peserta ASN',
                        'user_email' => $s->user?->email ?? '-',
                        'package_id' => (string) ($scores['package_id'] ?? $determinePackageId($s->title)),
                        'package_cat' => $determinePackageCategory($s->title),
                        'title' => $s->title,
                        'status' => $isDone ? 'COMPLETED' : 'IN_PROGRESS',
                        'answered_count' => $ansCount,
                        'score' => $s->total_score,
                        'talent_quadrant' => $s->talent_quadrant,
                        'career_recommendation' => $s->career_recommendation,
                        'is_passed' => $isDone ? (bool) $s->is_passed : null,
                        'date' => $date,
                        'answers' => $sAnswers,
                    ];
                })
                ->all();
        }

        $selectedSessionId = $request->query('session_id');
        $selectedPackageParam = $request->query('package');

        return Inertia::render('pembahasan', [
            'dbQuestions' => $questions,
            'historyList' => $myHistoryList,
            'allParticipantHistory' => $allParticipantHistory,
            'isAdmin' => $isAdmin,
            'initialSessionId' => $selectedSessionId ? (int) $selectedSessionId : null,
            'initialPackageId' => $selectedPackageParam ? (string) $selectedPackageParam : null,
        ]);
    }
}
