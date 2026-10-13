<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Material;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SkdPackageSeeder extends Seeder
{
    public function run(): void
    {
        $catTWK = Category::where('code', 'TWK')->first();
        $catTIU = Category::where('code', 'TIU')->first();
        $catTKP = Category::where('code', 'TKP')->first();
        $catSKB = Category::where('code', 'SKB')->first();

        if (!$catTWK || !$catTIU || !$catTKP) {
            $this->command->error('Kategori TWK, TIU, TKP belum ditemukan. Jalankan DatabaseSeeder terlebih dahulu.');
            return;
        }

        // ==========================================
        // 1. TAMBAH MODUL MATERI LENGKAP (21 Modul)
        // ==========================================
        $materials = [
            // --- TWK ---
            [
                'category_id' => $catTWK->id,
                'title' => 'Bhinneka Tunggal Ika: Harmonisasi Keberagaman & Integrasi Nasional',
                'slug' => 'bhinneka-tunggal-ika-harmonisasi-keberagaman',
                'type' => 'ringkasan',
                'level' => 'Dasar',
                'duration' => '20 min',
                'summary' => 'Memahami sejarah Kakawin Sutasoma, prinsip pluralisme bangsa, dan pencegahan disintegrasi vertikal maupun horizontal.',
                'content' => "## Bhinneka Tunggal Ika dalam Bingkai NKRI\n\n### 1. Sejarah & Filosofi\nSemboyan Bhinneka Tunggal Ika Tan Hana Dharma Mangrwa dikutip dari Kitab Kakawin Sutasoma karya Mpu Tantular pada masa Kerajaan Majapahit (abad ke-14). Menggambarkan kerukunan umat Hindu Siwa dan Buddha.\n\n### 2. Dimensi Keberagaman Indonesia\n- **Suku & Etnis:** Lebih dari 1.300 suku bangsa.\n- **Agama:** Enam agama resmi dan aliran kepercayaan yang dilindungi Pasal 29 UUD 1945.\n- **Bahasa Daerah:** Lebih dari 700 bahasa daerah disatukan oleh Bahasa Indonesia.\n\n### 3. Bentuk Ancaman Disintegrasi\n- Etnosentrisme (mengagungkan suku sendiri).\n- Primordialisme (keterikatan berlebihan pada ikatan awal sejak lahir).\n- Chauvinisme (cinta tanah air sempit yang memandang rendah bangsa lain).",
                'video_url' => null,
                'is_published' => true,
                'is_free' => true,
            ],
            [
                'category_id' => $catTWK->id,
                'title' => 'Nasionalisme & Bela Negara: Bedah Regulasi UU No. 23 Tahun 2019',
                'slug' => 'nasionalisme-bela-negara-uu-23-2019',
                'type' => 'pdf',
                'level' => 'Menengah',
                'duration' => '25 min',
                'summary' => 'Konsep pertahanan rakyat semesta, komponen utama, cadangan, dan pendukung serta implementasi bela negara non-militer bagi ASN.',
                'content' => "## Bela Negara Menurut UU No. 23 Tahun 2019\n\n### 5 Nilai Dasar Bela Negara:\n1. Cinta tanah air.\n2. Sadar berbangsa dan bernegara.\n3. Setia pada Pancasila sebagai ideologi negara.\n4. Rela berkorban untuk bangsa dan negara.\n5. Mempunyai kemampuan awal bela negara (psikis & fisik).\n\n### Komponen Pertahanan Negara:\n- **Komponen Utama:** TNI (Angkatan Darat, Laut, Udara).\n- **Komponen Cadangan (Komcad):** Warga negara, sumber daya alam, dan sarana prasarana yang disiapkan untuk dikerahkan bila negara darurat militer.\n- **Komponen Pendukung:** Menwa, Polsus, Linmas, dll.",
                'video_url' => null,
                'is_published' => true,
                'is_free' => false,
            ],
            [
                'category_id' => $catTWK->id,
                'title' => 'Integritas & Anti Korupsi: Gratifikasi, Suap, dan Pemerasan',
                'slug' => 'integritas-anti-korupsi-gratifikasi-suap',
                'type' => 'video',
                'level' => 'Menengah',
                'duration' => '30 min',
                'summary' => 'Perbedaan fundamental antara gratifikasi, suap, dan pemerasan menurut UU Tipikor serta batas waktu pelaporan KPK (30 hari kerja).',
                'content' => "## Membedah Delik Korupsi bagi ASN\n\n### 1. Suap (Bribery)\nAda kesepakatan transaksional (*meeting of minds*) sebelum tindakan pelayanan dilakukan (*quid pro quo*).\n\n### 2. Pemerasan (Extortion)\nInisiatif datang dari pejabat/ASN dengan memanfaatkan kekuasaan untuk memaksa masyarakat memberikan sejumlah uang.\n\n### 3. Gratifikasi\nPemberian dalam arti luas (uang, barang, diskon, tiket) yang berhubungan dengan jabatan tanpa kesepakatan di awal. Wajib dilaporkan ke KPK maksimal **30 hari kerja** sejak diterima.",
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'is_published' => true,
                'is_free' => false,
            ],
            [
                'category_id' => $catTWK->id,
                'title' => 'Bahasa Indonesia Baku: Kaidah EYD V, PUEBI, dan Kalimat Efektif',
                'slug' => 'bahasa-indonesia-baku-eyd-v-kalimat-efektif',
                'type' => 'ringkasan',
                'level' => 'Dasar',
                'duration' => '22 min',
                'summary' => 'Kunci menaklukkan 5 soal Bahasa Indonesia di TWK: penulisan huruf kapital, kata serapan, tanda baca, serta struktur S-P-O-K efektif.',
                'content' => "## Pedoman Bahasa Indonesia Soal TWK\n\n### Ciri Kalimat Efektif:\n1. **Kesepadanan Struktur:** Memiliki Subjek dan Predikat yang jelas (tidak ambigu).\n2. **Keparalelan Bentuk:** Jika rincian pertama berupa kata kerja (*me-*), rincian berikutnya juga harus (*me-*).\n3. **Kehematan Kata:** Hindari kata bersinonim bertumpuk (contoh: *agar supaya* -> cukup gunakan *agar*).\n4. **Kecermatan Penalaran:** Tidak menimbulkan tafsiran ganda.\n\n### Aturan EYD Edisi V:\n- Penulisan maha: *Mahakuasa* (gabung), *Maha Pengasih* (pisah karena diikuti kata berimbuhan).\n- Tanda koma sebelum kata *seperti, misalnya, yaitu*.",
                'video_url' => null,
                'is_published' => true,
                'is_free' => true,
            ],

            // --- TIU ---
            [
                'category_id' => $catTIU->id,
                'title' => 'Kemampuan Verbal: Trik Analogi Hubungan Kata Semantik',
                'slug' => 'kemampuan-verbal-analogi-kata-semantik',
                'type' => 'video',
                'level' => 'Dasar',
                'duration' => '26 min',
                'summary' => 'Membuat kalimat jembatan (bridge sentence) untuk menemukan relasi fungsi, sebab-akibat, asosiasi, atau hierarki antar pasangan kata.',
                'content' => "## Metode Kalimat Jembatan Analogi\n\nJangan langsung menebak jawaban, buat pola hubungan kalimat terlebih dahulu!\n\n### Pola Hubungan Umum:\n1. **Fungsi / Kegunaan:** MATA : MELIHAT = TELINGA : MENDENGAR.\n2. **Sebab - Akibat:** HUJAN : BANJIR = KEMARAU : KEKERINGAN.\n3. **Bahan Baku:** GANDUM : ROTI = KAYU : KURSI.\n4. **Asosiasi / Karakteristik:** ES : DINGIN = GULA : MANIS.\n5. **Tingkatan / Intensitas:** HANGAT : PANAS = GERIMIS : HUJAN LEBAT.",
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'is_published' => true,
                'is_free' => true,
            ],
            [
                'category_id' => $catTIU->id,
                'title' => 'Deret Angka & Pola Bilangan: Menembus Pola Bertingkat & Larik',
                'slug' => 'deret-angka-pola-bilangan-bertingkat',
                'type' => 'pdf',
                'level' => 'Menengah',
                'duration' => '32 min',
                'summary' => 'Taktik mengidentifikasi pola 1 tingkat, 2 tingkat, selang-seling 2 larik, pola Fibonacci, dan pola kuadrat/kubik dalam 30 detik.',
                'content' => "## 5 Tipe Deret Angka TIU BKN\n\n1. **Pola Bertingkat (Selisih Tingkat 2):**\n   Contoh: 2, 5, 10, 17, 26 -> Selisihnya: +3, +5, +7, +9 (selisih kedua +2).\n2. **Pola Selang-Seling (Larik Ganda):**\n   Larik ganjil punya aturan sendiri, larik genap punya aturan sendiri.\n3. **Pola Fibonacci:**\n   Suku ke-n merupakan jumlah dari dua suku sebelumnya (1, 1, 2, 3, 5, 8, 13).\n4. **Pola Operasi Campuran:**\n   x2 - 1, x2 - 1 berulang.",
                'video_url' => null,
                'is_published' => true,
                'is_free' => false,
            ],
            [
                'category_id' => $catTIU->id,
                'title' => 'Penalaran Analitis: Penentuan Posisi, Urutan, dan Jadwal',
                'slug' => 'penalaran-analitis-posisi-urutan-jadwal',
                'type' => 'ringkasan',
                'level' => 'Lanjutan',
                'duration' => '35 min',
                'summary' => 'Gunakan tabel matriks atau garis posisi linear untuk memecahkan teka-teki urutan antrian, tempat duduk bundar, dan jadwal kuliah.',
                'content' => "## Trik Analitis Cepat BKN\n\n- Jangan baca berulang-ulang tanpa corat-coret sketsa simbolis.\n- Petakan informasi pasti terlebih dahulu (contoh: *Budi duduk tepat di ujung kiri*).\n- Gunakan notasi: A > B (A lebih tinggi dari B), A ≠ C (A tidak boleh bersebelahan dengan C).\n- Eliminasi pilihan jawaban yang melanggar satu pun syarat mutlak di soal.",
                'video_url' => null,
                'is_published' => true,
                'is_free' => false,
            ],
            [
                'category_id' => $catTIU->id,
                'title' => 'Kemampuan Figural: Serial Gambar, Ketidaksamaan, & 9 Kotak',
                'slug' => 'kemampuan-figural-serial-ketidaksamaan',
                'type' => 'video',
                'level' => 'Dasar',
                'duration' => '24 min',
                'summary' => 'Menganalisis rotasi searah/berlawanan jarum jam (45°, 90°, 180°), penambahan elemen garis, pencerminan, dan simetri gambar.',
                'content' => "## 3 Kunci Soal Figural\n\n1. **Rotasi Sudut:** Amati satu elemen unik (misal ujung panah atau titik hitam) apakah berputar 45° atau 90°.\n2. **Perubahan Jumlah Elemen:** 1 garis -> 2 garis -> 3 garis.\n3. **Inversi / Shading:** Elemen yang awalnya hitam menjadi putih bergantian.",
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'is_published' => true,
                'is_free' => true,
            ],
            [
                'category_id' => $catTIU->id,
                'title' => 'Aritmatika Sosial: Jarak, Kecepatan, Waktu & Untung Rugi',
                'slug' => 'aritmatika-sosial-jarak-kecepatan-untung-rugi',
                'type' => 'pdf',
                'level' => 'Menengah',
                'duration' => '30 min',
                'summary' => 'Rumus praktis berpapasan (arah berlawanan vs searah/susul-menyusul), persentase laba-rugi, dan diskon bertingkat.',
                'content' => "## Formula Kilat Aritmatika\n\n### 1. Waktu Berpapasan (Berangkat Bersama):\nW_temu = Jarak_Total / (V1 + V2)\n\n### 2. Waktu Menyusul (Berangkat Beda Waktu):\nW_susul = Selisih_Jarak / (V2 - V1)\n\n### 3. Diskon Ganda (50% + 20%):\nBukan 70%! Harga bayar = 50% x 80% = 40% (diskon riil = 60%).",
                'video_url' => null,
                'is_published' => true,
                'is_free' => false,
            ],

            // --- TKP ---
            [
                'category_id' => $catTKP->id,
                'title' => 'Pelayanan Publik Prima: Mengatasi Keluhan & Warga Emosional',
                'slug' => 'pelayanan-publik-prima-mengatasi-keluhan',
                'type' => 'video',
                'level' => 'Dasar',
                'duration' => '22 min',
                'summary' => 'Pola jawaban berbobot 5: tenang, mendengar aktif, minta maaf atas ketidaknyamanan tanpa saling lempar tanggung jawab antar-bidang.',
                'content' => "## Bedah Opsi Skor 5 Pelayanan Publik\n\n- **Skor 5:** Tindakan proaktif, ramah, solutif, memberikan kepastian waktu dan prosedur tanpa melanggar regulasi.\n- **Skor 4:** Melayani dengan baik namun butuh arahan atasan.\n- **Skor 3:** Mengikuti SOP kaku tanpa empati pada situasi darurat masyarakat.\n- **Skor 1-2:** Menolak, berdebat, atau melemparkan kesalahan ke unit lain.",
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'is_published' => true,
                'is_free' => true,
            ],
            [
                'category_id' => $catTKP->id,
                'title' => 'Jejaring Kerja & Kolaborasi Lintas Sektor',
                'slug' => 'jejaring-kerja-kolaborasi-lintas-sektor',
                'type' => 'ringkasan',
                'level' => 'Menengah',
                'duration' => '18 min',
                'summary' => 'Membangun sinergi tim, menerima masukan mitra eksternal, dan mengesampingkan ego sektoral demi output program pemerintah.',
                'content' => "## Indikator Jejaring Kerja BKN\n\nASN modern dituntut memiliki kemampuan *networking* dan *cross-functional teamwork*:\n- Mampu menjadi jembatan komunikasi saat terjadi perbedaan pendapat antar tim.\n- Terbuka terhadap ide mitra kerja swasta, LSM, atau instansi lain.\n- Berbagi informasi kerja relevan secara transparan demi keberhasilan program bersama.",
                'video_url' => null,
                'is_published' => true,
                'is_free' => false,
            ],
            [
                'category_id' => $catTKP->id,
                'title' => 'Sosial Budaya: Adaptasi di Wilayah Penempatan Multikultural',
                'slug' => 'sosial-budaya-adaptasi-multikultural',
                'type' => 'ringkasan',
                'level' => 'Dasar',
                'duration' => '16 min',
                'summary' => 'Menghormati kearifan lokal (*local wisdom*), toleransi beragama, dan tidak memaksakan norma daerah asal pada wilayah tugas baru.',
                'content' => "## Nilai Sosial Budaya ASN\n\nASN adalah perekat bangsa. Ciri jawaban skor 5:\n- Bersedia belajar adat istiadat dan bahasa setempat.\n- Mengutamakan musyawarah dan menghargai tokoh masyarakat lokal.\n- Menjaga netralitas dan tidak memihak salah satu kelompok primordial.",
                'video_url' => null,
                'is_published' => true,
                'is_free' => true,
            ],
            [
                'category_id' => $catTKP->id,
                'title' => 'Transformasi Digital & TIK Birokrasi Modern',
                'slug' => 'transformasi-digital-tik-birokrasi-modern',
                'type' => 'pdf',
                'level' => 'Menengah',
                'duration' => '24 min',
                'summary' => 'Penerapan Sistem Pemerintahan Berbasis Elektronik (SPBE), keamanan data instansi, dan antusiasme belajar aplikasi baru.',
                'content' => "## Sikap Terhadap TIK di Lingkungan Kerja\n\n- Cepat beradaptasi ketika kantor mengadopsi software/aplikasi kerja baru.\n- Membantu rekan kerja senior yang mengalami kendala teknologi (*peer tutoring*).\n- Menjaga kerahasiaan password dan data publik sesuai kaidah UU Pelindungan Data Pribadi (PDP).",
                'video_url' => null,
                'is_published' => true,
                'is_free' => false,
            ],
            [
                'category_id' => $catTKP->id,
                'title' => 'Anti-Radikalisme: Integritas Ideologi & Kewaspadaan ASN',
                'slug' => 'anti-radikalisme-integritas-ideologi-asn',
                'type' => 'video',
                'level' => 'Lanjutan',
                'duration' => '28 min',
                'summary' => 'Mendeteksi indikasi paham intoleran dan radikalisme di lingkungan kerja serta langkah bijak pelaporan secara hierarkis.',
                'content' => "## Karakteristik Butir Soal Anti-Radikalisme\n\nSoal menguji komitmen setia pada NKRI, Pancasila, dan UUD 1945:\n- Menolak ajakan diskusi tertutup yang mendiskreditkan ideologi negara.\n- Mengajak rekan yang mulai terpapar konten ekstremis untuk berdialog secara moderat.\n- Berani melaporkan kegiatan terindikasi terorisme/radikalisme kepada atasan atau kanal pengawasan resmi.",
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'is_published' => true,
                'is_free' => false,
            ],

            // --- SKB ---
            [
                'category_id' => $catSKB->id,
                'title' => 'Manajemen ASN Berdasarkan UU No. 20 Tahun 2023',
                'slug' => 'manajemen-asn-uu-20-2023',
                'type' => 'pdf',
                'level' => 'Lanjutan',
                'duration' => '35 min',
                'summary' => 'Pembaruan hukum kepegawaian: penyetaraan PNS & PPPK, digitalisasi manajemen talenta, serta mobilitas talenta ASN.',
                'content' => "## Poin Kunci UU ASN No. 20 Tahun 2023\n\n1. **Penyetaraan Hak:** PPPK kini memperoleh jaminan pensiun dan hari tua seperti PNS.\n2. **Digitalisasi Manajemen ASN:** Sistem informasi kepegawaian terintegrasi nasional oleh BKN.\n3. **Mobilitas Talenta:** Kemudahan mutasi ASN ke daerah 3T dengan insentif khusus guna pemerataan layanan dasar.\n4. **Penghapusan Tenaga Honorer:** Penataan tenaga non-ASN secara bertahap.",
                'video_url' => null,
                'is_published' => true,
                'is_free' => false,
            ],
            [
                'category_id' => $catSKB->id,
                'title' => 'Tata Kelola Pemerintahan & Reformasi Birokrasi Tematik',
                'slug' => 'tata-kelola-pemerintahan-reformasi-birokrasi',
                'type' => 'ringkasan',
                'level' => 'Menengah',
                'duration' => '26 min',
                'summary' => 'Fokus Reformasi Birokrasi (RB) Tematik KemenPAN-RB: pengentasan kemiskinan, peningkatan investasi, digitalisasi, dan inflasi.',
                'content' => "## 4 Fokus Utama RB Tematik Nasional\n\nBirokrasi tidak lagi dinilai sekadar dari tumpukan berkas SPJ, melainkan dampak nyata pada masyarakat:\n1. Penanggulangan kemiskinan ekstrem.\n2. Peningkatan realisasi investasi daerah.\n3. Digitalisasi administrasi pemerintahan (SPBE).\n4. Percepatan prioritas aktual presiden (penanganan inflasi dan produk dalam negeri).",
                'video_url' => null,
                'is_published' => true,
                'is_free' => true,
            ],
        ];

        foreach ($materials as $m) {
            Material::updateOrCreate(['slug' => $m['slug']], $m);
        }

        $this->command->info('✅ Berhasil memperbarui modul materi menjadi ' . Material::count() . ' materi.');
    }
}
