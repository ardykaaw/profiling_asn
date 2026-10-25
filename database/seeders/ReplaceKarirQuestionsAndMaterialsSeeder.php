<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Material;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ReplaceKarirQuestionsAndMaterialsSeeder extends Seeder
{
    /**
     * Run the database seeds for replacing Preferensi Karir questions and materials.
     */
    public function run(): void
    {
        // 1. Find or update KARIR Category
        $karirCat = Category::where('code', 'KARIR')->first();
        if (!$karirCat) {
            $this->command->error("Kategori KARIR tidak ditemukan!");
            return;
        }

        $karirCat->update([
            'name' => 'Preferensi Karir (Tripatha Karir ASN)',
            'passing_grade' => 0,
            'question_count' => 168,
            'max_score' => 100,
            'description' => 'Pemetaan psikometrik minat kerja RIASEC (108 butir), nilai kerja (30 butir), lingkungan kerja (18 butir), dan gaya kerja profesional (12 butir) standar ProASN BKN.',
            'color' => '#D97706',
            'order' => 4,
        ]);

        // 2. Load New Authentic Karir Questions
        $jsonPath = __DIR__ . '/karir_data.json';
        if (!File::exists($jsonPath)) {
            $this->command->error("File karir_data.json tidak ditemukan!");
            return;
        }

        $karirQuestions = json_decode(File::get($jsonPath), true);

        // 3. Delete Old Karir Questions
        $this->command->info("Menghapus seluruh soal lama kategori KARIR...");
        $deleted = Question::where('category_id', $karirCat->id)->delete();
        $this->command->info("Berhasil menghapus {$deleted} soal lama KARIR.");

        // 4. Insert New 168 Questions
        $inserted = 0;
        foreach ($karirQuestions as $q) {
            Question::create([
                'category_id' => $karirCat->id,
                'sub_category' => $q['sub_category'],
                'question' => $q['question'],
                'image_path' => null,
                'options' => $q['options'],
                'correct_answer' => $q['correct_answer'] ?? 4,
                'scores' => $q['scores'] ?? [1, 2, 3, 4, 5],
                'explanation' => $q['explanation'] ?? null,
                'is_active' => true,
            ]);
            $inserted++;
        }
        $this->command->info("Berhasil memasukkan {$inserted} butir soal baru resmi Preferensi Karir.");

        // 5. Replace Old Karir Materials with New Official Module
        $this->command->info("Memperbarui modul materi Preferensi Karir...");
        Material::where('category_id', $karirCat->id)
            ->orWhere('file_path', 'like', '%DNA Talent%')
            ->orWhere('file_path', 'like', '%SOAL TRIPATHA KARIR%')
            ->delete();

        Material::create([
            'category_id' => $karirCat->id,
            'title' => 'Buku Panduan & Latihan Resmi Preferensi Karier Profiling ASN 2026',
            'slug' => 'buku-panduan-latihan-preferensi-karier-proasn',
            'type' => 'pdf',
            'level' => 'Semua Jenjang',
            'duration' => '60 Menit',
            'file_path' => 'materials/PREFERENSI KARIR.pdf',
            'summary' => 'Panduan komprehensif pemetaan 6 dimensi minat kerja RIASEC (108 butir), nilai kerja (30 butir), lingkungan kerja (18 butir), dan gaya kerja profesional (12 butir) standar ProASN BKN.',
            'content' => 'Buku modul lengkap materi konseptual, panduan strategi pengisian, dan instrumen latihan resmi pemetaan preferensi karier ASN.',
            'is_free' => true,
            'is_published' => true,
        ]);

        $this->command->info("Berhasil mendaftarkan modul materi resmi PREFERENSI KARIR.pdf.");

        // 6. Summary of Questions Across All Categories
        $totalAll = Question::count();
        $totalKarir = Question::where('category_id', $karirCat->id)->count();
        $this->command->info("Selesai! Total soal KARIR: {$totalKarir}, Total seluruh soal di bank soal: {$totalAll}.");
    }
}
