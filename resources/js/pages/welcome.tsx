import { useState, useEffect, type ReactNode } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Check, 
    ChevronDown, 
    Sparkles, 
    ArrowRight, 
    ShieldCheck, 
    Smartphone, 
    RotateCcw, 
    GraduationCap, 
    Clock, 
    TrendingUp, 
    Brain, 
    Target, 
    BookOpen, 
    CheckCircle2, 
    Menu, 
    X,
    CreditCard,
    Zap,
    BarChart3,
    Trophy,
    Bot,
    Crosshair,
    Monitor,
    Rocket,
    ExternalLink,
    KeyRound
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';

interface User {
    id: number;
    name: string;
    email: string;
    [key: string]: unknown;
}

interface SharedData {
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

const stats = [
    { value: '47.000+', label: 'Peserta Aktif' },
    { value: '12.500+', label: 'Soal Try Out' },
    { value: '94%', label: 'Tingkat Kelulusan' },
    { value: '380+', label: 'Modul Materi' },
];

const features: { icon: ReactNode; title: string; desc: string }[] = [
    {
        icon: <Zap className="size-5" />,
        title: 'Try Out Adaptif BKN',
        desc: 'Sistem soal adaptif berbasis CAT resmi BKN yang menyesuaikan tingkat kesulitan dengan kemampuan kamu secara real-time.',
    },
    {
        icon: <BarChart3 className="size-5" />,
        title: 'Analisis Mendalam & PG',
        desc: 'Laporan performa detail per subtes (TWK, TIU, TKP) lengkap dengan perbandingan passing grade resmi BKN.',
    },
    {
        icon: <BookOpen className="size-5" />,
        title: 'Materi Lengkap SKD & SKB',
        desc: 'Ribuan modul TWK, TIU, TKP, dan bidang teknis SKB dalam format video high-definition, PDF, dan ringkasan rumus cepat.',
    },
    {
        icon: <Monitor className="size-5" />,
        title: 'Simulasi CAT Real-Time',
        desc: 'Tampilan antarmuka ujian persis tes CASN resmi BKN dengan navigasi nomor soal, countdown timer, dan sistem penilaian akurat.',
    },
    {
        icon: <Bot className="size-5" />,
        title: 'Asisten AI 24/7',
        desc: 'Tanya jawab pembahasan soal tanpa batas dengan AI tutor yang menguasai seluruh materi dan kisi-kisi MenPAN-RB.',
    },
    {
        icon: <Crosshair className="size-5" />,
        title: 'Prediksi Kelulusan Formasi',
        desc: 'Algoritma machine learning memprediksi peluang lolos berdasarkan tren nilai formasi kementerian pilihanmu.',
    },
];

const sampleQuestions = [
    {
        kategori: 'TIU',
        sub: 'Kemampuan Numerik (Perbandingan)',
        soal: 'Sebuah proyek membutuhkan 8 pekerja untuk diselesaikan dalam 15 hari. Jika proyek harus selesai dalam 10 hari karena percepatan jadwal dinas, berapa pekerja tambahan yang diperlukan?',
        pilihan: [
            { text: '8 pekerja', correct: false },
            { text: '4 pekerja', correct: true },
            { text: '6 pekerja', correct: false },
            { text: '12 pekerja', correct: false },
        ],
        pembahasan: 'Perbandingan berbalik nilai: (8 pekerja × 15 hari) / 10 hari = 12 pekerja total. Pekerja tambahan yang diperlukan = 12 - 8 = 4 pekerja.',
    },
    {
        kategori: 'TWK',
        sub: 'Pilar Negara (UUD 1945)',
        soal: 'Berdasarkan Pasal 1 Ayat 3 Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, bentuk negara Indonesia ditegaskan sebagai...',
        pilihan: [
            { text: 'Negara Demokrasi Kerakyatan', correct: false },
            { text: 'Negara Hukum', correct: true },
            { text: 'Negara Kesatuan Presidensial', correct: false },
            { text: 'Negara Federasi Republik', correct: false },
        ],
        pembahasan: 'Pasal 1 Ayat (3) UUD 1945 secara tegas menyatakan bahwa: "Negara Indonesia adalah negara hukum." Perubahan ini disahkan pada Amandemen Ketiga tahun 2001.',
    },
    {
        kategori: 'TKP',
        sub: 'Jejaring Kerja & Integritas',
        soal: 'Anda dipindahtugaskan ke unit kerja baru yang memiliki beban kerja tinggi dan budaya komunikasi yang berbeda. Sikap terbaik Anda adalah...',
        pilihan: [
            { text: 'Segera beradaptasi, mempelajari SOP unit, dan berinisiatif membantu rekan tim kerja', correct: true },
            { text: 'Bekerja sesuai instruksi minimum sambil menunggu arahan detail dari pimpinan', correct: false },
            { text: 'Mengajukan permohonan mutasi kembali ke unit sebelumnya karena tidak cocok', correct: false },
            { text: 'Mengerjakan tugas mandiri tanpa banyak berkomunikasi dengan rekan lain', correct: false },
        ],
        pembahasan: 'Aspek kemampuan beradaptasi dan jejaring kerja menuntut calon ASN proaktif dalam menyesuaikan diri dengan tim baru demi kelancaran pelayanan publik (Skor 5).',
    },
];

const skdSubtests = [
    {
        code: 'TWK',
        name: 'Tes Wawasan Kebangsaan',
        pg: 65,
        maxScore: 150,
        soalCount: 30,
        color: '#F0A500',
        topics: ['Pancasila', 'UUD 1945', 'NKRI', 'Bhineka Tunggal Ika', 'Bela Negara', 'Bahasa Indonesia'],
    },
    {
        code: 'TIU',
        name: 'Tes Intelejensi Umum',
        pg: 80,
        maxScore: 175,
        soalCount: 35,
        color: '#0EA5A0',
        topics: ['Analogi', 'Silogisme', 'Analitis', 'Berhitung', 'Deret Angka', 'Perbandingan', 'Figural'],
    },
    {
        code: 'TKP',
        name: 'Tes Karakteristik Pribadi',
        pg: 166,
        maxScore: 225,
        soalCount: 45,
        color: '#8B5CF6',
        topics: ['Pelayanan Publik', 'Jejaring Kerja', 'Sosial Budaya', 'TIK', 'Profesionalisme', 'Anti Radikalisme'],
    },
];

const testimonials = [
    {
        name: 'Rizky Amalia, S.Tr.Ak',
        role: 'Lulus CPNS Kemenkeu 2024 (Peringkat 2)',
        avatar: 'RA',
        text: 'Berkat SiapCPNS saya lulus SKD dengan skor total 432, jauh melampaui passing grade. Sistem simulasi CAT-nya benar-benar 99% persis dengan ujian asli BKN!',
        score: '432 / 550',
    },
    {
        name: 'Budi Santoso, S.Kom',
        role: 'Lulus CPNS Kemendikbud 2024',
        avatar: 'BS',
        text: 'Fitur analisis kelemahan AI sangat membantu saya mendongkrak subtes TIU yang sebelumnya momok. Akhirnya tembus nilai TIU 145!',
        score: '418 / 550',
    },
    {
        name: 'Dewi Rahayu, S.Stat',
        role: 'Lulus CPNS BPS RI 2024 (Peringkat 1)',
        avatar: 'DR',
        text: 'Materi TWK dan pembahasannya sangat komprehensif tanpa hafalan membosankan. Belajar terstruktur 2 bulan sudah pede ikut ujian.',
        score: '441 / 550',
    },
];

// URL etalase resmi toko Lynk.id (dapat disesuaikan tautan resminya nanti)
const LYNK_ID_STORE_URL = 'https://lynk.id';

const plans = [
    {
        id: 'free',
        name: 'Demo Gratis',
        desc: 'Untuk mencoba format ujian CAT BKN dan simulasi awal.',
        badge: null,
        color: '#6B7BA4',
        features: [
            { text: '5x Sesi Try Out Simulasi SKD', ok: true },
            { text: '10 Modul Materi Dasar BKN', ok: true },
            { text: 'Kunci Jawaban & Skor BKN', ok: true },
            { text: 'Pembahasan Video Lengkap', ok: false },
            { text: 'Analisis AI & Prediksi Kelulusan', ok: false },
            { text: 'Akses Bank Soal Lengkap SKB', ok: false },
        ],
    },
    {
        id: 'basic',
        name: 'Akses Mandiri SKD',
        desc: 'Fondasi penting pejuang CPNS mandiri dengan bank soal lengkap.',
        badge: null,
        color: '#0EA5A0',
        features: [
            { text: 'Try Out SKD Standar BKN Tak Terbatas', ok: true },
            { text: '120 Modul Materi Lengkap', ok: true },
            { text: 'Pembahasan Soal Teks Detail', ok: true },
            { text: 'Ranking Nasional Real-Time', ok: true },
            { text: 'Analisis AI & Prediksi Skor', ok: false },
            { text: 'Mentoring Tatap Muka Online', ok: false },
        ],
    },
    {
        id: 'pro',
        name: 'Akses Komplit SKD & SKB',
        desc: 'Pilihan paling populer dengan fitur terlengkap kisi-kisi BKN.',
        badge: 'REKOMENDASI TERBAIK',
        color: '#F0A500',
        features: [
            { text: 'Try Out SKD & SKB Tak Terbatas', ok: true },
            { text: '380+ Modul Video & PDF Super Lengkap', ok: true },
            { text: 'Pembahasan Video oleh Alumni CPNS', ok: true },
            { text: 'Analisis AI Kelemahan & Rekomendasi Soal', ok: true },
            { text: 'Prediksi Kelulusan Formasi Instansi', ok: true },
            { text: 'Akses Grup Diskusi Komunitas Telegram', ok: true },
        ],
    },
    {
        id: 'premium',
        name: 'Akses VIP Mentoring',
        desc: 'Bimbingan intensif tatap muka daring sampai pengumuman NIP resmi.',
        badge: 'VIP BUNDLE',
        color: '#8B5CF6',
        features: [
            { text: 'Semua Fitur Paket Komplit', ok: true },
            { text: 'Mentoring Interaktif Live 2x Seminggu', ok: true },
            { text: 'Konsultasi 1-on-1 Pemilihan Formasi BKN', ok: true },
            { text: 'Simulasi Wawancara & Psikotes SKB', ok: true },
            { text: 'Akses Bank Soal VIP 15.000+ Butir', ok: true },
            { text: 'Garansi Uang Kembali 30 Hari', ok: true },
        ],
    },
];

const faqs = [
    {
        q: 'Apakah tampilan try out mirip dengan ujian CAT resmi BKN?',
        a: 'Ya, sistem simulasi SiapCPNS dirancang meniru 100% sistem CAT (Computer Assisted Test) Badan Kepegawaian Negara (BKN), lengkap dengan batas waktu otomatis, navigasi daftar soal, tombol ragu-ragu, serta format perhitungan skor TWK, TIU, dan TKP sesuai PermenPAN-RB terbaru.',
    },
    {
        q: 'Bagaimana sistem pembayaran SiapCPNS? Apakah ada biaya langganan bulanan?',
        a: 'Tidak ada biaya langganan bulanan maupun tahunan. SiapCPNS menggunakan sistem sekali bayar (One-Time Purchase) melalui etalase resmi kami di Lynk.id. Cukup bayar satu kali, Anda mendapatkan lisensi akses selamanya.',
    },
    {
        q: 'Bagaimana cara akun saya aktif setelah checkout di Lynk.id?',
        a: 'Saat checkout di Lynk.id, pastikan Anda menggunakan email yang aktif. Setelah transaksi berhasil, daftarkan akun di SiapCPNS dengan nama dan email yang sama. Sistem akan memverifikasi dan akun Anda langsung aktif tanpa perlu konfirmasi berbelit-belit.',
    },
    {
        q: 'Metode pembayaran apa saja yang didukung di Lynk.id?',
        a: 'Lynk.id mendukung seluruh metode pembayaran terpopuler di Indonesia: QRIS instan dari semua e-wallet (GoPay, OVO, Dana, ShopeePay), Transfer Virtual Account semua bank nasional (BCA, Mandiri, BRI, BNI), serta kartu debit/kredit.',
    },
    {
        q: 'Apakah soal dan materi diperbarui?',
        a: 'Ya, materi pembelajaran serta bank soal ujian nasional terus diperbarui secara berkala oleh tim pengajar kami sesuai kisi-kisi dan passing grade BKN teranyar tanpa dikenakan biaya tambahan apa pun.',
    },
];

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [annual, setAnnual] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(0);
    const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);
    const [timeSec, setTimeSec] = useState(2843); // 47m 23s

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSec((prev) => (prev > 0 ? prev - 1 : 3600));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTimer = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const currentQ = sampleQuestions[activeQuestionIdx];

    const handleSelectOption = (idx: number) => {
        setSelectedOption(idx);
        setShowExplanation(true);
    };

    const switchQuestion = (idx: number) => {
        setActiveQuestionIdx(idx);
        setSelectedOption(null);
        setShowExplanation(false);
    };

    return (
        <div className="min-h-screen bg-[#0B1023] text-[#EDF0FF] selection:bg-[#F0A500] selection:text-[#0B1023] font-sans antialiased">
            <Head title="SiapCPNS — Platform Persiapan Try Out & Materi CPNS Terbaik" />

            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1E2C4A]/80 bg-[#0B1023]/90 backdrop-blur-md transition-all">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-[#F0A500] flex items-center justify-center font-mono font-bold text-sm text-[#0B1023] shadow-md group-hover:scale-105 transition-transform">
                            CP
                        </div>
                        <span className="font-display text-xl font-bold text-[#EDF0FF] tracking-tight">
                            SiapCPNS<span className="text-[#F0A500]">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3C4]">
                        <a href="#fitur" className="hover:text-[#F0A500] transition-colors">Fitur Unggulan</a>
                        <a href="#simulasi" className="hover:text-[#F0A500] transition-colors">Simulasi CAT</a>
                        <a href="#materi" className="hover:text-[#F0A500] transition-colors">Kisi-Kisi SKD</a>
                        <a href="#paket" className="hover:text-[#F0A500] transition-colors">Akses Lynk.id</a>
                        <a href="#testimoni" className="hover:text-[#F0A500] transition-colors">Testimoni</a>
                        <a href="#faq" className="hover:text-[#F0A500] transition-colors">FAQ</a>
                    </div>

                    {/* Auth CTA Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {auth.user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={dashboard()}
                                    className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#141B2D] border border-[#1E2C4A] hover:border-[#F0A500] transition-all"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#F0A500] text-[#0B1023] font-bold text-xs flex items-center justify-center">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold text-[#EDF0FF]">
                                        Dashboard
                                    </span>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-sm font-medium px-4 py-2 text-[#94A3C4] hover:text-[#EDF0FF] transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={register()}
                                    className="text-sm font-semibold px-5 py-2 rounded-lg bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] hover:shadow-[0_0_20px_rgba(240,165,0,0.3)] transition-all"
                                >
                                    Mulai Gratis
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-[#94A3C4] hover:text-[#EDF0FF] focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>

                {/* Mobile Drawer */}
                {mobileOpen && (
                    <div className="md:hidden border-b border-[#1E2C4A] bg-[#0B1023] px-6 py-5 space-y-4 animate-fade-up">
                        <a 
                            href="#fitur" 
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm font-medium text-[#94A3C4] hover:text-[#F0A500]"
                        >
                            Fitur Unggulan
                        </a>
                        <a 
                            href="#simulasi" 
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm font-medium text-[#94A3C4] hover:text-[#F0A500]"
                        >
                            Simulasi CAT
                        </a>
                        <a 
                            href="#materi" 
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm font-medium text-[#94A3C4] hover:text-[#F0A500]"
                        >
                            Kisi-Kisi SKD
                        </a>
                        <a 
                            href="#paket" 
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm font-medium text-[#94A3C4] hover:text-[#F0A500]"
                        >
                            Akses Lynk.id
                        </a>
                        <a 
                            href="#faq" 
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm font-medium text-[#94A3C4] hover:text-[#F0A500]"
                        >
                            FAQ
                        </a>

                        <div className="pt-3 border-t border-[#1E2C4A] flex flex-col gap-2">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="w-full text-center py-2.5 rounded-lg bg-[#F0A500] text-[#0B1023] font-semibold text-sm"
                                >
                                    Buka Dashboard ({auth.user.name})
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="w-full text-center py-2 rounded-lg border border-[#1E2C4A] text-sm font-medium text-[#EDF0FF]"
                                    >
                                        Masuk ke Akun
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="w-full text-center py-2.5 rounded-lg bg-[#F0A500] text-[#0B1023] font-semibold text-sm"
                                    >
                                        Daftar Gratis Sekarang
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* HERO SECTION */}
            <header className="relative pt-32 pb-20 overflow-hidden">
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,160,23,0.12), transparent)' }}
                />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Notification Pill */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F0A500]/30 bg-[#F0A500]/10 mb-8 animate-fade-up">
                            <span className="w-2 h-2 rounded-full bg-[#F0A500] animate-pulse" />
                            <span className="font-mono text-xs font-semibold text-[#F0A500] tracking-wide">
                                CPNS 2025/2026 — Pendaftaran & Formasi Resmi Dibuka
                            </span>
                        </div>

                        {/* Title Display */}
                        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-tight font-normal mb-6 tracking-tight animate-fade-up">
                            Lolos CPNS<br />
                            <span className="gold-shimmer font-bold">Bukan Keberuntungan</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-[#94A3C4] leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up-delay">
                            Platform persiapan tes CPNS terlengkap dengan 12.500+ soal try out berbasis CAT resmi BKN, modul komprehensif, dan analisis AI — dirancang untuk membawa kamu lolos di percobaan pertama.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-2">
                            <Link
                                href={auth.user ? dashboard() : register()}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] hover:scale-105 shadow-[0_10px_30px_rgba(240,165,0,0.25)] transition-all flex items-center justify-center gap-2"
                            >
                                <span>{auth.user ? 'Buka Dashboard Saya' : 'Mulai Belajar Gratis'}</span>
                                <ArrowRight className="size-4" />
                            </Link>
                            <a
                                href="#simulasi"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-base border border-[#1E2C4A] text-[#EDF0FF] hover:border-[#F0A500] hover:bg-[#141B2D] transition-all"
                            >
                                Coba Simulasi Soal ↓
                            </a>
                        </div>

                        <p className="mt-5 text-xs text-[#6B7BA4] flex items-center justify-center gap-3">
                            <span className="flex items-center gap-1"><Check className="size-3 text-[#10B981]" /> Akses gratis 7 hari</span>
                            <span className="text-[#1E2C4A]">•</span>
                            <span className="flex items-center gap-1"><Check className="size-3 text-[#10B981]" /> Tanpa kartu kredit</span>
                            <span className="text-[#1E2C4A]">•</span>
                            <span className="flex items-center gap-1"><Check className="size-3 text-[#10B981]" /> Standar resmi BKN</span>
                        </p>
                    </div>

                    {/* LIVE INTERACTIVE TRYOUT PREVIEW CARD */}
                    <div id="simulasi" className="mt-16 rounded-2xl border border-[#1E2C4A] overflow-hidden shadow-2xl bg-[#141B2D] card-hover">
                        {/* Window Header */}
                        <div className="border-b border-[#1E2C4A] px-6 py-3.5 bg-[#0B1023]/60 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                                <span className="ml-3 font-mono text-xs text-[#6B7BA4] hidden sm:inline">
                                    Simulasi Try Out CAT SKD — Live Demo
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B1023] border border-[#1E2C4A]">
                                    <Clock className="size-3.5 text-[#F0A500]" />
                                    <span className="font-mono text-xs font-bold text-[#F0A500]">
                                        {formatTimer(timeSec)}
                                    </span>
                                </div>
                                <span className="font-mono text-xs text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                                    Server BKN Aktif
                                </span>
                            </div>
                        </div>

                        {/* Interactive CAT Window Body */}
                        <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
                            {/* Question and Options Area */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Subtest selector tabs */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {sampleQuestions.map((q, idx) => (
                                        <button
                                            key={q.kategori}
                                            onClick={() => switchQuestion(idx)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                                                activeQuestionIdx === idx
                                                    ? 'bg-[#F0A500] text-[#0B1023]'
                                                    : 'bg-[#0B1023] text-[#94A3C4] border border-[#1E2C4A] hover:border-[#F0A500]'
                                            }`}
                                        >
                                            {q.kategori} ({q.sub})
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0EA5A0]/15 text-[#0EA5A0] font-bold">
                                        SUBTES {currentQ.kategori} — SOAL #{activeQuestionIdx + 1} DARI 110
                                    </span>
                                    <span className="text-xs text-[#6B7BA4]">Klik salah satu pilihan untuk cek jawaban</span>
                                </div>

                                <p className="text-base md:text-lg leading-relaxed text-[#EDF0FF] font-medium">
                                    {currentQ.soal}
                                </p>

                                {/* Multiple Choice ABCD */}
                                <div className="space-y-3">
                                    {currentQ.pilihan.map((opt, i) => {
                                        const isSelected = selectedOption === i;
                                        const showResult = showExplanation;
                                        const isCorrect = opt.correct;

                                        let borderStyle = 'border-[#1E2C4A] bg-[#0B1023]';
                                        let letterBg = 'border-[#1E2C4A] text-[#6B7BA4]';

                                        if (isSelected) {
                                            borderStyle = 'border-[#F0A500] bg-[#F0A500]/10 shadow-[0_0_15px_rgba(240,165,0,0.15)]';
                                            letterBg = 'border-[#F0A500] bg-[#F0A500] text-[#0B1023] font-bold';
                                        }

                                        if (showResult && isCorrect) {
                                            borderStyle = 'border-[#10B981] bg-[#10B981]/15';
                                            letterBg = 'border-[#10B981] bg-[#10B981] text-[#0B1023] font-bold';
                                        } else if (showResult && isSelected && !isCorrect) {
                                            borderStyle = 'border-[#EF4444] bg-[#EF4444]/15';
                                            letterBg = 'border-[#EF4444] bg-[#EF4444] text-white font-bold';
                                        }

                                        return (
                                            <div
                                                key={i}
                                                onClick={() => handleSelectOption(i)}
                                                className={`answer-option p-3.5 rounded-xl border flex items-center gap-3.5 transition-all cursor-pointer ${borderStyle}`}
                                            >
                                                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-mono shrink-0 ${letterBg}`}>
                                                    {String.fromCharCode(65 + i)}
                                                </div>
                                                <span className={`text-sm md:text-base ${isSelected ? 'text-[#EDF0FF] font-medium' : 'text-[#94A3C4]'}`}>
                                                    {opt.text}
                                                </span>
                                                {showResult && isCorrect && (
                                                    <span className="ml-auto text-xs font-bold text-[#10B981] px-2 py-0.5 rounded bg-[#10B981]/20">
                                                        ✓ Benar
                                                    </span>
                                                )}
                                                {showResult && isSelected && !isCorrect && (
                                                    <span className="ml-auto text-xs font-bold text-[#EF4444] px-2 py-0.5 rounded bg-[#EF4444]/20">
                                                        ✗ Salah
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Explanation Box */}
                                {showExplanation && (
                                    <div className="p-4 rounded-xl bg-[#0B1023] border border-[#F0A500]/30 animate-fade-up">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles className="size-4 text-[#F0A500]" />
                                            <span className="font-mono text-xs font-bold text-[#F0A500] uppercase tracking-wider">
                                                Pembahasan Resmi & Trik Cepat
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#94A3C4] leading-relaxed">
                                            {currentQ.pembahasan}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Progress & Score Card */}
                            <div className="space-y-4">
                                <div className="p-5 rounded-xl border border-[#1E2C4A] bg-[#0B1023]">
                                    <p className="text-xs font-mono font-bold text-[#6B7BA4] uppercase tracking-wider mb-4">
                                        PROGRES SUBTES SKD
                                    </p>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1.5 font-mono">
                                                <span className="text-[#EDF0FF]">TWK (Passing Grade: 65)</span>
                                                <span className="text-[#10B981] font-bold">30/30 (Selesai)</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-[#1E2C4A] overflow-hidden">
                                                <div className="h-full rounded-full bg-[#10B981] w-full" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1.5 font-mono">
                                                <span className="text-[#EDF0FF]">TIU (Passing Grade: 80)</span>
                                                <span className="text-[#F0A500] font-bold">23/35</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-[#1E2C4A] overflow-hidden">
                                                <div className="h-full rounded-full bg-[#F0A500] w-[65%]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1.5 font-mono">
                                                <span className="text-[#EDF0FF]">TKP (Passing Grade: 166)</span>
                                                <span className="text-[#6B7BA4]">0/45</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-[#1E2C4A] overflow-hidden">
                                                <div className="h-full rounded-full bg-[#8B5CF6] w-[15%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#0B1023] text-center">
                                        <p className="font-mono text-2xl font-bold text-[#F0A500]">388</p>
                                        <p className="text-xs text-[#6B7BA4] mt-0.5">Estimasi Skor SKD</p>
                                        <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981]">
                                            ✓ Lolos PG
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#0B1023] text-center">
                                        <p className="font-mono text-2xl font-bold text-[#10B981]">#14</p>
                                        <p className="text-xs text-[#6B7BA4] mt-0.5">Ranking Nasional</p>
                                        <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-[#0EA5A0]/15 text-[#0EA5A0]">
                                            Top 1%
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl border border-[#F0A500]/20 bg-[#F0A500]/5 text-center">
                                    <p className="text-xs text-[#EDF0FF] font-medium mb-2">
                                        Ingin mencoba simulasi 110 soal penuh?
                                    </p>
                                    <Link
                                        href={auth.user ? '/tryout' : register()}
                                        className="inline-block w-full py-2 rounded-lg bg-[#F0A500] text-[#0B1023] font-bold text-xs hover:bg-[#FFD166] transition-colors"
                                    >
                                        Buka Simulasi Lengkap →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* STATS STRIP */}
            <section className="py-14 border-y border-[#1E2C4A] bg-[#0B1023]/60">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="font-display text-4xl sm:text-5xl font-bold text-[#F0A500] mb-1.5">
                                    {s.value}
                                </p>
                                <p className="text-sm font-medium text-[#94A3C4]">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="fitur" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl mb-16">
                        <p className="font-mono text-xs uppercase tracking-widest text-[#F0A500] font-bold mb-3">
                            Fitur Unggulan SiapCPNS
                        </p>
                        <h2 className="font-display text-4xl sm:text-5xl text-[#EDF0FF] mb-4">
                            Semua yang kamu butuhkan<br />
                            <span className="text-[#6B7BA4]">dalam satu ekosistem modern</span>
                        </h2>
                        <p className="text-base text-[#94A3C4] leading-relaxed">
                            Dirancang oleh alumni peraih skor tertinggi dan tim ahli tes psikometri CASN, platform ini membimbing kamu langkah demi langkah dari nol hingga pengumuman kelulusan.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="p-7 rounded-2xl border border-[#1E2C4A] bg-[#141B2D] card-hover group"
                            >
                                <div className="mb-4 p-3 w-fit rounded-xl bg-[#0B1023] border border-[#1E2C4A] text-[#F0A500] group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h3 className="font-semibold text-lg text-[#EDF0FF] mb-2 group-hover:text-[#F0A500] transition-colors">
                                    {f.title}
                                </h3>
                                <p className="text-sm text-[#94A3C4] leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SKD OVERVIEW SECTION */}
            <section id="materi" className="py-24 border-t border-[#1E2C4A] bg-[#141B2D]/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-widest text-[#0EA5A0] font-bold mb-3">
                                Standar Resmi BKN & MenPAN-RB
                            </p>
                            <h2 className="font-display text-4xl sm:text-5xl text-[#EDF0FF] mb-6">
                                Kuasai setiap<br />komponen ujian SKD
                            </h2>
                            <p className="text-base text-[#94A3C4] leading-relaxed mb-8">
                                Seleksi Kompetensi Dasar (SKD) memiliki 3 subtes dengan karakteristik, sistem bobot skor, dan passing grade yang berbeda. Jika gagal satu subtes saja meski total nilai tinggi, peserta tetap dinyatakan gugur.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mt-0.5">
                                        <Check className="size-3" />
                                    </div>
                                    <p className="text-sm text-[#94A3C4]">
                                        <strong className="text-[#EDF0FF]">TWK (30 Soal):</strong> Penilaian benar +5, salah 0. Fokus pada wawasan kebangsaan, integritas, dan bela negara.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mt-0.5">
                                        <Check className="size-3" />
                                    </div>
                                    <p className="text-sm text-[#94A3C4]">
                                        <strong className="text-[#EDF0FF]">TIU (35 Soal):</strong> Penilaian benar +5, salah 0. Menghafal rumus cepat logika silogisme, perbandingan, dan figural.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mt-0.5">
                                        <Check className="size-3" />
                                    </div>
                                    <p className="text-sm text-[#94A3C4]">
                                        <strong className="text-[#EDF0FF]">TKP (45 Soal):</strong> Nilai berjenjang 1 sampai 5. Tidak ada jawaban salah, butuh strategi memilih opsi skor 5.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={auth.user ? '/materi' : register()}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all shadow-md"
                            >
                                <span>Jelajahi Modul Materi Lengkap</span>
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>

                        {/* Breakdown Cards */}
                        <div className="space-y-4">
                            {skdSubtests.map((sub) => (
                                <div
                                    key={sub.code}
                                    className="p-6 rounded-2xl border border-[#1E2C4A] bg-[#141B2D] card-hover"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2.5">
                                                <span className="font-mono font-bold text-xl" style={{ color: sub.color }}>
                                                    {sub.code}
                                                </span>
                                                <span className="text-xs px-2 py-0.5 rounded font-mono bg-[#0B1023] border border-[#1E2C4A] text-[#94A3C4]">
                                                    {sub.soalCount} Soal • Maks {sub.maxScore}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[#EDF0FF] font-medium mt-1">
                                                {sub.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-mono text-[11px] text-[#6B7BA4] uppercase">Passing Grade</p>
                                            <p className="font-mono font-bold text-2xl" style={{ color: sub.color }}>
                                                {sub.pg}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {sub.topics.map((t) => (
                                            <span
                                                key={t}
                                                className="text-xs px-2.5 py-1 rounded-md bg-[#0B1023] border border-[#1E2C4A] text-[#94A3C4]"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ETALASE LYNK.ID & ACCESS SECTION */}
            <section id="paket" className="py-24 border-t border-[#1E2C4A]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <p className="font-mono text-xs uppercase tracking-widest text-[#F0A500] font-bold mb-3 flex items-center justify-center gap-1.5">
                            <Sparkles className="size-3.5" />
                            <span>BELI SEKALI • AKSES SELAMANYA</span>
                        </p>
                        <h2 className="font-display text-4xl sm:text-5xl text-[#EDF0FF] mb-4">
                            Dapatkan Akses SiapCPNS via Etalase Lynk.id
                        </h2>
                        <p className="text-base text-[#94A3C4] leading-relaxed mb-6">
                            Tanpa iuran atau biaya langganan bulanan. Cukup satu kali checkout di etalase resmi Lynk.id, akun Anda langsung mendapatkan hak akses penuh seumur hidup untuk seluruh simulasi CAT BKN, materi PDF, dan bank soal terupdate.
                        </p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#10B981]/40 bg-[#10B981]/10 text-xs text-[#10B981] font-semibold">
                            <ShieldCheck className="size-4" />
                            <span>Pembayaran Aman & Instan via QRIS, E-Wallet, & Virtual Account Bank di Lynk.id</span>
                        </div>
                    </div>

                    {/* 3 Step Visual Activation Flow */}
                    <div className="mb-16 p-6 md:p-8 rounded-2xl border border-[#1E2C4A] bg-[#141B2D]">
                        <p className="font-mono text-xs uppercase tracking-widest text-[#F0A500] font-bold mb-2 text-center">
                            CARA KERJA AKTIVASI AKSES
                        </p>
                        <h3 className="font-display text-xl text-center text-[#EDF0FF] font-bold mb-8">
                            3 Langkah Mudah Mulai Belajar & Try Out
                        </h3>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-xl border border-[#1E2C4A] bg-[#0B1023] flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-full bg-[#F0A500] text-[#0B1023] font-bold flex items-center justify-center font-mono mb-3 shadow-md">
                                    1
                                </div>
                                <h4 className="font-semibold text-sm text-[#EDF0FF] mb-1">
                                    Checkout di Lynk.id
                                </h4>
                                <p className="text-xs text-[#94A3C4] leading-relaxed">
                                    Pilih produk akses SiapCPNS di etalase Lynk.id resmi. Bayar praktis dengan QRIS atau Virtual Account bank.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl border border-[#1E2C4A] bg-[#0B1023] flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-full bg-[#0EA5A0] text-[#0B1023] font-bold flex items-center justify-center font-mono mb-3 shadow-md">
                                    2
                                </div>
                                <h4 className="font-semibold text-sm text-[#EDF0FF] mb-1">
                                    Daftarkan Akun SiapCPNS
                                </h4>
                                <p className="text-xs text-[#94A3C4] leading-relaxed">
                                    Buka menu pendaftaran dan gunakan Nama serta Email yang sama dengan data pembelian saat di Lynk.id.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl border border-[#1E2C4A] bg-[#0B1023] flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-full bg-[#10B981] text-[#0B1023] font-bold flex items-center justify-center font-mono mb-3 shadow-md">
                                    3
                                </div>
                                <h4 className="font-semibold text-sm text-[#EDF0FF] mb-1">
                                    Akses Langsung Terbuka
                                </h4>
                                <p className="text-xs text-[#94A3C4] leading-relaxed">
                                    Masuk ke akun Anda dan nikmati seluruh ribuan butir bank soal CAT BKN dan modul pembahasan selamanya!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Access Products Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {plans.map((plan) => {
                            const isPro = plan.id === 'pro';

                            return (
                                <div
                                    key={plan.id}
                                    className={`relative rounded-2xl border p-6 flex flex-col transition-all bg-[#141B2D] ${
                                        isPro
                                            ? 'border-[#F0A500] shadow-[0_0_35px_rgba(240,165,0,0.15)] ring-1 ring-[#F0A500]'
                                            : 'border-[#1E2C4A] hover:border-[#F0A500]/50'
                                    }`}
                                >
                                    {plan.badge && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full font-mono text-[10px] font-bold bg-[#F0A500] text-[#0B1023] tracking-wider uppercase shadow-md">
                                            {plan.badge}
                                        </div>
                                    )}

                                    <div className="mb-5">
                                        <h3 className="font-display text-2xl text-[#EDF0FF] mb-1">
                                            {plan.name}
                                        </h3>
                                        <p className="text-xs text-[#6B7BA4] min-h-[32px]">
                                            {plan.desc}
                                        </p>
                                    </div>

                                    {/* Lynk.id Price & Access Notice */}
                                    <div className="mb-6 p-4 rounded-xl bg-[#0B1023] border border-[#1E2C4A]">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[11px] font-mono text-[#F0A500] font-bold uppercase tracking-wider">
                                                Etalase Lynk.id
                                            </span>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] font-bold">
                                                {plan.id === 'free' ? 'Gratis' : 'One-Time'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#EDF0FF] font-semibold">
                                            {plan.id === 'free' ? 'Akses Uji Coba Terbuka' : 'Cek Harga & Promo Resmi'}
                                        </p>
                                        <p className="text-[11px] text-[#6B7BA4] mt-0.5">
                                            {plan.id === 'free' ? 'Daftar dan coba langsung' : 'Pembayaran & aktivasi instan di Lynk.id'}
                                        </p>
                                    </div>

                                    {/* Features Checklist */}
                                    <div className="space-y-3 mb-8 flex-1">
                                        {plan.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <span className={`text-xs mt-0.5 shrink-0 ${f.ok ? 'text-[#10B981]' : 'text-[#3B4666]'}`}>
                                                    {f.ok ? '✓' : '×'}
                                                </span>
                                                <span className={`text-xs leading-normal ${f.ok ? 'text-[#94A3C4]' : 'text-[#3B4666]'}`}>
                                                    {f.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {plan.id === 'free' ? (
                                        <Link
                                            href={auth.user ? '/dashboard' : register()}
                                            className="w-full py-3 rounded-xl font-semibold text-xs transition-all border border-[#1E2C4A] bg-[#0B1023] text-[#EDF0FF] hover:border-[#F0A500] text-center"
                                        >
                                            Coba Demo Gratis
                                        </Link>
                                    ) : (
                                        <a
                                            href={LYNK_ID_STORE_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full py-3 rounded-xl font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 ${
                                                isPro
                                                    ? 'bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] shadow-md'
                                                    : 'border border-[#1E2C4A] bg-[#0B1023] text-[#EDF0FF] hover:border-[#F0A500]'
                                            }`}
                                        >
                                            <span>Lihat di Etalase Lynk.id →</span>
                                            <ExternalLink className="size-3.5" />
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Quick Activation Bar */}
                    <div className="mb-20 p-5 rounded-2xl border border-[#F0A500]/30 bg-gradient-to-r from-[#F0A500]/10 via-[#141B2D] to-[#141B2D] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#F0A500]/20 text-[#F0A500] flex items-center justify-center shrink-0">
                                <KeyRound className="size-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#EDF0FF]">
                                    Sudah berhasil menyelesaikan checkout di etalase Lynk.id?
                                </p>
                                <p className="text-[11px] text-[#94A3C4]">
                                    Segera daftarkan akun SiapCPNS Anda dengan email pembelian yang sama untuk membuka seluruh akses.
                                </p>
                            </div>
                        </div>

                        <Link
                            href={auth.user ? '/dashboard' : register()}
                            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all whitespace-nowrap"
                        >
                            Aktivasi / Buat Akun Sekarang →
                        </Link>
                    </div>

                    {/* Comparison Table */}
                    <div className="mb-20">
                        <h3 className="font-display text-3xl text-center text-[#EDF0FF] mb-8">
                            Tabel Perbandingan Hak Akses Fitur
                        </h3>
                        <div className="rounded-2xl border border-[#1E2C4A] overflow-x-auto bg-[#141B2D]">
                            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
                                <thead>
                                    <tr className="border-b border-[#1E2C4A] bg-[#0B1023]/60">
                                        <th className="p-4 font-medium text-[#94A3C4] w-2/5">Fitur Lengkap</th>
                                        <th className="p-4 font-mono font-bold text-center text-[#6B7BA4]">Gratis</th>
                                        <th className="p-4 font-mono font-bold text-center text-[#0EA5A0]">Mandiri SKD</th>
                                        <th className="p-4 font-mono font-bold text-center text-[#F0A500] bg-[#F0A500]/5">Komplit SKD+SKB</th>
                                        <th className="p-4 font-mono font-bold text-center text-[#8B5CF6]">Premium VIP</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1E2C4A]">
                                    {[
                                        { name: 'Jumlah Sesi Simulasi Try Out CAT', val: ['5x Sesi', 'Tak Terbatas', 'Tak Terbatas', 'Tak Terbatas'] },
                                        { name: 'Bank Soal SKD & SKB', val: ['500 Soal', '3.500 Soal', '12.500+ Soal', '15.000+ Soal VIP'] },
                                        { name: 'Modul Video & PDF', val: ['10 Modul', '120 Modul', '380+ Modul', '380+ Modul'] },
                                        { name: 'Sistem CAT Standar BKN', val: ['✓', '✓', '✓', '✓'] },
                                        { name: 'Pembahasan Video Alumni', val: ['✗', '✗', '✓', '✓'] },
                                        { name: 'Analisis AI & Prediksi Lolos', val: ['✗', '✗', '✓', '✓'] },
                                        { name: 'Komunitas Belajar Telegram', val: ['✗', '✗', '✓', '✓'] },
                                        { name: 'Mentoring Tatap Muka Online', val: ['✗', '✗', '✗', '2x Seminggu'] },
                                        { name: 'Garansi Uang Kembali 30 Hari', val: ['—', '—', '✓', '✓'] },
                                    ].map((row, ri) => (
                                        <tr key={ri} className="hover:bg-[#0B1023]/40 transition-colors">
                                            <td className="p-4 text-[#EDF0FF] text-xs font-medium">{row.name}</td>
                                            {row.val.map((v, i) => (
                                                <td
                                                    key={i}
                                                    className={`p-4 text-center font-mono text-xs ${
                                                        i === 2 ? 'bg-[#F0A500]/5 font-semibold text-[#F0A500]' : 'text-[#94A3C4]'
                                                    } ${v === '✓' ? 'text-[#10B981]' : v === '✗' ? 'text-[#4B5680]' : ''}`}
                                                >
                                                    {v}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#1E2C4A] text-center">
                        <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#141B2D]">
                            <ShieldCheck className="size-8 mx-auto mb-2 text-[#F0A500]" />
                            <p className="font-semibold text-sm text-[#EDF0FF] mb-0.5">Pembayaran Aman</p>
                            <p className="text-xs text-[#6B7BA4]">Terenkripsi SSL 256-bit</p>
                        </div>
                        <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#141B2D]">
                            <RotateCcw className="size-8 mx-auto mb-2 text-[#10B981]" />
                            <p className="font-semibold text-sm text-[#EDF0FF] mb-0.5">Garansi 30 Hari</p>
                            <p className="text-xs text-[#6B7BA4]">Uang kembali jika tidak puas</p>
                        </div>
                        <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#141B2D]">
                            <Smartphone className="size-8 mx-auto mb-2 text-[#0EA5A0]" />
                            <p className="font-semibold text-sm text-[#EDF0FF] mb-0.5">Multi-Platform</p>
                            <p className="text-xs text-[#6B7BA4]">Laptop, tablet & smartphone</p>
                        </div>
                        <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#141B2D]">
                            <GraduationCap className="size-8 mx-auto mb-2 text-[#8B5CF6]" />
                            <p className="font-semibold text-sm text-[#EDF0FF] mb-0.5">47.000+ Alumni</p>
                            <p className="text-xs text-[#6B7BA4]">Tersebar di kementerian RI</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section id="testimoni" className="py-24 border-t border-[#1E2C4A] bg-[#141B2D]/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="font-mono text-xs uppercase tracking-widest text-[#F0A500] font-bold mb-3">
                            Kisah Sukses Pejuang NIP
                        </p>
                        <h2 className="font-display text-4xl sm:text-5xl text-[#EDF0FF]">
                            Mereka sudah membuktikannya
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div
                                key={t.name}
                                className="p-7 rounded-2xl border border-[#1E2C4A] bg-[#141B2D] card-hover flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-3.5 mb-5">
                                        <div className="w-11 h-11 rounded-full bg-[#F0A500] text-[#0B1023] font-bold text-sm flex items-center justify-center shadow-md">
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-[#EDF0FF]">{t.name}</p>
                                            <p className="text-xs text-[#6B7BA4]">{t.role}</p>
                                        </div>
                                        <div className="ml-auto px-2.5 py-1 rounded-md font-mono text-xs font-bold bg-[#10B981]/15 text-[#10B981]">
                                            {t.score}
                                        </div>
                                    </div>
                                    <div className="text-[#F0A500] text-sm tracking-wider mb-3">
                                        ★★★★★
                                    </div>
                                    <p className="text-sm text-[#94A3C4] leading-relaxed italic">
                                        "{t.text}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq" className="py-24 border-t border-[#1E2C4A]">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="font-mono text-xs uppercase tracking-widest text-[#0EA5A0] font-bold mb-3">
                            Pertanyaan Umum
                        </p>
                        <h2 className="font-display text-4xl sm:text-5xl text-[#EDF0FF]">
                            Hal yang sering ditanyakan
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => {
                            const isOpen = activeFaq === i;
                            return (
                                <div
                                    key={i}
                                    className="rounded-xl border border-[#1E2C4A] bg-[#141B2D] overflow-hidden transition-all"
                                >
                                    <button
                                        onClick={() => setActiveFaq(isOpen ? null : i)}
                                        className="w-full p-5 flex items-center justify-between text-left text-sm font-semibold text-[#EDF0FF] hover:text-[#F0A500] transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <span
                                            className={`text-xl font-mono text-[#F0A500] transition-transform duration-200 shrink-0 ml-4 ${
                                                isOpen ? 'rotate-45' : 'rotate-0'
                                            }`}
                                        >
                                            +
                                        </span>
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 pb-5 text-sm text-[#94A3C4] leading-relaxed border-t border-[#1E2C4A]/40 pt-3 animate-fade-up">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* HIGH-CONVERTING CTA BANNER */}
            <section className="py-20 border-t border-[#1E2C4A] bg-radial from-[#F0A500]/10 to-transparent">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="p-10 sm:p-14 rounded-3xl border border-[#F0A500]/40 bg-[#141B2D] relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="font-display text-4xl sm:text-5xl text-[#EDF0FF] mb-4">
                                Mulai perjalananmu menjadi<br />
                                <span className="gold-shimmer font-bold">Aparatur Sipil Negara 2025</span>
                            </h2>
                            <p className="text-base sm:text-lg text-[#94A3C4] max-w-xl mx-auto mb-8">
                                Gabung bersama 47.000+ peserta lain. Persiapkan dirimu lebih awal agar tidak kaget saat hari H ujian BKN.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] hover:scale-105 shadow-[0_10px_30px_rgba(240,165,0,0.3)] transition-all"
                                >
                                    Daftar Sekarang — Gratis 7 Hari
                                </Link>
                                <Link
                                    href={auth.user ? dashboard() : login()}
                                    className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-base border border-[#1E2C4A] text-[#EDF0FF] hover:border-[#F0A500] hover:bg-[#0B1023] transition-all"
                                >
                                    {auth.user ? 'Buka Dashboard' : 'Masuk ke Akun'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 border-t border-[#1E2C4A] bg-[#0B1023]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#F0A500] flex items-center justify-center font-mono font-bold text-xs text-[#0B1023]">
                            CP
                        </div>
                        <span className="font-display text-lg font-bold text-[#EDF0FF]">
                            SiapCPNS<span className="text-[#F0A500]">.</span>
                        </span>
                        <span className="text-xs text-[#6B7BA4] ml-2">
                            © 2025 SiapCPNS Indonesia. Hak cipta dilindungi undang-undang.
                        </span>
                    </div>

                    <div className="flex gap-6 text-xs text-[#6B7BA4]">
                        <a href="#fitur" className="hover:text-[#F0A500] transition-colors">Fitur</a>
                        <a href="#materi" className="hover:text-[#F0A500] transition-colors">Kisi-kisi</a>
                        <a href="#paket" className="hover:text-[#F0A500] transition-colors">Akses Lynk.id</a>
                        <a href="#faq" className="hover:text-[#F0A500] transition-colors">Bantuan</a>
                    </div>
                </div>
            </footer>

            {/* PAYMENT METHODS DEMO MODAL */}
            {selectedPlanModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-up">
                    <div className="w-full max-w-md rounded-2xl border border-[#1E2C4A] bg-[#141B2D] p-6 sm:p-8 shadow-2xl relative">
                        <button
                            onClick={() => setSelectedPlanModal(null)}
                            className="absolute top-4 right-4 text-[#6B7BA4] hover:text-[#EDF0FF] p-1"
                        >
                            <X className="size-5" />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#F0A500]/15 flex items-center justify-center mx-auto mb-3 text-2xl">
                                🚀
                            </div>
                            <h3 className="font-display text-2xl text-[#EDF0FF] mb-1">
                                Aktifkan Paket {selectedPlanModal}
                            </h3>
                            <p className="text-xs text-[#94A3C4]">
                                Pilih metode pembayaran otomatis untuk aktivasi instan
                            </p>
                        </div>

                        <div className="space-y-2.5 mb-6">
                            {[
                                { name: 'Transfer Virtual Account (BCA, Mandiri, BRI, BNI)', tag: 'Otomatis' },
                                { name: 'QRIS (GoPay, OVO, ShopeePay, DANA, LinkAja)', tag: 'Instan' },
                                { name: 'Kartu Kredit / Debit Visa & Mastercard', tag: 'Aman' },
                            ].map((method) => (
                                <div
                                    key={method.name}
                                    className="p-3.5 rounded-xl border border-[#1E2C4A] bg-[#0B1023] hover:border-[#F0A500] cursor-pointer flex items-center justify-between transition-all"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-[#F0A500]" />
                                        <span className="text-xs text-[#EDF0FF] font-medium">{method.name}</span>
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0A500]/15 text-[#F0A500]">
                                        {method.tag}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <Link
                                href={auth.user ? '/paket' : register()}
                                className="flex-1 py-3 rounded-xl font-bold text-xs bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] text-center transition-all"
                            >
                                Lanjutkan Pembayaran →
                            </Link>
                            <button
                                onClick={() => setSelectedPlanModal(null)}
                                className="px-5 py-3 rounded-xl border border-[#1E2C4A] text-xs font-semibold text-[#94A3C4] hover:text-[#EDF0FF] transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
