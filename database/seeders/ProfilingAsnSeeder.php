<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProfilingAsnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Setup the 4 Standard Paten Categories for PROFILING ASN
        $categoriesConfig = [
            'POTENSI' => [
                'name' => 'Tes Potensi Kognitif & Figural',
                'code' => 'POTENSI',
                'passing_grade' => 70,
                'question_count' => 525, // 5 subtes/sesi: Figural (30), Numerik (300), Berpikir Kritis (45), Kepribadian (45), Belajar Cepat (45)
                'max_score' => 100,
                'description' => 'Mengukur kapasitas dasar kognitif, logika analitis, pemecahan masalah kompleks, penalaran figural, serta adaptasi belajar cepat.',
                'color' => '#2563EB',
                'order' => 1,
            ],
            'MANAJERIAL' => [
                'name' => 'Kompetensi Manajerial & Sosio-Kultural',
                'code' => 'MANAJERIAL',
                'passing_grade' => 75,
                'question_count' => 45, // Manajerial (23) + Sosio Kultural (22)
                'max_score' => 100,
                'description' => 'Mengukur 8 dimensi kompetensi manajerial MenPAN-RB (Integritas, Kerjasama, Komunikasi, Orientasi Hasil, Pelayanan Publik, Pengembangan Diri, Mengelola Perubahan, Pengambilan Keputusan) dan Perekat Bangsa.',
                'color' => '#059669',
                'order' => 2,
            ],
            'DIGITAL' => [
                'name' => 'Literasi & Keamanan Digital ASN',
                'code' => 'DIGITAL',
                'passing_grade' => 70,
                'question_count' => 35, // Digital Skill (9), Digital Culture (9), Digital Ethics (9), Digital Safety (8)
                'max_score' => 100,
                'description' => 'Menguji 4 pilar kecakapan literasi digital nasional: Digital Skill, Digital Culture, Digital Ethics, dan Digital Safety dalam kerangka SPBE.',
                'color' => '#7C3AED',
                'order' => 3,
            ],
            'KARIR' => [
                'name' => 'Preferensi Karir (Tripatha Karir ASN)',
                'code' => 'KARIR',
                'passing_grade' => 0,
                'question_count' => 168, // Minat (42), Nilai Pribadi (42), Aspirasi (42), Pengalaman Kerja (42)
                'max_score' => 100,
                'description' => 'Pemetaan psikometrik minat kerja, gaya pemecahan masalah, nilai pribadi, dan orientasi peran ASN ke dalam 3 jalur Tripatha Karir: Struktural/JPT, Fungsional Keahlian, dan Operasional Pelayanan.',
                'color' => '#D97706',
                'order' => 4,
            ],
        ];

        $categoryModels = [];
        foreach ($categoriesConfig as $code => $config) {
            $categoryModels[$code] = Category::updateOrCreate(
                ['code' => $code],
                $config
            );
        }

        // 2. Load Extracted Questions from JSON
        $jsonPath = __DIR__ . '/profiling_data.json';
        if (!File::exists($jsonPath)) {
            $this->command->error("File profiling_data.json tidak ditemukan!");
            return;
        }

        $data = json_decode(File::get($jsonPath), true);

        // Delete previous questions for these 4 categories to refresh cleanly
        $catIds = array_map(fn($c) => $c->id, $categoryModels);
        Question::whereIn('category_id', $catIds)->delete();

        // Also deactivate/remove obsolete CPNS categories (TWK, TIU, TKP, SKB)
        Category::whereNotIn('code', ['POTENSI', 'MANAJERIAL', 'DIGITAL', 'KARIR'])->delete();

        $totalInserted = 0;
        foreach ($data as $code => $questions) {
            $cat = $categoryModels[$code] ?? null;
            if (!$cat) continue;

            foreach ($questions as $q) {
                Question::create([
                    'category_id' => $cat->id,
                    'sub_category' => $q['sub_category'],
                    'question' => $q['question'],
                    'image_path' => $q['image_path'] ?? null,
                    'options' => $q['options'],
                    'correct_answer' => $q['correct_answer'],
                    'scores' => $q['scores'] ?? null,
                    'explanation' => $q['explanation'] ?? null,
                    'is_active' => true,
                ]);
                $totalInserted++;
            }
        }

        $this->command->info("Berhasil mengimpor {$totalInserted} butir soal autentik Profiling ASN ke dalam 4 Kategori Paten!");
    }
}
