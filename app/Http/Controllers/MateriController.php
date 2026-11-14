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
                $code = strtoupper($m->category->code ?? 'MANAJERIAL');
                $katMap = [
                    'POTENSI' => 'potensi',
                    'MANAJERIAL' => 'manajerial',
                    'DIGITAL' => 'digital',
                    'KARIR' => 'karir',
                ];
                $kat = $katMap[$code] ?? strtolower($code);

                return [
                    'id' => $m->id,
                    'kat' => $kat,
                    'category_code' => $code,
                    'category_name' => $m->category->name ?? '',
                    'judul' => $m->title,
                    'slug' => $m->slug,
                    'tipe' => $m->type,
                    'durasi' => $m->duration,
                    'level' => $m->level,
                    'desc' => $m->summary,
                    'content' => $m->content,
                    'file_path' => $m->file_path ? route('materi.file', $m->id) : null,
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

    /**
     * Safely stream or download official module files for authenticated active members only.
     */
    public function download(Request $request, Material $material)
    {
        if (! $material->file_path) {
            abort(404, 'File materi tidak ditemukan.');
        }

        $disk = \Illuminate\Support\Facades\Storage::disk('public');
        if (! $disk->exists($material->file_path)) {
            abort(404, 'File materi tidak ditemukan di penyimpanan server.');
        }

        $path = $disk->path($material->file_path);
        $filename = basename($material->file_path);

        $headers = [
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0, private',
            'Pragma' => 'no-cache',
            'Content-Type' => 'application/pdf',
        ];

        if ($request->query('download')) {
            return response()->download($path, $filename, $headers);
        }

        return response()->file($path, array_merge($headers, [
            'Content-Disposition' => 'inline; filename="' . $filename . '"',
        ]));
    }
}
