<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ReplaceNumerikQuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $potensiCat = Category::where('code', 'POTENSI')->first();
        if (!$potensiCat) {
            $this->command->error("Kategori POTENSI tidak ditemukan!");
            return;
        }

        $jsonPath = __DIR__ . '/numerik_data.json';
        if (!File::exists($jsonPath)) {
            $this->command->error("File numerik_data.json tidak ditemukan!");
            return;
        }

        $questions = json_decode(File::get($jsonPath), true);

        $this->command->info("Menghapus soal numerik lama...");
        $deleted = Question::where('category_id', $potensiCat->id)
            ->where('sub_category', 'Numerik')
            ->delete();

        $this->command->info("Berhasil menghapus {$deleted} butir soal numerik lama.");

        $this->command->info("Memasukkan 300 soal numerik perbandingan angka baru...");
        $inserted = 0;
        foreach ($questions as $q) {
            Question::create([
                'category_id' => $potensiCat->id,
                'sub_category' => 'Numerik',
                'question' => $q['question'],
                'image_path' => null,
                'options' => $q['options'],
                'correct_answer' => $q['correct_answer'],
                'scores' => null,
                'explanation' => $q['explanation'],
                'is_active' => true,
            ]);
            $inserted++;
        }

        // Update question_count on Category
        $totalPotensi = Question::where('category_id', $potensiCat->id)->count();
        $potensiCat->update(['question_count' => $totalPotensi]);

        $this->command->info("Berhasil memasukkan {$inserted} butir soal numerik baru ke kategori POTENSI (Total soal potensi sekarang: {$totalPotensi}).");
    }
}
