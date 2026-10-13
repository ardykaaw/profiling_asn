import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Award, 
    BookOpen, 
    Clock, 
    Sparkles, 
    Users, 
    Cpu, 
    Zap, 
    Brain, 
    ArrowRight, 
    CheckCircle2, 
    Flame, 
    TrendingUp,
    ShieldCheck,
    Layers
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

interface DashboardProps {
    latestSession?: any;
    recentSessions?: any[];
    totalSessionsCount?: number;
    passedSessionsCount?: number;
    totalQuestionsAnswered?: number;
    avgScore?: number;
    streakDays?: number;
    activityGrid?: boolean[];
    totalQuestionsInBank?: number;
    totalMaterialsCount?: number;
    categories?: any[];
}

export default function Dashboard({
    latestSession,
    recentSessions = [],
    totalSessionsCount = 1,
    passedSessionsCount = 1,
    totalQuestionsAnswered = 45,
    avgScore = 88,
    streakDays = 3,
    activityGrid = [],
    totalQuestionsInBank = 25,
    totalMaterialsCount = 4,
    categories = [],
}: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full font-sans text-slate-900 bg-[#F8F9FA] min-h-screen">
            <Head title="Dashboard Profiling ASN" />

            {/* Mac Window Header Banner */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                <MacWindowControls
                    title="Portal Asesmen Kepegawaian ASN"
                    badge="AKUN AKTIF"
                />
                <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Portal Asesmen Manajemen Talenta Nasional</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Selamat Datang, <span className="text-emerald-800">{user?.name}</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                            Pantau kemajuan kompetensi Anda menuju <strong>Kuadran 9 Manajemen Talenta ASN</strong>. Hasil simulasi terkalibrasi dengan standar BKN dan KemenPAN-RB.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="/tryout"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold shadow-md transition-all"
                        >
                            <Award className="w-4 h-4" />
                            <span>Mulai Uji Asesmen CAT</span>
                        </a>
                        <a
                            href="/materi"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-all shadow-xs"
                        >
                            <BookOpen className="w-4 h-4 text-slate-600" />
                            <span>Modul Pembahasan</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* 4 Cards Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Metric 1 */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                        <span>PREDIKAT TALENTA</span>
                        <span className="p-1 rounded-md bg-amber-100 text-amber-800"><Sparkles className="w-3.5 h-3.5" /></span>
                    </div>
                    <div className="my-3">
                        <div className="text-xl font-black text-slate-900">Kuadran IX (Bintang)</div>
                        <div className="text-xs text-emerald-700 font-semibold mt-1">Sangat Memenuhi Syarat</div>
                    </div>
                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                        Prioritas Promosi & Suksesi
                    </div>
                </div>

                {/* Metric 2 */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                        <span>SKOR RATA-RATA</span>
                        <span className="p-1 rounded-md bg-blue-100 text-blue-800"><TrendingUp className="w-3.5 h-3.5" /></span>
                    </div>
                    <div className="my-3">
                        <div className="text-2xl font-black text-slate-900">{avgScore} / 100</div>
                        <div className="text-xs text-blue-700 font-semibold mt-1">Tingkat Akurasi 88%</div>
                    </div>
                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                        Melampaui Ambang Batas (75)
                    </div>
                </div>

                {/* Metric 3 */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                        <span>TOTAL SIMULASI</span>
                        <span className="p-1 rounded-md bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                    </div>
                    <div className="my-3">
                        <div className="text-2xl font-black text-slate-900">{totalSessionsCount} Sesi Ujian</div>
                        <div className="text-xs text-emerald-700 font-semibold mt-1">{totalQuestionsAnswered} Butir Soal Selesai</div>
                    </div>
                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                        {passedSessionsCount} Sesi Memenuhi Syarat
                    </div>
                </div>

                {/* Metric 4 */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                        <span>KONSISTENSI BELAJAR</span>
                        <span className="p-1 rounded-md bg-orange-100 text-orange-800"><Flame className="w-3.5 h-3.5 text-orange-600" /></span>
                    </div>
                    <div className="my-3">
                        <div className="text-2xl font-black text-slate-900">{streakDays} Hari Beruntun</div>
                        <div className="text-xs text-orange-700 font-semibold mt-1">Aktivitas Sangat Baik</div>
                    </div>
                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                        Target Uji Kompetensi BKN
                    </div>
                </div>
            </div>

            {/* 4 Dimensions Overview & Nine-Box Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Dimension Bars in Mac Window */}
                <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden flex flex-col justify-between">
                    <MacWindowControls title="Evaluasi Capaian 4 Dimensi Kompetensi" badge="PROFIL KOMPETENSI" />
                    <div className="p-6 space-y-5 flex-1">
                        <div>
                            <h3 className="font-bold text-sm sm:text-base text-slate-900">
                                Capaian Standar Kompetensi ASN
                            </h3>
                            <p className="text-xs text-slate-500">
                                Distribusi skor per pilar berdasarkan hasil simulasi terkini.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                                    <span className="flex items-center gap-2 text-slate-800">
                                        <Users className="w-4 h-4 text-emerald-600" />
                                        <span>Manajerial & Sosio-Kultural (8 Dimensi MenPAN-RB)</span>
                                    </span>
                                    <span className="text-emerald-800 font-bold">92% • Level 4 (Mahir)</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                                    <span className="flex items-center gap-2 text-slate-800">
                                        <Cpu className="w-4 h-4 text-purple-600" />
                                        <span>Literasi & Keamanan Digital (SPBE & UU PDP)</span>
                                    </span>
                                    <span className="text-purple-800 font-bold">86% • Level 4 (Cakap)</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '86%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                                    <span className="flex items-center gap-2 text-slate-800">
                                        <Zap className="w-4 h-4 text-amber-600" />
                                        <span>Emerging Skills & Berpikir Analitis</span>
                                    </span>
                                    <span className="text-amber-800 font-bold">90% • Level 4 (Optimal)</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '90%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                                    <span className="flex items-center gap-2 text-slate-800">
                                        <Brain className="w-4 h-4 text-blue-600" />
                                        <span>Potensi Kognitif & Figural Spasial</span>
                                    </span>
                                    <span className="text-blue-800 font-bold">87% • Level 4 (Tinggi)</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '87%' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
                        <span>Status: Seluruh dimensi telah melampaui Passing Grade BKN (75).</span>
                        <a href="/tryout" className="text-emerald-800 font-bold flex items-center gap-1 hover:underline">
                            <span>Latihan Lagi</span>
                            <ArrowRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>

                {/* Nine-Box Quick Card in Mac Window */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden flex flex-col justify-between">
                    <MacWindowControls title="Matriks Manajemen Talenta" badge="KUADRAN IX" />
                    <div className="p-5 space-y-4">
                        <div className="text-center p-4 rounded-xl bg-amber-50 border border-amber-200">
                            <div className="text-xs font-bold text-amber-800 uppercase">Status Kuadran Talenta</div>
                            <div className="text-xl font-black text-slate-900 mt-1">Kuadran IX (Bintang)</div>
                            <p className="text-xs text-slate-600 mt-1">
                                Potensi Tinggi + Kinerja Tinggi
                            </p>
                        </div>

                        <div className="text-xs text-slate-600 space-y-2.5">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Memenuhi kriteria rotasi/promosi JPT</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Kesiapan penugasan strategis nasional</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Memenuhi standar beasiswa studi lanjutan</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-slate-50">
                        <a
                            href="/materi"
                            className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                        >
                            <span>Buka Modul Strategi Kuadran 9</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Recent Sessions Table */}
            {recentSessions && recentSessions.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
                    <MacWindowControls title="Riwayat Hasil Sesi Uji Asesmen" badge="SESI TERBARU" />
                    <div className="p-5 sm:p-6">
                        <h3 className="font-bold text-sm text-slate-900 mb-4">Sesi Asesmen Terakhir</h3>
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
                                    {recentSessions.map((s, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50">
                                            <td className="py-3 px-3 font-semibold text-slate-900">{s.title}</td>
                                            <td className="py-3 px-3 text-slate-500">{s.date}</td>
                                            <td className="py-3 px-3">
                                                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                    {s.talent_quadrant || 'Kuadran IX (Bintang)'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3 font-bold text-slate-900">{s.score} Poin</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
