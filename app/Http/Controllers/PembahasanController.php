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

        // 2. Fetch all completed sessions for this user
        $completedSessions = TryoutSession::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->latest('completed_at')
            ->get();

        // 3. Fetch in-progress session if any
        $inProgressSession = TryoutSession::where('user_id', $user->id)
            ->whereNull('completed_at')
            ->latest('updated_at')
            ->first();

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

        // 4. Build unified history list
        $historyList = [];

        // In-progress session at the top if exists and has answers
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

            $historyList[] = [
                'id' => $inProgressSession->id,
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

        // Add all completed sessions
        foreach ($completedSessions as $s) {
            $rawAnswers = $s->answers;
            $sAnswers = is_array($rawAnswers) ? $rawAnswers : [];
            $date = $s->completed_at instanceof CarbonInterface 
                ? $s->completed_at->translatedFormat('d M Y, H:i') 
                : ($s->created_at instanceof CarbonInterface ? $s->created_at->translatedFormat('d M Y, H:i') : null);

            $historyList[] = [
                'id' => $s->id,
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

        $selectedSessionId = $request->query('session_id');
        $selectedPackageParam = $request->query('package');

        return Inertia::render('pembahasan', [
            'dbQuestions' => $questions,
            'historyList' => $historyList,
            'initialSessionId' => $selectedSessionId ? (int) $selectedSessionId : null,
            'initialPackageId' => $selectedPackageParam ? (string) $selectedPackageParam : null,
        ]);
    }
}
