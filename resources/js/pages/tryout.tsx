import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Award, 
    Clock, 
    ArrowLeft, 
    ArrowRight, 
    CheckCircle2, 
    Sparkles, 
    Play, 
    RotateCcw,
    HelpCircle,
    Brain,
    Users,
    Zap,
    Briefcase,
    ShieldCheck,
    Layers,
    BarChart3,
    Printer,
    Compass
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';

interface Question {
    id: number;
    kategori: 'POTENSI' | 'MANAJERIAL' | 'DIGITAL' | 'KARIR' | string;
    category_name?: string;
    subkategori: string;
    soal: string;
    pilihan: string[];
    jawaban: number;
    scores?: number[] | string[];
    pembahasan: string;
}

interface CareerBreakdown {
    dominant: string;
    recommendation: string;
    tally: {
        STRUKTURAL: number;
        FUNGSIONAL: number;
        OPERASIONAL: number;
    };
    percentages: {
        struktural: number;
        fungsional: number;
        operasional: number;
    };
    roles: {
        STRUKTURAL: string[];
        FUNGSIONAL: string[];
        OPERASIONAL: string[];
    };
}

const packages = [
    { 
        id: 'profiling-full', 
        title: 'Simulasi Lengkap Profiling ASN (Standar BKN)', 
        cat: 'SEMUA', 
        soal: 29, 
        durasi: 50, 
        badge: '4 Subtes Penuh',
        desc: 'Simulasi menyeluruh mencakup 4 subtes resmi: Tes Potensi, Manajerial & Sosio Kultural, Literasi Digital, dan Preferensi Tripatha Karir.'
    },
    { 
        id: 'potensi-drill', 
        title: 'Drill Subtes 1: Tes Potensi Kognitif & Figural', 
        cat: 'POTENSI', 
        soal: 11, 
        durasi: 20, 
        badge: 'Kognitif & Figural',
        desc: 'Latihan nalar silogisme kebijakan, deret keteraturan numerik, analogi konsep, penalaran spasial, dan analitis data.'
    },
    { 
        id: 'emerging-drill', 
        title: 'Drill Khusus: Emerging Skills & Analytical Thinking', 
        cat: 'EMERGING', 
        soal: 5, 
        durasi: 15, 
        badge: 'Problem Solving',
        desc: 'Ketajaman berpikir analitis, scenario planning risiko, adaptabilitas AI di birokrasi, dan triangulasi data kebijakan publik.'
    },
    { 
        id: 'manajerial-drill', 
        title: 'Drill Subtes 2: Manajerial & Sosio-Kultural (SJT MenPAN-RB)', 
        cat: 'MANAJERIAL', 
        soal: 6, 
        durasi: 15, 
        badge: '8 Dimensi PermenPAN-RB',
        desc: 'Situational Judgement Test (SJT) integritas, kerjasama, orientasi hasil, komunikasi, dan perekat bangsa skala nilai 1–5.'
    },
    { 
        id: 'digital-drill', 
        title: 'Drill Subtes 3: Literasi & Keamanan Digital ASN', 
        cat: 'DIGITAL', 
        soal: 6, 
        durasi: 15, 
        badge: 'SPBE & UU PDP',
        desc: 'Uji kecakapan kolaborasi cloud, mitigasi phishing siber kedinasan, pelindungan data pribadi (UU PDP), dan budaya digital.'
    },
    { 
        id: 'karir-drill', 
        title: 'Drill Subtes 4: Preferensi Karir (Tripatha Karir ASN)', 
        cat: 'KARIR', 
        soal: 6, 
        durasi: 15, 
        badge: 'Tripatha Karir',
        desc: 'Pemetaan psikometrik minat kerja dan gaya pemecahan masalah: Jalur Kepemimpinan/Struktural, Fungsional Keahlian, atau Operasional.'
    },
];

interface TryOutPageProps {
    dbQuestions?: Question[];
    sessions?: any[];
    categories?: any[];
}

export default function TryOutPage({ dbQuestions = [], sessions = [] }: TryOutPageProps) {
    const rawBank = dbQuestions && dbQuestions.length > 0 ? dbQuestions : [];

    const [mode, setMode] = useState<'list' | 'test' | 'result'>('list');
    const [selectedPackage, setSelectedPackage] = useState(packages[0]);
    const [activeQuestions, setActiveQuestions] = useState<Question[]>(rawBank);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(45 * 60);
    const [showExplanation, setShowExplanation] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<string>('SEMUA');

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

    const startTest = (pkg: typeof packages[0]) => {
        setSelectedPackage(pkg);
        let filtered: Question[] = [];
        if (pkg.cat === 'SEMUA') {
            filtered = rawBank;
        } else if (pkg.cat === 'EMERGING') {
            filtered = rawBank.filter((q) => q.subkategori && q.subkategori.includes('Emerging Skills'));
        } else {
            filtered = rawBank.filter((q) => q.kategori === pkg.cat);
        }

        if (filtered.length === 0) {
            filtered = rawBank;
        }

        setActiveQuestions(filtered);
        setCurrentIdx(0);
        setAnswers({});
        setTimeLeft(pkg.durasi * 60);
        setShowExplanation(false);
        setCategoryFilter('SEMUA');
        setMode('test');
    };

    const handleSelectOption = (qId: number, optIdx: number) => {
        setAnswers((prev) => ({
            ...prev,
            [qId]: optIdx,
        }));
    };

    const finishTest = () => {
        router.post(
            '/tryout',
            {
                title: selectedPackage.title,
                answers: answers,
                time_spent: selectedPackage.durasi * 60 - timeLeft,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setMode('result');
                },
                onError: () => {
                    setMode('result');
                },
            }
        );
    };

    const currentQ = activeQuestions[currentIdx];

    // Compute live client-side scores for fallback & instant feedback
    const scoresPerCategory: Record<string, { total: number; count: number }> = {
        POTENSI: { total: 0, count: 0 },
        MANAJERIAL: { total: 0, count: 0 },
        DIGITAL: { total: 0, count: 0 },
        KARIR: { total: 0, count: 0 },
    };

    let strukturalTally = 0;
    let fungsionalTally = 0;
    let operasionalTally = 0;
    let totalKarirAnswers = 0;

    activeQuestions.forEach((q) => {
        const cat = q.kategori || 'POTENSI';
        if (!scoresPerCategory[cat]) {
            scoresPerCategory[cat] = { total: 0, count: 0 };
        }
        scoresPerCategory[cat].count += 5;

        const userChoice = answers[q.id];
        if (userChoice !== undefined) {
            if (cat === 'KARIR') {
                totalKarirAnswers++;
                if (userChoice === 0) strukturalTally++;
                else if (userChoice === 1) fungsionalTally++;
                else if (userChoice === 2) operasionalTally++;
                else fungsionalTally++;
                scoresPerCategory[cat].total += 5;
            } else if (q.scores && Array.isArray(q.scores) && typeof q.scores[userChoice] === 'number') {
                scoresPerCategory[cat].total += Number(q.scores[userChoice]);
            } else if (userChoice === q.jawaban) {
                scoresPerCategory[cat].total += 5;
            }
        }
    });

    const normalizedScores: Record<string, number> = {};
    ['POTENSI', 'MANAJERIAL', 'DIGITAL'].forEach((cat) => {
        const { total, count } = scoresPerCategory[cat] || { total: 0, count: 0 };
        const max = count > 0 ? count : 30;
        normalizedScores[cat] = Math.round((total / max) * 100);
    });

    const totalVotes = Math.max(totalKarirAnswers, 1);
    const strukturalPct = Math.round((strukturalTally / totalVotes) * 100);
    const fungsionalPct = Math.round((fungsionalTally / totalVotes) * 100);
    const operasionalPct = Math.round((operasionalTally / totalVotes) * 100);

    let dominantKarir = 'Jalur Fungsional Keahlian & Riset Kebijakan';
    let dominantPill = 'Fungsional Keahlian';
    if (strukturalTally > fungsionalTally && strukturalTally >= operasionalTally) {
        dominantKarir = 'Jalur Kepemimpinan & Manajerial (Struktural / JPT)';
        dominantPill = 'Kepemimpinan & Struktural';
    } else if (operasionalTally > fungsionalTally && operasionalTally > strukturalTally) {
        dominantKarir = 'Jalur Pelayanan & Keterampilan Teknis (Operasional Prosedural)';
        dominantPill = 'Pelayanan & Operasional';
    }

    const avgCompetency = Math.round(
        (normalizedScores['POTENSI'] + normalizedScores['MANAJERIAL'] + normalizedScores['DIGITAL']) / 3
    );

    // Nine Box Matrix evaluation
    const axisX = Math.round((normalizedScores['POTENSI'] * 0.5) + (normalizedScores['DIGITAL'] * 0.5));
    const axisY = normalizedScores['MANAJERIAL'];

    let boxNumber = 5;
    let boxLabel = 'Box 5 (Penampil Tangguh)';
    if (axisX >= 80 && axisY >= 80) {
        boxNumber = 9;
        boxLabel = 'Box 9 (Bintang / Talent Pool Utama)';
    } else if (axisX >= 70 && axisY >= 80) {
        boxNumber = 8;
        boxLabel = 'Box 8 (Penampil Unggul)';
    } else if (axisX >= 80 && axisY >= 70) {
        boxNumber = 7;
        boxLabel = 'Box 7 (Potensi Berkembang Cepat)';
    } else if (axisX >= 70 && axisY >= 70) {
        boxNumber = 5;
        boxLabel = 'Box 5 (Penampil Tangguh)';
    } else if (axisX < 70 && axisY >= 80) {
        boxNumber = 6;
        boxLabel = 'Box 6 (Penampil Mantap)';
    } else if (axisX >= 80 && axisY < 70) {
        boxNumber = 4;
        boxLabel = 'Box 4 (Bakat Belum Teredukasi)';
    } else {
        boxNumber = 1;
        boxLabel = 'Box 1 (Perlu Peningkatan)';
    }

    // Filter questions during full test if requested
    const displayedQuestions = categoryFilter === 'SEMUA' 
        ? activeQuestions 
        : categoryFilter === 'EMERGING'
        ? activeQuestions.filter(q => q.subkategori && q.subkategori.includes('Emerging Skills'))
        : activeQuestions.filter(q => q.kategori === categoryFilter);

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <Head title="Simulasi Asesmen Profiling ASN - 4 Subtes BKN" />

            <div className="max-w-6xl mx-auto space-y-6">

                {/* =========================================================================
                    MODE 1: PACKAGE LISTING & HISTORY
                   ========================================================================= */}
                {mode === 'list' && (
                    <div className="space-y-8">
                        {/* Header Banner in Mac Window */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                            <MacWindowControls title="Ruang Uji Profiling & CAT Mandiri" badge="STANDAR BKN 2026" />
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>4 Subtes Resmi Sesuai Standar Pemetaan Talenta</span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                        Pusat Simulasi Uji Asesmen ASN
                                    </h1>
                                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                                        Persiapkan diri menghadapi asesmen kompetensi BKN dengan simulasi 4 subtes: <strong>Tes Potensi</strong>, <strong>Manajerial & Sosio Kultural</strong>, <strong>Literasi Digital</strong>, dan <strong>Preferensi Karir</strong>.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href="/dashboard"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Ke Dashboard</span>
                                    </Link>
                                    <button
                                        onClick={() => startTest(packages[0])}
                                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/10 transition-all"
                                    >
                                        <Play className="w-4 h-4 fill-white" />
                                        <span>Mulai Simulasi 4 Subtes</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 4 Pillars Summary Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Subtes 1</div>
                                <div className="text-xs font-black text-slate-900 mt-1">Tes Potensi</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Silogisme, kognitif, figural spasial</div>
                            </div>
                            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Subtes 2</div>
                                <div className="text-xs font-black text-slate-900 mt-1">Manajerial Sosio Kultural</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">SJT 8 dimensi PermenPAN-RB</div>
                            </div>
                            <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/50">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Subtes 3</div>
                                <div className="text-xs font-black text-slate-900 mt-1">Literasi Digital</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">SPBE, UU PDP, keamanan siber</div>
                            </div>
                            <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Subtes 4</div>
                                <div className="text-xs font-black text-slate-900 mt-1">Preferensi Karir</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Tripatha: Struktural vs Fungsional</div>
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
                                                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
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
                                                <span>Buka Modul Ini</span>
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
                                                    <th className="py-2.5 px-3">Rekomendasi Karir</th>
                                                    <th className="py-2.5 px-3 text-right">Skor Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                                {sessions.map((s, idx) => (
                                                    <tr key={s.id || idx} className="hover:bg-slate-50/80 transition-colors">
                                                        <td className="py-3 px-3 font-semibold text-slate-900">
                                                            {s.title}
                                                        </td>
                                                        <td className="py-3 px-3 text-slate-500">
                                                            {new Date(s.completed_at || s.created_at).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </td>
                                                        <td className="py-3 px-3">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                                {s.talent_quadrant?.split('(')[0] || 'Box 9'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-3 font-medium text-slate-800">
                                                            {s.career_recommendation || 'Jalur Fungsional Keahlian'}
                                                        </td>
                                                        <td className="py-3 px-3 font-bold text-slate-900 text-right">
                                                            {s.total_score} Poin
                                                        </td>
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
                    MODE 2: SIMULATION TEST CAT INTERFACE
                   ========================================================================= */}
                {mode === 'test' && currentQ && (
                    <div className="space-y-6">
                        {/* Top Bar Status in Mac Window */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
                            <MacWindowControls title={selectedPackage.title} badge="SIMULASI AKTIF" />
                            <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                        <Layers className="w-4 h-4 text-emerald-700" />
                                        <span>Soal {currentIdx + 1} dari {activeQuestions.length}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-200" />
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200 text-slate-800">
                                        {currentQ.kategori === 'POTENSI' && 'Subtes 1: Tes Potensi'}
                                        {currentQ.kategori === 'MANAJERIAL' && 'Subtes 2: Manajerial Sosio Kultural'}
                                        {currentQ.kategori === 'DIGITAL' && 'Subtes 3: Literasi Digital'}
                                        {currentQ.kategori === 'KARIR' && 'Subtes 4: Preferensi Karir'}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 font-mono text-sm font-bold">
                                        <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                                        <span>{formatTime(timeLeft)}</span>
                                    </div>
                                    <button
                                        onClick={finishTest}
                                        className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-xs"
                                    >
                                        Selesaikan Ujian
                                    </button>
                                </div>
                            </div>

                            {/* Subtest switcher tabs if full simulation */}
                            {selectedPackage.cat === 'SEMUA' && (
                                <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
                                    <span className="text-[11px] font-bold text-slate-400 shrink-0">Lompat Subtes:</span>
                                    {[
                                        { code: 'SEMUA', label: 'Semua (24 Soal)' },
                                        { code: 'POTENSI', label: '1. Tes Potensi' },
                                        { code: 'MANAJERIAL', label: '2. Manajerial' },
                                        { code: 'DIGITAL', label: '3. Literasi Digital' },
                                        { code: 'KARIR', label: '4. Preferensi Karir' },
                                    ].map(tab => (
                                        <button
                                            key={tab.code}
                                            onClick={() => setCategoryFilter(tab.code)}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                                                categoryFilter === tab.code
                                                    ? 'bg-slate-900 text-white'
                                                    : 'text-slate-600 hover:bg-slate-100'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Question Work Area Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Question Box (Cols 3) */}
                            <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col justify-between">
                                <div className="p-6 sm:p-8 space-y-6 flex-1">
                                    <div className="space-y-2">
                                        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                                            {currentQ.subkategori || currentQ.category_name}
                                        </div>
                                        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                                            {currentQ.soal}
                                        </h2>
                                        {currentQ.kategori === 'KARIR' && (
                                            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 font-medium">
                                                <Compass className="w-4 h-4 text-amber-700 shrink-0" />
                                                <span>Pilih opsi peran yang paling mencerminkan motivasi dan pendekatan kerja terbaik Anda:</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Options List */}
                                    <div className="space-y-3 pt-2">
                                        {currentQ.pilihan.map((pil, oIdx) => {
                                            const isSelected = answers[currentQ.id] === oIdx;
                                            return (
                                                <button
                                                    key={oIdx}
                                                    onClick={() => handleSelectOption(currentQ.id, oIdx)}
                                                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 text-xs sm:text-sm font-medium ${
                                                        isSelected
                                                            ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 ring-2 ring-emerald-600/30 shadow-xs'
                                                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                                                    }`}
                                                >
                                                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
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

                            {/* Question Navigation Palette (Cols 1) */}
                            <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden h-fit">
                                <MacWindowControls title="Daftar Nomor Soal" badge={`${Object.keys(answers).length}/${activeQuestions.length}`} />
                                <div className="p-4 space-y-4">
                                    <div className="text-xs font-semibold text-slate-500">
                                        Klik nomor untuk langsung berpindah soal:
                                    </div>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
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

                                    <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500 font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded bg-emerald-800 ring-2 ring-slate-900" />
                                            <span>Soal Aktif</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
                                            <span>Sudah Terjawab</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
                                            <span>Belum Terjawab</span>
                                        </div>
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
                    <div className="space-y-8">
                        {/* Summary Header in Mac Window */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                            <MacWindowControls title="Laporan Rapor Hasil Evaluasi Asesmen" badge="HASIL RESMI" />
                            <div className="p-6 sm:p-10 space-y-8">
                                <div className="text-center max-w-xl mx-auto space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                        <span>Rapor Profiling 4 Subtes Selesai</span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                                        Hasil Pemetaan Talenta & Karir Anda
                                    </h1>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        Berdasarkan 4 subtes penilaian standar BKN, berikut adalah profil capaian kompetensi kognitif, manajerial, literasi digital, serta rekomendasi Tripatha Karir ASN Anda.
                                    </p>
                                </div>

                                {/* Top Metrics */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80">
                                        <div className="text-xs font-semibold text-slate-500">Skor Rata-Rata Kompetensi</div>
                                        <div className="text-3xl font-black text-slate-900 mt-1">{avgCompetency} / 100</div>
                                        <div className="text-xs text-slate-500 mt-1">Capaian Menyeluruh</div>
                                    </div>
                                    <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/70">
                                        <div className="text-xs font-semibold text-emerald-800">Predikat Kuadran Talenta BKN</div>
                                        <div className="text-xl font-black text-emerald-950 mt-1">
                                            {boxLabel.split('(')[0].trim()}
                                        </div>
                                        <div className="text-xs text-emerald-800 mt-1 font-semibold">
                                            {boxLabel.split('(')[1]?.replace(')', '') || 'High Potential & Performance'}
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/70">
                                        <div className="text-xs font-semibold text-amber-800">Arah Rekomendasi Karir</div>
                                        <div className="text-base font-black text-amber-950 mt-1 line-clamp-1">
                                            {dominantPill}
                                        </div>
                                        <div className="text-xs text-amber-800 mt-1 font-semibold">Tripatha Karir Dominan</div>
                                    </div>
                                </div>

                                {/* Subtest 4 Feature: TRIPATHA KARIR SHOWCASE */}
                                <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/30 space-y-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 pb-4">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                                <Compass className="w-3.5 h-3.5" />
                                                <span>Subtes 4: Rekomendasi Tripatha Karir ASN</span>
                                            </div>
                                            <h3 className="text-lg font-black text-slate-900 mt-1">
                                                {dominantKarir}
                                            </h3>
                                        </div>
                                        <span className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-xs">
                                            Rekomendasi Utama
                                        </span>
                                    </div>

                                    {/* 3 Tracks Percentage Bars */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-slate-800">Fungsional Keahlian & Riset</span>
                                                <span className="font-black text-slate-900">{fungsionalPct}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${fungsionalPct}%` }} />
                                            </div>
                                            <div className="text-[11px] text-slate-500 leading-tight">
                                                Analis kebijakan, perencanaan, IT & penelitian berbasis bukti.
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-slate-800">Kepemimpinan & Manajerial</span>
                                                <span className="font-black text-slate-900">{strukturalPct}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                                <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${strukturalPct}%` }} />
                                            </div>
                                            <div className="text-[11px] text-slate-500 leading-tight">
                                                Struktural, JPT, koordinasi lintas unit & diplomasi strategi.
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-slate-800">Pelayanan & Operasional Teknis</span>
                                                <span className="font-black text-slate-900">{operasionalPct}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                                <div className="h-full bg-amber-600 rounded-full transition-all" style={{ width: `${operasionalPct}%` }} />
                                            </div>
                                            <div className="text-[11px] text-slate-500 leading-tight">
                                                Pengelolaan layanan langsung, arsiparis, verifikasi dan SOP.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Career Roadmap Roles Pills */}
                                    <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-bold text-slate-700 mr-2 flex items-center gap-1.5">
                                            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                                            <span>Rekomendasi Rumpun Jabatan ASN yang Cocok:</span>
                                        </span>
                                        {dominantPill === 'Fungsional Keahlian' && (
                                            <>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">Analis Kebijakan Ahli</span>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">Perencana Ahli</span>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">Pranata Komputer Ahli</span>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">Peneliti Madya</span>
                                            </>
                                        )}
                                        {dominantPill === 'Kepemimpinan & Struktural' && (
                                            <>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Pejabat Pimpinan Tinggi (JPT)</span>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Administrator Eselon III</span>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Pengawas Organisasi</span>
                                            </>
                                        )}
                                        {dominantPill === 'Pelayanan & Operasional' && (
                                            <>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">Pengelola Layanan Operasional</span>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">Arsiparis Ahli</span>
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">Verifikator Keuangan</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* 4 Dimension Competency Breakdown Cards */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4 text-emerald-700" />
                                        <span>Rincian Capaian 4 Subtes Asesmen Profiling ASN</span>
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
                                            <div className="font-bold text-xs text-slate-900">1. Tes Potensi Kognitif</div>
                                            <div className="text-2xl font-black text-blue-800 mt-1">
                                                {normalizedScores['POTENSI'] || 80}%
                                            </div>
                                            <div className="text-xs text-blue-700 mt-1 font-semibold">
                                                {normalizedScores['POTENSI'] >= 80 ? 'Level 4 (Tinggi)' : 'Level 3 (Sedang)'}
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                                            <div className="font-bold text-xs text-slate-900">2. Manajerial & Sosio-Kultural</div>
                                            <div className="text-2xl font-black text-emerald-800 mt-1">
                                                {normalizedScores['MANAJERIAL'] || 85}%
                                            </div>
                                            <div className="text-xs text-emerald-700 mt-1 font-semibold">
                                                {normalizedScores['MANAJERIAL'] >= 80 ? 'Level 4 (Mahir)' : 'Level 3 (Mampu)'}
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50">
                                            <div className="font-bold text-xs text-slate-900">3. Literasi Digital ASN</div>
                                            <div className="text-2xl font-black text-purple-800 mt-1">
                                                {normalizedScores['DIGITAL'] || 80}%
                                            </div>
                                            <div className="text-xs text-purple-700 mt-1 font-semibold">
                                                {normalizedScores['DIGITAL'] >= 80 ? 'Level 4 (Cakap SPBE)' : 'Level 3 (Mampu)'}
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                                            <div className="font-bold text-xs text-slate-900">4. Preferensi Karir</div>
                                            <div className="text-lg font-black text-amber-900 mt-1 line-clamp-1">
                                                {dominantPill}
                                            </div>
                                            <div className="text-xs text-amber-700 mt-1 font-semibold">Pemetaan Tripatha</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Interactive Nine-Box Grid Visual Matrix */}
                                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900">Matriks Nine-Box Grid BKN</h4>
                                            <p className="text-xs text-slate-500">Pemetaan Aparatur: Sumbu X (Potensi & Digital) vs Sumbu Y (Manajerial & Kinerja)</p>
                                        </div>
                                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                                            Posisi Anda: Box {boxNumber}
                                        </span>
                                    </div>

                                    {/* 3x3 Matrix Grid */}
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs max-w-lg mx-auto">
                                        {/* Row 1 (High Performance) */}
                                        <div className={`p-3 rounded-xl border font-bold ${boxNumber === 7 ? 'bg-emerald-600 text-white ring-2 ring-emerald-700' : 'bg-white text-slate-700 border-slate-200'}`}>
                                            Box 7
                                            <div className="text-[10px] font-normal opacity-80">Potensi Berkembang</div>
                                        </div>
                                        <div className={`p-3 rounded-xl border font-bold ${boxNumber === 8 ? 'bg-emerald-600 text-white ring-2 ring-emerald-700' : 'bg-white text-slate-700 border-slate-200'}`}>
                                            Box 8
                                            <div className="text-[10px] font-normal opacity-80">Penampil Unggul</div>
                                        </div>
                                        <div className={`p-3 rounded-xl border font-bold ${boxNumber === 9 ? 'bg-emerald-800 text-white ring-2 ring-amber-400 shadow-md' : 'bg-emerald-50 text-emerald-900 border-emerald-300'}`}>
                                            ⭐ Box 9
                                            <div className="text-[10px] font-normal opacity-90">Bintang (Talent Pool)</div>
                                        </div>

                                        {/* Row 2 (Medium Performance) */}
                                        <div className={`p-3 rounded-xl border font-bold ${boxNumber === 4 ? 'bg-emerald-600 text-white ring-2 ring-emerald-700' : 'bg-white text-slate-700 border-slate-200'}`}>
                                            Box 4
                                            <div className="text-[10px] font-normal opacity-80">Bakat Berkembang</div>
                                        </div>
                                        <div className={`p-3 rounded-xl border font-bold ${boxNumber === 5 ? 'bg-emerald-600 text-white ring-2 ring-emerald-700' : 'bg-white text-slate-700 border-slate-200'}`}>
                                            Box 5
                                            <div className="text-[10px] font-normal opacity-80">Penampil Tangguh</div>
                                        </div>
                                        <div className={`p-3 rounded-xl border font-bold ${boxNumber === 6 ? 'bg-emerald-600 text-white ring-2 ring-emerald-700' : 'bg-white text-slate-700 border-slate-200'}`}>
                                            Box 6
                                            <div className="text-[10px] font-normal opacity-80">Penampil Mantap</div>
                                        </div>

                                        {/* Row 3 (Low Performance) */}
                                        <div className={`p-3 rounded-xl border font-bold ${boxNumber === 1 ? 'bg-red-600 text-white ring-2 ring-red-700' : 'bg-white text-slate-700 border-slate-200'}`}>
                                            Box 1
                                            <div className="text-[10px] font-normal opacity-80">Perlu Peningkatan</div>
                                        </div>
                                        <div className={`p-3 rounded-xl border font-bold ${boxNumber === 2 ? 'bg-emerald-600 text-white ring-2 ring-emerald-700' : 'bg-white text-slate-700 border-slate-200'}`}>
                                            Box 2
                                            <div className="text-[10px] font-normal opacity-80">Dilema Tumbuh</div>
                                        </div>
                                        <div className={`p-3 rounded-xl border font-bold ${boxNumber === 3 ? 'bg-emerald-600 text-white ring-2 ring-emerald-700' : 'bg-white text-slate-700 border-slate-200'}`}>
                                            Box 3
                                            <div className="text-[10px] font-normal opacity-80">Penampil Cukup</div>
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
                                        <span>{showExplanation ? 'Tutup Ulasan Soal' : 'Buka Pembahasan Lengkap 4 Subtes'}</span>
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
                                    Ulasan Butir Soal & Rasionalisasi Penilaian Standar BKN
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
                                                                {isKey && q.kategori !== 'KARIR' && (
                                                                    <span className="text-emerald-800 font-bold shrink-0">Kunci Terbaik (Skor 5)</span>
                                                                )}
                                                                {isUser && !isKey && (
                                                                    <span className="text-red-700 font-bold shrink-0">Pilihan Anda</span>
                                                                )}
                                                                {isUser && isKey && (
                                                                    <span className="text-emerald-800 font-bold shrink-0">Pilihan Tepat</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Pembahasan Box */}
                                                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                                                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                        <span>Rasionalisasi Penilaian BKN / KemenPAN-RB:</span>
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
