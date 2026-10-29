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
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($q) {
                $options = is_array($q->options) ? $q->options : [];
                return [
                    'id' => $q->id,
                    'kategori' => $q->category?->code ?? 'POTENSI',
                    'category_name' => $q->category?->name ?? ($q->category?->code ?? 'POTENSI'),
                    'subkategori' => $q->sub_category,
                    'soal' => $q->question,
                    'image_url' => $q->image_url ?? $q->image,
                    'pilihan' => $options,
                    'opsi' => $options,
                    'jawaban' => $q->correct_answer,
                    'scores' => is_array($q->scores) ? $q->scores : [],
                    'pembahasan' => $q->explanation ?? 'Kunci jawaban dan evaluasi resmi BKN.',
                ];
            });

        // Helper to match package ID from title
        $determinePackageId = function (?string $title): string {
            $t = (string) $title;
            if (str_contains($t, '1')) return 'PRO-1';
            if (str_contains($t, '2')) return 'PRO-2';
            if (str_contains($t, '3')) return 'PRO-3';
            if (str_contains($t, '4')) return 'PRO-4';
            if (str_contains($t, '5')) return 'PRO-5';
            return 'PRO-1';
        };

        $determinePackageCategory = function (?string $title): string {
            $t = (string) $title;
            if (str_contains($t, 'Komprehensif') || str_contains($t, 'Lengkap')) return 'SEMUA';
            if (str_contains($t, 'Manajerial') || str_contains($t, 'Sosio')) return 'MANAJERIAL';
            if (str_contains($t, 'Digital') || str_contains($t, 'SPBE')) return 'DIGITAL';
            if (str_contains($t, 'Potensi') || str_contains($t, 'Kognitif')) return 'POTENSI';
            return 'SEMUA';
        };

        // 2. Fetch completed sessions for this user only
        $completedSessions = TryoutSession::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->latest('completed_at')
            ->get();

        // 3. Fetch in-progress session if any
        $inProgressSession = TryoutSession::where('user_id', $user->id)
            ->whereNull('completed_at')
            ->latest('updated_at')
            ->first();

        // 4. Build unified personal history list
        $historyList = [];

        if ($inProgressSession) {
            $rawAnswers = $inProgressSession->answers;
            $inProgAnswers = is_array($rawAnswers) ? $rawAnswers : [];
            $rawScores = $inProgressSession->category_scores;
            $scores = is_array($rawScores) ? $rawScores : [];
            $pkgId = (string) ($scores['package_id'] ?? $determinePackageId($inProgressSession->title));

            $date = $inProgressSession->updated_at instanceof CarbonInterface 
                ? $inProgressSession->updated_at->translatedFormat('d M Y, H:i') 
                : null;

            $historyList[] = [
                'id' => $inProgressSession->id,
                'package_id' => $pkgId,
                'package_cat' => $determinePackageCategory($inProgressSession->title),
                'title' => $inProgressSession->title,
                'status' => 'IN_PROGRESS',
                'answered_count' => count($inProgAnswers),
                'score' => null,
                'talent_quadrant' => null,
                'career_recommendation' => null,
                'is_passed' => null,
                'date' => $date,
                'answers' => $inProgAnswers,
            ];
        }

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
                'answered_count' => count($sAnswers) > 0 ? count($sAnswers) : 100,
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
