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

        // 2. Create Categories for Profiling ASN
        $catManajerial = Category::updateOrCreate(
            ['code' => 'MANAJERIAL'],
            [
                'name' => 'Kompetensi Manajerial & Sosio-Kultural',
                'passing_grade' => 75,
                'question_count' => 30,
                'max_score' => 150,
                'description' => 'Mengukur 8 dimensi kompetensi manajerial MenPAN-RB (Integritas, Kerjasama, Komunikasi, Orientasi Hasil, Pelayanan Publik, Pengembangan Diri, Mengelola Perubahan, Pengambilan Keputusan) dan Perekat Bangsa.',
                'color' => '#059669', // Emerald
                'order' => 1,
            ]
        );

        $catDigital = Category::updateOrCreate(
            ['code' => 'DIGITAL'],
            [
                'name' => 'Literasi & Keamanan Digital ASN',
                'passing_grade' => 70,
                'question_count' => 25,
                'max_score' => 125,
                'description' => 'Menguji 4 pilar literasi digital nasional: Digital Skills (Kecakapan), Digital Safety (Keamanan Data & Privasi), Digital Ethics (Etika Komunikasi Publik), dan Digital Culture.',
                'color' => '#7C3AED', // Purple
                'order' => 2,
            ]
        );

        $catEmerging = Category::updateOrCreate(
            ['code' => 'EMERGING'],
            [
                'name' => 'Emerging Skills & Analytical Thinking',
                'passing_grade' => 75,
                'question_count' => 25,
                'max_score' => 125,
                'description' => 'Menilai ketajaman berpikir analitis, pemecahan masalah birokrasi kompleks, adaptabilitas teknologi, data-driven decision making, dan inovasi pelayanan publik.',
                'color' => '#D97706', // Amber Gold
                'order' => 3,
            ]
        );

        $catPotensi = Category::updateOrCreate(
            ['code' => 'POTENSI'],
            [
                'name' => 'Tes Potensi Kognitif & Figural',
                'passing_grade' => 70,
                'question_count' => 25,
                'max_score' => 125,
                'description' => 'Mengukur kapasitas dasar kognitif, logika silogisme, penalaran analitis, deret keteraturan, serta kemampuan spasial dan matriks figural.',
                'color' => '#2563EB', // Sapphire Blue
                'order' => 4,
            ]
        );

        // 3. Clear existing questions and seed authentic Profiling ASN questions
        Question::truncate();

        $questionsData = [
            // ==================== MANAJERIAL & SOSIO-KULTURAL ====================
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Integritas & Anti-Gratifikasi',
                'question' => 'Setelah rapat evaluasi anggaran proyek perangkat lunak keuangan negara, vendor mitra memberikan Anda sebuah jam tangan mewah sebagai tanda apresiasi atas kerjasama yang sukses. Anda mengetahui terdapat regulasi internal instansi mengenai penerimaan cinderamata. Sikap Anda adalah...',
                'options' => [
                    'Menerima jam tangan tersebut untuk mempererat hubungan kemitraan kedinasan.',
                    'Menolaknya dengan sopan dan menjelaskan bahwa penerimaan hadiah melanggar integritas serta kode etik instansi.',
                    'Menerima karena menganggap nilainya wajar dan tidak akan memengaruhi objektivitas kerja Anda.',
                    'Menerima secara diam-diam tanpa memberitahukan siapa pun agar tidak menimbulkan kegaduhan.',
                    'Menyuruh staf Anda untuk menerimanya atas nama pribadi agar Anda terbebas dari sanksi.'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 2, 1, 1],
                'explanation' => 'Integritas menuntut ASN menolak segala bentuk gratifikasi dari pihak ketiga yang berpotensi menimbulkan konflik kepentingan dan menurunkan objektivitas tata kelola pemerintahan (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Integritas & Penegakan Etika',
                'question' => 'Sebagai analis kebijakan pengadaan, Anda mengetahui rekan kerja satu tim menerima tiket pesawat kelas bisnis dari salah satu vendor tender yang sedang bernegosiasi dengan kementerian Anda. Sikap yang paling tepat adalah...',
                'options' => [
                    'Mendiamkan saja karena itu urusan pribadi rekan kerja tersebut.',
                    'Melaporkan dugaan pelanggaran kode etik tersebut kepada atasan langsung atau Unit Kepatuhan Internal (Whistleblowing System).',
                    'Menegur rekan kerja tersebut di grup WhatsApp kantor agar jera di depan publik.',
                    'Meminta rekan kerja tersebut membelikan tiket yang sama untuk Anda agar adil.',
                    'Menyebarkan kabar tersebut kepada media sosial tanpa bukti dokumen resmi.'
                ],
                'correct_answer' => 1,
                'scores' => [2, 5, 2, 1, 1],
                'explanation' => 'Pelanggaran etika oleh rekan kerja wajib ditindaklanjuti secara proporsional melalui jalur resmi pengawasan internal untuk melindungi marwah institusi (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Pelayanan Publik Berkelanjutan',
                'question' => 'Menjelang jam pelayanan terpadu satu pintu ditutup pada hari Jumat, seorang warga lansia datang dari daerah terpencil dengan dokumen yang masih kurang satu lembar fotokopi identitas. Sikap Anda sebagai petugas adalah...',
                'options' => [
                    'Menolak permohonan tersebut secara tegas dan memintanya kembali pada hari Senin berikutnya.',
                    'Membantu memfotokopikan dokumen yang kurang di ruang kerja dan menyelesaikan berkasnya tuntas sebelum pulang.',
                    'Menyuruh pemohon tersebut mencari tempat fotokopi di luar kantor meskipun lokasinya jauh dan kantor segera tutup.',
                    'Menerima berkas apa adanya tanpa verifikasi untuk mempercepat kepulangan Anda.',
                    'Meminta biaya administrasi tambahan sebagai kompensasi lembur pelayanan.'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 2, 2, 1],
                'explanation' => 'Orientasi pelayanan publik mengutamakan empati, kepekaan terhadap kaum rentan, dan solusi responsif tanpa mengabaikan akuntabilitas administrasi (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Kerjasama & Kolaborasi Tim',
                'question' => 'Dua staf senior di unit kerja Anda berselisih paham mengenai metode pelaporan digital yang baru diperkenalkan, sehingga menghambat progres penyusunan LAKIP tahunan. Tindakan Anda sebagai koordinator tim adalah...',
                'options' => [
                    'Memihak staf yang paling senior karena pengalamannya lebih lama.',
                    'Membiarkan keduanya berdebat hingga salah satu menyerah dengan sendirinya.',
                    'Mengadakan sesi mediasi bersama untuk mengevaluasi kelebihan masing-masing metode dan menyepakati alur kerja terpadu.',
                    'Mengambil alih seluruh pekerjaan seorang diri tanpa melibatkan mereka lagi.',
                    'Mengusulkan mutasi bagi kedua staf tersebut ke instansi lain.'
                ],
                'correct_answer' => 2,
                'scores' => [1, 1, 5, 2, 1],
                'explanation' => 'Kompetensi kerjasama menuntut kemampuan memfasilitasi rekonsiliasi perbedaan pandangan kerja demi mencapai tujuan bersama organisasi (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Pengambilan Keputusan Berbasis Risiko',
                'question' => 'Di tengah keadaan darurat bencana daerah, sistem server database bantuan logistik mengalami crash. Anda dihadapkan pada pilihan menyalurkan bantuan manual dengan risiko pencatatan ganda atau menunggu perbaikan server selama 12 jam. Anda akan...',
                'options' => [
                    'Menunggu perbaikan server selesai sepenuhnya tanpa menyalurkan bantuan apapun.',
                    'Segera mendistribusikan bantuan kebutuhan primer menggunakan format logbook manual terverifikasi KTP, seraya menyiapkan rekonsiliasi data digital susulan.',
                    'Membagikan bantuan tanpa identitas apapun secara bebas di lapangan.',
                    'Menolak bertanggung jawab dan melimpahkan keputusan kepada staf lapangan junior.',
                    'Menunda kegiatan sampai atasan tertinggi tiba di lokasi bencana.'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 2, 1, 1],
                'explanation' => 'Pengambilan keputusan ASN di situasi krisis menuntut pertimbangan mitigasi risiko kemanusiaan utama dengan tetap menjaga kontrol akuntabilitas minimum (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catManajerial->id,
                'sub_category' => 'Sosio-Kultural & Perekat Bangsa',
                'question' => 'Saat memimpin penugasan tim verifikasi di wilayah yang memiliki tradisi adat istiadat setempat yang kental, beberapa anggota tim Anda merasa canggung dan enggan mengikuti musyawarah adat pembuka. Sikap Anda adalah...',
                'options' => [
                    'Memaksa warga adat meninggalkan tradisi mereka demi kecepatan birokrasi kedinasan.',
                    'Memberikan edukasi kepada tim mengenai pentingnya menghargai kearifan lokal, serta memimpin langsung keikutsertaan dalam prosesi musyawarah sebagai bentuk penghormatan.',
                    'Membatalkan seluruh penugasan dan kembali ke kantor pusat.',
                    'Mengabaikan warga adat dan langsung bekerja secara sepihak di lapangan.',
                    'Menertawakan kebiasaan masyarakat adat di media sosial pribadi.'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 1, 2, 1],
                'explanation' => 'Kompetensi sosio-kultural menuntut kepekaan budaya, kemampuan membangun keterbukaan, serta menjadi perekat bangsa dalam keberagaman Indonesia (Skor 5).',
                'is_active' => true,
            ],

            // ==================== LITERASI DIGITAL ASN ====================
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Digital Skill (Kolaborasi Cloud)',
                'question' => 'Instansi Anda mulai mengadopsi perangkat lunak dokumen berbasis cloud untuk memfasilitasi kerja lintas deputi secara real-time. Kesimpulan utama dari transformasi kerja digital ini adalah...',
                'options' => [
                    'Bekerja di lokasi fisik terpusat selalu lebih hemat biaya dibanding sistem daring.',
                    'Teknologi digital mempermudah kolaborasi tim lintas unit dengan mengatasi hambatan jarak dan efisiensi waktu kerja.',
                    'Penggunaan cloud storage membuat waktu penyelesaian arsip negara menjadi 3 kali lebih lambat.',
                    'Bekerja secara daring menghilangkan sepenuhnya kebutuhan pengawasan kepemimpinan.',
                    'Teknologi cloud hanya boleh digunakan untuk tugas-tugas non-pemerintahan.'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 1, 1, 1],
                'explanation' => 'Pemanfaatan komputasi awan di instansi publik meningkatkan interoperabilitas, transparansi versi dokumen, serta percepatan alur birokrasi pemerintahan (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Digital Safety (Phishing & Domain Spoofing)',
                'question' => 'Anda menerima sebuah email yang mengatasnamakan Bank Himbara mitra gaji ASN, menyatakan bahwa akun Anda dibekukan dan meminta verifikasi via tautan link: "b4nk-mand1ri-asn-verif.net". Tindakan paling aman dan tepat adalah...',
                'options' => [
                    'Segera mengklik tautan tersebut dan memasukkan username serta PIN untuk keamanan akun.',
                    'Membuka tautan tersebut melalui mode Incognito karena dijamin 100% aman dari virus.',
                    'Memeriksa URL dengan teliti, mengidentifikasi ciri phishing domain palsu, tidak mengklik tautan, dan melaporkannya ke tim CSIRT instansi.',
                    'Mengunduh lampiran file zip yang ada di email terlebih dahulu untuk memastikan keaslian.',
                    'Meneruskan email mencurigakan tersebut ke seluruh kontak email kantor tanpa peringatan.'
                ],
                'correct_answer' => 2,
                'scores' => [1, 2, 5, 1, 1],
                'explanation' => 'Domain yang menyerupai institusi resmi dengan modifikasi huruf/karakter adalah indikasi nyata spear-phishing. ASN wajib waspada terhadap rekayasa sosial siber (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Digital Ethics & Netiquette ASN',
                'question' => 'Dalam sebuah diskusi panas di media sosial terkait kebijakan baru pemerintah, seorang rekan ASN mengunggah komentar bernada provokatif dan membocorkan draf surat edaran kementerian yang belum diteken menteri. Pandangan Anda berdasarkan etika digital ASN adalah...',
                'options' => [
                    'Hal tersebut sah karena setiap ASN memiliki kebebasan berekspresi tanpa batas di ranah daring.',
                    'Tindakan tersebut melanggar netralitas dan kewajiban menjaga kerahasiaan dokumen kedinasan sesuai UU ASN dan PP Manajemen ASN.',
                    'Bagus untuk meningkatkan engagement dan popularitas akun pribadi rekan tersebut.',
                    'Boleh asalkan unggahan tersebut dihapus setelah 1 jam.',
                    'Tidak masalah selama menggunakan nama samaran (alter account).'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 1, 1, 1],
                'explanation' => 'Etika digital ASN mencakup prinsip kehati-hatian, netralitas, serta larangan keras membocorkan rahasia jabatan dan dokumen negara ke ranah publik tanpa wewenang (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Technostress & Digital Wellbeing',
                'question' => 'Sebuah tim kerja digital birokrasi mengeluhkan kelelahan kerja ekstrem (technostress) akibat notifikasi pesan kedinasan yang masuk di berbagai aplikasi pada larut malam. Solusi manajerial digital yang paling proporsional adalah...',
                'options' => [
                    'Menghapus seluruh penggunaan gawai pintar dan kembali ke sistem memo kertas fisik.',
                    'Menyusun SOP jam komunikasi digital kedinasan yang tegas dan memberikan pelatihan manajemen waktu serta literasi digital produktif.',
                    'Memaksa pegawai tetap siaga 24 jam penuh di seluruh grup pesan tanpa kompensasi.',
                    'Mengganti seluruh staf dengan aplikasi bot otomasi.',
                    'Mengabaikan keluhan karena lembur digital adalah kewajiban mutlak tanpa batas.'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 1, 1, 1],
                'explanation' => 'Digital wellbeing dan pengelolaan technostress merupakan bagian integral pilar literasi digital agar adopsi teknologi mendukung produktivitas berkelanjutan (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catDigital->id,
                'sub_category' => 'Keamanan Data Pribadi (UU PDP)',
                'question' => 'Anda ditugaskan mengelola database calon penerima beasiswa dinas yang memuat data NIK, riwayat kesehatan, dan nomor rekening. Kebijakan tata kelola data yang wajib diterapkan adalah...',
                'options' => [
                    'Mengunggah berkas Excel database tersebut ke forum publik agar masyarakat bisa memeriksa sendiri.',
                    'Menerapkan enkripsi data, membatasi hak akses (role-based access), dan tidak membagikan data sensitif tanpa protokol keamanan PDP.',
                    'Menyimpan file di komputer umum tanpa kata sandi agar mudah dibuka staf lain.',
                    'Menjual data tersebut kepada pihak ketiga untuk pemasukan non-pajak instansi.',
                    'Menghapus backup database agar kapasitas harddisk server hemat.'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 1, 1, 1],
                'explanation' => 'Pilar Digital Safety menuntut kepatuhan terhadap regulasi pelindungan data pribadi (UU PDP) dengan menerapkan enkripsi dan kontrol otorisasi ketat pada data publik (Skor 5).',
                'is_active' => true,
            ],

            // ==================== EMERGING SKILLS & ANALYTICAL THINKING ====================
            [
                'category_id' => $catEmerging->id,
                'sub_category' => 'Berpikir Analitis & Pemecahan Masalah Kompleks',
                'question' => 'Laporan kinerja triwulanan menunjukkan penurunan efisiensi proses perizinan sebesar 15% pada unit Anda tanpa indikasi penyebab tunggal. Langkah analitis pertama yang paling tepat adalah...',
                'options' => [
                    'Menginstruksikan seluruh staf untuk bekerja lembur tiap hari tanpa evaluasi proses.',
                    'Langsung menyalahkan sistem server IT dan menuntut penggantian vendor.',
                    'Mengidentifikasi variabel-variabel kunci pada alur perizinan dan mengumpulkan data kuantitatif komparatif sebelum dan sesudah penurunan performa.',
                    'Mengadakan rapat darurat untuk mencari siapa yang paling bersalah.',
                    'Mengabaikannya karena penurunan 15% dianggap fluktuasi wajar.'
                ],
                'correct_answer' => 2,
                'scores' => [1, 1, 5, 1, 1],
                'explanation' => 'Berpikir analitis dimulai dengan dekonstruksi masalah ke variabel-variabel pembentuknya, didukung data komparatif empiris sebelum menarik kesimpulan (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catEmerging->id,
                'sub_category' => 'Triangulasi Data & Kebijakan Multisektor',
                'question' => 'Dalam merancang kebijakan tata ruang baru, Anda menerima data kependudukan dan pemukiman dari tiga unit kerja dinas yang saling bertentangan secara signifikan. Sebagai koordinator analis, Anda akan...',
                'options' => [
                    'Memilih data dari dinas yang pimpinannya paling akrab dengan Anda.',
                    'Mengembalikan seluruh berkas dan menolak mengerjakan kebijakan tersebut.',
                    'Melakukan triangulasi data dengan memverifikasi data citra satelit independen dan mengadakan lokakarya penyamaan definisi operasional antar-unit.',
                    'Membuat angka perkiraan sendiri tanpa dasar data apapun.',
                    'Mengambil rata-rata sederhana dari ketiga angka yang bertentangan tanpa memeriksa metodologinya.'
                ],
                'correct_answer' => 2,
                'scores' => [1, 1, 5, 1, 2],
                'explanation' => 'Metode triangulasi dan penyelarasan definisi operasional adalah standar pemecahan masalah data kompleks dalam perumusan kebijakan publik berbasis bukti (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catEmerging->id,
                'sub_category' => 'Perencanaan Skenario Risiko (Scenario Planning)',
                'question' => 'Dalam penyusunan proyeksi anggaran pengadaan bahan baku instansi tahun mendatang, tren historis menunjukkan kenaikan biaya 7%/tahun, namun terdapat potensi regulasi tarif impor baru yang berisiko menaikkan biaya hingga 18%. Langkah terbaik Anda adalah...',
                'options' => [
                    'Menggunakan angka historis 7% saja karena paling aman dan mudah disetujui.',
                    'Langsung menetapkan angka 18% tanpa memberikan alternatif penjelasan mitigasi.',
                    'Menyusun model skenario: Best Case (7%), Worst Case (18%), dan Most Likely Case berbasis analisis dampak regulasi beserta opsi mitigasi kontinjensinya.',
                    'Menolak menyusun proyeksi sampai regulasi tersebut sah disahkan DPR.',
                    'Mengurangi separuh pengadaan barang tanpa analisis dampak layanan publik.'
                ],
                'correct_answer' => 2,
                'scores' => [2, 2, 5, 1, 1],
                'explanation' => 'Analytical thinking pada manajemen strategis menuntut pembuatan scenario planning terstruktur untuk mengantisipasi ketidakpastian regulasi dan ekonomi makro (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catEmerging->id,
                'sub_category' => 'Pengolahan Umpan Balik Publik (Feedback Analysis)',
                'question' => 'Survei kepuasan masyarakat menghasilkan ribuan keluhan abstrak bernada "Pelayanan Kantor Lambat". Untuk memecahkan problem ini secara sistemik, langkah analitis Anda adalah...',
                'options' => [
                    'Menghapus kolom survei bebas karena dianggap tidak konstruktif.',
                    'Membuat kuis berhadiah untuk masyarakat yang memberikan ulasan bintang lima.',
                    'Mengelompokkan keluhan berdasarkan titik layanan (touchpoint), tahapan alur berkas, dan waktu proses (cycle time) guna menemukan bottleneck spesifik.',
                    'Memarahi petugas loket baris depan di hadapan pengunjung.',
                    'Membantah seluruh keluhan di media massa.'
                ],
                'correct_answer' => 2,
                'scores' => [1, 1, 5, 1, 1],
                'explanation' => 'Pemecahan masalah sistemik membedah umpan balik kualitatif menjadi data kategorikal berdasar touchpoints dan waktu siklus untuk mengidentifikasi bottleneck utama (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catEmerging->id,
                'sub_category' => 'Adaptabilitas & AI Readiness',
                'question' => 'Instansi Anda berencana mengimplementasikan model kecerdasan buatan (AI) untuk mempercepat perankingan berkas usulan kenaikan pangkat. Sebagai ASN yang adaptif terhadap emerging tech, Anda harus...',
                'options' => [
                    'Menolak penggunaan AI karena khawatir seluruh posisi ASN akan dihapus.',
                    'Menerima hasil otomatisasi AI 100% tanpa verifikasi manusia sama sekali.',
                    'Mempelajari prinsip kerja AI, memastikan adanya human-in-the-loop (pengawasan manusia), serta menguji potensi bias algoritma terhadap data pegawai.',
                    'Menyerahkan seluruh username dan password admin kementerian kepada vendor penyedia AI.',
                    'Menyebarkan hoaks bahwa AI berbahaya bagi kepegawaian.'
                ],
                'correct_answer' => 2,
                'scores' => [1, 2, 5, 1, 1],
                'explanation' => 'Kesiapan teknologi baru (AI readiness) menuntut pemahaman etika AI, mitigasi bias data, dan prinsip pengawasan manusia (human-in-the-loop) dalam tata kelola birokrasi (Skor 5).',
                'is_active' => true,
            ],

            // ==================== POTENSI KOGNITIF & FIGURAL ====================
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Silogisme Logika Analitis',
                'question' => 'Semua pegawai yang lulus uji asesmen kompetensi berhak diusulkan masuk ke dalam Talent Pool Nasional. Beberapa analis kebijakan muda lulus uji asesmen kompetensi. Kesimpulan yang sah dan logis adalah...',
                'options' => [
                    'Semua analis kebijakan muda masuk ke dalam Talent Pool Nasional.',
                    'Sebagian analis kebijakan muda berhak diusulkan masuk ke dalam Talent Pool Nasional.',
                    'Tidak ada analis kebijakan muda yang berhak masuk Talent Pool Nasional.',
                    'Semua yang masuk Talent Pool Nasional adalah analis kebijakan muda.',
                    'Pegawai yang tidak lulus uji asesmen tetap berhak masuk Talent Pool Nasional.'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 1, 1, 1],
                'explanation' => 'Premis mayor: Semua yang lulus uji berhak diusulkan. Premis minor: Sebagian analis kebijakan muda lulus. Maka kesimpulannya: Sebagian analis kebijakan muda tersebut berhak diusulkan (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Deret Angka & Pola Keteraturan',
                'question' => 'Perhatikan deret pola angka berikut: 4, 9, 19, 39, 79, ... Angka berikutnya yang tepat adalah...',
                'options' => [
                    '119',
                    '139',
                    '159',
                    '169',
                    '179'
                ],
                'correct_answer' => 2,
                'scores' => [1, 1, 5, 1, 1],
                'explanation' => 'Pola deret: suku ke-n = (suku sebelumnya × 2) + 1. (4×2)+1=9; (9×2)+1=19; (19×2)+1=39; (39×2)+1=79; maka (79×2)+1 = 158 + 1 = 159 (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Analogi Hubungan Konsep',
                'question' => 'REGULASI : KEBIJAKAN = INTEGRITAS : ...',
                'options' => [
                    'Hukum',
                    'Karakter',
                    'Jabatan',
                    'Kekuasaan',
                    'Anggaran'
                ],
                'correct_answer' => 1,
                'scores' => [1, 5, 1, 1, 1],
                'explanation' => 'Regulasi merupakan landasan dasar bagi terwujudnya Kebijakan, sebagaimana Integritas merupakan landasan dasar bagi terbentuknya Karakter moral seorang aparatur (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Penalaran Figural Spasial (Pola Rotasi)',
                'question' => 'Sebuah bangun geometris segitiga sama sisi memiliki tanda lingkaran hitam di sudut puncaknya. Jika bangun tersebut dirotasikan 90 derajat searah jarum jam sebanyak 3 kali berturut-turut, posisi lingkaran hitam tersebut akan sama dengan...',
                'options' => [
                    'Rotasi 90 derajat berlawanan arah jarum jam sebanyak 1 kali.',
                    'Rotasi 180 derajat searah jarum jam.',
                    'Posisi awal mula bangun sebelum diputar.',
                    'Rotasi 360 derajat penuh.',
                    'Pencerminan vertikal terhadap sumbu X.'
                ],
                'correct_answer' => 0,
                'scores' => [5, 1, 1, 1, 1],
                'explanation' => 'Rotasi 90° searah jarum jam sebanyak 3 kali setara dengan putaran 270° searah jarum jam, yang ekuivalen posisinya dengan rotasi 90° berlawanan arah jarum jam (Skor 5).',
                'is_active' => true,
            ],
            [
                'category_id' => $catPotensi->id,
                'sub_category' => 'Analisis Perbandingan Kuat Relatif',
                'question' => 'Dalam simulasi alokasi kerja: Kecepatan analisis Pegawai A lebih tinggi dari B. Pegawai C lebih cepat dari A. Pegawai D lebih lambat dari B namun lebih cepat dari E. Urutan pegawai dari yang paling cepat menyelesaikan analisis adalah...',
                'options' => [
                    'C - A - B - D - E',
                    'C - B - A - D - E',
                    'A - C - B - E - D',
                    'E - D - B - A - C',
                    'B - A - C - D - E'
                ],
                'correct_answer' => 0,
                'scores' => [5, 1, 1, 1, 1],
                'explanation' => 'Dari data: A > B, C > A (maka C > A > B), dan D < B tetapi D > E (maka B > D > E). Menggabungkan relasi: C > A > B > D > E (Skor 5).',
                'is_active' => true,
            ]
        ];

        foreach ($questionsData as $q) {
            Question::create($q);
        }

        // 4. Create Materials for Profiling ASN
        Material::truncate();

        Material::create([
            'category_id' => $catManajerial->id,
            'title' => 'Panduan Standar Kompetensi Manajerial ASN (PermenPAN-RB No. 38/2017)',
            'slug' => 'panduan-kompetensi-manajerial-asn',
            'type' => 'Modul PDF & Teori',
            'level' => 'Madya & Pratama',
            'duration' => '30 Menit',
            'summary' => 'Rangkuman lengkap 8 kompetensi manajerial (Integritas, Kerjasama, Komunikasi, Orientasi pada Hasil, Pelayanan Publik, Pengembangan Diri, Mengelola Perubahan, Pengambilan Keputusan) dan indikator perilaku level 1-5.',
            'content' => 'Standar Kompetensi Manajerial ASN merupakan pedoman pokok dalam pemetaan talent pool dan seleksi terbuka jabatan pimpinan tinggi (JPT) maupun fungsional ahli. Pahami kata kunci indikator perilaku dan situasi dilematis etika birokrasi.',
            'is_published' => true,
            'is_free' => true,
        ]);

        Material::create([
            'category_id' => $catDigital->id,
            'title' => 'Literasi Digital ASN: 4 Pilar Indonesia Makin Cakap Digital',
            'slug' => 'literasi-digital-asn-4-pilar',
            'type' => 'Panduan Komprehensif',
            'level' => 'Semua Jenjang Jabatan',
            'duration' => '25 Menit',
            'summary' => 'Kupas tuntas Digital Skills, Digital Culture, Digital Ethics, dan Digital Safety untuk ASN di era Satu Data Indonesia dan Sistem Pemerintahan Berbasis Elektronik (SPBE).',
            'content' => 'Literasi digital bukan sekadar kemampuan mengoperasikan komputer, melainkan kesadaran etika bermedia sosial, kepatuhan pelindungan data pribadi (UU PDP), dan pencegahan rekayasa sosial di lingkungan birokrasi.',
            'is_published' => true,
            'is_free' => true,
        ]);

        Material::create([
            'category_id' => $catEmerging->id,
            'title' => 'Emerging Skills & Analytical Thinking: Kunci Menembus Box 9 Talent Pool',
            'slug' => 'emerging-skills-analytical-thinking-asn',
            'type' => 'Studi Kasus & Analisis',
            'level' => 'Lanjutan (Advanced)',
            'duration' => '40 Menit',
            'summary' => 'Metode membedah masalah publik kompleks, teknik triangulasi data silang, pembuatan scenario planning anggaran, serta adopsi AI dan otomasi dalam tata kelola pelayanan publik.',
            'content' => 'Emerging Skills menuntut aparatur memiliki analytical mindset. Pelajari cara mengidentifikasi bottleneck proses kerja, merumuskan hipotesis perbaikan, dan menyusun rekomendasi kebijakan berbasis bukti kuantitatif.',
            'is_published' => true,
            'is_free' => false,
        ]);

        Material::create([
            'category_id' => $catPotensi->id,
            'title' => 'Mastery Penalaran Figural, Logika Silogisme & Tes Potensi ASN',
            'slug' => 'mastery-penalaran-figural-dan-potensi',
            'type' => 'Drill Soal & Pembahasan',
            'level' => 'Semua Jenjang',
            'duration' => '35 Menit',
            'summary' => 'Trik cepat membaca rotasi pola gambar spasial, keteraturan matriks bangun, penalaran analitis hubungan berantai, serta silogisme kategorik.',
            'content' => 'Tes potensi kognitif dan figural menilai ketahanan mental dan kecepatan berpikir kritis. Kuasai rumus eliminasi opsi dan identifikasi pola rotasi 90/180/270 derajat.',
            'is_published' => true,
            'is_free' => true,
        ]);

        // 5. Seed Example Tryout Sessions with ASN Profiling Scores
        TryoutSession::truncate();

        TryoutSession::create([
            'user_id' => $user->id,
            'title' => 'Simulasi Profiling & Asesmen Kompetensi ASN #1',
            'twk_score' => 88,
            'tiu_score' => 85,
            'tkp_score' => 90,
            'total_score' => 355,
            'category_scores' => [
                'MANAJERIAL' => 92,
                'DIGITAL' => 86,
                'EMERGING' => 90,
                'POTENSI' => 87,
            ],
            'competency_levels' => [
                'Integritas & Etika' => 'Sangat Baik (Level 4)',
                'Literasi Digital' => 'Mahir (Level 4)',
                'Berpikir Analitis' => 'Optimal (Level 4)',
                'Kognitif & Figural' => 'Tinggi (Level 4)',
            ],
            'talent_quadrant' => 'Bintang / Box 9 (High Potential & High Performance)',
            'is_passed' => true,
            'answers' => [1 => 1, 2 => 1, 3 => 1, 4 => 2, 5 => 1],
            'time_spent_seconds' => 4200,
            'completed_at' => now()->subDays(2),
        ]);
    }
}
