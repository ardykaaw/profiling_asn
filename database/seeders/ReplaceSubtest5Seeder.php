<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ReplaceSubtest5Seeder extends Seeder
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

        $jsonPath = __DIR__ . '/subtest5_data.json';
        if (!File::exists($jsonPath)) {
            $this->command->error("File subtest5_data.json tidak ditemukan!");
            return;
        }

        $sub5Questions = json_decode(File::get($jsonPath), true);

        // Replace Subtest 5 (Kemampuan belajar cepat dan mengembangkan diri)
        $this->command->info("Menghapus soal lama Belajar Cepat...");
        $deleted = Question::where('category_id', $potensiCat->id)
            ->where(function ($q) {
                $q->where('sub_category', 'like', '%belajar%')
                  ->orWhere('sub_category', 'like', '%mengembangkan diri%');
            })
            ->delete();
        $this->command->info("Berhasil menghapus {$deleted} soal lama Belajar Cepat.");

        $inserted = 0;
        foreach ($sub5Questions as $q) {
            Question::create([
                'category_id' => $potensiCat->id,
                'sub_category' => 'Kemampuan belajar cepat dan mengembangkan diri',
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
        $this->command->info("Berhasil memasukkan {$inserted} butir soal baru Belajar Cepat (Sub Test 5).");

        // Update total questions on Category
        $totalPotensi = Question::where('category_id', $potensiCat->id)->count();
        $potensiCat->update(['question_count' => $totalPotensi]);

        $this->command->info("Selesai! Total soal kategori POTENSI sekarang: {$totalPotensi}.");
    }
}
