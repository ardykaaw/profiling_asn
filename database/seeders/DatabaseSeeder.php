<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Material;
use App\Models\Question;
use App\Models\TryoutSession;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Users (Admin and Member)
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrator SiapCPNS',
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
                'name' => 'Budi Santoso',
                'password' => bcrypt('password'),
                'role' => 'user',
                'phone' => '081234567890',
                'lynk_order_id' => 'LNK-88291',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'dewi.rahayu@example.com'],
            [
                'name' => 'Dewi Rahayu, S.Stat',
                'password' => bcrypt('password'),
                'role' => 'user',
                'phone' => '085211223344',
                'lynk_order_id' => 'LNK-99412',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'siti.nurhaliza@example.com'],
            [
                'name' => 'Siti Nurhaliza',
                'password' => bcrypt('password'),
                'role' => 'user',
                'phone' => '087812345678',
                'lynk_order_id' => 'LNK-10294',
                'is_active' => false,
                'email_verified_at' => now(),
            ]
        );

        // 2. Create Categories according to standard BKN SKD & SKB
        $catTWK = Category::updateOrCreate(
            ['code' => 'TWK'],
            [
                'name' => 'Tes Wawasan Kebangsaan (TWK)',
                'passing_grade' => 65,
                'question_count' => 30,
                'max_score' => 150,
                'description' => 'Menguji penguasaan pengetahuan dan kemampuan mengimplementasikan nilai-nilai 4 Pilar Kebangsaan Indonesia: Pancasila, UUD 1945, NKRI, dan Bhinneka Tunggal Ika.',
                'color' => '#F0A500',
                'order' => 1,
            ]
        );

        $catTIU = Category::updateOrCreate(
            ['code' => 'TIU'],
            [
                'name' => 'Tes Intelejensi Umum (TIU)',
                'passing_grade' => 80,
                'question_count' => 35,
                'max_score' => 175,
                'description' => 'Menguji kemampuan verbal (analogi, silogisme), kemampuan numerik (berhitung, deret angka, perbandingan), serta kemampuan figural (analogi gambar, serial).',
                'color' => '#06B6D4',
                'order' => 2,
            ]
        );

        $catTKP = Category::updateOrCreate(
            ['code' => 'TKP'],
            [
                'name' => 'Tes Karakteristik Pribadi (TKP)',
                'passing_grade' => 166,
                'question_count' => 45,
                'max_score' => 225,
                'description' => 'Menguji perilaku kerja, integritas, profesionalisme, pelayanan publik, jejaring kerja, sosial budaya, teknologi informasi, serta anti-radikalisme ASN.',
                'color' => '#8B5CF6',
                'order' => 3,
            ]
        );

        $catSKB = Category::updateOrCreate(
            ['code' => 'SKB'],
            [
                'name' => 'Seleksi Kompetensi Bidang (SKB)',
                'passing_grade' => 0,
                'question_count' => 100,
                'max_score' => 500,
                'description' => 'Ujian kompetensi teknis sesuai jabatan formasi kementerian, lembaga, maupun pemerintah daerah yang dilamar.',
                'color' => '#10B981',
                'order' => 4,
            ]
        );

        // 3. Seed Standard Authentic Questions
        $questionsData = [
            // TWK Questions
            [
                'category_id' => $catTWK->id,
                'sub_category' => 'Pilar Negara (Pancasila)',
                'question' => 'Sidang BPUPKI pertama yang secara khusus membahas usulan dasar negara Republik Indonesia berlangsung pada tanggal...',
                'options' => [
                    '29 Mei - 1 Juni 1945',
                    '10 - 16 Juli 1945',
                    '17 Agustus 1945',
                    '18 Agustus 1945',
                    '22 Juni 1945',
                ],
                'correct_answer' => 0,
                'scores' => null,
                'explanation' => 'Sidang pertama BPUPKI berlangsung dari tanggal 29 Mei sampai 1 Juni 1945 untuk merumuskan dasar negara Indonesia merdeka, di mana Ir. Soekarno menyampaikan pidato Pancasila pada 1 Juni 1945.',
            ],
            [
                'category_id' => $catTWK->id,
                'sub_category' => 'UUD 1945 & Konstitusi',
                'question' => 'Menurut Pasal 23A UUD 1945 hasil amandemen, segala bentuk pajak dan pungutan lain yang bersifat memaksa untuk keperluan negara diatur dengan...',
                'options' => [
                    'Peraturan Pemerintah',
                    'Undang-Undang',
                    'Keputusan Presiden',
                    'Peraturan Daerah',
                    'Peraturan Menteri Keuangan',
                ],
                'correct_answer' => 1,
                'scores' => null,
                'explanation' => 'Pasal 23A UUD 1945 secara tegas menyatakan bahwa: "Pajak dan pungutan lain yang bersifat memaksa untuk keperluan negara diatur dengan undang-undang."',
            ],
            [
                'category_id' => $catTWK->id,
                'sub_category' => 'Bhinneka Tunggal Ika',
                'question' => 'Semboyan Bhinneka Tunggal Ika pertama kali ditemukan dalam kitab Kakawin Sutasoma karangan Mpu Tantular pada masa kejayaan kerajaan...',
                'options' => [
                    'Singasari',
                    'Sriwijaya',
                    'Majapahit',
                    'Mataram Kuno',
                    'Tarumanegara',
                ],
                'correct_answer' => 2,
                'scores' => null,
                'explanation' => 'Frasa "Bhinneka Tunggal Ika Tan Hana Dharma Mangrwa" termaktub dalam pupuh 139 bait 5 Kakawin Sutasoma karya Mpu Tantular yang ditulis pada masa pemerintahan Raja Hayam Wuruk di Kerajaan Majapahit abad ke-14.',
            ],
            [
                'category_id' => $catTWK->id,
                'sub_category' => 'Nasionalisme & Bela Negara',
                'question' => 'Berdasarkan UU No. 23 Tahun 2019 tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara, keikutsertaan warga negara dalam usaha bela negara dapat diselenggarakan melalui...',
                'options' => [
                    'Hanya melalui wajib militer bagi seluruh pemuda',
                    'Pendidikan kewarganegaraan, pelatihan dasar kemiliteran secara wajib, pengabdian sebagai prajurit TNI, dan pengabdian sesuai dengan profesi',
                    'Pembayaran pajak khusus pertahanan negara',
                    'Wajib mendaftar partai politik pendukung pemerintah',
                    'Partisipasi dalam demonstrasi kenegaraan',
                ],
                'correct_answer' => 1,
                'scores' => null,
                'explanation' => 'Pasal 6 ayat (2) UU No. 23 Tahun 2019 mengatur bahwa keikutsertaan warga negara dalam upaya bela negara diselenggarakan melalui: pendidikan kewarganegaraan, pelatihan dasar kemiliteran wajib, pengabdian sebagai prajurit TNI secara sukarela/wajib, serta pengabdian sesuai profesi.',
            ],

            // TIU Questions
            [
                'category_id' => $catTIU->id,
                'sub_category' => 'Numerik (Perbandingan Berbalik Nilai)',
                'question' => 'Sebuah proyek renovasi gedung direncanakan selesai dalam 30 hari oleh 12 orang pekerja. Jika proyek tersebut harus dipercepat agar selesai dalam 20 hari, berapa tambahan pekerja yang harus didatangkan?',
                'options' => [
                    '4 orang',
                    '6 orang',
                    '8 orang',
                    '10 orang',
                    '18 orang',
                ],
                'correct_answer' => 1,
                'scores' => null,
                'explanation' => 'Total beban kerja = 30 hari × 12 pekerja = 360 orang-hari. Target baru = 20 hari. Pekerja yang dibutuhkan = 360 ÷ 20 = 18 orang. Tambahan pekerja yang harus didatangkan = 18 - 12 = 6 orang.',
            ],
            [
                'category_id' => $catTIU->id,
                'sub_category' => 'Deret Angka & Logika Pola',
                'question' => 'Tentukan dua angka lanjutan dari barisan deret berikut: 4, 7, 12, 19, 28, ..., ...',
                'options' => [
                    '37, 48',
                    '39, 52',
                    '38, 50',
                    '40, 54',
                    '36, 49',
                ],
                'correct_answer' => 1,
                'scores' => null,
                'explanation' => 'Pola selisih antar suku adalah bilangan ganjil bertingkat: 7-4 = +3; 12-7 = +5; 19-12 = +7; 28-19 = +9; selanjutnya +11 -> 28 + 11 = 39; selanjutnya +13 -> 39 + 13 = 52. Maka jawabannya 39 dan 52.',
            ],
            [
                'category_id' => $catTIU->id,
                'sub_category' => 'Logika Silogisme',
                'question' => 'Semua pegawai negeri sipil (PNS) menerima gaji ke-13. Sebagian warga komplek Melati adalah PNS. Kesimpulan yang paling tepat dan sah adalah...',
                'options' => [
                    'Semua warga komplek Melati menerima gaji ke-13',
                    'Sebagian warga komplek Melati menerima gaji ke-13',
                    'Tidak ada warga komplek Melati yang menerima gaji ke-13',
                    'Semua yang menerima gaji ke-13 bertempat tinggal di komplek Melati',
                    'Warga komplek Melati yang bukan PNS tidak menerima penghasilan apa pun',
                ],
                'correct_answer' => 1,
                'scores' => null,
                'explanation' => 'Premis mayor: Semua A adalah B (Semua PNS menerima gaji ke-13). Premis minor: Sebagian C adalah A (Sebagian warga komplek Melati adalah PNS). Maka kesimpulan sah: Sebagian C adalah B (Sebagian warga komplek Melati menerima gaji ke-13).',
            ],
            [
                'category_id' => $catTIU->id,
                'sub_category' => 'Verbal (Analogi Hubungan Kata)',
                'question' => 'KUMAN : PENYAKIT = API : ...',
                'options' => [
                    'Abu',
                    'Panas',
                    'Kebakaran',
                    'Kayu',
                    'Asap',
                ],
                'correct_answer' => 2,
                'scores' => null,
                'explanation' => 'Hubungan sebab-akibat: KUMAN yang tidak terkendali menyebabkan timbulnya PENYAKIT. Begitu pula API yang tidak terkendali menyebabkan peristiwa KEBAKARAN.',
            ],

            // TKP Questions (Tiered Scoring 1 to 5 per BKN standard)
            [
                'category_id' => $catTKP->id,
                'sub_category' => 'Integritas & Anti-Korupsi',
                'question' => 'Anda adalah staf bagian pengadaan barang dan jasa. Seorang rekanan kontraktor yang sedang mengikuti tender datang ke rumah Anda di luar jam kerja dengan membawa parsel barang elektronik mewah sebagai bentuk perkenalan. Tindakan Anda adalah...',
                'options' => [
                    'Menolak dengan sopan dan tegas pemberian tersebut serta menegaskan bahwa seluruh proses tender transparan sesuai prosedur resmi',
                    'Menerima pemberian tersebut agar menjaga hubungan silaturahmi tetapi tetap objektif dalam menilai tender',
                    'Menolak pemberian dan melaporkan kontraktor tersebut kepada atasan atau Unit Pengendalian Gratifikasi (UPG) dengan bukti dokumentasi',
                    'Meminta rekanan membawa parsel tersebut ke kantor saja agar diketahui staf lain',
                    'Menyarankan agar parsel diserahkan kepada pimpinan instansi Anda',
                ],
                'correct_answer' => 2, // Highest score option index
                'scores' => [4, 1, 5, 2, 1], // Scores for options 0, 1, 2, 3, 4
                'explanation' => 'Skor 5 untuk opsi C karena menunjukkan integritas tertinggi: menolak sekaligus proaktif melaporkan indikasi gratifikasi ke unit pengawasan resmi (UPG) demi menjaga akuntabilitas birokrasi.',
            ],
            [
                'category_id' => $catTKP->id,
                'sub_category' => 'Pelayanan Publik & Empati',
                'question' => 'Saat jam istirahat kantor baru saja dimulai, seorang lansia dari desa terpencil datang terengah-engah ingin mengurus dokumen kependudukan yang sangat mendesak untuk pengobatan BPJS cucunya. Sikap Anda adalah...',
                'options' => [
                    'Memintanya menunggu di ruang tunggu sampai jam istirahat kantor selesai tepat pukul 13.00',
                    'Mempersilakan duduk, memberinya air minum, lalu melayani berkasnya terlebih dahulu sebelum saya beristirahat',
                    'Menyuruh staf piket lain melayani karena saya memiliki jadwal makan siang di luar kantor',
                    'Memberitahu bahwa sistem komputer sedang istirahat dan mati otomatis',
                    'Melayani setengah hati sambil mengeluh jam istirahat terganggu',
                ],
                'correct_answer' => 1,
                'scores' => [2, 5, 3, 1, 1],
                'explanation' => 'Skor 5 untuk opsi B karena mengutamakan pelayanan prima berorientasi empati kemanusiaan dalam situasi darurat masyarakat tanpa mengabaikan keramahan ASN.',
            ],
            [
                'category_id' => $catTKP->id,
                'sub_category' => 'Teknologi Informasi & Adaptasi',
                'question' => 'Instansi Anda beralih dari pengarsipan manual berbasis kertas ke aplikasi cloud terintegrasi. Sebagian rekan kerja senior mengeluh dan enggan menggunakannya karena dianggap rumit. Sikap Anda adalah...',
                'options' => [
                    'Fokus mempelajari aplikasi tersebut untuk pekerjaan saya sendiri tanpa mencampuri urusan rekan lain',
                    'Ikut mengeluh kepada pimpinan agar sistem manual tetap dipertahankan',
                    'Mempelajari sistem baru hingga mahir, lalu secara proaktif membuat panduan ringkas dan membimbing rekan-rekan senior dengan sabar',
                    'Menunggu pelatihan resmi dari vendor penyedia software',
                    'Mengerjakan semua pekerjaan rekan senior agar mereka tidak terbebani sistem baru',
                ],
                'correct_answer' => 2,
                'scores' => [3, 1, 5, 2, 2],
                'explanation' => 'Skor 5 untuk opsi C karena menunjukkan adaptabilitas digital yang tinggi sekaligus jiwa kepemimpinan suportif dan kolaborasi tim.',
            ],
        ];

        foreach ($questionsData as $qData) {
            Question::create($qData);
        }

        // 4. Seed Learning Modules (Materials)
        $materialsData = [
            [
                'category_id' => $catTWK->id,
                'title' => 'Pilar Negara: Nilai-Nilai Pancasila dalam Kehidupan Berbangsa',
                'slug' => 'pilar-negara-nilai-pancasila',
                'type' => 'video',
                'level' => 'Dasar',
                'duration' => '24 min',
                'summary' => 'Memahami butir-butir pengamalan sila ke-1 hingga ke-5 dan implementasinya dalam kasus soal TWK penalaran BKN terkini.',
                'content' => "## Pengamalan Sila Pancasila dalam Kehidupan Bernegara\n\nSoal TWK BKN saat ini tidak lagi sekadar hafalan butir-butir sila, melainkan berupa narasi studi kasus implementasi.\n\n### 1. Sila Pertama: Ketuhanan Yang Maha Esa\n- Menghormati kebebasan beribadah pemeluk agama lain.\n- Tidak memaksakan agama/kepercayaan kepada orang lain.\n- Kerukunan hidup antarumat beragama.\n\n### 2. Sila Kedua: Kemanusiaan yang Adil dan Beradab\n- Mengakui persamaan derajat, hak, dan kewajiban asasi setiap manusia.\n- Menjunjung tinggi nilai-nilai kemanusiaan dan gemar melakukan kegiatan kemanusiaan.\n- Berani membela kebenaran dan keadilan.\n\n### 3. Sila Ketiga: Persatuan Indonesia\n- Menempatkan persatuan, kesatuan, serta kepentingan dan keselamatan bangsa di atas kepentingan pribadi/golongan.\n- Rela berkorban untuk kepentingan negara.\n- Bangga berkebangsaan dan bertanah air Indonesia.",
                'file_path' => null,
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'is_published' => true,
                'is_free' => true,
            ],
            [
                'category_id' => $catTWK->id,
                'title' => 'UUD 1945: Pasal Kunci Lembaga Negara & Amandemen I - IV',
                'slug' => 'uud-1945-pasal-kunci-amandemen',
                'type' => 'pdf',
                'level' => 'Menengah',
                'duration' => '18 min',
                'summary' => 'Rangkuman pasal-pasal kewenangan Presiden, DPR, DPD, MPR, MK, MA, dan KY serta hak asasi manusia yang sering keluar di BKN.',
                'content' => "## Amandemen UUD 1945 (1999 - 2002)\n\n### Kronologi 4 Kali Amandemen:\n1. **Amandemen I (1999):** Pembatasan masa jabatan presiden (maksimal 2 periode).\n2. **Amandemen II (2000):** Otonomi daerah, HAM (Pasal 28A-28J), DPR, dan lagu kebangsaan.\n3. **Amandemen III (2001):** Bentuk kedaulatan rakyat, pemilu langsung, DPD, MK, BPK, KY.\n4. **Amandemen IV (2002):** Penghapusan DPA, aturan BI, pendidikan 20% APBN, aturan perubahan UUD.",
                'file_path' => null,
                'video_url' => null,
                'is_published' => true,
                'is_free' => false,
            ],
            [
                'category_id' => $catTIU->id,
                'title' => 'Kemampuan Numerik: Aritmatika & Aljabar Cepat Tanpa Kalkulator',
                'slug' => 'numerik-aritmatika-aljabar-cepat',
                'type' => 'video',
                'level' => 'Dasar',
                'duration' => '28 min',
                'summary' => 'Trik berhitung pecahan, desimal, persentase, dan perbandingan senilai/berbalik nilai dalam waktu di bawah 45 detik per soal.',
                'content' => "## Trik Cepat Aritmatika TIU\n\n### 1. Perbandingan Berbalik Nilai (Pekerja & Waktu)\nRumus utama:\nP1 x W1 = P2 x W2\n\nJika pekerja bertambah, maka waktu yang dibutuhkan akan berkurang secara proporsional.\n\n### 2. Trik Persentase Khusus:\n- 12.5% = 1/8\n- 33.3% = 1/3\n- 16.67% = 1/6",
                'file_path' => null,
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'is_published' => true,
                'is_free' => true,
            ],
            [
                'category_id' => $catTIU->id,
                'title' => 'Logika Silogisme & Penarikan Kesimpulan Sah',
                'slug' => 'logika-silogisme-penarikan-kesimpulan',
                'type' => 'ringkasan',
                'level' => 'Menengah',
                'duration' => '15 min',
                'summary' => 'Memahami diagram venn, premis mayor-minor, kuantor universal (Semua) dan partikular (Sebagian/Beberapa).',
                'content' => "## Kaidah Silogisme Baku BKN\n\n1. Jika satu premis partikular (Ada/Sebagian/Beberapa), maka kesimpulan **wajib partikular**.\n2. Jika satu premis negatif (Tidak/Bukan), maka kesimpulan **wajib negatif**.\n3. Dari dua premis partikular, **tidak dapat ditarik kesimpulan sah**.\n4. Dari dua premis negatif, **tidak dapat ditarik kesimpulan sah**.",
                'file_path' => null,
                'video_url' => null,
                'is_published' => true,
                'is_free' => false,
            ],
            [
                'category_id' => $catTKP->id,
                'title' => 'Integritas & Nilai Core Values ASN Ber-AKHLAK',
                'slug' => 'integritas-core-values-berakhlak',
                'type' => 'video',
                'level' => 'Dasar',
                'duration' => '20 min',
                'summary' => 'Panduan pola pikir ASN dalam menolak gratifikasi, nepotisme, dan menjaga kerahasiaan jabatan untuk meraih skor maksimal 5 di setiap butir TKP.',
                'content' => "## 7 Nilai Dasar ASN Ber-AKHLAK\n\n1. **Berorientasi Pelayanan:** Memahami dan memenuhi kebutuhan masyarakat.\n2. **Akuntabel:** Bertanggung jawab atas kepercayaan yang diberikan.\n3. **Kompeten:** Terus belajar dan mengembangkan kapabilitas.\n4. **Harmonis:** Saling peduli dan menghargai perbedaan.\n5. **Loyal:** Berdedikasi dan mengutamakan kepentingan bangsa.\n6. **Adaptif:** Terus berinovasi dan antusias menghadapi perubahan.\n7. **Kolaboratif:** Membangun kerja sama yang sinergis.",
                'file_path' => null,
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'is_published' => true,
                'is_free' => true,
            ],
        ];

        foreach ($materialsData as $mData) {
            Material::updateOrCreate(['slug' => $mData['slug']], $mData);
        }

        // 5. Seed Historical Tryout Session for User
        TryoutSession::create([
            'user_id' => $user->id,
            'title' => 'Simulasi SKD Nasional #11',
            'twk_score' => 108,
            'tiu_score' => 137,
            'tkp_score' => 167,
            'total_score' => 412,
            'is_passed' => true,
            'answers' => [0 => 0, 1 => 1, 2 => 2, 3 => 1, 4 => 1, 5 => 1, 6 => 1, 7 => 2, 8 => 2, 9 => 1],
            'time_spent_seconds' => 4820,
            'completed_at' => now()->subDays(3),
        ]);

        TryoutSession::create([
            'user_id' => $user->id,
            'title' => 'Simulasi SKD Mandiri #10',
            'twk_score' => 62,
            'tiu_score' => 125,
            'tkp_score' => 170,
            'total_score' => 357,
            'is_passed' => false, // TWK < 65
            'answers' => [0 => 2, 1 => 0],
            'time_spent_seconds' => 5200,
            'completed_at' => now()->subDays(6),
        ]);

        // Call dedicated seeders for 21 modules and 110 full national exam questions
        $this->call([
            SkdPackageSeeder::class,
            FullSkd110QuestionsSeeder::class,
        ]);
    }
}
