import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Award, 
    BookOpen, 
    Flame, 
    TrendingUp, 
    TrendingDown,
    CheckCircle2, 
    Clock, 
    ArrowUpRight, 
    Sparkles, 
    Target,
    BarChart3,
    AlertCircle,
    ChevronRight,
    Zap,
    ShieldCheck
} from 'lucide-react';
import { dashboard } from '@/routes';

interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    [key: string]: unknown;
}

interface SharedData {
    auth: {
        user: User;
    };
    [key: string]: unknown;
}

const upcomingTests = [
    { id: 'skd-12', title: 'Simulasi Lengkap CAT SKD Nasional', duration: '100 Menit', soal: 110, category: 'SKD Lengkap' },
    { id: 'tiu-silogisme', title: 'Latihan TIU: Silogisme & Logika Analitis', duration: '35 Menit', soal: 35, category: 'TIU' },
    { id: 'twk-pilar', title: 'Latihan TWK: 4 Pilar Kebangsaan & UUD 1945', duration: '30 Menit', soal: 30, category: 'TWK' },
    { id: 'tkp-berakhlak', title: 'Latihan TKP: Core Values Ber-AKHLAK & Integritas', duration: '45 Menit', soal: 45, category: 'TKP' },
];

interface Session {
    id: number;
    title: string;
    twk_score: number;
    tiu_score: number;
    tkp_score: number;
    total_score: number;
    is_passed: boolean;
    completed_at?: string;
    created_at?: string;
}

interface RecentSessionItem {
    id: number;
    title: string;
    date: string;
    score: number;
    max: number;
    status: string;
    passing: boolean;
    twk_score: number;
    tiu_score: number;
    tkp_score: number;
}

interface Category {
    id: number;
    name: string;
    code: string;
    passing_grade: number;
    max_score: number;
    color: string;
    materials_count?: number;
}

interface DashboardProps {
    latestSession?: Session | null;
    recentSessions?: RecentSessionItem[];
    totalSessionsCount?: number;
    passedSessionsCount?: number;
    totalQuestionsAnswered?: number;
    sessionsThisWeek?: number;
    questionsThisWeek?: number;
    scoreDiff?: number;
    accuracyRate?: number;
    avgScore?: number;
    streakDays?: number;
    activityGrid?: boolean[];
    totalQuestionsInBank?: number;
    totalMaterialsCount?: number;
    categories?: Category[];
}

export default function Dashboard({
    latestSession,
    recentSessions = [],
    totalSessionsCount = 0,
    passedSessionsCount = 0,
    totalQuestionsAnswered = 0,
    sessionsThisWeek = 0,
    questionsThisWeek = 0,
    scoreDiff = 0,
    accuracyRate = 0,
    avgScore = 0,
    streakDays = 0,
    activityGrid = [],
    totalQuestionsInBank = 110,
    totalMaterialsCount = 21,
    categories = [],
}: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const userName = auth.user?.name || 'Peserta';
    const firstName = userName.split(' ')[0];
    const isAdmin = auth.user?.role === 'admin';

    // Subtest scores from latest session or standard default
    const hasSession = !!latestSession;
    const skdScore = {
        twk: latestSession?.twk_score ?? 0,
        tiu: latestSession?.tiu_score ?? 0,
        tkp: latestSession?.tkp_score ?? 0,
    };
    const totalSKD = latestSession?.total_score ?? (hasSession ? (skdScore.twk + skdScore.tiu + skdScore.tkp) : 0);
    const passingGrade = { twk: 65, tiu: 80, tkp: 166 };
    const totalPassingGrade = passingGrade.twk + passingGrade.tiu + passingGrade.tkp; // 311
    const isPassedSKD = hasSession ? latestSession.is_passed : false;

    // 28-day grid fallback if empty
    const displayActivityGrid = activityGrid.length === 28 
        ? activityGrid 
        : Array.from({ length: 28 }, (_, i) => i < streakDays);

    return (
        <>
            <Head title="Dashboard Belajar CPNS" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">

                {/* Welcome & Motivation Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-card to-card/60 border border-border shadow-sm">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#F0A500]/15 text-[#F0A500] border border-[#F0A500]/30">
                                PERSIAPAN SELEKSI CASN 2025/2026
                            </span>
                            <span className="text-xs text-muted-foreground">• Target Lolos Formasi Pilihan</span>
                        </div>
                        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            Selamat Datang, {firstName}!
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {hasSession
                                ? `Kamu sudah menyelesaikan ${totalSessionsCount} sesi try out. Terus asah kemampuanmu menuju hari H!`
                                : 'Selamat bergabung! Mulai simulasi pertamamu untuk memetakan kemampuan dan passing grade.'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/tryout"
                            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] shadow-sm hover:shadow transition-all flex items-center gap-2"
                        >
                            <Award className="size-4" />
                            <span>Mulai Try Out Baru</span>
                        </Link>
                        <Link
                            href="/materi"
                            className="px-4 py-2.5 rounded-xl font-semibold text-sm border border-border bg-card text-foreground hover:bg-accent transition-all flex items-center gap-2"
                        >
                            <BookOpen className="size-4 text-muted-foreground" />
                            <span>Pelajari Materi ({totalMaterialsCount})</span>
                        </Link>
                    </div>
                </div>

                {/* 4 Main KPI Cards (100% REAL DATABASE) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Estimasi Nilai SKD */}
                    <div className="p-5 rounded-2xl border border-border bg-card hover:border-[#F0A500]/50 transition-all card-hover">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Estimasi Nilai SKD</span>
                            <Target className="size-4 text-[#F0A500]" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-[#F0A500]">
                                {hasSession ? totalSKD : '—'}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">/ 550</span>
                        </div>
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium">
                            {hasSession && scoreDiff !== 0 ? (
                                scoreDiff > 0 ? (
                                    <>
                                        <TrendingUp className="size-3.5 text-[#10B981]" />
                                        <span className="text-[#10B981]">+{scoreDiff} poin dari simulasi lalu</span>
                                    </>
                                ) : (
                                    <>
                                        <TrendingDown className="size-3.5 text-[#EF4444]" />
                                        <span className="text-[#EF4444]">{scoreDiff} poin dari simulasi lalu</span>
                                    </>
                                )
                            ) : (
                                <span className="text-muted-foreground">
                                    {hasSession ? 'Skor stabil dari sesi lalu' : 'Belum ada data ujian'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Card 2: Try Out Selesai */}
                    <div className="p-5 rounded-2xl border border-border bg-card hover:border-[#0EA5A0]/50 transition-all card-hover">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Try Out Selesai</span>
                            <Award className="size-4 text-[#0EA5A0]" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-[#0EA5A0]">
                                {totalSessionsCount}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">sesi ujian</span>
                        </div>
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#10B981] font-medium">
                            <TrendingUp className="size-3.5" />
                            <span>+{sessionsThisWeek} sesi minggu ini</span>
                        </div>
                    </div>

                    {/* Card 3: Total Soal Dijawab */}
                    <div className="p-5 rounded-2xl border border-border bg-card hover:border-[#8B5CF6]/50 transition-all card-hover">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Total Soal Dijawab</span>
                            <Zap className="size-4 text-[#8B5CF6]" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-[#8B5CF6]">
                                {totalQuestionsAnswered.toLocaleString('id-ID')}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">butir soal</span>
                        </div>
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#10B981] font-medium">
                            <TrendingUp className="size-3.5" />
                            <span>+{questionsThisWeek.toLocaleString('id-ID')} butir minggu ini</span>
                        </div>
                    </div>

                    {/* Card 4: Akurasi Rata-Rata */}
                    <div className="p-5 rounded-2xl border border-border bg-card hover:border-[#10B981]/50 transition-all card-hover">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Akurasi Nilai</span>
                            <CheckCircle2 className="size-4 text-[#10B981]" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-[#10B981]">
                                {accuracyRate}%
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">
                                {avgScore > 0 ? `(rerata ${avgScore} pt)` : 'standar BKN'}
                            </span>
                        </div>
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                            <span>{passedSessionsCount} dari {totalSessionsCount} lulus passing grade</span>
                        </div>
                    </div>
                </div>

                {/* Score Breakdown & Streak Row */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* SKD Official Passing Grade Meter */}
                    <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold">
                                    HASIL SIMULASI SKD TERAKHIR
                                </p>
                                <h3 className="font-display text-xl font-bold text-foreground">
                                    {latestSession ? latestSession.title : 'Belum Ada Riwayat Ujian'}
                                </h3>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-mono text-4xl font-bold text-[#F0A500]">
                                    {hasSession ? totalSKD : 0}
                                </span>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">Passing Grade: {totalPassingGrade}</p>
                                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                                        isPassedSKD
                                            ? 'bg-[#10B981]/15 text-[#10B981]' 
                                            : hasSession
                                            ? 'bg-[#EF4444]/15 text-[#EF4444]'
                                            : 'bg-accent text-muted-foreground'
                                    }`}>
                                        {hasSession 
                                            ? (isPassedSKD ? '✓ MEMENUHI PASSING GRADE' : '✗ DI BAWAH PASSING GRADE') 
                                            : 'BELUM ADA SIMULASI'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Subtests Breakdown */}
                        <div className="space-y-5">
                            {[
                                { 
                                    code: 'TWK', 
                                    name: 'Tes Wawasan Kebangsaan', 
                                    score: skdScore.twk, 
                                    max: 150, 
                                    pg: passingGrade.twk, 
                                    color: '#F0A500' 
                                },
                                { 
                                    code: 'TIU', 
                                    name: 'Tes Intelejensi Umum', 
                                    score: skdScore.tiu, 
                                    max: 175, 
                                    pg: passingGrade.tiu, 
                                    color: '#0EA5A0' 
                                },
                                { 
                                    code: 'TKP', 
                                    name: 'Tes Karakteristik Pribadi', 
                                    score: skdScore.tkp, 
                                    max: 225, 
                                    pg: passingGrade.tkp, 
                                    color: '#8B5CF6' 
                                },
                            ].map((s) => {
                                const isPassed = hasSession && s.score >= s.pg;
                                return (
                                    <div key={s.code} className="p-4 rounded-xl border border-border bg-accent/30">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono font-bold text-base" style={{ color: s.color }}>
                                                    {s.code}
                                                </span>
                                                <span className="text-xs text-muted-foreground hidden sm:inline">
                                                    {s.name}
                                                </span>
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                                    hasSession
                                                        ? (isPassed 
                                                            ? 'bg-[#10B981]/15 text-[#10B981]' 
                                                            : 'bg-[#EF4444]/15 text-[#EF4444]')
                                                        : 'bg-accent text-muted-foreground'
                                                }`}>
                                                    {hasSession 
                                                        ? (isPassed ? '✓ LULUS PG' : '✗ DI BAWAH PG') 
                                                        : `Target Min: ${s.pg}`}
                                                </span>
                                            </div>
                                            <div className="flex items-baseline gap-1 font-mono text-sm">
                                                <span className="font-bold text-foreground">{s.score}</span>
                                                <span className="text-xs text-muted-foreground">/{s.max}</span>
                                                <span className="text-xs text-muted-foreground ml-2">(Min: {s.pg})</span>
                                            </div>
                                        </div>

                                        {/* Progress Bar with Passing Grade Line */}
                                        <div className="relative h-2.5 rounded-full bg-border overflow-hidden">
                                            <div 
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{ 
                                                    width: `${Math.min(100, (s.score / s.max) * 100)}%`, 
                                                    backgroundColor: s.color 
                                                }}
                                            />
                                            {/* Passing grade threshold marker */}
                                            <div 
                                                className="absolute top-0 bottom-0 w-0.5 bg-foreground/60 shadow-sm"
                                                style={{ left: `${(s.pg / s.max) * 100}%` }}
                                                title={`Passing Grade: ${s.pg}`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Streak & Active Plan */}
                    <div className="space-y-4">
                        {/* Streak Card (REAL DATA) */}
                        <div className="p-5 rounded-2xl border border-border bg-card">
                            <div className="flex items-center justify-between mb-4">
                                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold">
                                    STREAK BELAJAR HARIAN
                                </p>
                                <span className="text-xs text-muted-foreground">
                                    {streakDays > 0 ? `${streakDays} Hari Aktif` : 'Mulai Hari Ini'}
                                </span>
                            </div>

                            <div className="flex items-center gap-3.5 mb-4">
                                <div className="p-2 rounded-xl bg-[#F0A500]/15 text-[#F0A500]">
                                    <Flame className="size-8" />
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="font-mono font-bold text-3xl text-[#F0A500]">
                                            {streakDays}
                                        </span>
                                        <span className="text-sm font-semibold text-foreground">Hari</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {streakDays > 0 ? 'Pertahankan konsistensi belajarmu!' : 'Selesaikan minimal 1 ujian hari ini'}
                                    </p>
                                </div>
                            </div>

                            {/* 28-day Activity Grid */}
                            <div className="grid grid-cols-7 gap-1.5">
                                {displayActivityGrid.map((isActive, i) => (
                                    <div 
                                        key={i} 
                                        className={`h-5 rounded-md transition-all ${
                                            isActive 
                                                ? 'bg-[#F0A500]' 
                                                : 'bg-border/60'
                                        }`}
                                        title={`Hari ke-${i + 1}: ${isActive ? 'Aktif Belajar' : 'Belum Ada Sesi'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-3 text-center">
                                Grid 28 hari ke belakang berdasarkan riwayat ujian kamu
                            </p>
                        </div>

                        {/* Active Access License Card */}
                        <div className="p-5 rounded-2xl border border-[#10B981]/40 bg-card">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold">
                                    STATUS LISENSI RESMI
                                </p>
                                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] uppercase flex items-center gap-1">
                                    <ShieldCheck className="size-3" />
                                    <span>AKSES SEUMUR HIDUP</span>
                                </span>
                            </div>
                            <p className="text-sm font-semibold text-foreground mb-0.5">
                                Lisensi Etalase Lynk.id Aktif
                            </p>
                            <p className="text-xs text-muted-foreground mb-4">
                                Akun Anda memiliki akses penuh ke seluruh {totalMaterialsCount} modul materi, {totalQuestionsInBank} bank soal, dan simulasi CAT BKN.
                            </p>
                            <Link
                                href="/paket"
                                className="block w-full text-center py-2.5 rounded-xl font-bold text-xs border border-border bg-accent text-foreground hover:border-[#F0A500] transition-colors"
                            >
                                Cek Detail Lisensi & Panduan Lynk.id →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Sessions & Recommended Tryouts */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Sessions Table (100% REAL DATABASE) */}
                    <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="font-semibold text-base text-foreground">
                                    Riwayat Try Out & Latihan
                                </h3>
                                <p className="text-xs text-muted-foreground">Catatan performa ujian terbaru Anda di database</p>
                            </div>
                            <Link 
                                href="/tryout"
                                className="text-xs font-bold text-[#F0A500] hover:underline flex items-center gap-1"
                            >
                                <span>Buka Halaman Ujian</span>
                                <ArrowUpRight className="size-3.5" />
                            </Link>
                        </div>

                        {recentSessions && recentSessions.length > 0 ? (
                            <div className="space-y-3">
                                {recentSessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="p-3.5 rounded-xl border border-border bg-accent/20 hover:bg-accent/40 flex items-center gap-3.5 transition-all"
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                                            session.passing ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'
                                        }`}>
                                            {session.passing ? '✓' : '!'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-foreground truncate">
                                                {session.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground font-mono">
                                                {session.date} • TWK: {session.twk_score} | TIU: {session.tiu_score} | TKP: {session.tkp_score}
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-mono font-bold text-sm text-foreground">
                                                {session.score} <span className="text-xs text-muted-foreground font-normal">/ {session.max}</span>
                                            </p>
                                            <span className={`text-[10px] font-mono font-bold ${
                                                session.passing ? 'text-[#10B981]' : 'text-[#EF4444]'
                                            }`}>
                                                {session.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 px-4 rounded-xl border border-dashed border-border bg-accent/10">
                                <Award className="size-10 mx-auto text-muted-foreground mb-2.5 opacity-50" />
                                <p className="text-sm font-semibold text-foreground">Belum ada riwayat simulasi</p>
                                <p className="text-xs text-muted-foreground mt-1 mb-4">
                                    Mulai simulasi pertamamu sekarang untuk melihat evaluasi skor TWK, TIU, dan TKP.
                                </p>
                                <Link
                                    href="/tryout"
                                    className="px-4 py-2 rounded-xl bg-[#F0A500] text-[#0B1023] font-bold text-xs inline-flex items-center gap-1.5 hover:bg-[#FFD166] transition-colors"
                                >
                                    <Sparkles className="size-3.5" />
                                    <span>Mulai Try Out Sekarang</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Upcoming Tests & Progress */}
                    <div className="space-y-4">
                        {/* Recommended Tryout */}
                        <div className="p-5 rounded-2xl border border-border bg-card">
                            <p className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                                <Sparkles className="size-4 text-[#F0A500]" />
                                <span>Pilihan Latihan CAT Mandiri</span>
                            </p>
                            <div className="space-y-3">
                                {upcomingTests.map((test) => (
                                    <Link
                                        key={test.id}
                                        href="/tryout"
                                        className="block p-3 rounded-xl border border-border bg-accent/20 hover:border-[#F0A500] transition-all group"
                                    >
                                        <p className="text-xs font-semibold text-foreground group-hover:text-[#F0A500] transition-colors mb-1">
                                            {test.title}
                                        </p>
                                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono">
                                            <span className="flex items-center gap-1"><Clock className="size-3" /> {test.duration}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><BookOpen className="size-3" /> {test.soal} Soal</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Modul Progress Widget (100% REAL CATEGORIES) */}
                        <div className="p-5 rounded-2xl border border-border bg-card">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-semibold text-sm text-foreground">Ketersediaan Materi di Sistem</p>
                                <Link href="/materi" className="text-xs font-bold text-[#F0A500] hover:underline">
                                    Semua ({totalMaterialsCount}) →
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {categories.map((c) => {
                                    const count = c.materials_count || 0;
                                    const percent = Math.min(100, Math.round((count / 10) * 100));
                                    return (
                                        <div key={c.id}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-foreground/90 font-medium truncate max-w-[190px]">
                                                    {c.name}
                                                </span>
                                                <span className="font-mono text-muted-foreground">{count} Modul</span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-border overflow-hidden">
                                                <div 
                                                    className="h-full rounded-full transition-all duration-300"
                                                    style={{ 
                                                        width: `${Math.max(15, percent)}%`,
                                                        backgroundColor: c.color || '#F0A500'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard Belajar',
            href: dashboard(),
        },
    ],
};
