<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::withCount(['questions', 'materials'])
            ->orderBy('order')
            ->get();

        return Inertia::render('admin/categories', [
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'passing_grade' => 'required|integer|min:0',
            'question_count' => 'required|integer|min:1',
            'max_score' => 'required|integer|min:1',
            'description' => 'nullable|string',
            'color' => 'required|string|max:20',
        ]);

        $category->update($validated);

        return back()->with('success', 'Standar kategori berhasil diperbarui!');
    }
}
