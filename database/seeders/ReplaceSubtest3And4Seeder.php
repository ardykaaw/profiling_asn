<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ReplaceSubtest3And4Seeder extends Seeder
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

        $jsonPath = __DIR__ . '/subtest3_and_4_data.json';
        if (!File::exists($jsonPath)) {
            $this->command->error("File subtest3_and_4_data.json tidak ditemukan!");
            return;
        }

        $data = json_decode(File::get($jsonPath), true);
        $sub3Questions = $data['subtest3'] ?? [];
        $sub4Questions = $data['subtest4'] ?? [];

        // 1. Replace Subtest 3 (Berpikir Kritis & Memecahkan Masalah)
        $this->command->info("Menghapus soal lama Berpikir Kritis...");
        $deleted3 = Question::where('category_id', $potensiCat->id)
            ->where(function ($q) {
                $q->where('sub_category', 'like', '%kritis%')
                  ->orWhere('sub_category', 'like', '%menyelesaikan masalah%');
            })
            ->delete();
        $this->command->info("Berhasil menghapus {$deleted3} soal lama Berpikir Kritis.");

        $inserted3 = 0;
        foreach ($sub3Questions as $q) {
            Question::create([
                'category_id' => $potensiCat->id,
                'sub_category' => 'Berpikir kritis dan menyelesaikan masalah',
                'question' => $q['question'],
                'image_path' => null,
                'options' => $q['options'],
                'correct_answer' => $q['correct_answer'],
                'scores' => null,
                'explanation' => $q['explanation'],
                'is_active' => true,
            ]);
            $inserted3++;
        }
        $this->command->info("Berhasil memasukkan {$inserted3} butir soal baru Berpikir Kritis (Sub Test 3).");

        // 2. Replace Subtest 4 (Kepribadian)
        $this->command->info("Menghapus soal lama Kepribadian...");
        $deleted4 = Question::where('category_id', $potensiCat->id)
            ->where('sub_category', 'like', '%kepribadian%')
            ->delete();
        $this->command->info("Berhasil menghapus {$deleted4} soal lama Kepribadian.");

        $inserted4 = 0;
        foreach ($sub4Questions as $q) {
            Question::create([
                'category_id' => $potensiCat->id,
                'sub_category' => 'Kepribadian',
                'question' => $q['question'],
                'image_path' => null,
                'options' => $q['options'],
                'correct_answer' => $q['correct_answer'],
                'scores' => null,
                'explanation' => $q['explanation'],
                'is_active' => true,
            ]);
            $inserted4++;
        }
        $this->command->info("Berhasil memasukkan {$inserted4} butir soal baru Kepribadian (Sub Test 4).");

        // Update total questions on Category
        $totalPotensi = Question::where('category_id', $potensiCat->id)->count();
        $potensiCat->update(['question_count' => $totalPotensi]);

        $this->command->info("Selesai! Total soal kategori POTENSI sekarang: {$totalPotensi}.");
    }
}
