<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminQuestionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Question::with('category');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('question', 'like', "%{$search}%")
                  ->orWhere('sub_category', 'like', "%{$search}%");
            });
        }

        $questions = $query->latest()->paginate(15)->withQueryString();
        $categories = Category::orderBy('order')->get();

        return Inertia::render('admin/questions', [
            'questions' => $questions,
            'categories' => $categories,
            'filters' => $request->only(['category_id', 'search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'sub_category' => 'required|string|max:255',
            'question' => 'required|string',
            'options' => 'required|array|min:5|max:5',
            'options.*' => 'required|string',
            'correct_answer' => 'required|integer|min:0|max:4',
            'scores' => 'nullable|array|min:5|max:5',
            'scores.*' => 'nullable|integer|min:1|max:5',
            'explanation' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $category = Category::findOrFail($validated['category_id']);

        // Default scores for TKP if not explicitly provided
        if ($category->code === 'TKP' && empty($validated['scores'])) {
            $validated['scores'] = [5, 4, 3, 2, 1];
        }

        Question::create($validated);

        return back()->with('success', 'Soal ujian berhasil ditambahkan ke bank soal!');
    }

    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'sub_category' => 'required|string|max:255',
            'question' => 'required|string',
            'options' => 'required|array|min:5|max:5',
            'options.*' => 'required|string',
            'correct_answer' => 'required|integer|min:0|max:4',
            'scores' => 'nullable|array|min:5|max:5',
            'scores.*' => 'nullable|integer|min:1|max:5',
            'explanation' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $question->update($validated);

        return back()->with('success', 'Soal ujian berhasil diperbarui!');
    }

    public function destroy(Question $question)
    {
        $question->delete();

        return back()->with('success', 'Soal ujian berhasil dihapus dari bank soal!');
    }

    public function import(Request $request)
    {
        $validated = $request->validate([
            'questions' => 'required|array',
            'questions.*.category_id' => 'required|exists:categories,id',
            'questions.*.sub_category' => 'required|string',
            'questions.*.question' => 'required|string',
            'questions.*.options' => 'required|array|min:5',
            'questions.*.correct_answer' => 'required|integer',
            'questions.*.explanation' => 'nullable|string',
        ]);

        $count = 0;
        foreach ($validated['questions'] as $qData) {
            Question::create($qData);
            $count++;
        }

        return back()->with('success', "Berhasil mengimpor {$count} butir soal ke dalam sistem!");
    }
}
