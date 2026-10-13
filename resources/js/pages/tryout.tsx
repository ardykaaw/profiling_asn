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
    HelpCircle,
    Cpu,
    Brain,
    Users,
    Zap,
    ChevronRight,
    TrendingUp
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';

interface Question {
    id: number;
    kategori: 'MANAJERIAL' | 'DIGITAL' | 'EMERGING' | 'POTENSI' | string;
    category_name?: string;
    subkategori: string;
    soal: string;
    pilihan: string[];
    jawaban: number;
    scores?: number[];
    pembahasan: string;
}

const packages = [
    { 
        id: 'profiling-full', 
        title: 'Simulasi Lengkap Profiling ASN (Standar BKN)', 
        cat: 'SEMUA', 
        soal: 40, 
        durasi: 60, 
        badge: '4 Dimensi Penuh',
        desc: 'Simulasi komprehensif menguji seluruh dimensi: Manajerial, Literasi Digital, Emerging Skills, dan Potensi Kognitif.'
    },
    { 
        id: 'manajerial-drill', 
        title: 'Drill Kompetensi Manajerial & Sosio-Kultural', 
        cat: 'MANAJERIAL', 
        soal: 20, 
        durasi: 25, 
        badge: '8 Dimensi MenPAN-RB',
        desc: 'Latihan mendalam Situational Judgement Test (SJT) integritas, kerjasama, dan pelayanan publik.'
    },
    { 
        id: 'digital-drill', 
        title: 'Drill Literasi & Keamanan Digital ASN', 
        cat: 'DIGITAL', 
        soal: 15, 
        durasi: 20, 
        badge: 'SPBE & UU PDP',
        desc: 'Pemahaman keamanan informasi, pencegahan rekayasa sosial, dan etika komunikasi digital birokrasi.'
    },
    { 
        id: 'emerging-drill', 
        title: 'Drill Emerging Skills & Analytical Thinking', 
        cat: 'EMERGING', 
        soal: 15, 
        durasi: 20, 
        badge: 'Problem Solving',
        desc: 'Pengasahan ketajaman berpikir analitis, pemecahan masalah kompleks, dan scenario planning.'
    },
    { 
        id: 'potensi-drill', 
        title: 'Drill Potensi Kognitif & Figural Spasial', 
        cat: 'POTENSI', 
        soal: 15, 
        durasi: 20, 
        badge: 'Silogisme & Spasial',
        desc: 'Kapasitas dasar nalar kognitif, silogisme kebijakan, deret keteraturan, dan pola gambar figural.'
    },
];

interface TryOutPageProps {
    dbQuestions?: Question[];
    sessions?: any[];
    categories?: any[];
}

export default function TryOutPage({ dbQuestions = [], sessions = [], categories = [] }: TryOutPageProps) {
    const rawBank = dbQuestions && dbQuestions.length > 0 ? dbQuestions : [];

    const [mode, setMode] = useState<'list' | 'test' | 'result'>('list');
    const [selectedPackage, setSelectedPackage] = useState(packages[0]);
    const [activeQuestions, setActiveQuestions] = useState<Question[]>(rawBank);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(60 * 60);
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

        let filtered = [...rawBank];
        if (pkg.cat !== 'SEMUA') {
            filtered = rawBank.filter(q => q.kategori === pkg.cat);
        }

        if (filtered.length === 0) {
            filtered = rawBank;
        }

        setActiveQuestions(filtered);
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

    // Scores Calculation
    const scoresPerCategory: Record<string, { total: number; count: number }> = {
        MANAJERIAL: { total: 0, count: 0 },
        DIGITAL: { total: 0, count: 0 },
        EMERGING: { total: 0, count: 0 },
        POTENSI: { total: 0, count: 0 },
    };

    activeQuestions.forEach((q) => {
        const cat = q.kategori || 'MANAJERIAL';
        if (!scoresPerCategory[cat]) {
            scoresPerCategory[cat] = { total: 0, count: 0 };
        }
        scoresPerCategory[cat].count += 5;

        const choice = answers[q.id];
        if (choice !== undefined) {
            if (q.scores && Array.isArray(q.scores) && q.scores[choice] !== undefined) {
                scoresPerCategory[cat].total += Number(q.scores[choice]);
            } else if (choice === q.jawaban) {
                scoresPerCategory[cat].total += 5;
            }
        }
    });

    const normalizedScores: Record<string, number> = {};
    let totalScoreAll = 0;
    let totalMaxAll = 0;

    Object.keys(scoresPerCategory).forEach((cat) => {
        const { total, count } = scoresPerCategory[cat];
        const max = count > 0 ? count : 25;
        normalizedScores[cat] = Math.round((total / max) * 100);
        totalScoreAll += total;
        totalMaxAll += max;
    });

    const averagePercent = totalMaxAll > 0 ? Math.round((totalScoreAll / totalMaxAll) * 100) : 0;
    const isNineBoxStar = averagePercent >= 80;

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <Head title="Simulasi Asesmen Profiling ASN" />

            <div className="max-w-6xl mx-auto space-y-6">

                {/* =========================================================================
                    MODE 1: PACKAGE LISTING & HISTORY
                   ========================================================================= */}
                {mode === 'list' && (
                    <div className="space-y-8">
                        {/* Header Banner in Mac Window */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                            <MacWindowControls title="Ruang Uji Asesmen ASN" badge="STANDAR BKN" />
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>Standar Penilaian Kompetensi Manajemen Talenta</span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                        Pilih Paket Simulasi Uji Kompetensi
                                    </h1>
                                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                                        Latih kemampuan penyelesaian studi kasus situasi dilematis birokrasi, pilar literasi digital SPBE, serta uji nalar kognitif.
                                    </p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => startTest(packages[0])}
                                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs sm:text-sm font-bold shadow-md transition-all"
                                    >
                                        <Play className="w-4 h-4 fill-white" />
                                        <span>Mulai Simulasi Penuh</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Package Cards Grid */}
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Pilihan Modul Latihan Uji Kompetensi
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {packages.map((pkg) => (
                                    <div
                                        key={pkg.id}
                                        className="rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden"
                                    >
                                        <MacWindowControls title={pkg.title} badge={pkg.badge} />
                                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                            <div>
                                                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                                                    {pkg.title}
                                                </h3>
                                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                                    {pkg.desc}
                                                </p>
                                            </div>

                                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                    {pkg.durasi} Menit
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Award className="w-3.5 h-3.5 text-slate-400" />
                                                    {pkg.soal} Butir Soal
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => startTest(pkg)}
                                                className="w-full py-2.5 rounded-xl bg-slate-900 text-white hover:bg-emerald-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                                            >
                                                <span>Buka Simulasi Ini</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent History Table */}
                        {sessions && sessions.length > 0 && (
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
                                <MacWindowControls title="Riwayat Hasil Uji Asesmen Mandiri" badge={`${sessions.length} SESI TERAKHIR`} />
                                <div className="p-5 sm:p-6">
                                    <h3 className="font-bold text-sm text-slate-900 mb-4">Sesi Asesmen yang Telah Anda Selesaikan</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead>
                                                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                                                    <th className="py-2.5 px-3">Nama Paket</th>
                                                    <th className="py-2.5 px-3">Tanggal</th>
                                                    <th className="py-2.5 px-3">Predikat Talenta</th>
                                                    <th className="py-2.5 px-3">Skor Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                                {sessions.map((s, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50">
                                                        <td className="py-3 px-3 font-semibold text-slate-900">{s.title}</td>
                                                        <td className="py-3 px-3 text-slate-500">
                                                            {s.completed_at ? new Date(s.completed_at).toLocaleDateString('id-ID') : '-'}
                                                        </td>
                                                        <td className="py-3 px-3">
                                                            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                                {s.talent_quadrant || 'Memenuhi Syarat'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-3 font-bold text-slate-900">{s.total_score} Poin</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* =========================================================================
                    MODE 2: TEST ENGINE RUNNER
                   ========================================================================= */}
                {mode === 'test' && currentQ && (
                    <div className="space-y-6">
                        {/* Top Bar with Timer in Mac Window */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
                            <MacWindowControls title="Simulasi Ujian Sedang Berlangsung" badge="LEMBAR JAWABAN" />
                            <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setMode('list')}
                                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        <span>Kembali</span>
                                    </button>
                                    <div>
                                        <div className="font-bold text-xs sm:text-sm text-slate-900">{selectedPackage.title}</div>
                                        <div className="text-xs text-slate-500">
                                            Soal {currentIdx + 1} dari {activeQuestions.length} Butir
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-100 text-xs sm:text-sm font-bold text-slate-900">
                                        <Clock className="w-4 h-4 text-emerald-700 animate-pulse" />
                                        <span>Sisa Waktu: {formatTime(timeLeft)}</span>
                                    </div>
                                    <button
                                        onClick={finishTest}
                                        className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-colors"
                                    >
                                        Selesai & Evaluasi Rapor
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Grid: Question Left, Navigator Right */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Question Card in Mac Window (Cols 3) */}
                            <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden flex flex-col justify-between">
                                <MacWindowControls
                                    title={`Soal Nomor ${currentIdx + 1} — ${currentQ.category_name || currentQ.kategori}`}
                                    badge={currentQ.subkategori || 'UJI KOMPETENSI'}
                                />
                                <div className="p-6 sm:p-8 space-y-6 flex-1">
                                    <div>
                                        <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-3">
                                            {currentQ.kategori} • {currentQ.subkategori}
                                        </span>
                                        <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                                            {currentQ.soal}
                                        </p>
                                    </div>

                                    {/* Options */}
                                    <div className="space-y-3">
                                        {currentQ.pilihan?.map((pil, oIdx) => {
                                            const isSelected = answers[currentQ.id] === oIdx;
                                            return (
                                                <button
                                                    key={oIdx}
                                                    onClick={() => {
                                                        setAnswers((prev) => ({ ...prev, [currentQ.id]: oIdx }));
                                                    }}
                                                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 ${
                                                        isSelected
                                                            ? 'border-emerald-600 bg-emerald-50 text-slate-950 font-medium ring-2 ring-emerald-500/30 shadow-xs'
                                                            : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                                                    }`}
                                                >
                                                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                                                        isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                                                    }`}>
                                                        {String.fromCharCode(65 + oIdx)}
                                                    </span>
                                                    <span className="flex-1 leading-relaxed">{pil}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Navigation Arrows Bottom */}
                                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                                    <button
                                        disabled={currentIdx === 0}
                                        onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                                        className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-white flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        <span>Soal Sebelumnya</span>
                                    </button>
                                    <button
                                        disabled={currentIdx === activeQuestions.length - 1}
                                        onClick={() => setCurrentIdx((p) => Math.min(activeQuestions.length - 1, p + 1))}
                                        className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold disabled:opacity-40 hover:bg-emerald-800 flex items-center gap-2"
                                    >
                                        <span>Soal Berikutnya</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Question Navigation Palette in Mac Window (Cols 1) */}
                            <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden h-fit">
                                <MacWindowControls title="Daftar Nomor Soal" badge={`${Object.keys(answers).length}/${activeQuestions.length}`} />
                                <div className="p-4 space-y-3">
                                    <div className="text-xs font-semibold text-slate-500">
                                        Klik nomor untuk berpindah soal:
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {activeQuestions.map((q, qIndex) => {
                                            const isAnswered = answers[q.id] !== undefined;
                                            const isCurrent = currentIdx === qIndex;
                                            return (
                                                <button
                                                    key={q.id || qIndex}
                                                    onClick={() => setCurrentIdx(qIndex)}
                                                    className={`h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                                                        isCurrent
                                                            ? 'ring-2 ring-slate-900 bg-emerald-800 text-white'
                                                            : isAnswered
                                                            ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                                                            : 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                                >
                                                    {qIndex + 1}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* =========================================================================
                    MODE 3: RAPOR PROFILING RESULT & RADAR BREAKDOWN
                   ========================================================================= */}
                {mode === 'result' && (
                    <div className="space-y-6">
                        {/* Summary Header in Mac Window */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                            <MacWindowControls title="Laporan Rapor Hasil Evaluasi Asesmen" badge="HASIL UJI" />
                            <div className="p-6 sm:p-10 space-y-8">
                                <div className="text-center max-w-xl mx-auto space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                        <span>Rapor Profiling ASN Selesai</span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                                        Hasil Pemetaan Kompetensi Anda
                                    </h1>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        Berdasarkan 4 dimensi penilaian standar BKN, berikut adalah profil capaian kompetensi dan rekomendasi posisi Nine-Box Grid Anda.
                                    </p>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80">
                                        <div className="text-xs font-semibold text-slate-500">Skor Rata-Rata</div>
                                        <div className="text-3xl font-black text-slate-900 mt-1">{averagePercent} / 100</div>
                                        <div className="text-xs text-slate-500 mt-1">Capaian Menyeluruh</div>
                                    </div>
                                    <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/70">
                                        <div className="text-xs font-semibold text-emerald-800">Predikat Kuadran Talenta</div>
                                        <div className="text-xl font-black text-emerald-950 mt-1">
                                            {isNineBoxStar ? 'Box 9 (Bintang)' : 'Box 8 (Penampil Unggul)'}
                                        </div>
                                        <div className="text-xs text-emerald-800 mt-1 font-semibold">Memenuhi Standar Suksesi</div>
                                    </div>
                                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80">
                                        <div className="text-xs font-semibold text-slate-500">Durasi Pengerjaan</div>
                                        <div className="text-3xl font-black text-slate-900 mt-1">
                                            {formatTime((selectedPackage.durasi * 60) - timeLeft)}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">Waktu Pengerjaan</div>
                                    </div>
                                </div>

                                {/* 4 Dimension Breakdown */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                                        Capaian Nilai Per Dimensi Penilaian
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                                            <div className="font-bold text-xs text-slate-900">Manajerial & Sosbud</div>
                                            <div className="text-2xl font-black text-emerald-800 mt-1">
                                                {normalizedScores['MANAJERIAL'] || 85}%
                                            </div>
                                            <div className="text-xs text-emerald-700 mt-1">Level 4 (Mahir)</div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50">
                                            <div className="font-bold text-xs text-slate-900">Literasi Digital</div>
                                            <div className="text-2xl font-black text-purple-800 mt-1">
                                                {normalizedScores['DIGITAL'] || 80}%
                                            </div>
                                            <div className="text-xs text-purple-700 mt-1">Level 4 (Cakap SPBE)</div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                                            <div className="font-bold text-xs text-slate-900">Emerging Skills</div>
                                            <div className="text-2xl font-black text-amber-800 mt-1">
                                                {normalizedScores['EMERGING'] || 85}%
                                            </div>
                                            <div className="text-xs text-amber-700 mt-1">Level 4 (Optimal)</div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
                                            <div className="font-bold text-xs text-slate-900">Potensi Kognitif</div>
                                            <div className="text-2xl font-black text-blue-800 mt-1">
                                                {normalizedScores['POTENSI'] || 80}%
                                            </div>
                                            <div className="text-xs text-blue-700 mt-1">Level 4 (Tinggi)</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Buttons */}
                                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200">
                                    <button
                                        onClick={() => setShowExplanation(!showExplanation)}
                                        className="px-5 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-all flex items-center gap-2 shadow-md"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                        <span>{showExplanation ? 'Tutup Ulasan Soal' : 'Buka Pembahasan Soal'}</span>
                                    </button>
                                    <button
                                        onClick={() => setMode('list')}
                                        className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-all"
                                    >
                                        Kembali ke Beranda Simulasi
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Question Review */}
                        {showExplanation && (
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Ulasan Butir Soal & Pembahasan Kunci
                                </h3>
                                {activeQuestions.map((q, idx) => {
                                    const userChoice = answers[q.id];
                                    return (
                                        <div key={q.id || idx} className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
                                            <MacWindowControls
                                                title={`Pembahasan Soal Nomor ${idx + 1}`}
                                                badge={q.kategori}
                                            />
                                            <div className="p-5 sm:p-6 space-y-4 text-xs">
                                                <div className="font-bold text-slate-900 text-sm">
                                                    {idx + 1}. {q.soal}
                                                </div>

                                                <div className="space-y-2">
                                                    {q.pilihan?.map((pil, pIdx) => {
                                                        const isUser = userChoice === pIdx;
                                                        const isKey = q.jawaban === pIdx;
                                                        return (
                                                            <div
                                                                key={pIdx}
                                                                className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                                                                    isKey
                                                                        ? 'border-emerald-500 bg-emerald-50/80 font-semibold text-slate-900'
                                                                        : isUser
                                                                        ? 'border-red-300 bg-red-50 text-slate-800'
                                                                        : 'border-slate-200 bg-slate-50/60 text-slate-600'
                                                                }`}
                                                            >
                                                                <span className="font-bold">{String.fromCharCode(65 + pIdx)}.</span>
                                                                <span className="flex-1">{pil}</span>
                                                                {isKey && <span className="text-emerald-800 font-bold shrink-0">Kunci Terbaik</span>}
                                                                {isUser && !isKey && <span className="text-red-700 font-bold shrink-0">Pilihan Anda</span>}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Pembahasan Box */}
                                                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                                                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                        <span>Rasionalisasi Penilaian BKN:</span>
                                                    </div>
                                                    <p className="text-slate-700 leading-relaxed">{q.pembahasan}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
