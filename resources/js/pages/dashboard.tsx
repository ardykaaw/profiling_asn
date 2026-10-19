import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { 
    Award, 
    Sparkles, 
    Users, 
    Cpu, 
    Brain, 
    ArrowRight, 
    TrendingUp,
    FileText,
    Compass,
    CheckCircle2,
    Lock,
    Trash2,
    AlertTriangle,
    RotateCcw,
    Clock,
    ShieldAlert,
    Check,
    X
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';

interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
}

interface SharedData {
    auth: {
        user: User;
    };
    [key: string]: unknown;
}

export interface PackageTrackingItem {
    id: string;
    title: string;
    short_title: string;
    category: string;
    badge: string;
    total_subtest: number;
    total_soal: number;
    durasi: number;
    description: string;
    is_completed: boolean;
    is_in_progress?: boolean;
    current_subtest?: number;
    current_question?: number;
    subtest_title?: string | null;
    answered_count?: number;
    progress_percentage: number;
    session_id?: number | null;
    completed_at?: string | null;
    score?: number | null;
    talent_quadrant?: string | null;
    career_recommendation?: string | null;
    is_passed?: boolean | null;
}

interface DashboardProps {
    latestSession?: any;
    recentSessions?: any[];
    totalSessionsCount?: number;
    passedSessionsCount?: number;
    totalQuestionsAnswered?: number;
    avgScore?: number;
    streakDays?: number;
    totalQuestionsInBank?: number;
    totalMaterialsCount?: number;
    categories?: any[];
    packageTracking?: PackageTrackingItem[];
    completedPackagesCount?: number;
    totalPackagesCount?: number;
    overallProgressPercent?: number;
}

export default function Dashboard({
    latestSession,
    recentSessions = [],
    totalSessionsCount = 1,
    passedSessionsCount = 1,
    totalQuestionsAnswered = 24,
    avgScore = 88,
    streakDays = 3,
    totalQuestionsInBank = 24,
    totalMaterialsCount = 9,
    categories = [],
    packageTracking = [],
    completedPackagesCount = 0,
    totalPackagesCount = 5,
    overallProgressPercent = 0,
}: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    const [packageToReset, setPackageToReset] = useState<PackageTrackingItem | null>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [successBanner, setSuccessBanner] = useState<string | null>(null);

    const handleConfirmReset = () => {
        if (!packageToReset) return;
        setIsResetting(true);

        try {
            const raw = localStorage.getItem('tryout_saved_session');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed?.packageTitle === packageToReset.title || parsed?.packageId === packageToReset.id) {
                    localStorage.removeItem('tryout_saved_session');
                }
            }
        } catch (e) {
            console.error(e);
        }

        router.post(
            '/tryout/reset-package',
            { title: packageToReset.title },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsResetting(false);
                    setSuccessBanner(`Riwayat paket "${packageToReset.short_title || packageToReset.title}" berhasil direset. Anda dapat mengerjakan kembali tes tersebut.`);
                    setPackageToReset(null);
                    setTimeout(() => setSuccessBanner(null), 6000);
                },
                onError: () => {
                    setIsResetting(false);
                    setPackageToReset(null);
                }
            }
        );
    };

    const latestCareer = latestSession?.career_recommendation || recentSessions[0]?.career_recommendation || 'Jalur Fungsional Keahlian & Riset Kebijakan';

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full font-sans text-slate-900 bg-[#F8F9FA] min-h-screen">
            <Head title="Dashboard Profiling ASN - 4 Subtes BKN" />

            {/* Lean Executive Greeting & Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                            AKUN PEGAWAI AKTIF
                        </span>
                        <span className="text-xs text-slate-400">• Standar 4 Subtes BKN</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Selamat Datang, {user?.name}
                    </h1>
                </div>

                <div className="flex items-center gap-2.5">
                    <a
                        href="/tryout"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-xs"
                    >
                        <Award className="w-4 h-4" />
                        <span>Mulai Simulasi 4 Subtes</span>
                    </a>
                    <a
                        href="/materi"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all shadow-xs"
                    >
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span>Modul PDF ({totalMaterialsCount})</span>
                    </a>
                </div>
            </div>

            {/* 4 Clean Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-[11px] uppercase tracking-wider">Kuadran Talenta</span>
                        <span className="p-1 rounded-md bg-amber-50 text-amber-700"><Sparkles className="w-3.5 h-3.5" /></span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 mt-2">Box 9 (Bintang)</div>
                    <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">High Potential & Performance</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-[11px] uppercase tracking-wider">Rata-Rata Skor</span>
                        <span className="p-1 rounded-md bg-emerald-50 text-emerald-700"><TrendingUp className="w-3.5 h-3.5" /></span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 mt-2">{avgScore} / 100</div>
                    <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">+13 Poin di atas Passing Grade</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-[11px] uppercase tracking-wider">Arah Tripatha Karir</span>
                        <span className="p-1 rounded-md bg-blue-50 text-blue-700"><Compass className="w-3.5 h-3.5" /></span>
                    </div>
                    <div className="text-sm sm:text-base font-black text-slate-900 mt-2 line-clamp-1">
                        {latestCareer.split('(')[0].trim()}
                    </div>
                    <div className="text-[11px] font-semibold text-blue-700 mt-0.5">Rekomendasi Jabatan ASN</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-[11px] uppercase tracking-wider">Modul & Bank Soal</span>
                        <span className="p-1 rounded-md bg-purple-50 text-purple-700"><FileText className="w-3.5 h-3.5" /></span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 mt-2">{totalQuestionsInBank} Soal</div>
                    <div className="text-[11px] font-semibold text-purple-700 mt-0.5">4 Subtes + 9 Buku Panduan</div>
                </div>
            </div>

            {/* Success Alert Banner if Reset */}
            {successBanner && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex items-center justify-between gap-3 text-emerald-900 shadow-xs animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold">{successBanner}</span>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setSuccessBanner(null)} 
                        className="p-1 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Tracking Capaian & Pengerjaan Paket Asesmen Mandiri */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <MacWindowControls 
                    title="Tracking Pengerjaan Paket Simulasi Asesmen Profiling" 
                    badge={`${completedPackagesCount} / ${totalPackagesCount} SELESAI (${overallProgressPercent}%)`} 
                />
                
                <div className="p-5 sm:p-6 space-y-6">
                    {/* Overall Progress Bar */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-slate-800">
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-emerald-700" />
                                <span>Status Kelengkapan Simulasi Seluruh Paket Mandiri</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 font-medium">Progres Akumulatif:</span>
                                <span className="font-mono text-emerald-800 text-sm font-black">{overallProgressPercent}%</span>
                            </div>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden p-0.5">
                            <div 
                                className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 transition-all duration-700 shadow-xs" 
                                style={{ width: `${overallProgressPercent}%` }}
                            />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>{completedPackagesCount} paket telah diselesaikan dan terkunci</span>
                            <span>{totalPackagesCount - completedPackagesCount} paket siap dikerjakan</span>
                        </div>
                    </div>

                    {/* 5 Packages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {packageTracking.map((pkg) => (
                            <div 
                                key={pkg.id} 
                                className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
                                    pkg.is_completed 
                                        ? 'border-emerald-200 bg-emerald-50/20 shadow-xs' 
                                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                                }`}
                            >
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                                pkg.is_completed 
                                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                                {pkg.badge}
                                            </span>
                                            {pkg.is_completed && (
                                                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                    Selesai
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                                            {pkg.title}
                                        </h3>

                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                            {pkg.description}
                                        </p>
                                    </div>

                                    {/* Progress Bar inside Card */}
                                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                        <div className="flex items-center justify-between text-xs font-bold">
                                            <span className="text-slate-500 text-[11px]">Progres Paket</span>
                                            <span className={
                                                pkg.is_completed 
                                                    ? "text-emerald-700 font-mono text-xs font-bold" 
                                                    : (pkg.is_in_progress ? "text-amber-700 font-mono text-xs font-bold" : "text-slate-400 font-mono text-xs font-bold")
                                            }>
                                                {pkg.is_completed 
                                                    ? '100% Selesai' 
                                                    : (pkg.is_in_progress ? `${pkg.progress_percentage}% (${pkg.answered_count ?? 0}/${pkg.total_soal} Soal)` : '0% Belum Dikerjakan')}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-500 ${
                                                    pkg.is_completed 
                                                        ? 'bg-emerald-600 w-full' 
                                                        : (pkg.is_in_progress ? 'bg-amber-500' : 'bg-slate-200 w-0')
                                                }`} 
                                                style={{ width: pkg.is_completed ? '100%' : (pkg.is_in_progress ? `${pkg.progress_percentage}%` : '0%') }}
                                            />
                                        </div>
                                    </div>

                                    {/* Completed or In Progress Metadata Pill */}
                                    {pkg.is_completed ? (
                                        <div className="rounded-xl bg-white border border-emerald-100 p-2.5 space-y-1 text-xs">
                                            <div className="flex items-center justify-between text-slate-600">
                                                <span>Skor Capaian:</span>
                                                <span className="font-mono font-bold text-slate-900">{pkg.score ?? '-'} Poin</span>
                                            </div>
                                            <div className="flex items-center justify-between text-slate-600">
                                                <span>Predikat 9 Box:</span>
                                                <span className="font-bold text-emerald-800 text-[11px]">{pkg.talent_quadrant?.split('(')[0] || 'Box 9'}</span>
                                            </div>
                                            {pkg.completed_at && (
                                                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5 border-t border-slate-50">
                                                    <span>Selesai:</span>
                                                    <span className="font-mono">{pkg.completed_at}</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : pkg.is_in_progress ? (
                                        <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-2.5 space-y-1 text-xs text-amber-900">
                                            <div className="flex items-center justify-between font-medium">
                                                <span>Progres Tersimpan:</span>
                                                <span className="font-bold text-amber-800">Sub-tes {(pkg.current_subtest ?? 0) + 1}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-[11px] text-amber-700">
                                                <span>Sampai Soal:</span>
                                                <span className="font-bold">Soal ke-{(pkg.current_question ?? 0) + 1} ({pkg.answered_count ?? 0} terjawab)</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                {pkg.durasi} Menit
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                                {pkg.total_soal} Soal
                                            </span>
                                        </div>
                                    )}

                                    {/* Actions: Locked vs Resume vs Start */}
                                    <div className="pt-1">
                                        {pkg.is_completed ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    disabled
                                                    className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 cursor-not-allowed select-none"
                                                    title="Modul ini telah selesai dikerjakan dan terkunci. Anda tidak dapat mengulang tes kecuali menghapus riwayatnya."
                                                >
                                                    <Lock className="w-3.5 h-3.5" />
                                                    <span>Terkunci</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setPackageToReset(pkg)}
                                                    className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                                                    title="Hapus riwayat untuk mengulang tes ini kembali"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Hapus / Ulang</span>
                                                </button>
                                            </div>
                                        ) : pkg.is_in_progress ? (
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={`/tryout?resume=${pkg.id}`}
                                                    className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-center"
                                                >
                                                    <span>Lanjutkan: Soal ke-{(pkg.current_question ?? 0) + 1}</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => setPackageToReset(pkg)}
                                                    className="px-3 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                                    title="Hapus progres tersimpan untuk mulai dari awal"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <a
                                                href={`/tryout?package=${pkg.id}`}
                                                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center"
                                            >
                                                <span>Mulai Simulasi Ini</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Interactive Grid: 4 Pillars Progress + Nine-Box Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 4 Pillars Progress (7 cols) */}
                <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col justify-between">
                    <MacWindowControls title="Evaluasi Capaian 4 Subtes Asesmen Profiling" badge="4 SUBTES RESMI" />
                    <div className="p-5 sm:p-6 space-y-4">
                        <div>
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                                <span className="flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-blue-600" />
                                    <span>Subtes 1: Tes Potensi (Kognitif & Figural Spasial)</span>
                                </span>
                                <span className="text-blue-800 font-mono">88%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-emerald-600" />
                                    <span>Subtes 2: Manajerial & Sosio-Kultural (8 Dimensi PermenPAN-RB)</span>
                                </span>
                                <span className="text-emerald-800 font-mono">92%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                                <span className="flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-purple-600" />
                                    <span>Subtes 3: Literasi Digital (SPBE & UU PDP No. 27/2022)</span>
                                </span>
                                <span className="text-purple-800 font-mono">85%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-purple-600 rounded-full" style={{ width: '85%' }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                                <span className="flex items-center gap-2">
                                    <Compass className="w-4 h-4 text-amber-600" />
                                    <span>Subtes 4: Preferensi Karir (Tripatha Karir ASN)</span>
                                </span>
                                <span className="text-amber-800 font-mono font-bold">Fungsional Keahlian</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: '95%' }} />
                            </div>
                        </div>
                    </div>

                    <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Standar Evaluasi: BKN & MenPAN-RB</span>
                        <a href="/tryout" className="text-emerald-800 font-bold hover:underline flex items-center gap-1">
                            <span>Buka Ruang Uji CAT</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>

                {/* Visual Mini 3x3 9 BOX SIMATA & Career Pill (5 cols) */}
                <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col justify-between">
                    <MacWindowControls title="9 BOX SIMATA (Peta Talenta ASN)" badge="SIMATA" />
                    <div className="p-5 flex-1 flex flex-col justify-center space-y-3">
                        <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
                                <span>Sumbu Y: Kinerja</span>
                                <span>Sumbu X: Potensial</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold">
                                {/* Row 1: Kinerja Tinggi */}
                                <div className="p-2 rounded-lg bg-[#38bdf8] text-slate-950 border border-sky-300">
                                    <div className="font-black text-xs">Box 4</div>
                                    <div className="text-[9px] font-semibold leading-tight">Tinggi - Rendah</div>
                                </div>
                                <div className="p-2 rounded-lg bg-[#2dd4bf] text-slate-950 border border-teal-300">
                                    <div className="font-black text-xs">Box 7</div>
                                    <div className="text-[9px] font-semibold leading-tight">Tinggi - Menengah</div>
                                </div>
                                <div className="p-2 rounded-lg bg-[#15803d] text-white border border-emerald-600 ring-2 ring-amber-400 shadow-xs relative">
                                    <div className="font-black text-xs">Box 9 🏆</div>
                                    <div className="text-[9px] font-black text-amber-200 leading-tight">Talenta Unggul</div>
                                </div>

                                {/* Row 2: Kinerja Menengah */}
                                <div className="p-2 rounded-lg bg-[#fcd34d] text-slate-950 border border-amber-300">
                                    <div className="font-black text-xs">Box 2</div>
                                    <div className="text-[9px] font-semibold leading-tight">Sesuai - Rendah</div>
                                </div>
                                <div className="p-2 rounded-lg bg-[#93c5fd] text-slate-950 border border-blue-300">
                                    <div className="font-black text-xs">Box 5</div>
                                    <div className="text-[9px] font-semibold leading-tight">Sesuai - Menengah</div>
                                </div>
                                <div className="p-2 rounded-lg bg-[#22d3ee] text-slate-950 border border-cyan-300">
                                    <div className="font-black text-xs">Box 8</div>
                                    <div className="text-[9px] font-semibold leading-tight">Sesuai - Tinggi</div>
                                </div>

                                {/* Row 3: Kinerja Rendah */}
                                <div className="p-2 rounded-lg bg-[#f87171] text-white border border-rose-300">
                                    <div className="font-black text-xs">Box 1</div>
                                    <div className="text-[9px] font-semibold leading-tight">Rendah - Rendah</div>
                                </div>
                                <div className="p-2 rounded-lg bg-[#fb923c] text-white border border-orange-300">
                                    <div className="font-black text-xs">Box 3</div>
                                    <div className="text-[9px] font-semibold leading-tight">Rendah - Menengah</div>
                                </div>
                                <div className="p-2 rounded-lg bg-[#c084fc] text-white border border-purple-300">
                                    <div className="font-black text-xs">Box 6</div>
                                    <div className="text-[9px] font-semibold leading-tight">Rendah - Tinggi</div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-1.5 pt-1">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                                    Posisi Anda: Box 9 (Kinerja Tinggi Potensial Tinggi)
                                </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold text-center line-clamp-1">
                                🧭 {latestCareer}
                            </div>
                        </div>
                    </div>

                    <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 text-center">
                        <span className="text-[11px] text-slate-500 font-medium">
                            9 BOX SIMATA: Kinerja Saat Ini × Potensi Masa Depan
                        </span>
                    </div>
                </div>
            </div>

            {/* Recent Sessions Table */}
            {recentSessions && recentSessions.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                    <MacWindowControls title="Riwayat Hasil Evaluasi Asesmen" badge="RIWAYAT" />
                    <div className="p-5 sm:p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                                        <th className="py-2.5 px-3">Nama Paket Evaluasi</th>
                                        <th className="py-2.5 px-3">Tanggal</th>
                                        <th className="py-2.5 px-3">Predikat Talenta</th>
                                        <th className="py-2.5 px-3">Arah Tripatha Karir</th>
                                        <th className="py-2.5 px-3 text-right">Skor Total</th>
                                        <th className="py-2.5 px-3 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {recentSessions.map((s, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-3 px-3 font-semibold text-slate-900">{s.title}</td>
                                            <td className="py-3 px-3 text-slate-500 font-mono">{s.date}</td>
                                            <td className="py-3 px-3">
                                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                    {s.talent_quadrant || 'Box 9 (Bintang)'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3 font-semibold text-slate-800">
                                                {s.career_recommendation || 'Jalur Fungsional Keahlian'}
                                            </td>
                                            <td className="py-3 px-3 font-bold text-slate-900 font-mono text-right">{s.score} Poin</td>
                                            <td className="py-3 px-3 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setPackageToReset({
                                                        id: 'session-' + (s.id || idx),
                                                        title: s.title,
                                                        short_title: s.title,
                                                        category: '',
                                                        badge: '',
                                                        total_subtest: 0,
                                                        total_soal: 0,
                                                        durasi: 0,
                                                        description: '',
                                                        is_completed: true,
                                                        progress_percentage: 100,
                                                        session_id: s.id,
                                                    })}
                                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                                    title="Hapus riwayat sesi ini"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Konfirmasi Hapus & Reset Riwayat Paket */}
            {packageToReset && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <MacWindowControls title="Konfirmasi Reset Riwayat Tes" badge="PERINGATAN" />
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base text-slate-900">
                                        Hapus Riwayat & Buka Kunci?
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        Tindakan ini akan mereset progress tes Anda.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Paket yang akan direset:</div>
                                <div className="font-bold text-slate-900">{packageToReset.title}</div>
                                <div className="text-slate-500 text-[11px]">
                                    Progress bar akan kembali ke <span className="font-bold text-slate-800">0%</span> dan tombol pengerjaan akan terbuka kembali sehingga Anda dapat melakukan tes ulang.
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    disabled={isResetting}
                                    onClick={() => setPackageToReset(null)}
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    disabled={isResetting}
                                    onClick={handleConfirmReset}
                                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                    {isResetting ? (
                                        <span>Mereset...</span>
                                    ) : (
                                        <>
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Ya, Hapus & Buka Kunci</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
