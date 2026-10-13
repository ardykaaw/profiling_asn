<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminMaterialController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Material::with('category');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%");
            });
        }

        $materials = $query->latest()->paginate(15)->withQueryString();
        $categories = Category::orderBy('order')->get();

        return Inertia::render('admin/materials', [
            'materials' => $materials,
            'categories' => $categories,
            'filters' => $request->only(['category_id', 'search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'type' => 'required|in:video,pdf,ringkasan',
            'level' => 'required|in:Dasar,Menengah,Lanjutan',
            'duration' => 'required|string|max:50',
            'summary' => 'required|string',
            'content' => 'nullable|string',
            'video_url' => 'nullable|url',
            'file' => 'nullable|file|mimes:pdf,doc,docx,zip|max:20480', // up to 20MB
            'is_published' => 'boolean',
            'is_free' => 'boolean',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('materials', 'public');
        }

        $slug = Str::slug($validated['title']) . '-' . Str::random(4);

        Material::create([
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'slug' => $slug,
            'type' => $validated['type'],
            'level' => $validated['level'],
            'duration' => $validated['duration'],
            'summary' => $validated['summary'],
            'content' => $validated['content'] ?? null,
            'file_path' => $filePath,
            'video_url' => $validated['video_url'] ?? null,
            'is_published' => $request->boolean('is_published', true),
            'is_free' => $request->boolean('is_free', false),
        ]);

        return back()->with('success', 'Modul materi baru berhasil diunggah dan disimpan!');
    }

    public function update(Request $request, Material $material)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'type' => 'required|in:video,pdf,ringkasan',
            'level' => 'required|in:Dasar,Menengah,Lanjutan',
            'duration' => 'required|string|max:50',
            'summary' => 'required|string',
            'content' => 'nullable|string',
            'video_url' => 'nullable|url',
            'file' => 'nullable|file|mimes:pdf,doc,docx,zip|max:20480',
            'is_published' => 'boolean',
            'is_free' => 'boolean',
        ]);

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('materials', 'public');
            $material->file_path = $filePath;
        }

        $material->category_id = $validated['category_id'];
        $material->title = $validated['title'];
        $material->type = $validated['type'];
        $material->level = $validated['level'];
        $material->duration = $validated['duration'];
        $material->summary = $validated['summary'];
        $material->content = $validated['content'] ?? null;
        $material->video_url = $validated['video_url'] ?? null;
        $material->is_published = $request->boolean('is_published', true);
        $material->is_free = $request->boolean('is_free', false);
        $material->save();

        return back()->with('success', 'Modul materi berhasil diperbarui!');
    }

    public function destroy(Material $material)
    {
        $material->delete();

        return back()->with('success', 'Modul materi berhasil dihapus!');
    }
}
