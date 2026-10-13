<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Material;
use App\Models\Question;
use App\Models\TryoutSession;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database for Profiling ASN.
     */
    public function run(): void
    {
        // 1. Create Users
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrator ProASN',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'phone' => '081299998888',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        $user = User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Andi Pratama, S.STP, M.Tr.IP',
                'password' => bcrypt('password'),
                'role' => 'user',
                'phone' => '081234567890',
                'lynk_order_id' => 'ASN-88291',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'dewi.lestari@example.com'],
            [
                'name' => 'Dewi Lestari, S.Psi, M.M',
                'password' => bcrypt('password'),
                'role' => 'user',
                'phone' => '085211223344',
                'lynk_order_id' => 'ASN-99412',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 2. Clean up & Create 4 Official Categories for Profiling ASN
        Category::whereNotIn('code', ['POTENSI', 'MANAJERIAL', 'DIGITAL', 'KARIR'])->delete();

        $catPotensi = Category::updateOrCreate(
            ['code' => 'POTENSI'],
            [
                'name' => 'Tes Potensi Kognitif & Figural',
                'passing_grade' => 70,
                'question_count' => 25,
                'max_score' => 125,
                'description' => 'Mengukur kapasitas dasar kognitif, logika analitis, deret keteraturan, pemahaman data kuantitatif, serta penalaran spasial & figural.',
                'color' => '#2563EB', // Sapphire Blue
                'order' => 1,
            ]
        );

        $catManajerial = Category::updateOrCreate(
            ['code' => 'MANAJERIAL'],
            [
                'name' => 'Kompetensi Manajerial & Sosio-Kultural',
                'passing_grade' => 75,
                'question_count' => 30,
                'max_score' => 150,
                'description' => 'Mengukur 8 dimensi kompetensi manajerial MenPAN-RB (Integritas, Kerjasama, Komunikasi, Orientasi Hasil, Pelayanan Publik, Pengembangan Diri, Mengelola Perubahan, Pengambilan Keputusan) dan Perekat Bangsa.',
                'color' => '#059669', // Emerald
                'order' => 2,
            ]
        );

        $catDigital = Category::updateOrCreate(
            ['code' => 'DIGITAL'],
            [
                'name' => 'Literasi & Keamanan Digital ASN',
                'passing_grade' => 70,
                'question_count' => 25,
                'max_score' => 125,
                'description' => 'Menguji 4 pilar literasi digital nasional: Digital Skills (Kecakapan), Digital Safety (Keamanan Data & Privasi UU PDP), Digital Ethics, dan Digital Culture dalam kerangka SPBE.',
                'color' => '#7C3AED', // Purple
                'order' => 3,
            ]
        );

        $catKarir = Category::updateOrCreate(
            ['code' => 'KARIR'],
            [
                'name' => 'Preferensi Karir (Tripatha Karir ASN)',
                'passing_grade' => 0,
                'question_count' => 20,
                'max_score' => 100,
                'description' => 'Pemetaan psikometrik minat kerja, gaya pemecahan masalah, dan orientasi peran ASN ke dalam 3 Tripatha Karir: Kepemimpinan/Struktural, Fungsional Keahlian, dan Pelayanan/Operasional.',
                'color' => '#D97706', // Amber Gold
                'order' => 4,
            ]
        );

        // 3. Clear questions and seed comprehensive questions for all 4 tests
        Question::truncate();

        $questionsData = [
            // =========================================================================
            // 1. TES POTENSI (KOGNITIF, LOGIKA SILOGISME, FIGURAL SPASIAL, ANALITIS)
            // =========================================================================
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Silogisme Logika Analitis',
                'question' => 'Semua aparatur sipil negara yang menduduki jabatan struktural wajib mengikuti asesmen kompetensi manajerial. Beberapa pejabat struktural di instansi X belum menyelesaikan sertifikasi tata kelola digital. Kesimpulan yang paling tepat adalah...',
                'options' => [
                    'Beberapa aparatur sipil negara yang wajib mengikuti asesmen kompetensi manajerial belum menyelesaikan sertifikasi tata kelola digital.',
                    'Semua pejabat struktural di instansi X belum wajib mengikuti asesmen kompetensi manajerial.',
                    'Pejabat struktural yang belum bersertifikasi digital tidak boleh mengikuti asesmen manajerial.',
                    'Sertifikasi digital merupakan prasyarat mutlak sebelum mengikuti asesmen manajerial.',
                    'Seluruh aparatur di instansi X telah lulus asesmen kompetensi manajerial.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 0, 0, 0, 0],
                'explanation' => 'Pernyataan premis mayor: Semua pejabat struktural wajib asesmen manajerial. Premis minor: Beberapa pejabat struktural belum sertifikasi digital. Karena "beberapa pejabat struktural" adalah himpunan bagian dari yang wajib asesmen manajerial, maka beberapa ASN yang wajib asesmen manajerial belum menyelesaikan sertifikasi digital.',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Silogisme Bersyarat & Kebijakan',
                'question' => 'Jika sistem layanan SPBE diterapkan terintegrasi penuh, maka durasi pemrosesan dokumen perizinan berkurang minimal 50%. Jika durasi pemrosesan dokumen berkurang minimal 50%, indeks kepuasan masyarakat (IKM) unit layanan meningkat signifikan. Berdasarkan audit triwulan II, indeks kepuasan masyarakat unit layanan Y belum meningkat secara signifikan. Kesimpulan yang sah adalah...',
                'options' => [
                    'Sistem layanan SPBE di unit layanan Y belum diterapkan secara terintegrasi penuh.',
                    'Durasi pemrosesan dokumen perizinan di unit layanan Y sudah berkurang 50%.',
                    'Masyarakat belum mengetahui adanya penerapan sistem layanan SPBE.',
                    'Unit layanan Y memerlukan penambahan aparatur loket fisik.',
                    'Indeks kepuasan masyarakat tidak memiliki hubungan kausal dengan SPBE.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 0, 0, 0, 0],
                'explanation' => 'Menggunakan aturan Modus Tollens: P -> Q dan Q -> R, maka P -> R. Jika ingkaran akibat (~R) terjadi yaitu IKM belum meningkat signifikan, maka ingkaran sebab (~P) pasti benar, yaitu sistem layanan SPBE belum diterapkan terintegrasi penuh.',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Deret Pola Keteraturan Numerik',
                'question' => 'Perhatikan tren capaian digitalisasi administrasi berkas dinas (dalam ribuan berkas) per periode: 12, 16, 24, 40, 72, ... Berapakah target capaian berkas pada periode berikutnya jika mengikuti laju percepatan deret tersebut?',
                'options' => [
                    '104',
                    '120',
                    '136',
                    '144',
                    '152'
                ],
                'correct_answer' => 2,
                'scores' => [0, 0, 5, 0, 0],
                'explanation' => 'Selisih antar suku berturut-turut adalah: 16-12 = +4; 24-16 = +8; 40-24 = +16; 72-40 = +32. Pola selisih berlipat ganda dua kali lipat (4, 8, 16, 32). Selisih berikutnya adalah 32 * 2 = +64. Maka suku berikutnya: 72 + 64 = 136.',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Analisis Perbandingan Kuat Relatif',
                'question' => 'Dalam evaluasi kinerja akuntabilitas lima unit kerja (A, B, C, D, E): Unit A memiliki skor kepatuhan lebih tinggi dari B tetapi lebih rendah dari C. Unit D memiliki skor lebih tinggi dari C. Unit E memiliki skor lebih rendah dari B. Unit manakah yang memiliki skor kepatuhan tertinggi dan terendah?',
                'options' => [
                    'Tertinggi Unit D, Terendah Unit E',
                    'Tertinggi Unit C, Terendah Unit B',
                    'Tertinggi Unit D, Terendah Unit B',
                    'Tertinggi Unit A, Terendah Unit E',
                    'Tertinggi Unit C, Terendah Unit E'
                ],
                'correct_answer' => 0,
                'scores' => [5, 0, 0, 0, 0],
                'explanation' => 'Dari premis: B < A < C. Unit D > C, sehingga B < A < C < D. Unit E < B, sehingga urutan lengkap dari terendah ke tertinggi adalah: E < B < A < C < D. Jadi skor tertinggi adalah D dan terendah adalah E.',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Penalaran Figural Spasial (Pola Rotasi & Matriks)',
                'question' => 'Sebuah bangun geometris diagram kebijakan dalam tes figural mengalami transformasi berantai: diputar 90 derajat searah jarum jam, kemudian dicerminkan secara vertikal terhadap sumbu horizontal, dan diarsir pada sudut puncak. Transformasi ekuivalen tunggal yang menghasilkan orientasi arah hadap yang sama adalah...',
                'options' => [
                    'Pencerminan diagonal 45 derajat',
                    'Rotasi 180 derajat terbalik',
                    'Pencerminan terhadap sumbu vertikal diikuti rotasi 90 derajat berlawanan jarum jam',
                    'Translasi linier horizontal',
                    'Rotasi 270 derajat searah jarum jam murni'
                ],
                'correct_answer' => 0,
                'scores' => [5, 0, 0, 0, 0],
                'explanation' => 'Rotasi 90 derajat searah jarum jam kemudian dicerminkan terhadap sumbu horizontal menghasilkan matriks transformasi yang ekuivalen dengan refleksi terhadap garis diagonal y = x (cermin diagonal 45 derajat).',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Analogi Hubungan Konsep Birokrasi',
                'question' => 'ANALISIS KEBIJAKAN : REGULASI = DIAGNOSTIK MEDIS : ...',
                'options' => [
                    'Pengobatan (Terapi Medis)',
                    'Rumah Sakit',
                    'Stetoskop',
                    'Tenaga Laboratorium',
                    'Pasien Rawat Inap'
                ],
                'correct_answer' => 0,
                'scores' => [5, 0, 0, 0, 0],
                'explanation' => 'Analisis kebijakan adalah proses investigasi profesional yang menghasilkan produk berupa regulasi/kebijakan. Demikian pula diagnostik medis adalah proses investigasi klinis yang menghasilkan rencana tindakan berupa pengobatan/terapi medis.',
                'is_active' => true,
            ],

            // ==================== EMERGING SKILLS (TERINTEGRASI DI TES POTENSI) ====================
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Emerging Skills: Berpikir Analitis & Problem Solving',
                'question' => 'Laporan kinerja triwulanan menunjukkan penurunan efisiensi proses perizinan sebesar 15% pada unit Anda tanpa indikasi penyebab tunggal yang jelas. Berdasarkan pendekatan analytical thinking, langkah analitis pertama yang paling tepat adalah...',
                'options' => [
                    'Melakukan dekonstruksi alur proses, memetakan waktu layanan di setiap titik kontak (touchpoint), dan membandingkan data empiris periode ini dengan periode sebelumnya.',
                    'Menginstruksikan seluruh staf loket pelayanan untuk lembur setiap hari tanpa evaluasi pola data.',
                    'Mengabaikan penurunan tersebut karena menganggap fluktuasi 15% adalah hal yang wajar dalam pelayanan publik.',
                    'Menyalahkan unit sistem informasi IT dan mendesak perombakan server seketika.',
                    'Meminta pimpinan menurunkan target standar pelayanan operasional agar target tetap tercapai.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 1, 1, 1, 1],
                'explanation' => 'Emerging Skills menuntut dekonstruksi persoalan kompleks ke dalam variabel data terukur guna menemukan akar masalah (root-cause) secara objektif dan sistematis sebelum mengambil tindakan korektif.',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Emerging Skills: Scenario Planning & Mitigasi Risiko',
                'question' => 'Instansi Anda merencanakan program bantuan logistik pangan daerah di tengah ketidakpastian cuaca ekstrem dan lonjakan harga pasar. Metode perumusan kebijakan yang paling tepat menggunakan prinsip scenario planning adalah...',
                'options' => [
                    'Menyusun minimal tiga skenario proyeksi (optimis, moderat, dan pesimis) dengan indikator pemicu (trigger events) serta rencana kontinjensi anggaran yang fleksibel.',
                    'Hanya menyiapkan satu rencana tunggal berdasarkan rata-rata anggaran tahun lalu agar proses administrasi lebih cepat.',
                    'Menunda pelaksanaan program hingga cuaca dan harga pasar kembali normal sepenuhnya.',
                    'Menyerahkan seluruh risiko pengadaan kepada pihak rekanan penyedia tanpa klausul keadaan kahar.',
                    'Menyalurkan seluruh anggaran di awal tahun sekaligus tanpa mempertimbangkan dinamika stok pangan.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 1, 1, 0, 1],
                'explanation' => 'Scenario Planning mengantisipasi ketidakpastian lingkungan strategis melalui pemodelan multi-skenario dan rencana kontinjensi adaptif, bukan mengandalkan perencanaan linier tunggal.',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Emerging Skills: Triangulasi Data Multisektor',
                'question' => 'Dalam mengevaluasi efektivitas program pengentasan kemiskinan ekstrem di suatu wilayah, data dari BPS, Dinas Sosial, dan laporan lapangan aparat desa menunjukkan angka penerima manfaat yang berbeda-beda. Sikap analitis Anda adalah...',
                'options' => [
                    'Melakukan triangulasi data dengan mencocokkan parameter indikator kemiskinan antar-instansi, memverifikasi sampel anomali di lapangan, dan merumuskan data tunggal terpadu berbasis NIK.',
                    'Langsung menggunakan data BPS saja dan mengabaikan data dari instansi lainnya.',
                    'Mengambil nilai rata-rata dari ketiga sumber data tanpa memeriksa perbedaan definisi operasional.',
                    'Mengembalikan seluruh data ke instansi masing-masing dan meminta mereka bermusyawarah sendiri.',
                    'Memilih data yang menunjukkan angka kemiskinan terendah agar citra instansi terlihat baik.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 2, 2, 1, 0],
                'explanation' => 'Triangulasi data kebijakan memerlukan integrasi metodologis, verifikasi silang parameter, dan validasi lapangan untuk menghasilkan Single Source of Truth yang akurat.',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Emerging Skills: Adaptabilitas AI di Birokrasi',
                'question' => 'Pimpinan instansi menginstruksikan penggunaan alat kecerdasan buatan generatif (Generative AI) untuk membantu penyusunan draf awal kajian telaahan staf. Sikap profesional aparatur yang mencerminkan AI readiness adalah...',
                'options' => [
                    'Memanfaatkan AI sebagai akselerator riset referensi, namun tetap melakukan verifikasi ketat terhadap validitas data, menjaga kerahasiaan data negara, dan menuliskan sintesis analisis akhir secara mandiri.',
                    'Menolak menggunakan teknologi AI karena khawatir menggantikan peran aparatur sipil negara.',
                    'Menyalin mentah-mentah seluruh keluaran teks AI dan menyerahkannya langsung kepada pimpinan tanpa telaah ulang.',
                    'Mengunggah dokumen rahasia negara ke dalam platform AI publik gratisan agar hasil analisis lebih lengkap.',
                    'Melarang seluruh rekan kerja menggunakan teknologi AI di lingkungan kantor.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 1, 1, 0, 1],
                'explanation' => 'Kesiapan adopsi AI (AI Readiness) aparatur menuntut literasi etis: memanfaatkan AI sebagai asisten produktivitas sembari menjaga kedaulatan data dan akurasi analisis manusia (human-in-the-loop).',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Emerging Skills: Analisis Sentimen & Feedback Publik',
                'question' => 'Kanal aduan SP4N-LAPOR! instansi Anda menerima ribuan keluhan warga per bulan. Unit Anda bertugas memetakan tren masalah utama secara cepat dan akurat. Langkah pemanfaatan data modern yang paling efektif adalah...',
                'options' => [
                    'Mengelompokkan aduan berdasarkan klaster topik, menganalisis frekuensi dan sentimen keluhan, serta menyusun peta panas (heat map) unit pelayanan yang memerlukan intervensi mendesak.',
                    'Membaca keluhan satu per satu secara acak dan membuat ringkasan berdasarkan ingatan subjektif.',
                    'Hanya menanggapi aduan yang menggunakan bahasa sopan dan menghapus aduan bernada keras.',
                    'Menutup sementara kanal aduan online saat volume keluhan meningkat drastis.',
                    'Menyerahkan rekapitulasi keluhan kepada staf magang tanpa panduan kategorisasi baku.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 1, 0, 0, 1],
                'explanation' => 'Data-driven feedback analysis mengubah keluhan publik yang tidak terstruktur menjadi wawasan aksi strategis (actionable insights) melalui pengelompokan tematik dan pemetaan prioritas intervensi.',
                'is_active' => true,
            ],
            // =========================================================================
            // 2. MANAJERIAL & SOSIO-KULTURAL (SJT SKALA 1-5, PERMENPAN-RB 38/2017)
            // =========================================================================
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Integritas & Anti-Gratifikasi',
                'question' => 'Setelah rapat evaluasi anggaran proyek sistem informasi tata kelola keuangan, pihak rekanan swasta memberikan Anda sebuah cinderamata jam tangan mewah bermerek sebagai wujud terima kasih atas kemitraan. Anda mengetahui terdapat kode etik dan aturan benturan kepentingan. Sikap Anda adalah...',
                'options' => [
                    'Menolak pemberian secara santun, menjelaskan kebijakan instansi dan regulasi KPK terkait larangan penerimaan barang yang berpotensi gratifikasi.',
                    'Menerima pemberian tersebut di depan forum agar tidak menyinggung perasaan rekanan, lalu melaporkannya secara tertulis kepada Unit Pengendalian Gratifikasi (UPG) dalam waktu 30 hari.',
                    'Menerima cinderamata tersebut karena diberikan secara tulus atas keberhasilan proyek bersama, kemudian menyimpannya di ruang kerja.',
                    'Menyarankan agar cinderamata tersebut diubah menjadi potongan harga resmi dalam dokumen kontrak pengadaan berikutnya.',
                    'Menerimanya secara diam-diam dan tidak memberitahukan kepada siapa pun demi menjaga keharmonisan kemitraan dinas.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 4, 2, 3, 1],
                'explanation' => 'Berdasarkan PermenPAN-RB No. 38/2017 indikator Integritas Level 4, pejabat publik harus secara proaktif menolak segala bentuk pemberian yang berpotensi menimbulkan benturan kepentingan di awal (Skor 5). Melaporkan ke UPG jika terpaksa menerima berbobot 4.',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Kerjasama & Manajemen Tim',
                'question' => 'Unit kerja Anda diberi mandat menyelesaikan laporan akuntabilitas kinerja instansi pemerintah (SAKIP) dengan tenggat waktu ketat. Dua orang rekan kerja inti mengalami kendala darurat sehingga progres tim terancam tertunda. Tindakan yang Anda ambil adalah...',
                'options' => [
                    'Mengambil inisiatif mengkoordinasikan anggota tim yang tersisa, memetakan ulang beban kerja secara proporsional sesuai prioritas, dan saling mendukung lembur bersama agar target tetap tercapai.',
                    'Menyelesaikan sendiri seluruh beban kerja rekan yang berhalangan hingga larut malam tanpa memberitahu rekan lainnya.',
                    'Meminta pimpinan memperpanjang tenggat waktu penyerahan laporan SAKIP dengan melampirkan surat kendala.',
                    'Menunggu rekan tersebut kembali masuk bekerja dan meminta mereka mempercepat pengerjaan secara mandiri.',
                    'Melaporkan kelambatan progres kepada atasan agar rekan yang berhalangan mendapatkan teguran disiplin.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 3, 2, 2, 1],
                'explanation' => 'Kompetensi Kerjasama Level 4: Mampu membangun komitmen tim, adaptif mengatasi hambatan kolektif, dan mengorganisasi redistribusi tugas secara transparan dan solutif (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Komunikasi & Diplomasi Publik',
                'question' => 'Terjadi aduan warga yang viral di media sosial mengenai lambatnya antrean verifikasi bantuan sosial di kantor Anda, padahal kelambatan terjadi karena pemeliharaan sistem server nasional terpusat. Langkah komunikasi yang paling tepat adalah...',
                'options' => [
                    'Menyusun klarifikasi resmi publik yang empatik dan transparan, menjelaskan kendala teknis dan estimasi waktu pemulihan, serta menyediakan kanal informasi darurat.',
                    'Membalas komentar masyarakat di media sosial dengan nada tegas agar masyarakat memahami bahwa kendala berada di server pusat bukan kantor daerah.',
                    'Menunggu pemeliharaan server selesai sepenuhnya baru kemudian memberikan penjelasan kepada masyarakat.',
                    'Melaporkan pengunggah video ke pihak berwajib atas tuduhan pencemaran nama baik instansi pemerintah.',
                    'Mengabaikan polemik di media sosial karena pelayanan loket fisik tetap berjalan apa adanya.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 2, 3, 1, 1],
                'explanation' => 'Kompetensi Komunikasi Publik: Menyampaikan informasi secara empatik, akurat, tepat waktu, dan berorientasi menenangkan keresahan publik dengan menjaga citra positif korps ASN (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Orientasi pada Hasil & Efisiensi',
                'question' => 'Anggaran operasional unit kerja Anda dipotong sebesar 30% akibat kebijakan efisiensi fiskal nasional, namun pimpinan menetapkan target capaian kinerja utama (IKU) tidak boleh menurun. Sikap profesional Anda adalah...',
                'options' => [
                    'Mengkaji alur proses kerja, mengeliminasi tahapan birokrasi manual yang repetitif, dan mengoptimalkan aplikasi digital in-house untuk memangkas biaya operasional tanpa menurunkan kualitas output.',
                    'Menerima pemotongan anggaran dan menyampaikan kepada pimpinan bahwa capaian target akan berkurang 30% proporsional.',
                    'Mengurangi jam operasional pelayanan masyarakat untuk menghemat penggunaan listrik dan fasilitas kantor.',
                    'Mengajukan nota keberatan formal kepada bagian keuangan agar pemotongan anggaran dialihkan ke unit lain.',
                    'Menjalankan pekerjaan apa adanya dan menyerahkan risiko kegagalan target kepada pimpinan.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 2, 1, 3, 1],
                'explanation' => 'Kompetensi Orientasi pada Hasil Level 4: Menemukan inovasi dan metode kerja cerdas untuk mengatasi keterbatasan sumber daya guna memastikan target strategis organisasi tetap terpenuhi (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Pelayanan Publik Prima & Empati',
                'question' => 'Seorang warga lansia dari desa terpencil datang ke loket Anda menjelang jam tutup pelayanan dengan dokumen persyaratan pensiun yang belum lengkap satu lembar surat pengantar. Jarak rumah warga tersebut 3 jam perjalanan. Respon terbaik Anda adalah...',
                'options' => [
                    'Melayani dengan ramah, memproses berkas yang ada, membantu memeriksa data secara online, dan memberikan dispensasi agar kekurangan dokumen dapat dikirimkan melalui kurir atau pesan daring keesokan harinya.',
                    'Menolak berkas secara tegas sesuai SOP kaku dan meminta warga tersebut kembali esok hari dengan dokumen lengkap.',
                    'Menyuruh warga lansia tersebut menunggu hingga seluruh staf selesai rapat sebelum memutuskan apakah bisa dilayani.',
                    'Meminta biaya administrasi tambahan sebagai jaminan pengurusan berkas yang tidak lengkap.',
                    'Mengarahkan warga lansia tersebut untuk mengurus berkas ke kantor pos terdekat tanpa pendampingan.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 2, 2, 1, 1],
                'explanation' => 'Pelayanan Publik Berorientasi Kepentingan Pengguna (Inklusif): Mengutamakan kemanfaatan bagi kelompok rentan/lansia dengan diskresi yang bertanggung jawab tanpa melanggar prinsip kepatuhan dasar (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Sosio-Kultural & Perekat Bangsa',
                'question' => 'Dalam penempatan tim tugas lapangan ke daerah terpencil, terjadi resistensi dari sebagian warga lokal terhadap salah satu anggota tim Anda karena perbedaan latar belakang budaya dan bahasa. Sebagai ketua rombongan, apa yang Anda lakukan?',
                'options' => [
                    'Mengajak tokoh adat dan perangkat desa berdialog secara santun, memperkenalkan seluruh anggota tim dengan mengedepankan kearifan lokal serta tujuan program untuk kesejahteraan warga bersama.',
                    'Menarik anggota tim tersebut kembali ke kantor pusat demi menghindari potensi konflik horizontal.',
                    'Meminta aparat keamanan mendampingi secara ketat dan membatasi interaksi anggota tim dengan warga.',
                    'Mengabaikan resistensi warga karena penugasan memiliki surat perintah resmi dari kementerian.',
                    'Menghentikan program penugasan lapangan dan menyatakan daerah tersebut tidak kooperatif.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 2, 3, 1, 1],
                'explanation' => 'Kompetensi Perekat Bangsa Level 4: Mampu mendayagunakan perbedaan sosio-kultural menjadi kekuatan kolaboratif melalui pendekatan kultural dan dialog partisipatif dengan pemangku kepentingan adat (Skor 5).',
                'is_active' => true,
            ],

            // =========================================================================
            // 3. LITERASI DIGITAL (DIGITAL SKILLS, SAFETY, ETHICS, CULTURE & SPBE)
            // =========================================================================
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Digital Safety (Phishing & Domain Spoofing)',
                'question' => 'Anda menerima surat elektronik pada inbox kedinasan yang mengatasnamakan Badan Kepegawaian Negara dengan subjek "Verifikasi Data Mandiri ASN Tahun 2026 - Mendesak". Isi email meminta Anda segera mengklik tombol verifikasi pada tautan "bkn-kepegawaian.id/login" dan menginput NIP serta password akun SIASN dalam 1x24 jam. Langkah keamanan yang wajib Anda lakukan adalah...',
                'options' => [
                    'Mengecek domain pengirim dan tautan (domain resmi BKN adalah bkn.go.id), tidak mengklik tautan tersebut, dan meneruskannya ke tim CSIRT/Pranata Komputer instansi sebagai laporan dugaan phishing.',
                    'Segera mengklik tautan dan memasukkan data akun karena khawatir akun kepegawaian Anda dinonaktifkan.',
                    'Membalas email tersebut dengan menanyakan apakah benar dari pihak panitia pusat BKN.',
                    'Meneruskan email ke grup WhatsApp rekan kantor untuk memastikan apakah mereka menerima email yang sama.',
                    'Mengabaikan email tersebut dan menghapusnya tanpa mencatat atau melaporkan kepada unit keamanan siber.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 0, 1, 2, 2],
                'explanation' => 'Domain instansi pemerintah resmi Indonesia berakhiran .go.id. Domain bkn-kepegawaian.id adalah domain spoofing/phishing. Menolak klik tautan dan melapor ke CSIRT (Computer Security Incident Response Team) instansi merupakan standar Digital Safety ASN (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Keamanan Data Pribadi (UU PDP No. 27/2022)',
                'question' => 'Seorang staf dari lembaga mitra non-pemerintah menghubungi Anda meminta salinan data penerima bantuan sosial daerah dalam format file excel (memuat NIK, nomor KK, riwayat penghasilan, dan alamat lengkap) untuk keperluan survei cepat program CSR. Berdasarkan UU Perlindungan Data Pribadi, sikap Anda adalah...',
                'options' => [
                    'Menolak memberikan data mentah, menjelaskan regulasi UU PDP mengenai data pribadi spesifik dan sensitif, serta mengarahkan agar permohonan diajukan secara resmi melalui mekanisme perjanjian kerja sama (MoU/PKS) dengan pertukaran data yang teranonimkan/terpseudonimkan.',
                    'Memberikan file tersebut karena lembaga tersebut merupakan mitra terpercaya yang sering membantu instansi Anda.',
                    'Memberikan file data namun meminta staf tersebut berjanji tidak menyebarkannya ke pihak lain.',
                    'Menghapus nama penerima saja namun tetap membiarkan kolom NIK dan nomor KK lengkap di dalam file excel.',
                    'Menjual data tersebut untuk pemasukan kas operasional unit kerja.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 0, 1, 2, 0],
                'explanation' => 'Berdasarkan UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP), pengelola data publik bertanggung jawab melindungi data pribadi spesifik (keuangan, keluarga) dan umum (NIK). Penyaluran data wajib memiliki dasar hukum resmi dan proses masking/anonimisasi data (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Digital Skill (Kolaborasi Cloud & Versioning SPBE)',
                'question' => 'Unit Anda sedang menyusun naskah rancangan peraturan daerah yang melibatkan 6 orang analis. Dokumen sering mengalami tumpang tindih revisi (lost updates) karena para staf saling bertukar file lampiran via pesan chat dengan nama file berbeda-beda (Revisi1, Revisi_Final_Fix). Solusi Digital Skills berbasis SPBE yang paling tepat adalah...',
                'options' => [
                    'Mengimplementasikan penyimpanan berkas komputasi awan (cloud kedinasan) bersama dengan fitur co-authoring real-time, version history otomatis, dan manajemen hak akses terpusat.',
                    'Menunjuk satu staf khusus untuk mengetik ulang secara manual seluruh revisi dari 5 anggota tim lainnya.',
                    'Mencetak naskah di atas kertas dan melakukan koreksi coret manual menggunakan pena merah.',
                    'Melarang anggota tim merevisi dokumen hingga staf sebelumnya selesai memeriksa berkas.',
                    'Meminta pihak vendor eksternal membuat aplikasi khusus untuk penulisan draf peraturan tersebut.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 2, 1, 2, 2],
                'explanation' => 'Kompetensi Digital Skills mencakup pemanfaatan alat kolaborasi modern (cloud document management) yang mendukung co-authoring terintegrasi dan version tracking, sejalan dengan prinsip efisiensi SPBE (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Digital Ethics & Netiquette ASN',
                'question' => 'Seorang aparatur sipil negara merasa tidak puas terhadap kebijakan mutasi jabatan internal instansinya, lalu mengunggah kritik bernada sindiran emosional di akun media sosial pribadinya disertai tangkapan layar surat keputusan (SK) pimpinan yang belum dipublikasikan. Berdasarkan etika digital ASN:',
                'options' => [
                    'Tindakan tersebut melanggar netiket dan loyalitas ASN karena dokumen internal rahasia tidak boleh disebarluaskan di ranah publik daring, dan penyampaian ketidakpuasan wajib melalui saluran resmi internal (Bapekat/whistleblowing system).',
                    'Tindakan tersebut dibenarkan karena setiap warga negara memiliki kebebasan berekspresi di akun media sosial pribadi.',
                    'Tindakan tersebut wajar asalkan wajah pimpinan pada tangkapan layar SK diburamkan (blur).',
                    'Tindakan tersebut diperbolehkan jika postingan hanya disetel untuk dilihat oleh lingkaran teman dekat.',
                    'Tindakan tersebut sah selama tidak menggunakan jaringan internet kantor saat mengunggah.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 0, 1, 1, 0],
                'explanation' => 'Digital Ethics ASN: ASN terikat sumpah jabatan dan PP Disiplin PNS untuk menjaga rahasia dinas serta kehormatan korps. Ranah digital adalah ruang publik di mana integritas dan kepatuhan kode etik tetap mengikat penuh (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Digital Culture & Aksesibilitas SPBE',
                'question' => 'Dalam proses perancangan portal pelayanan publik digital satu pintu di instansi Anda, prinsip Digital Culture dan arsitektur SPBE nasional yang paling esensial untuk diprioritaskan sejak tahap awal adalah...',
                'options' => [
                    'Prinsip User-Centered Design yang inklusif, interoperabilitas Satu Data dengan instansi lain, serta pemenuhan standar aksesibilitas bagi penyandang disabilitas dan lansia.',
                    'Tampilan grafis yang sangat ramai dengan animasi berat tanpa memikirkan kecepatan akses jaringan internet di pelosok.',
                    'Mengharuskan pengguna mengunduh aplikasi terpisah untuk setiap sub-layanan perizinan yang ada.',
                    'Mengunci data agar hanya dapat diakses oleh satu unit dan tidak dapat dibagi-pakaikan antar instansi pemerintah.',
                    'Menjadikan aplikasi hanya dapat dibuka pada perangkat komputer berspesifikasi tinggi.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 1, 1, 0, 0],
                'explanation' => 'Digital Culture dalam birokrasi mengutamakan kemudahan warga (user-centric), inklusivitas pelayanan, dan interoperabilitas data nasional sesuai Perpres No. 95 Tahun 2018 tentang SPBE (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Technostress & Produktivitas Digital',
                'question' => 'Aktivitas grup komunikasi dinas yang beroperasi terus-menerus hingga larut malam menyebabkan tingkat kejenuhan teknologi (technostress) tinggi dan penurunan konsentrasi kerja ASN di pagi hari. Solusi kepemimpinan digital yang tepat adalah...',
                'options' => [
                    'Menetapkan tata tertib komunikasi kedinasan yang membatasi pengiriman instruksi non-darurat di luar jam kerja, serta memanfaatkan task manager terstruktur untuk melacak progres tugas harian.',
                    'Mewajibkan seluruh staf menonaktifkan ponsel pintar mereka sepanjang hari kerja.',
                    'Meminta setiap staf membalas pesan instan dinas dalam waktu maksimal 3 menit bahkan pada saat akhir pekan.',
                    'Menghapus seluruh aplikasi percakapan daring dan kembali menggunakan surat fisik kurir kertas.',
                    'Mengabaikan stres yang dialami staf karena hal tersebut merupakan konsekuensi tak terelakkan dari era digital.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 1, 1, 1, 1],
                'explanation' => 'Digital Wellbeing: Pengelolaan teknologi yang sehat mensyaratkan batasan komunikasi yang jelas (Right to Disconnect untuk hal non-emergency) demi menjaga produktivitas prima dan kesehatan mental pegawai (Skor 5).',
                'is_active' => true,
            ],

            // =========================================================================
            // 4. PREFERENSI KARIR (TRIPATHA KARIR ASN: STRUKTURAL vs FUNGSIONAL vs OPERASIONAL)
            // =========================================================================
            [
                'category_id' => $catKarir->id,
                'sub_category' => 'Peran Transformasi & Minat Utama',
                'question' => 'Ketika instansi Anda meluncurkan program reformasi birokrasi dan modernisasi pelayanan publik terpadu, peran manakah yang paling membangkitkan motivasi kerja dan antusiasme Anda?',
                'options' => [
                    'Menjadi ketua koordinator tim strategis yang mengarahkan pembagian tugas, memimpin rapat koordinasi lintas lembaga, dan meyakinkan pimpinan atas sasaran program (Jalur Kepemimpinan & Manajerial).',
                    'Menjadi analis keahlian yang meneliti data empiris, merancang inovasi model layanan, dan menyusun dokumen telaahan kebijakan serta regulasi teknis (Jalur Fungsional Keahlian).',
                    'Menjadi penanggung jawab operasional yang memastikan petunjuk teknis dijalankan dengan tertib, mendata arsip verifikasi, dan melayani kebutuhan langsung warga di garda depan (Jalur Pelayanan & Operasional Teknis).'
                ],
                'correct_answer' => 1,
                'scores' => ['STRUKTURAL', 'FUNGSIONAL', 'OPERASIONAL'],
                'explanation' => 'Tripatha Karir: Opsi A mencerminkan orientasi Jalur Struktural (Kepemimpinan/JPT); Opsi B mencerminkan Jalur Fungsional Keahlian (Spesialis Analis/Riset); Opsi C mencerminkan Jalur Pelayanan & Keterampilan Operasional.',
                'is_active' => true,
            ],
            [
                'category_id' => $catKarir->id,
                'sub_category' => 'Pendekatan Pemecahan Masalah',
                'question' => 'Dalam menghadapi permasalahan tumpang tindih regulasi perizinan yang menghambat investasi daerah, pendekatan pemecahan masalah yang paling mencerminkan cara kerja ideal Anda adalah:',
                'options' => [
                    'Mengumpulkan para pemangku kepentingan dalam forum lobi dan negosiasi untuk mencapai konsensus arah kebijakan bersama (Jalur Kepemimpinan & Manajerial).',
                    'Mengkaji naskah hukum dan basis data secara mendalam, melakukan komparasi regulasi internasional, serta merumuskan rekomendasi perbaikan berbasis sains data (Jalur Fungsional Keahlian).',
                    'Menginventarisir berkas kendala nyata di loket pelayanan, menyusun checklist kendala lapangan, dan merumuskan SOP perbaikan alur administrasi praktis (Jalur Pelayanan & Operasional Teknis).'
                ],
                'correct_answer' => 1,
                'scores' => ['STRUKTURAL', 'FUNGSIONAL', 'OPERASIONAL'],
                'explanation' => 'Orientasi pemecahan masalah: Opsi A berbasis diplomasi kepemimpinan; Opsi B berbasis riset analisis independen; Opsi C berbasis kejelasan operasional prosedural.',
                'is_active' => true,
            ],
            [
                'category_id' => $catKarir->id,
                'sub_category' => 'Sumber Kepuasan Prestasi Kerja',
                'question' => 'Anda merasakan kepuasan prestasi kerja tertinggi (sense of fulfillment) ketika berhasil mencapai hal berikut di lingkungan kerja:',
                'options' => [
                    'Berhasil memotivasi dan membangun tim yang tangguh, memimpin proyek hingga tuntas, dan dipercaya pimpinan memegang kendali unit organisasi yang lebih besar (Jalur Kepemimpinan & Manajerial).',
                    'Menghasilkan karya analisis komprehensif, publikasi ilmiah/kebijakan inovatif yang diakui sebagai rujukan keahlian standar nasional di bidang spesialisasi saya (Jalur Fungsional Keahlian).',
                    'Menuntaskan seluruh target administrasi harian dengan akurasi 100% tanpa celah audit, serta melihat masyarakat terlayani secara rapi, cepat, dan tertib (Jalur Pelayanan & Operasional Teknis).'
                ],
                'correct_answer' => 1,
                'scores' => ['STRUKTURAL', 'FUNGSIONAL', 'OPERASIONAL'],
                'explanation' => 'Motivator kinerja Tripatha: Jalur Struktural didorong oleh kepemimpinan dan pengaruh; Jalur Fungsional didorong oleh penguasaan ilmu dan inovasi; Jalur Operasional didorong oleh akurasi ketelitian dan pelayanan prima.',
                'is_active' => true,
            ],
            [
                'category_id' => $catKarir->id,
                'sub_category' => 'Aktivitas Harian yang Menyenangkan',
                'question' => 'Dari rangkaian rutinitas kedinasan berikut, jenis aktivitas yang paling membuat Anda berenergi dan betah bekerja berjam-jam adalah:',
                'options' => [
                    'Menyusun strategi organisasi, memimpin rapat dengar pendapat, bernegosiasi dengan mitra, dan memberikan arahan kerja kepada bawahan (Jalur Kepemimpinan & Manajerial).',
                    'Mengolah data kompleks menggunakan perangkat analitik, membaca jurnal atau regulasi mutakhir, dan menulis laporan rekomendasi kebijakan strategis (Jalur Fungsional Keahlian).',
                    'Mengoperasikan sistem aplikasi layanan, menata dokumentasi arsip secara sistematis, serta melayani konsultasi langsung pengguna layanan (Jalur Pelayanan & Operasional Teknis).'
                ],
                'correct_answer' => 1,
                'scores' => ['STRUKTURAL', 'FUNGSIONAL', 'OPERASIONAL'],
                'explanation' => 'Gaya kerja harian: Menunjukkan kesesuaian ritme kerja apakah pada koordinasi sosial, konsentrasi analisis kognitif, atau keteraturan administrasi.',
                'is_active' => true,
            ],
            [
                'category_id' => $catKarir->id,
                'sub_category' => 'Respon Terhadap Situasi Krisis',
                'question' => 'Saat terjadi krisis mendadak di instansi (misalnya keluhan massal akibat sistem layanan publik terhenti), reaksi spontan Anda yang paling dominan adalah:',
                'options' => [
                    'Mengambil inisiatif komando, membagi tim tanggap darurat, dan mengkomunikasikan situasi secara tenang kepada pihak eksternal serta pimpinan puncak (Jalur Kepemimpinan & Manajerial).',
                    'Melakukan audit investigatif atas penyebab kegagalan sistem, mencari akar masalah teknis, dan merumuskan arsitektur mitigasi agar tidak terulang kembali (Jalur Fungsional Keahlian).',
                    'Menenangkan antrean masyarakat di lapangan, mendistribusikan prosedur alternatif darurat secara manual, dan melayani satu per satu secara sabar (Jalur Pelayanan & Operasional Teknis).'
                ],
                'correct_answer' => 1,
                'scores' => ['STRUKTURAL', 'FUNGSIONAL', 'OPERASIONAL'],
                'explanation' => 'Manajemen krisis: Menilai peranan alami aparatur apakah sebagai dirigen komando, pemecah masalah analitis, atau penenang dan eksekutor lapangan.',
                'is_active' => true,
            ],
            [
                'category_id' => $catKarir->id,
                'sub_category' => 'Aspirasi Jenjang Karir ASN 10 Tahun Mendatang',
                'question' => 'Jika memproyeksikan pencapaian karir ASN Anda dalam rentang 5 hingga 10 tahun ke depan, posisi yang paling Anda impikan adalah:',
                'options' => [
                    'Menduduki Jabatan Pimpinan Tinggi (JPT Madya/Pratama seperti Sekretaris Daerah, Dirjen, atau Kepala Dinas) yang berwenang menetapkan arah kebijakan organisasi (Jalur Kepemimpinan & Manajerial).',
                    'Menjadi Pejabat Fungsional Ahli Madya/Utama (Analis Kebijakan, Perencana, Peneliti, atau Widyaiswara) yang diakui sebagai pakar terkemuka di bidangnya (Jalur Fungsional Keahlian).',
                    'Menjadi Pejabat Pengawas Teknis / Koordinator Layanan Operasional Lapangan yang memastikan ketepatan dan efisiensi roda operasional kantor berjalan sempurna (Jalur Pelayanan & Operasional Teknis).'
                ],
                'correct_answer' => 1,
                'scores' => ['STRUKTURAL', 'FUNGSIONAL', 'OPERASIONAL'],
                'explanation' => 'Proyeksi Karir: Menyelaraskan aspirasi jabatan ASN jangka panjang dengan pola pembinaan karir Sistem Merit BKN.',
                'is_active' => true,
            ],
        ];

        foreach ($questionsData as $q) {
            Question::create($q);
        }

        // 4. Seed Materials for Profiling ASN
        $this->call(RealMaterialsSeeder::class);
    }
}
