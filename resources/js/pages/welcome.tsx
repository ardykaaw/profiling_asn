import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Award, 
    BookOpen, 
    Brain, 
    Check, 
    CheckCircle2, 
    ChevronRight, 
    Clock, 
    Cpu, 
    Layers, 
    Lock, 
    Menu, 
    Rocket, 
    ShieldCheck, 
    Sparkles, 
    Users, 
    X, 
    Zap,
    Compass
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';
import AppLogoIcon from '@/components/app-logo-icon';

interface User {
    id: number;
    name: string;
    email: string;
}

interface SharedData {
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'potensi' | 'manajerial' | 'digital' | 'karir'>('manajerial');

    const sampleQuestions = {
        manajerial: {
            title: 'Studi Kasus: Integritas & Anti-Gratifikasi Birokrasi',
            windowTitle: 'Kasus Manajerial — Dilema Integritas Kedinasan',
            tag: '8 Dimensi MenPAN-RB',
            soal: 'Setelah penandatanganan Berita Acara Pemeriksaan (BAP) proyek pengadaan sistem kepegawaian, pimpinan vendor menyerahkan cinderamata personal berupa jam tangan bernilai tinggi sebagai ucapan terima kasih kemitraan. Anda menyadari adanya ketentuan kode etik instansi. Tindakan Anda adalah...',
            pilihan: [
                'Menerima hadiah tersebut demi menjaga relasi baik dan keharmonisan kemitraan.',
                'Menolak secara tegas dan santun dengan menjelaskan bahwa penerimaan hadiah melanggar integritas serta kode etik kedinasan.',
                'Menerima hadiah namun menyimpannya secara rahasia agar tidak menimbulkan kecurigaan staf lain.',
                'Menyuruh staf honorer menerima hadiah tersebut atas nama pribadi.'
            ],
            kunci: 'Opsi B (Skor 5 — Sangat Kompeten)',
            pembahasan: 'Integritas menuntut ASN berani menolak segala bentuk gratifikasi yang berpotensi memicu konflik kepentingan dan mencederai objektivitas tata kelola birokrasi pemerintahan.'
        },
        digital: {
            title: 'Studi Kasus: Keamanan Informasi & Pencegahan Phishing ASN',
            windowTitle: 'Kasus Digital — Keamanan Data & Etika SPBE',
            tag: 'Pilar Digital Safety',
            soal: 'Anda menerima email kedinasan dengan subjek mendesak "Verifikasi Data Gaji ASN" yang meminta klik tautan mencurigakan untuk menghindari penundaan gaji. Format tautan memiliki kejanggalan karakter domain. Tindakan paling tepat adalah...',
            pilihan: [
                'Segera memasukkan identitas NIK dan PIN rekening agar hak keuangan tidak tertunda.',
                'Membuka tautan pada mode penyamaran (Incognito) karena dianggap aman.',
                'Mengabaikan link, tidak mengklik tautan, dan segera berkoordinasi dengan Tim Keamanan Informasi / CSIRT Instansi.',
                'Mengunduh lampiran file zip untuk memeriksa keaslian formulir.'
            ],
            kunci: 'Opsi C (Skor 5 — Sangat Kompeten)',
            pembahasan: 'Domain tiruan adalah indikasi nyata spear-phishing. ASN wajib menjaga kehati-hatian digital, melindungi data sensitif kedinasan, dan melapor ke unit pengelola TIK instansi.'
        },
        karir: {
            title: 'Studi Kasus: Pemetaan Tripatha Karir & Peran Strategis ASN',
            windowTitle: 'Kasus Karir — Orientasi Peran Tripatha ASN',
            tag: 'Tripatha Karir BKN',
            soal: 'Ketika instansi Anda mengadakan reformasi birokrasi dan modernisasi pelayanan terpadu, peran manakah yang paling membangkitkan motivasi kerja dan antusiasme Anda?',
            pilihan: [
                'A. Menjadi koordinator tim strategis yang mengarahkan pembagian tugas, memimpin rapat diplomasi, dan bertanggung jawab atas pencapaian target (Jalur Kepemimpinan & Manajerial).',
                'B. Menjadi analis keahlian yang meneliti data empiris, merancang inovasi model layanan, dan menyusun dokumen telaahan kebijakan serta regulasi teknis (Jalur Fungsional Keahlian).',
                'C. Menjadi penanggung jawab operasional yang memastikan SOP administrasi terlaksana tertib, memverifikasi berkas, dan melayani langsung masyarakat (Jalur Pelayanan & Operasional Teknis).'
            ],
            kunci: 'Opsi B (Dominan Fungsional Keahlian / Analis Kebijakan)',
            pembahasan: 'Pemetaan Tripatha Karir menganalisis kecocokan profil psikometrik aparatur terhadap 3 jalur karir utama ASN Sistem Merit: Struktural/Manajerial, Fungsional Keahlian, dan Pelayanan/Operasional.'
        },
        potensi: {
            title: 'Studi Kasus: Penalaran Logis & Silogisme Kebijakan',
            windowTitle: 'Kasus Kognitif — Penalaran Logika Analitis',
            tag: 'Logika & Kognitif',
            soal: 'Semua aparatur yang memenuhi standar uji kompetensi berhak diusulkan masuk ke dalam Manajemen Talenta Nasional. Sebagian pranata komputer muda memenuhi standar uji kompetensi. Kesimpulan yang sah dan logis adalah...',
            pilihan: [
                'Semua pranata komputer muda otomatis masuk ke Manajemen Talenta Nasional.',
                'Sebagian pranata komputer muda berhak diusulkan masuk ke Manajemen Talenta Nasional.',
                'Tidak ada pranata komputer yang berhak diusulkan masuk Manajemen Talenta.',
                'Aparatur yang tidak memenuhi standar uji kompetensi tetap berhak masuk Manajemen Talenta.'
            ],
            kunci: 'Opsi B (Skor 5 — Sangat Kompeten)',
            pembahasan: 'Kombinasi premis universal afirmatif dan partikular afirmatif menghasilkan kesimpulan partikular yang sah: Sebagian pranata komputer tersebut berhak diusulkan.'
        }
    };

    const currentQ = sampleQuestions[activeTab];

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
            <Head title="ProASN — Portal Uji Asesmen & Pemetaan Kompetensi ASN Nasional" />

            {/* Subtle Executive Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-emerald-100/40 via-slate-100/30 to-transparent blur-3xl opacity-70" />
                <div className="absolute top-1/3 -right-32 w-80 h-80 bg-amber-50/60 rounded-full blur-3xl" />
            </div>

            {/* Navigation Header */}
            <header className="relative z-20 border-b border-slate-200/90 bg-white/90 backdrop-blur-md sticky top-0 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AppLogoIcon className="size-9 shrink-0" />
                        <div>
                            <span className="font-black text-base tracking-tight text-slate-900 font-sans">
                                ProASN<span className="text-emerald-600">.</span>
                            </span>
                            <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                                Talent Assessment Platform
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
                        <a href="#dimensi" className="hover:text-emerald-800 transition-colors">
                            4 Dimensi Penilaian
                        </a>
                        <a href="#simulasi" className="hover:text-emerald-800 transition-colors">
                            Bedah Kasus & Pembahasan
                        </a>
                        <a href="#ninebox" className="hover:text-emerald-800 transition-colors">
                            9 Box SIMATA
                        </a>
                        <a href="/materi" className="hover:text-emerald-800 transition-colors">
                            Modul Kisi-Kisi BKN
                        </a>
                    </nav>

                    {/* Auth CTA Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden lg:block">
                                    <div className="text-xs font-bold text-slate-900 leading-none">{user.name}</div>
                                    <div className="text-[10px] text-emerald-700 font-medium mt-0.5">Akun Pegawai Terverifikasi</div>
                                </div>
                                <a
                                    href="/dashboard"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold shadow-md transition-all"
                                >
                                    <Rocket className="w-3.5 h-3.5" />
                                    <span>Buka Dashboard</span>
                                </a>
                            </div>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="px-4 py-2 rounded-xl text-slate-700 hover:text-slate-950 text-xs font-semibold hover:bg-slate-100 transition-colors"
                                >
                                    Masuk Portal
                                </a>
                                <a
                                    href="/register"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold shadow-md transition-all"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                    <span>Mulai Asesmen</span>
                                </a>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 text-xs">
                        <a href="#dimensi" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">
                            4 Dimensi Penilaian
                        </a>
                        <a href="#simulasi" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">
                            Bedah Kasus & Pembahasan
                        </a>
                        <a href="#ninebox" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">
                            9 Box SIMATA
                        </a>
                        <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                            {user ? (
                                <a href="/dashboard" className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-center">
                                    Buka Dashboard ({user.name})
                                </a>
                            ) : (
                                <>
                                    <a href="/login" className="w-full py-2 text-center font-semibold text-slate-700 border border-slate-200 rounded-xl">
                                        Masuk Portal
                                    </a>
                                    <a href="/register" className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-center">
                                        Daftar Akun Baru
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* HERO SECTION */}
            <main className="relative z-10">
                <section className="pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 text-emerald-900 text-xs font-semibold mb-6 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        <span>Standar Penilaian Kompetensi BKN & PermenPAN-RB No. 38/2017</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.18]">
                        Persiapan Uji Asesmen Profiling ASN,{' '}
                        <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                            Menuju Kuadran 9 Manajemen Talenta
                        </span>
                    </h1>

                    <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Platform simulasi Situational Judgement Test (SJT) dan pemetaan kompetensi terpadu: membedah Kompetensi Manajerial, Literasi Digital SPBE, Emerging Skills, dan Potensi Kognitif.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="/tryout"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/10 transition-all"
                        >
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            <span>Mulai Simulasi Uji Asesmen</span>
                        </a>
                        <a
                            href="/materi"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all shadow-xs"
                        >
                            <BookOpen className="w-4 h-4 text-slate-600" />
                            <span>Pelajari Modul & Kisi-Kisi</span>
                        </a>
                    </div>

                    {/* Window Container with Mac Controls: Executive Summary */}
                    <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden text-left">
                        <MacWindowControls
                            title="Ringkasan Standar Uji Asesmen ASN"
                            badge="STANDAR NASIONAL"
                        />
                        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                            <div className="px-2 pt-2 sm:pt-0">
                                <div className="text-[11px] font-semibold text-slate-500 uppercase">Dimensi Asesmen</div>
                                <div className="text-xl font-black text-slate-900 mt-1">4 Dimensi</div>
                                <div className="text-xs text-slate-600 mt-0.5">Manajerial, Digital, Analitis</div>
                            </div>
                            <div className="px-2 pt-2 sm:pt-0 sm:pl-4">
                                <div className="text-[11px] font-semibold text-slate-500 uppercase">Standar Evaluasi</div>
                                <div className="text-xl font-black text-slate-900 mt-1">9 Box SIMATA</div>
                                <div className="text-xs text-slate-600 mt-0.5">Pemetaan Karier BKN</div>
                            </div>
                            <div className="px-2 pt-2 sm:pt-0 sm:pl-4">
                                <div className="text-[11px] font-semibold text-slate-500 uppercase">Tipe Pengujian</div>
                                <div className="text-xl font-black text-slate-900 mt-1">SJT & Kasus</div>
                                <div className="text-xs text-slate-600 mt-0.5">Situational Dilemma</div>
                            </div>
                            <div className="px-2 pt-2 sm:pt-0 sm:pl-4">
                                <div className="text-[11px] font-semibold text-slate-500 uppercase">Output Rapor</div>
                                <div className="text-xl font-black text-slate-900 mt-1">Radar Profil</div>
                                <div className="text-xs text-slate-600 mt-0.5">Evaluasi Level 1-5</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4 DIMENSI ASESMEN SECTION */}
                <section id="dimensi" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                            Kurikulum Lengkap
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1.5">
                            4 Dimensi Penilaian Uji Kompetensi ASN
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2.5">
                            Disusun secara cermat mengacu pada standar BKN dan KemenPAN-RB untuk pemetaan talenta dan seleksi terbuka jabatan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Card 1 */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col overflow-hidden">
                            <MacWindowControls title="Dimensi 1 — Manajerial" badge="8 DIMENSI" />
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900">Manajerial & Sosio-Kultural</h3>
                                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                        Mengukur 8 kompetensi inti: Integritas, Kerjasama, Komunikasi, Orientasi Hasil, Pelayanan Publik, Pengembangan Diri, Mengelola Perubahan, dan Pengambilan Keputusan.
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-800">
                                    Passing Grade: ≥ 75 Poin
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-purple-300 transition-all flex flex-col overflow-hidden">
                            <MacWindowControls title="Dimensi 2 — Literasi Digital" badge="4 PILAR SPBE" />
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900">Literasi & Keamanan Digital</h3>
                                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                        Mengukur 4 pilar kecakapan digital: Digital Skills, Digital Ethics, Digital Culture, dan Digital Safety (keamanan data SPBE & kepatuhan UU Pelindungan Data Pribadi).
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-purple-800">
                                    Passing Grade: ≥ 70 Poin
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-amber-300 transition-all flex flex-col overflow-hidden">
                            <MacWindowControls title="Subtes 4 — Preferensi Karir" badge="TRIPATHA BKN" />
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                                        <Compass className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900">Preferensi Karir (Tripatha Karir)</h3>
                                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                        Pemetaan psikometrik minat kerja dan gaya pemecahan masalah ke dalam 3 jalur karir ASN: Jalur Kepemimpinan/Struktural, Fungsional Keahlian & Riset, serta Pelayanan/Operasional.
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-amber-800">
                                    Pemetaan Minat: 3 Rumpun Jabatan
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-blue-300 transition-all flex flex-col overflow-hidden">
                            <MacWindowControls title="Dimensi 4 — Potensi Kognitif" badge="LOGIKA & SPASIAL" />
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                                        <Brain className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900">Potensi Kognitif & Figural</h3>
                                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                        Evaluasi kapasitas berpikir dasar: silogisme logika kebijakan, deret keteraturan data, penalaran analitis hubungan berantai, serta tes spasial pola gambar figural.
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-800">
                                    Passing Grade: ≥ 70 Poin
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BEDAH KASUS INTERAKTIF (WINDOW MAC UNTUK PENJELASAN) */}
                <section id="simulasi" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                            Studi Kasus Asesmen
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1.5">
                            Bedah Kasus & Pembahasan Jawaban
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2.5">
                            Pahami cara berpikir penguji asesmen melalui analisis situasi dilematis dan rasionalisasi pembobotan nilai BKN.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        <button
                            onClick={() => setActiveTab('manajerial')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                activeTab === 'manajerial'
                                    ? 'bg-emerald-800 text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            Manajerial ASN
                        </button>
                        <button
                            onClick={() => setActiveTab('digital')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                activeTab === 'digital'
                                    ? 'bg-emerald-800 text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            Literasi Digital
                        </button>
                        <button
                            onClick={() => setActiveTab('karir')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                activeTab === 'karir'
                                    ? 'bg-emerald-800 text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            Preferensi Karir
                        </button>
                        <button
                            onClick={() => setActiveTab('potensi')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                activeTab === 'potensi'
                                    ? 'bg-emerald-800 text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            Potensi Kognitif
                        </button>
                    </div>

                    {/* Window Container: Question with Mac Controls */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                        <MacWindowControls
                            title={currentQ.windowTitle}
                            badge={currentQ.tag}
                        />

                        <div className="p-6 sm:p-8 space-y-6">
                            <div>
                                <span className="inline-block text-xs font-bold text-emerald-800 mb-1.5">
                                    {currentQ.title}
                                </span>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                                    {currentQ.soal}
                                </h3>
                            </div>

                            {/* Options */}
                            <div className="space-y-2.5">
                                {currentQ.pilihan.map((pil, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-colors ${
                                            idx === 1
                                                ? 'border-emerald-300 bg-emerald-50/70 text-slate-900 font-medium'
                                                : 'border-slate-200 bg-slate-50/60 text-slate-700'
                                        }`}
                                    >
                                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                                            idx === 1 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                                        }`}>
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="flex-1">{pil}</span>
                                        {idx === 1 && (
                                            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                                                Bobot Nilai 5
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Mac Window Inside Window for Explanation */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs">
                                <MacWindowControls
                                    title="Pembahasan & Rasionalisasi Jawaban BKN"
                                    badge="KUNCI UNGGUL"
                                />
                                <div className="p-4 sm:p-5 text-xs text-slate-700 space-y-2">
                                    <div className="font-bold text-slate-900 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        <span>Rekomendasi Jawaban: {currentQ.kunci}</span>
                                    </div>
                                    <p className="leading-relaxed">
                                        {currentQ.pembahasan}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NINE-BOX TALENT GRID SECTION */}
                <section id="ninebox" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-lg shadow-slate-900/5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                                    Manajemen Talenta Nasional
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 leading-tight">
                                    Memahami 9 Box SIMATA BKN
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                                    9 Box adalah alat dalam Manajemen Talenta untuk memetakan ASN berdasarkan <strong>KINERJA</strong> dan <strong>POTENSIAL</strong> sebagai dasar pengembangan, penugasan, dan rencana suksesi.
                                </p>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-[#15803d] text-white flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                                            9
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-xs sm:text-sm">Box 9: Kinerja Tinggi Potensial Tinggi (Talenta Unggul)</div>
                                            <div className="text-xs text-slate-500">Kinerja sangat baik dan potensi sangat tinggi. Prioritas utama promosi dan penugasan strategis.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-[#22d3ee] text-slate-950 flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                                            8
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-xs sm:text-sm">Box 8: Kinerja Sesuai Potensial Tinggi</div>
                                            <div className="text-xs text-slate-500">Kinerja sudah sesuai, potensi sangat tinggi untuk peran yang lebih besar.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-[#2dd4bf] text-slate-950 flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                                            7
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-xs sm:text-sm">Box 7: Kinerja Tinggi Potensial Menengah</div>
                                            <div className="text-xs text-slate-500">Kinerja sangat baik, potensi cukup untuk berkembang lebih tinggi.</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <a
                                        href="/tryout"
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-all shadow-md"
                                    >
                                        <span>Cek Kuadran Talenta Anda</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* 9 BOX SIMATA Visual Grid in Mac Window */}
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                                <MacWindowControls title="9 BOX SIMATA (Peta Talenta ASN)" badge="SIMATA" />
                                <div className="p-5 space-y-3">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
                                        <span>Sumbu Y: KINERJA</span>
                                        <span>Sumbu X: POTENSIAL</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                        {/* Row 1: Kinerja Tinggi */}
                                        <div className="p-3 rounded-xl bg-[#38bdf8] text-slate-950 font-bold border border-sky-300">
                                            <div className="font-black text-sm">Box 4</div>
                                            <div className="text-[10px] font-semibold mt-0.5">Tinggi - Rendah</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-[#2dd4bf] text-slate-950 font-bold border border-teal-300">
                                            <div className="font-black text-sm">Box 7</div>
                                            <div className="text-[10px] font-semibold mt-0.5">Tinggi - Menengah</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-[#15803d] text-white font-bold border border-emerald-600 ring-2 ring-amber-400 shadow-md">
                                            <div className="font-black text-sm">Box 9 🏆</div>
                                            <div className="text-[10px] font-black text-amber-300 mt-0.5">Talenta Unggul</div>
                                        </div>

                                        {/* Row 2: Kinerja Menengah */}
                                        <div className="p-3 rounded-xl bg-[#fcd34d] text-slate-950 font-bold border border-amber-300">
                                            <div className="font-black text-sm">Box 2</div>
                                            <div className="text-[10px] font-semibold mt-0.5">Sesuai - Rendah</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-[#93c5fd] text-slate-950 font-bold border border-blue-300">
                                            <div className="font-black text-sm">Box 5</div>
                                            <div className="text-[10px] font-semibold mt-0.5">Sesuai - Menengah</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-[#22d3ee] text-slate-950 font-bold border border-cyan-300">
                                            <div className="font-black text-sm">Box 8</div>
                                            <div className="text-[10px] font-semibold mt-0.5">Sesuai - Tinggi</div>
                                        </div>

                                        {/* Row 3: Kinerja Rendah */}
                                        <div className="p-3 rounded-xl bg-[#f87171] text-white font-bold border border-rose-300">
                                            <div className="font-black text-sm">Box 1</div>
                                            <div className="text-[10px] font-semibold mt-0.5">Rendah - Rendah</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-[#fb923c] text-white font-bold border border-orange-300">
                                            <div className="font-black text-sm">Box 3</div>
                                            <div className="text-[10px] font-semibold mt-0.5">Rendah - Menengah</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-[#c084fc] text-white font-bold border border-purple-300">
                                            <div className="font-black text-sm">Box 6</div>
                                            <div className="text-[10px] font-semibold mt-0.5">Rendah - Tinggi</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-center text-[11px] text-slate-500 font-bold">
                                        9 BOX MEMBANTU MEMBACA POSISI TALENTA ASN: KINERJA SAAT INI × POTENSI MASA DEPAN
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="relative z-10 border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-600">
                    <div className="flex items-center gap-3">
                        <AppLogoIcon className="size-8 shrink-0" />
                        <div>
                            <span className="font-black text-slate-900">ProASN<span className="text-emerald-600">.</span></span>
                            <span className="block text-[10px] text-slate-500">Civil Service Talent Assessment Platform</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 font-medium">
                        <a href="/tryout" className="hover:text-slate-900">Simulasi CAT</a>
                        <a href="/materi" className="hover:text-slate-900">Modul Kisi-Kisi</a>
                        <a href="/paket" className="hover:text-slate-900">Paket Akses</a>
                        <a href="/login" className="hover:text-slate-900">Masuk Akun</a>
                    </div>

                    <div className="text-[11px] text-slate-500">
                        © {new Date().getFullYear()} ProASN. Mengacu pada Standar Penilaian Kompetensi BKN.
                    </div>
                </div>
            </footer>
        </div>
    );
}
