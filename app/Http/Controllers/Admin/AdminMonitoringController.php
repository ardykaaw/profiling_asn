<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TryoutSession;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminMonitoringController extends Controller
{
    public function index(Request $request): Response
    {
        $search = (string) $request->query('search', '');
        $status = (string) $request->query('status', 'all');

        $query = TryoutSession::with('user');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%")
                         ->orWhere('phone', 'like', "%{$search}%");
                  });
            });
        }

        if ($status === 'in_progress') {
            $query->whereNull('completed_at');
        } elseif ($status === 'completed') {
            $query->whereNotNull('completed_at');
        }

        $sessions = $query->latest('updated_at')->paginate(20)->withQueryString();

        $sessions->getCollection()->transform(function ($s) {
            $rawAnswers = $s->answers;
            $answers = is_array($rawAnswers) ? $rawAnswers : [];
            $isDone = $s->completed_at !== null;

            return [
                'id' => $s->id,
                'user_id' => $s->user_id,
                'user_name' => $s->user?->name ?? 'Peserta ASN',
                'user_email' => $s->user?->email ?? '-',
                'user_phone' => $s->user?->phone ?? '-',
                'title' => $s->title,
                'status' => $isDone ? 'COMPLETED' : 'IN_PROGRESS',
                'answered_count' => count($answers),
                'score' => $s->total_score,
                'talent_quadrant' => $s->talent_quadrant,
                'career_recommendation' => $s->career_recommendation,
                'is_passed' => $isDone ? (bool) $s->is_passed : null,
                'created_at_formatted' => $s->created_at instanceof CarbonInterface 
                    ? $s->created_at->translatedFormat('d M Y, H:i') 
                    : null,
                'updated_at_formatted' => $s->updated_at instanceof CarbonInterface 
                    ? $s->updated_at->translatedFormat('d M Y, H:i') 
                    : null,
                'completed_at_formatted' => $s->completed_at instanceof CarbonInterface 
                    ? $s->completed_at->translatedFormat('d M Y, H:i') 
                    : null,
            ];
        });

        $stats = [
            'total_sessions' => TryoutSession::count(),
            'in_progress_count' => TryoutSession::whereNull('completed_at')->count(),
            'completed_count' => TryoutSession::whereNotNull('completed_at')->count(),
            'unique_participants' => TryoutSession::distinct('user_id')->count('user_id'),
        ];

        return Inertia::render('admin/monitoring', [
            'sessions' => $sessions,
            'stats' => $stats,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }
}
