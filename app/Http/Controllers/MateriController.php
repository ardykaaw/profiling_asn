<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MateriController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = Category::withCount(['materials' => function ($q) {
            $q->where('is_published', true);
        }])->orderBy('order')->get();

        $materials = Material::with('category')
            ->where('is_published', true)
            ->latest()
            ->get()
            ->map(function ($m) {
                return [
                    'id' => $m->id,
                    'kat' => strtolower($m->category->code ?? 'twk'),
                    'category_code' => $m->category->code ?? 'TWK',
                    'category_name' => $m->category->name ?? '',
                    'judul' => $m->title,
                    'slug' => $m->slug,
                    'tipe' => $m->type,
                    'durasi' => $m->duration,
                    'level' => $m->level,
                    'desc' => $m->summary,
                    'content' => $m->content,
                    'file_path' => $m->file_path ? asset('storage/' . $m->file_path) : null,
                    'video_url' => $m->video_url,
                    'locked' => false,
                    'done' => false,
                ];
            });

        return Inertia::render('materi', [
            'dbMaterials' => $materials,
            'categories' => $categories,
        ]);
    }
}
