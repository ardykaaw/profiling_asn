<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class FiguralQuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $potensiCat = Category::where('code', 'POTENSI')->first();
        if (!$potensiCat) {
            $potensiCat = Category::create([
                'name' => 'Tes Potensi Kognitif & Figural',
                'code' => 'POTENSI',
                'passing_grade' => 70,
                'question_count' => 525,
                'max_score' => 100,
                'description' => 'Mengukur kapasitas dasar kognitif, logika analitis, pemecahan masalah kompleks, penalaran figural, serta adaptasi belajar cepat.',
                'color' => '#2563EB',
                'order' => 1,
            ]);
        }

        $jsonPath = __DIR__ . '/figural_data.json';
        if (!File::exists($jsonPath)) {
            $this->command->error("File figural_data.json tidak ditemukan!");
            return;
        }

        $questions = json_decode(File::get($jsonPath), true);

        // Remove previous figural questions to ensure idempotency
        Question::where('category_id', $potensiCat->id)
            ->where(function ($query) {
                $query->where('sub_category', 'like', '%Figural%')
                      ->orWhereNotNull('image_path');
            })
            ->delete();

        // Exactly 30 official figural questions (BKN Standard: 30 soal, 30 menit)
        $questions30 = array_slice($questions, 0, 30);

        $count = 0;
        foreach ($questions30 as $q) {
            Question::create([
                'category_id' => $potensiCat->id,
                'sub_category' => $q['sub_category'],
                'question' => $q['question'],
                'image_path' => $q['image_path'],
                'options' => $q['options'],
                'correct_answer' => $q['correct_answer'],
                'scores' => null,
                'explanation' => $q['explanation'],
                'is_active' => true,
            ]);
            $count++;
        }

        $totalPotensi = Question::where('category_id', $potensiCat->id)->count();
        $potensiCat->update(['question_count' => $totalPotensi]);

        $this->command->info("Berhasil menambahkan {$count} butir soal Figural resmi berkualitas tinggi lengkap dengan gambar & pembahasan! (Total soal POTENSI: {$totalPotensi})");
    }
}
