<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Material;
use Illuminate\Database\Seeder;

class RealMaterialsSeeder extends Seeder
{
    public function run(): void
    {
        Material::truncate();

        $pot = Category::where('code', 'POTENSI')->first() ?? Category::first();
        $man = Category::where('code', 'MANAJERIAL')->first() ?? Category::first();
        $dig = Category::where('code', 'DIGITAL')->first() ?? Category::first();
        $kar = Category::where('code', 'KARIR')->first() ?? Category::first();

        $items = [
            // --- POTENSI: 5 MODUL RESMI SUBTES TERBARU ---
            [
                'category_id' => $pot->id,
                'title' => 'Modul Tes Potensi Subtes 1: Penalaran Figural (Spasial & Pola Ruang)',
                'slug' => 'modul-tes-potensi-subtes-1-penalaran-figural',
                'type' => 'pdf',
                'level' => 'Semua Jenjang',
                'duration' => '45 Menit',
                'file_path' => 'materials/Tes Potensi Sub Test 1- Figuralw.pdf',
                'summary' => 'Panduan komprehensif penalaran figural: rotasi bangun 2D/3D, serial pola gambar, analogi bentuk, dan matriks spasial tersembunyi.',
                'content' => 'Modul resmi penguasaan penalaran figural dan spasial standar asesmen CAT BKN.',
                'is_free' => true,
                'is_published' => true,
            ],
            [
                'category_id' => $pot->id,
                'title' => 'Modul Tes Potensi Subtes 2: Penalaran Numerik & Komparasi Kuantitatif',
                'slug' => 'modul-tes-potensi-subtes-2-penalaran-numerik',
                'type' => 'pdf',
                'level' => 'Semua Jenjang',
                'duration' => '50 Menit',
                'file_path' => 'materials/Tes Potensi Sub Tes 2- Numerikw.pdf',
                'summary' => 'Teknik berhitung cepat, perbandingan angka positif-negatif, aljabar dasar, persentase, dan deret angka berkecepatan tinggi.',
                'content' => 'Metode eliminasi cepat dan trik taktis menyelesaikan komparasi kuantitatif CAT BKN.',
                'is_free' => false,
                'is_published' => true,
            ],
            [
                'category_id' => $pot->id,
                'title' => 'Modul Tes Potensi Subtes 3: Berpikir Kritis & Pemecahan Masalah Publik',
                'slug' => 'modul-tes-potensi-subtes-3-berpikir-kritis-problem-solving',
                'type' => 'pdf',
                'level' => 'Semua Jenjang',
                'duration' => '50 Menit',
                'file_path' => 'materials/Tes Potensi Sub Test 3 - Kemampuan Berpikir Kritis dan Memecahkan Masalahw.pdf',
                'summary' => 'Penguasaan logika analitis, identifikasi premis kebijakan, evaluasi argumen, silogisme, dan problem solving berbasis kasus birokrasi.',
                'content' => 'Panduan bernalar analitis kritis dan penyelesaian persoalan strategis di lingkungan pemerintahan.',
                'is_free' => false,
                'is_published' => true,
            ],
            [
                'category_id' => $pot->id,
                'title' => 'Modul Tes Potensi Subtes 4: Integritas & Kepribadian ASN (BerAKHLAK)',
                'slug' => 'modul-tes-potensi-subtes-4-integritas-kepribadian-asn',
                'type' => 'pdf',
                'level' => 'Semua Jenjang',
                'duration' => '40 Menit',
                'file_path' => 'materials/Tes Potensi -Sub Test 4 - Kepribadianw.pdf',
                'summary' => 'Pendalaman etos kerja, ketahanan emosional, kedisiplinan moral, dan integritas kepribadian berlandaskan Core Values BerAKHLAK.',
                'content' => 'Buku materi resmi pengembangan etika kepribadian, ketahanan mental, dan integritas ASN.',
                'is_free' => false,
                'is_published' => true,
            ],
            [
                'category_id' => $pot->id,
                'title' => 'Modul Tes Potensi Subtes 5: Kemampuan Belajar Cepat & Mengembangkan Diri',
                'slug' => 'modul-tes-potensi-subtes-5-kemampuan-belajar-cepat-adaptasi',
                'type' => 'pdf',
                'level' => 'Semua Jenjang',
                'duration' => '45 Menit',
                'file_path' => 'materials/TEST POTENSI Sub Test 5 - Kemampuan Belajar Cepat dan Mengembangkan Diriw.pdf',
                'summary' => 'Metode akselerasi pemahaman regulasi baru, sintesis data kompleks, fleksibilitas berpikir, dan adaptabilitas perubahan birokrasi.',
                'content' => 'Modul strategi belajar cepat, adaptasi peran dinamis, dan pengembangan kapasitas berkelanjutan.',
                'is_free' => false,
                'is_published' => true,
            ],

            // --- MANAJERIAL ---
            [
                'category_id' => $man->id,
                'title' => 'Panduan Asesmen Manajerial & Sosio-Kultural ASN',
                'slug' => 'panduan-asesmen-manajerial-sosio-kultural',
                'type' => 'pdf',
                'level' => 'Pratama & Madya',
                'duration' => '45 Menit',
                'file_path' => 'materials/TES MANAGERIAL PRO ASN (1).pdf',
                'summary' => 'Pedoman komprehensif 8 dimensi manajerial MenPAN-RB, standar kompetensi, dan uji situasional integritas serta pelayanan publik.',
                'content' => 'Modul resmi persiapan uji kompetensi manajerial dan sosio-kultural sesuai PermenPAN-RB No. 38 Tahun 2017.',
                'is_free' => true,
                'is_published' => true,
            ],
            [
                'category_id' => $man->id,
                'title' => 'Buku Panduan Profiling ASN Anti Gagal',
                'slug' => 'buku-panduan-profiling-asn-anti-gagal',
                'type' => 'pdf',
                'level' => 'Lengkap',
                'duration' => '75 Menit',
                'file_path' => 'materials/Profilling ASN Anti Gagal.pdf',
                'summary' => 'Panduan terpadu persiapan fisik, mental, strategi pengerjaan CAT, dan kisi-kisi asesmen kompetensi ASN teruji.',
                'content' => 'Buku panduan terlengkap mencakup seluruh kisi-kisi resmi dan tips penanganan situasi dilematis ASN.',
                'is_free' => false,
                'is_published' => true,
            ],
            [
                'category_id' => $man->id,
                'title' => '50 Soal Jawab & Bedah Kasus Emerging Skill Profiling ASN',
                'slug' => '50-soal-jawab-emerging-skill-profiling-asn',
                'type' => 'pdf',
                'level' => 'Lanjutan',
                'duration' => '60 Menit',
                'file_path' => 'materials/50 Soal Jawab Emerging Skill Profilling ASN.pdf',
                'summary' => 'Bedah tuntas 50 studi kasus problem solving publik, berpikir analitis, dan adopsi teknologi mutakhir birokrasi.',
                'content' => 'Panduan terperinci pemecahan masalah kompleks dengan pendekatan analytical mindset dan triangulasi data kebijakan.',
                'is_free' => false,
                'is_published' => true,
            ],

            // --- DIGITAL ---
            [
                'category_id' => $dig->id,
                'title' => 'Pedoman Literasi Digital, SPBE & UU PDP Nasional',
                'slug' => 'pedoman-literasi-digital-spbe-uu-pdp',
                'type' => 'pdf',
                'level' => 'Semua Jenjang',
                'duration' => '40 Menit',
                'file_path' => 'materials/LITERASI DIGITAL.pdf',
                'summary' => 'Materi pilar Digital Skills, Digital Culture, Digital Ethics, dan Digital Safety untuk kesiapan implementasi Satu Data & SPBE.',
                'content' => 'Pemahaman mendalam mengenai arsitektur SPBE, kepatuhan pelindungan data pribadi (UU PDP), dan mitigasi ancaman siber kedinasan.',
                'is_free' => true,
                'is_published' => true,
            ],
            [
                'category_id' => $dig->id,
                'title' => 'Bank Soal & Latihan Kasus Literasi Digital ASN',
                'slug' => 'bank-soal-literasi-digital-asn',
                'type' => 'pdf',
                'level' => 'Semua Jenjang',
                'duration' => '30 Menit',
                'file_path' => 'materials/Bonus bank soal literasi digital.pdf',
                'summary' => 'Kumpulan soal latihan kasus literasi digital kedinasan lengkap dengan kunci jawaban dan analisis tingkat kematangan digital.',
                'content' => 'Simulasi soal objektif seputar etika digital birokrasi, penanganan phishing, dan tata kelola akun kedinasan.',
                'is_free' => false,
                'is_published' => true,
            ],

            // --- KARIR ---
            [
                'category_id' => $kar->id,
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
            ],
        ];

        foreach ($items as $item) {
            Material::create($item);
        }
    }
}
