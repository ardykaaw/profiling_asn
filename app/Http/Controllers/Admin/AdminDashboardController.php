<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Material;
use App\Models\Question;
use App\Models\TryoutSession;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $totalQuestions = Question::count();
        $totalMaterials = Material::count();
        $totalUsers = User::where('role', 'user')->count();
        $totalSessions = TryoutSession::count();

        $categories = Category::withCount(['questions', 'materials'])
            ->orderBy('order')
            ->get();

        $recentQuestions = Question::with('category')
            ->latest()
            ->take(5)
            ->get();

        $recentMaterials = Material::with('category')
            ->latest()
            ->take(5)
            ->get();

        $recentSessions = TryoutSession::with('user')
            ->latest('completed_at')
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'totalQuestions' => $totalQuestions,
            'totalMaterials' => $totalMaterials,
            'totalUsers' => $totalUsers,
            'totalSessions' => $totalSessions,
            'categories' => $categories,
            'recentQuestions' => $recentQuestions,
            'recentMaterials' => $recentMaterials,
            'recentSessions' => $recentSessions,
        ]);
    }
}
