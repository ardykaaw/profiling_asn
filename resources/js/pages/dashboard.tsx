import { Head, Link, usePage } from '@inertiajs/react';
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
    CheckCircle2
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
    totalQuestionsInBank?: number;
    totalMaterialsCount?: number;
    categories?: any[];
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
}: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

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
