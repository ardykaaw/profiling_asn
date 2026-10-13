import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Award, 
    Clock, 
    ArrowLeft, 
    ArrowRight, 
    CheckCircle2, 
    XCircle, 
    Sparkles, 
    Play, 
    RotateCcw,
    Bookmark,
    Filter,
    HelpCircle
} from 'lucide-react';

interface Question {
    id: number;
    kategori: 'TWK' | 'TIU' | 'TKP';
    subkategori: string;
    soal: string;
    pilihan: string[];
    jawaban: number;
    pembahasan: string;
}

const soalBank: Question[] = [
    {
        id: 1,
        kategori: 'TIU',
        subkategori: 'Numerik (Perbandingan)',
        soal: 'Jika 6 orang dapat menyelesaikan suatu pekerjaan dalam waktu 10 hari, berapa hari yang dibutuhkan jika pekerjaan tersebut dikerjakan oleh 4 orang dengan produktivitas yang sama?',
        pilihan: ['12 hari', '15 hari', '18 hari', '20 hari'],
        jawaban: 1,
        pembahasan: 'Perbandingan berbalik nilai: Beban kerja = 6 × 10 = 60 orang-hari. Dengan 4 orang: 60 ÷ 4 = 15 hari.',
    },
    {
        id: 2,
        kategori: 'TIU',
        subkategori: 'Verbal (Analogi)',
        soal: 'ABSEN : HADIR = GELAP : ...',
        pilihan: ['Malam', 'Terang', 'Siang', 'Cahaya'],
        jawaban: 1,
        pembahasan: 'Hubungan kata ini adalah antonim (lawan kata). Lawan kata dari ABSEN adalah HADIR, maka lawan kata dari GELAP adalah TERANG.',
    },
    {
        id: 3,
        kategori: 'TWK',
        subkategori: 'Pilar Negara (Pancasila)',
        soal: 'Sidang BPUPKI pertama yang secara khusus membahas usulan dasar negara Republik Indonesia berlangsung pada tanggal...',
        pilihan: ['29 Mei - 1 Juni 1945', '10 - 16 Juli 1945', '17 Agustus 1945', '18 Agustus 1945'],
        jawaban: 0,
        pembahasan: 'Sidang pertama BPUPKI (29 Mei - 1 Juni 1945) mendengarkan pidato Mohammad Yamin, Soepomo, dan Ir. Soekarno yang mencetuskan istilah Pancasila pada 1 Juni 1945.',
    },
    {
        id: 4,
        kategori: 'TIU',
        subkategori: 'Logika Silogisme',
        soal: 'Semua pejabat negara wajib melaporkan LHKPN. Sebagian alumni universitas X adalah pejabat negara. Kesimpulan yang sah adalah...',
        pilihan: [
            'Semua alumni universitas X wajib melaporkan LHKPN',
            'Sebagian alumni universitas X wajib melaporkan LHKPN',
            'Tidak ada alumni universitas X yang melaporkan LHKPN',
            'Semua pelapor LHKPN adalah alumni universitas X',
        ],
        jawaban: 1,
        pembahasan: 'Karena sebagian alumni universitas X adalah pejabat negara, dan semua pejabat negara wajib lapor LHKPN, maka sebagian alumni universitas X tersebut wajib melapor LHKPN.',
    },
    {
        id: 5,
        kategori: 'TKP',
        subkategori: 'Integritas ASN',
        soal: 'Anda mengetahui atasan langsung Anda meminta staf pengadaan memenangkan vendor kerabatnya dalam tender dinas. Sikap Anda adalah...',
        pilihan: [
            'Melaporkan dugaan konflik kepentingan ke Inspektorat / Whistleblowing System sesuai SOP',
            'Mendiamkan saja karena takut karir dan penilaian SKP Anda dipersulit',
            'Menceritakan hal tersebut kepada rekan kantor lain di kantin',
            'Ikut membantu vendor tersebut agar kecipratan apresiasi',
        ],
        jawaban: 0,
        pembahasan: 'Sikap berintegritas tinggi menuntut keberanian melapor secara formal melalui saluran pengawasan internal tanpa membuat kegaduhan non-prosedural (Skor 5).',
    },
    {
        id: 6,
        kategori: 'TWK',
        subkategori: 'UUD 1945',
        soal: 'Menurut Pasal 23A UUD 1945, pajak dan pungutan lain yang bersifat memaksa untuk keperluan negara diatur dengan...',
        pilihan: ['Peraturan Pemerintah', 'Undang-Undang', 'Keputusan Presiden', 'Peraturan Daerah'],
        jawaban: 1,
        pembahasan: 'Pasal 23A UUD 1945 berbunyi: "Pajak dan pungutan lain yang bersifat memaksa untuk keperluan negara diatur dengan undang-undang."',
    },
    {
        id: 7,
        kategori: 'TIU',
        subkategori: 'Deret Angka',
        soal: 'Tentukan suku berikutnya dari deret: 3, 7, 15, 31, 63, ...',
        pilihan: ['95', '125', '127', '135'],
        jawaban: 2,
        pembahasan: 'Pola deret: suku berikutnya = (suku sebelumnya × 2) + 1. Jadi, (63 × 2) + 1 = 126 + 1 = 127.',
    },
    {
        id: 8,
        kategori: 'TKP',
        subkategori: 'Pelayanan Publik Prima',
        soal: 'Saat jam pelayanan kantor hampir usai, seorang lansia datang tergesa-gesa dari desa jauh untuk mengurus dokumen penting. Sikap Anda...',
        pilihan: [
            'Tetap melayani lansia tersebut dengan ramah dan tuntas meskipun harus sedikit lembur',
            'Menolak dan memintanya datang kembali esok pagi sesuai jam operasional',
            'Menyuruhnya menemui petugas keamanan kantor',
            'Meminta biaya tambahan sebagai kompensasi lembur pelayanan',
        ],
        jawaban: 0,
        pembahasan: 'Orientasi pelayanan publik menomorsatukan empati dan kebutuhan masyarakat rentan di luar batas ketat jam kerja formal (Skor 5).',
    },
];

const packages = [
    { id: 'skd-full', title: 'Simulasi Lengkap SKD Mandiri (Standar BKN)', cat: 'SKD', soal: 110, durasi: 100, level: 'Standar 100 Menit' },
    { id: 'twk-intensif', title: 'Drill Soal TWK: 4 Pilar & Konstitusi', cat: 'TWK', soal: 30, durasi: 30, level: '30 Soal' },
    { id: 'tiu-numerik', title: 'Latihan TIU: Numerik, Silogisme & Analitis', cat: 'TIU', soal: 35, durasi: 35, level: '35 Soal' },
    { id: 'tkp-integritas', title: 'Simulasi TKP: Ber-AKHLAK & Anti-Radikalisme', cat: 'TKP', soal: 45, durasi: 45, level: '45 Soal Skala 1-5' },
    { id: 'skd-kilat', title: 'Simulasi Kilat Campuran Harian', cat: 'SKD', soal: 15, durasi: 15, level: 'Latihan Cepat' },
];

interface TryOutPageProps {
    dbQuestions?: Question[];
    sessions?: any[];
    categories?: any[];
}

export default function TryOutPage({ dbQuestions, sessions = [], categories = [] }: TryOutPageProps) {
    const rawBank = dbQuestions && dbQuestions.length > 0 ? dbQuestions : soalBank;

    const [mode, setMode] = useState<'list' | 'test' | 'result'>('list');
    const [activeTab, setActiveTab] = useState('Semua');
    const [selectedPackage, setSelectedPackage] = useState(packages[0]);
    const [activeQuestions, setActiveQuestions] = useState<Question[]>(rawBank);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(100 * 60);
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        if (mode !== 'test') return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    finishTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [mode]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const startTest = (pkg = packages[0]) => {
        setSelectedPackage(pkg);
        setAnswers({});
        setCurrentIdx(0);
        setShowExplanation(false);

        let filteredQuestions = [...rawBank];
        if (pkg.cat === 'TWK') {
            filteredQuestions = rawBank.filter(q => q.kategori === 'TWK');
        } else if (pkg.cat === 'TIU') {
            filteredQuestions = rawBank.filter(q => q.kategori === 'TIU');
        } else if (pkg.cat === 'TKP') {
            filteredQuestions = rawBank.filter(q => q.kategori === 'TKP');
        } else if (pkg.id === 'skd-kilat') {
            const twk = rawBank.filter(q => q.kategori === 'TWK').slice(0, 5);
            const tiu = rawBank.filter(q => q.kategori === 'TIU').slice(0, 5);
            const tkp = rawBank.filter(q => q.kategori === 'TKP').slice(0, 5);
            filteredQuestions = [...twk, ...tiu, ...tkp];
        } else {
            // Full 110 SKD
            filteredQuestions = rawBank;
        }

        setActiveQuestions(filteredQuestions);
        setTimeLeft(pkg.durasi * 60);
        setMode('test');
    };

    const finishTest = () => {
        try {
            router.post('/tryout', {
                title: selectedPackage.title + ' #' + ((sessions?.length || 0) + 1),
                answers: answers,
                time_spent: (selectedPackage.durasi * 60) - timeLeft,
            }, {
                preserveScroll: true,
                preserveState: true,
            });
        } catch (e) {
            console.error('Save session error:', e);
        }
        setMode('result');
    };

    const currentQ = activeQuestions[currentIdx] || activeQuestions[0] || rawBank[0];

    // Score calculations
    const answeredCount = Object.keys(answers).length;
    let twkScore = 0;
    let tiuScore = 0;
    let tkpScore = 0;
    let twkCorrect = 0;
    let tiuCorrect = 0;

    activeQuestions.forEach((q) => {
        const userChoice = answers[q.id];
        if (userChoice !== undefined) {
            if (q.kategori === 'TWK') {
                if (userChoice === q.jawaban) {
                    twkScore += 5;
                    twkCorrect++;
                }
            } else if (q.kategori === 'TIU') {
                if (userChoice === q.jawaban) {
                    tiuScore += 5;
                    tiuCorrect++;
                }
            } else if (q.kategori === 'TKP') {
                const sArray = (q.scores && q.scores.length === 5) ? q.scores : [5, 4, 3, 2, 1];
                tkpScore += (sArray[userChoice] ?? 3);
            }
        }
    });

    const totalScore = twkScore + tiuScore + tkpScore;
    const isTwkPassed = twkScore >= 65;
    const isTiuPassed = tiuScore >= 80;
    const isTkpPassed = tkpScore >= 166;
    const isOverallPassed = isTwkPassed && isTiuPassed && isTkpPassed;

    return (
        <>
            <Head title="Simulasi Try Out CAT CPNS" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* MODE 1: PACKAGE LIST */}
                {mode === 'list' && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-card to-card/60 border border-border shadow-sm">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] font-mono text-xs font-bold mb-2">
                                    <Sparkles className="size-3.5" />
                                    <span>Standar Resmi MenPAN-RB & BKN (110 Soal)</span>
                                </div>
                                <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                    Simulasi Try Out CAT BKN
                                </h1>
                                <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                                    Tersedia simulasi lengkap 110 butir soal (TWK, TIU, TKP) dengan timer 100 menit serta drill fokus per subtes ujian nasional.
                                </p>
                            </div>
                            <button
                                onClick={() => startTest(packages[0])}
                                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] shadow-sm transition-all flex items-center gap-2 shrink-0"
                            >
                                <Play className="size-4 fill-current" />
                                <span>Mulai Ujian Penuh (110 Soal)</span>
                            </button>
                        </div>

                        {/* Category filter */}
                        <div className="flex flex-wrap items-center gap-2">
                            {['Semua', 'SKD', 'TWK', 'TIU', 'TKP'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                        activeTab === tab
                                            ? 'bg-[#F0A500] text-[#0B1023] shadow-sm'
                                             : 'border border-border bg-card text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Package Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {packages
                                .filter((p) => activeTab === 'Semua' || p.cat === activeTab)
                                .map((pkg) => (
                                    <div
                                        key={pkg.id}
                                        className="p-6 rounded-2xl border border-border bg-card hover:border-[#F0A500]/50 transition-all card-hover flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-mono text-xs px-2.5 py-1 rounded-md font-bold bg-[#F0A500]/15 text-[#F0A500]">
                                                    {pkg.cat}
                                                </span>
                                                <span className="text-xs text-muted-foreground font-mono">
                                                    {pkg.level}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-base text-foreground mb-2">
                                                {pkg.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-6">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="size-3.5 text-[#F0A500]" />
                                                    {pkg.durasi} Menit
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Bookmark className="size-3.5 text-[#0EA5A0]" />
                                                    {pkg.soal} Soal
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => startTest(pkg)}
                                            className="w-full py-2.5 rounded-xl font-semibold text-xs border border-border bg-accent text-foreground hover:bg-[#F0A500] hover:text-[#0B1023] hover:border-[#F0A500] transition-all flex items-center justify-center gap-2"
                                        >
                                            <Play className="size-3.5 fill-current" />
                                            <span>Kerjakan Try Out</span>
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* MODE 2: EXAM SIMULATION (TESTING) */}
                {mode === 'test' && (
                    <div className="space-y-4">
                        {/* Top CAT Status Bar */}
                        <div className="p-4 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#F0A500]/15 text-[#F0A500]">
                                    {currentQ.kategori}
                                </span>
                                <span className="text-sm font-semibold text-foreground">
                                    Soal Nomor {currentIdx + 1} dari {activeQuestions.length}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-accent/40 font-mono text-sm font-bold text-[#F0A500]">
                                    <Clock className="size-4" />
                                    <span>{formatTime(timeLeft)}</span>
                                </div>
                                <button
                                    onClick={finishTest}
                                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#EF4444] text-white hover:bg-[#DC2626] transition-colors"
                                >
                                    Selesai Ujian
                                </button>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-4 gap-6">
                            {/* Question Body */}
                            <div className="lg:col-span-3 space-y-6 p-6 rounded-2xl border border-border bg-card">
                                <div className="text-xs text-muted-foreground font-mono">
                                    Topik: {currentQ.subkategori}
                                </div>

                                <p className="text-base md:text-lg leading-relaxed text-foreground font-medium">
                                    {currentQ.soal}
                                </p>

                                {/* Multiple choice ABCD */}
                                <div className="space-y-3 pt-2">
                                    {currentQ.pilihan.map((opt, i) => {
                                        const isChosen = answers[currentQ.id] === i;
                                        return (
                                            <div
                                                key={i}
                                                onClick={() => setAnswers({ ...answers, [currentQ.id]: i })}
                                                className={`p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                                                    isChosen
                                                        ? 'border-[#F0A500] bg-[#F0A500]/10 text-foreground font-medium shadow-sm'
                                                        : 'border-border bg-accent/20 hover:border-[#F0A500]/50 text-muted-foreground'
                                                }`}
                                            >
                                                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                                                    isChosen ? 'border-[#F0A500] bg-[#F0A500] text-[#0B1023]' : 'border-border'
                                                }`}>
                                                    {String.fromCharCode(65 + i)}
                                                </div>
                                                <span className="text-sm">{opt}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Instant explanation peek */}
                                <div className="pt-2 flex items-center justify-between">
                                    <button
                                        onClick={() => setShowExplanation(!showExplanation)}
                                        className="text-xs font-mono text-[#0EA5A0] hover:underline flex items-center gap-1"
                                    >
                                        <Sparkles className="size-3.5" />
                                        <span>{showExplanation ? 'Sembunyikan Kunci' : 'Lihat Kunci & Pembahasan'}</span>
                                    </button>
                                </div>

                                {showExplanation && (
                                    <div className="p-4 rounded-xl border border-border bg-accent/40 text-xs text-muted-foreground leading-relaxed animate-fade-up">
                                        <strong className="text-foreground">Kunci: {String.fromCharCode(65 + currentQ.jawaban)}. </strong>
                                        {currentQ.pembahasan}
                                    </div>
                                )}

                                {/* Bottom navigation */}
                                <div className="flex items-center justify-between pt-6 border-t border-border">
                                    <button
                                        disabled={currentIdx === 0}
                                        onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-card hover:bg-accent disabled:opacity-40 flex items-center gap-1.5"
                                    >
                                        <ArrowLeft className="size-3.5" />
                                        <span>Sebelumnya</span>
                                    </button>

                                    <span className="text-xs text-muted-foreground font-mono">
                                        {currentIdx + 1} / {activeQuestions.length}
                                    </span>

                                    <button
                                        disabled={currentIdx === activeQuestions.length - 1}
                                        onClick={() => setCurrentIdx((p) => Math.min(activeQuestions.length - 1, p + 1))}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] disabled:opacity-40 flex items-center gap-1.5"
                                    >
                                        <span>Selanjutnya</span>
                                        <ArrowRight className="size-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Question Palette Grid */}
                            <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                                <h4 className="font-semibold text-xs text-muted-foreground uppercase font-mono tracking-wider">
                                    NAVIGASI NOMOR SOAL
                                </h4>
                                <div className="grid grid-cols-5 gap-1.5 max-h-[480px] overflow-y-auto pr-1">
                                    {activeQuestions.map((q, i) => {
                                        const isAnswered = answers[q.id] !== undefined;
                                        const isCurrent = currentIdx === i;
                                        return (
                                            <button
                                                key={q.id}
                                                onClick={() => setCurrentIdx(i)}
                                                className={`h-8 rounded-lg font-mono text-xs font-bold transition-all ${
                                                    isCurrent
                                                        ? 'ring-2 ring-[#F0A500] text-[#F0A500] bg-[#F0A500]/15'
                                                        : isAnswered
                                                        ? 'bg-[#10B981] text-[#0B1023]'
                                                        : 'bg-accent/40 text-muted-foreground border border-border'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="pt-4 border-t border-border space-y-2 text-[11px] text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-[#10B981]" />
                                        <span>Sudah Dijawab ({answeredCount})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-accent/40 border border-border" />
                                        <span>Belum Dijawab ({activeQuestions.length - answeredCount})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODE 3: RESULT & REVIEW */}
                {mode === 'result' && (
                    <div className="space-y-6 max-w-4xl mx-auto w-full">
                        {/* Overall Result Banner */}
                        <div className={`p-8 rounded-2xl border text-center space-y-4 ${
                            isOverallPassed 
                                ? 'border-[#10B981]/50 bg-gradient-to-b from-[#10B981]/15 to-card' 
                                : 'border-[#F0A500]/50 bg-gradient-to-b from-[#F0A500]/15 to-card'
                        }`}>
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
                                isOverallPassed ? 'bg-[#10B981] text-[#0B1023]' : 'bg-[#F0A500] text-[#0B1023]'
                            }`}>
                                <Award className="size-8" />
                            </div>

                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-mono uppercase mb-2 ${
                                    isOverallPassed 
                                        ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40' 
                                        : 'bg-[#F0A500]/20 text-[#F0A500] border border-[#F0A500]/40'
                                }`}>
                                    {isOverallPassed ? '🎉 LULUS PASSING GRADE SKD' : '⚠️ BELUM MEMENUHI PASSING GRADE'}
                                </span>
                                <h2 className="font-display text-3xl font-bold text-foreground">
                                    Total Skor: <span className="text-[#F0A500]">{totalScore}</span> / 550
                                </h2>
                                <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1">
                                    {isOverallPassed 
                                        ? 'Selamat! Nilai kamu melampaui ambang batas nilai (passing grade) di ketiga subtes SKD nasional.' 
                                        : 'Kamu belum memenuhi ambang batas minimum di salah satu atau lebih subtes. Cek rincian di bawah untuk fokus belajar.'}
                                </p>
                            </div>

                            {/* 3 Subtest Breakdown Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
                                <div className="p-4 rounded-xl border border-border bg-card/80 text-left">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-mono text-xs font-bold text-[#F0A500]">TWK</span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isTwkPassed ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#EF4444]/20 text-[#EF4444]'}`}>
                                            {isTwkPassed ? 'LULUS' : 'GAGAL'}
                                        </span>
                                    </div>
                                    <p className="font-mono text-2xl font-bold text-foreground">{twkScore} <small className="text-xs text-muted-foreground font-normal">/ 150</small></p>
                                    <p className="text-[11px] text-muted-foreground mt-1">Passing Grade: 65</p>
                                </div>

                                <div className="p-4 rounded-xl border border-border bg-card/80 text-left">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-mono text-xs font-bold text-[#06B6D4]">TIU</span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isTiuPassed ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#EF4444]/20 text-[#EF4444]'}`}>
                                            {isTiuPassed ? 'LULUS' : 'GAGAL'}
                                        </span>
                                    </div>
                                    <p className="font-mono text-2xl font-bold text-foreground">{tiuScore} <small className="text-xs text-muted-foreground font-normal">/ 175</small></p>
                                    <p className="text-[11px] text-muted-foreground mt-1">Passing Grade: 80</p>
                                </div>

                                <div className="p-4 rounded-xl border border-border bg-card/80 text-left">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-mono text-xs font-bold text-[#8B5CF6]">TKP</span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isTkpPassed ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#EF4444]/20 text-[#EF4444]'}`}>
                                            {isTkpPassed ? 'LULUS' : 'GAGAL'}
                                        </span>
                                    </div>
                                    <p className="font-mono text-2xl font-bold text-foreground">{tkpScore} <small className="text-xs text-muted-foreground font-normal">/ 225</small></p>
                                    <p className="text-[11px] text-muted-foreground mt-1">Passing Grade: 166</p>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-center gap-3">
                                <button
                                    onClick={() => startTest(selectedPackage)}
                                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all flex items-center gap-2"
                                >
                                    <RotateCcw className="size-4" />
                                    <span>Ulangi Simulasi Ini</span>
                                </button>
                                <button
                                    onClick={() => setMode('list')}
                                    className="px-6 py-2.5 rounded-xl font-semibold text-xs border border-border bg-card text-foreground hover:bg-accent transition-all"
                                >
                                    Pilih Paket Lain
                                </button>
                            </div>
                        </div>

                        {/* Detailed question review */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground">
                                Pembahasan Soal Terperinci ({activeQuestions.length} Butir)
                            </h3>
                            {activeQuestions.map((q, idx) => {
                                const userChoice = answers[q.id];
                                const isAnswered = userChoice !== undefined;
                                const isCorrect = q.kategori === 'TKP' ? true : userChoice === q.jawaban;
                                
                                let pointText = '';
                                if (q.kategori === 'TKP') {
                                    const sArray = (q.scores && q.scores.length === 5) ? q.scores : [5, 4, 3, 2, 1];
                                    const pts = isAnswered ? sArray[userChoice] : 0;
                                    pointText = `+${pts} Poin (Skala 1-5)`;
                                } else {
                                    pointText = isCorrect ? '✓ Benar (+5 Poin)' : '✗ Salah (0 Poin)';
                                }

                                return (
                                    <div key={q.id} className="p-5 rounded-2xl border border-border bg-card space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F0A500]/15 text-[#F0A500]">
                                                    {q.kategori}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Nomor {idx + 1} • {q.subkategori}
                                                </span>
                                            </div>
                                            <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                                                q.kategori === 'TKP' 
                                                    ? 'bg-[#8B5CF6]/15 text-[#8B5CF6]' 
                                                    : isCorrect 
                                                    ? 'bg-[#10B981]/15 text-[#10B981]' 
                                                    : 'bg-[#EF4444]/15 text-[#EF4444]'
                                            }`}>
                                                {pointText}
                                            </span>
                                        </div>

                                        <p className="text-sm font-medium text-foreground">{q.soal}</p>

                                        {isAnswered && (
                                            <p className="text-xs text-muted-foreground">
                                                Jawaban Anda: <strong className="text-foreground">{String.fromCharCode(65 + userChoice)}</strong> ({q.pilihan[userChoice]})
                                            </p>
                                        )}

                                        <div className="p-3.5 rounded-xl bg-accent/30 text-xs text-muted-foreground leading-relaxed">
                                            {q.kategori !== 'TKP' && (
                                                <strong className="text-foreground">Kunci Jawaban: {String.fromCharCode(65 + q.jawaban)} ({q.pilihan[q.jawaban]}). </strong>
                                            )}
                                            {q.pembahasan}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

TryOutPage.layout = {
    breadcrumbs: [
        {
            title: 'Try Out CAT CPNS',
            href: '/tryout',
        },
    ],
};
