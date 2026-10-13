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
            <Head title="Panel Admin SiapCPNS" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Admin Welcome Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-card via-card/80 to-[#141D33] border border-[#1E2C4A] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#F0A500]/15 text-[#F0A500] border border-[#F0A500]/30 flex items-center gap-1.5">
                                <ShieldCheck className="size-3.5" />
                                <span>PANEL ADMINISTRATOR</span>
                            </span>
                            <span className="text-xs text-muted-foreground">• Standar CAT BKN 2025/2026</span>
                        </div>
                        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                            Pusat Kendali Materi & Bank Soal
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                            Kelola bank soal ujian nasional (TWK, TIU, TKP), unggah modul pembelajaran resmi (PDF/Video), serta pantau performa seluruh peserta ujian.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/admin/soal"
                            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all shadow-sm flex items-center gap-2"
                        >
                            <Plus className="size-4" />
                            <span>Input Soal Baru</span>
                        </Link>
                        <Link
                            href="/admin/materi"
                            className="px-4 py-2.5 rounded-xl font-semibold text-xs border border-border bg-card text-foreground hover:bg-accent transition-all flex items-center gap-2"
                        >
                            <Upload className="size-4 text-muted-foreground" />
                            <span>Upload Modul Materi</span>
                        </Link>
                    </div>
                </div>

                {/* 4 Main KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl border border-border bg-card hover:border-[#F0A500]/50 transition-all card-hover">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Total Bank Soal</span>
                            <FolderKanban className="size-4 text-[#F0A500]" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-[#F0A500]">{totalQuestions}</span>
                            <span className="text-xs text-muted-foreground font-mono">butir</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                            <span>Standar TWK • TIU • TKP</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-border bg-card hover:border-[#06B6D4]/50 transition-all card-hover">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Modul Materi</span>
                            <FileText className="size-4 text-[#06B6D4]" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-[#06B6D4]">{totalMaterials}</span>
                            <span className="text-xs text-muted-foreground font-mono">modul</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#10B981] font-medium">
                            <CheckCircle2 className="size-3.5" />
                            <span>Video & PDF aktif</span>
                        </div>
                    </div>

                    <Link
                        href="/admin/users"
                        className="p-5 rounded-2xl border border-border bg-card hover:border-[#8B5CF6]/50 transition-all card-hover block"
                    >
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Peserta Lynk.id</span>
                            <Users className="size-4 text-[#8B5CF6]" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-[#8B5CF6]">{totalUsers}</span>
                            <span className="text-xs text-muted-foreground font-mono">peserta</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8B5CF6] font-medium">
                            <span>Kelola & Verifikasi Akses →</span>
                        </div>
                    </Link>

                    <div className="p-5 rounded-2xl border border-border bg-card hover:border-[#10B981]/50 transition-all card-hover">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Sesi Try Out Diambil</span>
                            <Award className="size-4 text-[#10B981]" />
                        </div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-3xl font-bold text-[#10B981]">{totalSessions}</span>
                            <span className="text-xs text-muted-foreground font-mono">sesi ujian</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#10B981] font-medium">
                            <TrendingUp className="size-3.5" />
                            <span>Simulasi CAT BKN</span>
                        </div>
                    </div>
                </div>

                {/* Subtest Categories Overview */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold text-base text-foreground flex items-center gap-2">
                            <Layers className="size-4 text-[#F0A500]" />
                            <span>Kategori & Standar Nilai Kelulusan (Passing Grade BKN)</span>
                        </h2>
                        <Link href="/admin/kategori" className="text-xs font-bold text-[#F0A500] hover:underline">
                            Edit Kategori →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {categories.map((c) => (
                            <div key={c.id} className="p-5 rounded-2xl border border-border bg-card">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-sm font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${c.color}20`, color: c.color }}>
                                        {c.code}
                                    </span>
                                    <span className="text-xs font-mono text-muted-foreground">
                                        Target: {c.question_count} Soal
                                    </span>
                                </div>
                                <h3 className="font-semibold text-sm text-foreground mb-1">
                                    {c.name}
                                </h3>
                                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
                                    <span className="text-muted-foreground">Passing Grade:</span>
                                    <span className="font-bold text-foreground">
                                        {c.passing_grade > 0 ? `${c.passing_grade} / ${c.max_score}` : 'Fleksibel'}
                                    </span>
                                </div>
                                <div className="mt-1 flex items-center justify-between text-xs font-mono text-muted-foreground">
                                    <span>Tersedia di Bank:</span>
                                    <span className="font-bold text-[#F0A500]">
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
                    <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-base text-foreground">
                                    Soal Ujian Terbaru
                                </h3>
                                <p className="text-xs text-muted-foreground">5 soal terakhir yang dimasukkan ke bank soal</p>
                            </div>
                            <Link href="/admin/soal" className="text-xs font-bold text-[#F0A500] hover:underline">
                                Kelola Semua ({totalQuestions}) →
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentQuestions.map((q) => (
                                <div key={q.id} className="p-3.5 rounded-xl border border-border bg-accent/20 space-y-1.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#F0A500]/15 text-[#F0A500]">
                                            {q.category?.code ?? 'TWK'} • {q.sub_category}
                                        </span>
                                    </div>
                                    <p className="text-xs font-medium text-foreground line-clamp-2">
                                        {q.question}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Materials */}
                    <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-base text-foreground">
                                    Modul Materi Pembelajaran
                                </h3>
                                <p className="text-xs text-muted-foreground">5 modul materi paling terkini</p>
                            </div>
                            <Link href="/admin/materi" className="text-xs font-bold text-[#F0A500] hover:underline">
                                Kelola Semua ({totalMaterials}) →
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentMaterials.map((m) => (
                                <div key={m.id} className="p-3.5 rounded-xl border border-border bg-accent/20 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#06B6D4]/15 text-[#06B6D4] uppercase">
                                                {m.category?.code ?? 'TWK'}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground font-mono">
                                                {m.type.toUpperCase()} • {m.duration}
                                            </span>
                                        </div>
                                        <p className="text-xs font-semibold text-foreground truncate">
                                            {m.title}
                                        </p>
                                    </div>
                                    <span className="text-xs font-mono px-2 py-0.5 rounded border border-border text-muted-foreground shrink-0">
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
            title: 'Panel Admin SiapCPNS',
            href: '/admin',
        },
    ],
};
