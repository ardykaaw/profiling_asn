import { Head, Link } from '@inertiajs/react';
import { 
    Award, 
    BookOpen, 
    CheckCircle2, 
    Clock, 
    FileText, 
    FolderKanban, 
    Layers, 
    Plus, 
    ShieldCheck, 
    Sparkles, 
    TrendingUp, 
    Upload, 
    Users, 
    Zap 
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';

interface Category {
    id: number;
    name: string;
    code: string;
    passing_grade: number;
    question_count: number;
    max_score: number;
    color: string;
    questions_count?: number;
    materials_count?: number;
}

interface Question {
    id: number;
    sub_category: string;
    question: string;
    category?: Category;
    created_at: string;
}

interface Material {
    id: number;
    title: string;
    type: string;
    level: string;
    duration: string;
    category?: Category;
    created_at: string;
}

interface Session {
    id: number;
    user?: { name: string; email: string };
    title: string;
    twk_score: number;
    tiu_score: number;
    tkp_score: number;
    total_score: number;
    is_passed: boolean;
    completed_at: string;
}

interface Props {
    totalQuestions: number;
    totalMaterials: number;
    totalUsers: number;
    totalSessions: number;
    categories: Category[];
    recentQuestions: Question[];
    recentMaterials: Material[];
    recentSessions: Session[];
}

export default function AdminDashboard({
    totalQuestions,
    totalMaterials,
    totalUsers,
    totalSessions,
    categories,
    recentQuestions,
    recentMaterials,
    recentSessions,
}: Props) {
    return (
        <>
            <Head title="Panel Administrator — ProASN" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Admin Welcome Banner in Executive Mac Window Style */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <MacWindowControls title="Pusat Kendali Asesmen & Pemetaan Talenta" badge="ADMINISTRATOR" />
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                                    <ShieldCheck className="size-3.5" />
                                    <span>PANEL ADMINISTRATOR</span>
                                </span>
                                <span className="text-xs text-slate-500">• Standar Uji Kompetensi BKN</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                                Pusat Kendali Kisi-Kisi & Bank Soal Profiling
                            </h1>
                            <p className="text-sm text-slate-600 mt-1 max-w-xl">
                                Kelola bank soal 4 dimensi kompetensi (Manajerial, Literasi Digital, Emerging Skills, Potensi Kognitif), modul materi resmi, serta pantau pemetaan kuadran talenta peserta.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href="/admin/soal"
                                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-800 text-white hover:bg-emerald-900 transition-all shadow-sm flex items-center gap-2"
                            >
                                <Plus className="size-4" />
                                <span>Input Soal Baru</span>
                            </Link>
                            <Link
                                href="/admin/materi"
                                className="px-4 py-2.5 rounded-xl font-semibold text-xs border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-all flex items-center gap-2"
                            >
                                <Upload className="size-4 text-slate-500" />
                                <span>Upload Bahan Asesmen</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4 Main KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-xs">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span>Total Bank Soal</span>
                            <FolderKanban className="size-4 text-emerald-700" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-slate-900">{totalQuestions}</span>
                            <span className="text-xs text-slate-500 font-mono">butir soal</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                            <span>4 Dimensi Penilaian</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-xs">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span>Bahan Pembelajaran</span>
                            <FileText className="size-4 text-blue-600" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-slate-900">{totalMaterials}</span>
                            <span className="text-xs text-slate-500 font-mono">modul/materi</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                            <span>PDF & Panduan Asesmen</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-xs">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span>Aparatur Terdaftar</span>
                            <Users className="size-4 text-emerald-600" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-slate-900">{totalUsers}</span>
                            <span className="text-xs text-slate-500 font-mono">peserta</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                            <CheckCircle2 className="size-3.5" />
                            <span>Terverifikasi Kedinasan</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-xs">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span>Sesi Asesmen Selesai</span>
                            <Award className="size-4 text-amber-600" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-slate-900">{totalSessions}</span>
                            <span className="text-xs text-slate-500 font-mono">evaluasi</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                            <TrendingUp className="size-3.5" />
                            <span>9 Box SIMATA Profiling</span>
                        </div>
                    </div>
                </div>

                {/* Subtest Categories Overview */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xs p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                                <Layers className="size-4 text-emerald-700" />
                                <span>Dimensi Penilaian & Standar Kelulusan BKN</span>
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">Struktur 4 dimensi evaluasi kompetensi aparatur sipil negara</p>
                        </div>
                        <Link href="/admin/kategori" className="text-xs font-bold text-emerald-800 hover:underline">
                            Konfigurasi Dimensi →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {categories.map((c) => (
                            <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-900">
                                        {c.code}
                                    </span>
                                    <span className="text-xs font-mono text-slate-500">
                                        Target: {c.question_count} Soal
                                    </span>
                                </div>
                                <h3 className="font-bold text-xs text-slate-900 mb-1 line-clamp-1">
                                    {c.name}
                                </h3>
                                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                                    <span className="text-slate-500">Ambang Batas:</span>
                                    <span className="font-bold text-slate-800">
                                        {c.passing_grade > 0 ? `${c.passing_grade} / ${c.max_score}` : 'Skala Standar'}
                                    </span>
                                </div>
                                <div className="mt-1 flex items-center justify-between text-xs font-mono text-slate-500">
                                    <span>Tersedia di Bank:</span>
                                    <span className="font-bold text-emerald-800">
                                        {c.questions_count ?? 0} Soal
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Two Column Grid: Recent Questions & Recent Materials */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Questions in Bank */}
                    <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-base text-slate-900">
                                    Soal Asesmen Terbaru
                                </h3>
                                <p className="text-xs text-slate-500">5 soal terakhir yang dimasukkan ke bank soal</p>
                            </div>
                            <Link href="/admin/soal" className="text-xs font-bold text-emerald-800 hover:underline">
                                Kelola Semua ({totalQuestions}) →
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentQuestions.map((q) => (
                                <div key={q.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                            {q.category?.code ?? 'DIMENSI'} • {q.sub_category}
                                        </span>
                                    </div>
                                    <p className="text-xs font-medium text-slate-800 line-clamp-2">
                                        {q.question}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Materials */}
                    <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-base text-slate-900">
                                    Modul & Dokumen Kisi-Kisi
                                </h3>
                                <p className="text-xs text-slate-500">5 bahan materi asesmen terkini</p>
                            </div>
                            <Link href="/admin/materi" className="text-xs font-bold text-emerald-800 hover:underline">
                                Kelola Semua ({totalMaterials}) →
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentMaterials.map((m) => (
                                <div key={m.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                                                {m.category?.code ?? 'KISI-KISI'}
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-mono">
                                                {m.type.toUpperCase()} • {m.duration}
                                            </span>
                                        </div>
                                        <p className="text-xs font-semibold text-slate-900 truncate">
                                            {m.title}
                                        </p>
                                    </div>
                                    <span className="text-xs font-mono px-2 py-0.5 rounded border border-slate-200 text-slate-600 bg-white shrink-0">
                                        {m.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Panel Administrator ProASN',
            href: '/admin',
        },
    ],
};
