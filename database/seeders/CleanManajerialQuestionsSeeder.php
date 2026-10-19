<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CleanManajerialQuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cat = Category::where('code', 'MANAJERIAL')->first();
        if (!$cat) {
            $this->command->error("Kategori MANAJERIAL tidak ditemukan!");
            return;
        }

        $jsonPath = __DIR__ . '/profiling_data.json';
        if (!File::exists($jsonPath)) {
            $this->command->error("File profiling_data.json tidak ditemukan!");
            return;
        }

        $data = json_decode(File::get($jsonPath), true);
        $manajerialQuestions = $data['MANAJERIAL'] ?? [];

        $this->command->info("Menghapus soal lama kategori MANAJERIAL...");
        $deleted = Question::where('category_id', $cat->id)->delete();
        $this->command->info("Berhasil menghapus {$deleted} butir soal.");

        $inserted = 0;
        foreach ($manajerialQuestions as $q) {
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
            $inserted++;
        }

        $cat->update(['question_count' => $inserted]);
        $this->command->info("Selesai! Berhasil memasukkan {$inserted} butir soal autentik Manajerial & Sosio-Kultural (23 Manajerial + 22 Sosio Kultural).");
    }
}
