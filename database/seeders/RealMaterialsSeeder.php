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
            [
                'category_id' => $pot->id,
                'title' => 'Panduan Lengkap Tes Potensi Akademik & Kognitif ASN',
                'slug' => 'panduan-lengkap-tes-potensi-kognitif-asn',
                'type' => 'pdf',
                'level' => 'Semua Jenjang',
                'duration' => '50 Menit',
                'file_path' => 'materials/TES POTENSI (1).pdf',
                'summary' => 'Kompilasi materi penalaran logis, silogisme deduktif-induktif, numerik kebijakan, dan pemahaman wacana analitis.',
                'content' => 'Metode dan trik efisiensi waktu pengerjaan tes potensi kognitif standar CAT BKN.',
                'is_free' => true,
                'is_published' => true,
            ],
            [
                'category_id' => $pot->id,
                'title' => 'Mastery Pembahasan Penalaran Spasial & Soal Figural',
                'slug' => 'mastery-pembahasan-soal-figural',
                'type' => 'pdf',
                'level' => 'Semua Jenjang',
                'duration' => '45 Menit',
                'file_path' => 'materials/PEMBAHASAN SOAL FIGURAL.pdf',
                'summary' => 'Trik jitu mengidentifikasi rotasi bangun ruang 2D/3D, serial diagram, analogi bentuk, dan matriks pola spasial tersembunyi.',
                'content' => 'Kunci sukses menaklukkan subtes figural spasial dengan kecepatan eliminasi jawaban.',
                'is_free' => false,
                'is_published' => true,
            ],
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
            [
                'category_id' => $kar->id,
                'title' => 'DNA Talent: Panduan Masuk Kuadran 9 Manajemen Talenta BKN',
                'slug' => 'dna-talent-kuadran-9-bkn',
                'type' => 'pdf',
                'level' => 'Strategis',
                'duration' => '35 Menit',
                'file_path' => 'materials/DNA Talent.pdf',
                'summary' => 'Roadmap pemetaan aparatur berkinerja tinggi (high performance) dan berpotensi tinggi (high potential) dalam matriks 3x3 BKN.',
                'content' => 'Strategi akselerasi karier menuju suksesi kepemimpinan dan suksesi JPT nasional melalui penguatan portofolio kompetensi.',
                'is_free' => true,
                'is_published' => true,
            ],
            [
                'category_id' => $kar->id,
                'title' => 'Studi Kasus Tripatha Karir & Pengambilan Keputusan ASN',
                'slug' => 'studi-kasus-tripatha-karir-asn',
                'type' => 'pdf',
                'level' => 'Manajerial',
                'duration' => '30 Menit',
                'file_path' => 'materials/SOAL TRIPATHA KARIR.pdf',
                'summary' => 'Analisis kasus jalur karir struktural, fungsional, dan keterampilan aparatur dalam kerangka sistem merit nasional.',
                'content' => 'Simulasi pengambilan keputusan karir dan kepemimpinan adaptif di lingkungan instansi pemerintah.',
                'is_free' => false,
                'is_published' => true,
            ],
        ];

        foreach ($items as $item) {
            Material::create($item);
        }
    }
}
