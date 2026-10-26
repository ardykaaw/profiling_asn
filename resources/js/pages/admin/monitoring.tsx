import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { 
    Activity, 
    CheckCircle2, 
    Clock, 
    Filter, 
    Search, 
    ShieldCheck, 
    Users, 
    X,
    Award,
    FileCheck,
    Layers,
    Calendar,
    Phone,
    Mail,
    UserCheck,
    Info
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';

interface SessionItem {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    user_phone: string;
    title: string;
    status: 'IN_PROGRESS' | 'COMPLETED';
    answered_count: number;
    score: number | null;
    talent_quadrant: string | null;
    career_recommendation: string | null;
    is_passed: boolean | null;
    created_at_formatted: string | null;
    updated_at_formatted: string | null;
    completed_at_formatted: string | null;
}

interface PaginatedSessions {
    data: SessionItem[];
    current_page: number;
    last_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    sessions: PaginatedSessions;
    stats: {
        total_sessions: number;
        in_progress_count: number;
        completed_count: number;
        unique_participants: number;
    };
    filters: {
        search: string;
        status: string;
    };
}

export default function AdminMonitoringPage({ sessions, stats, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/monitoring',
            { search: search || undefined, status: statusFilter !== 'all' ? statusFilter : undefined },
            { preserveState: true, replace: true }
        );
    };

    const handleStatusChange = (val: string) => {
        setStatusFilter(val);
        router.get(
            '/admin/monitoring',
            { search: search || undefined, status: val !== 'all' ? val : undefined },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setStatusFilter('all');
        router.get('/admin/monitoring');
    };

    return (
        <>
            <Head title="Monitoring Asesmen Peserta — Panel Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full font-sans text-slate-900 bg-[#F8F9FA] min-h-screen">
                {/* Executive Mac Window Header */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                    <MacWindowControls title="Pusat Monitoring Asesmen & Pemantauan Peserta" badge="REAL-TIME ASN TRACKING" />
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>PANEL ADMINISTRATOR</span>
                                </span>
                                <span className="text-xs text-slate-500">• Pemantauan Asesmen Peserta</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Monitoring Aktivitas & Progres Pengerjaan Peserta
                            </h1>
                            <p className="text-xs md:text-sm text-slate-600 max-w-2xl leading-relaxed">
                                Pantau secara langsung daftar peserta ASN yang telah memulai atau menuntaskan simulasi asesmen CAT, jumlah butir soal yang telah dikerjakan, dan waktu aktivitas pengerjaan.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <Link
                                href="/admin/users"
                                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-2xs"
                            >
                                <Users className="w-4 h-4 text-slate-500" />
                                <span>Verifikasi Akun Peserta</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4 Summary Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    <div className="p-4 md:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                            <FileCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900">{stats.total_sessions}</div>
                            <div className="text-xs text-slate-500 font-medium">Total Sesi Terdata</div>
                        </div>
                    </div>

                    <div className="p-4 md:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-amber-100 text-amber-900 shrink-0">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900">{stats.in_progress_count}</div>
                            <div className="text-xs text-slate-500 font-medium">Sedang Mengerjakan (Draft)</div>
                        </div>
                    </div>

                    <div className="p-4 md:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-blue-100 text-blue-900 shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900">{stats.completed_count}</div>
                            <div className="text-xs text-slate-500 font-medium">Sesi Tuntas Selesai</div>
                        </div>
                    </div>

                    <div className="p-4 md:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-900 shrink-0">
                            <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900">{stats.unique_participants}</div>
                            <div className="text-xs text-slate-500 font-medium">Peserta Unik Mulai</div>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 max-w-md">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama, email, no HP, atau judul modul..."
                                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-all shrink-0 cursor-pointer"
                        >
                            Cari
                        </button>
                    </form>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                            <button
                                type="button"
                                onClick={() => handleStatusChange('all')}
                                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                    statusFilter === 'all'
                                        ? 'bg-white text-emerald-900 font-bold shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Semua ({stats.total_sessions})
                            </button>
                            <button
                                type="button"
                                onClick={() => handleStatusChange('in_progress')}
                                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                    statusFilter === 'in_progress'
                                        ? 'bg-white text-amber-900 font-bold shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Sedang Mengerjakan ({stats.in_progress_count})
                            </button>
                            <button
                                type="button"
                                onClick={() => handleStatusChange('completed')}
                                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                    statusFilter === 'completed'
                                        ? 'bg-white text-blue-900 font-bold shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Selesai ({stats.completed_count})
                            </button>
                        </div>

                        {(search || statusFilter !== 'all') && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                                <span>Reset Filter</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Table of Participant Sessions */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
                    <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h3 className="font-extrabold text-slate-900 text-sm md:text-base">
                                Daftar Aktivitas Pengerjaan Peserta
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Total {sessions.total} sesi ditemukan berdasarkan filter yang aktif.
                            </p>
                        </div>
                    </div>

                    {sessions.data.length === 0 ? (
                        <div className="p-12 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h4 className="font-extrabold text-slate-800 text-sm">Tidak Ada Sesi Ditemukan</h4>
                            <p className="text-xs text-slate-500 max-w-md mx-auto">
                                Belum ada riwayat asesmen yang sesuai dengan kriteria pencarian atau filter yang dipilih.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                                        <th className="py-3 px-4">Status Sesi</th>
                                        <th className="py-3 px-4">Peserta ASN</th>
                                        <th className="py-3 px-4">Modul / Paket Asesmen</th>
                                        <th className="py-3 px-4">Progres Soal</th>
                                        <th className="py-3 px-4">Hasil / Nilai</th>
                                        <th className="py-3 px-4">Waktu Mulai</th>
                                        <th className="py-3 px-4">Aktivitas Terakhir</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {sessions.data.map((item) => {
                                        const isDone = item.status === 'COMPLETED';

                                        return (
                                            <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                                {/* Status Badge */}
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    {isDone ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                            <span>Selesai (Tuntas)</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                                                            <Clock className="w-3 h-3 text-amber-700" />
                                                            <span>Sedang Mengerjakan</span>
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Participant */}
                                                <td className="py-3.5 px-4">
                                                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                                                        {item.user_name}
                                                    </div>
                                                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                                                        <span>{item.user_email}</span>
                                                        {item.user_phone && item.user_phone !== '-' && (
                                                            <span className="text-slate-400 font-normal">• {item.user_phone}</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Module Title */}
                                                <td className="py-3.5 px-4">
                                                    <div className="font-bold text-slate-800 text-xs max-w-xs truncate">
                                                        {item.title}
                                                    </div>
                                                    {item.talent_quadrant && (
                                                        <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                                                            Kuadran: {item.talent_quadrant}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Progress / Answered */}
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    <span className="font-extrabold text-slate-900">
                                                        {item.answered_count} Soal Terjawab
                                                    </span>
                                                    {!isDone && (
                                                        <div className="text-[10px] text-amber-700 font-medium">
                                                            Sesi aktif / draft
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Score */}
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    {isDone ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-xs font-black text-slate-900 px-2 py-0.5 rounded bg-slate-100">
                                                                {item.score !== null ? `${item.score}/100` : 'Tuntas'}
                                                            </span>
                                                            {item.is_passed !== null && (
                                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                                                    item.is_passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                                                }`}>
                                                                    {item.is_passed ? 'Memenuhi' : 'TMS'}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-400 font-medium italic text-[11px]">
                                                            Belum selesai
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Started At */}
                                                <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                                                    {item.created_at_formatted || '-'}
                                                </td>

                                                {/* Updated / Finished At */}
                                                <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                                                    {isDone ? (item.completed_at_formatted || item.updated_at_formatted || '-') : (item.updated_at_formatted || '-')}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {sessions.last_page > 1 && (
                        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-2">
                            <div className="text-xs text-slate-500 font-medium">
                                Halaman {sessions.current_page} dari {sessions.last_page} ({sessions.total} total sesi)
                            </div>
                            <div className="flex items-center gap-1">
                                {sessions.links.map((link, idx) => {
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={idx}
                                                className="px-2.5 py-1 text-xs text-slate-400 rounded-lg"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }
                                    return (
                                        <Link
                                            key={idx}
                                            href={link.url}
                                            className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                                                link.active
                                                    ? 'bg-emerald-800 text-white'
                                                    : 'text-slate-600 hover:bg-slate-100'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Information Banner */}
                <div className="p-4 rounded-xl border border-blue-200/60 bg-blue-50/60 text-blue-900 text-xs flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <strong className="font-bold">Informasi Privasi & Integritas Ujian:</strong> Halaman ini murni berfungsi untuk pemantauan administratif (monitoring real-time progres peserta) tanpa mengubah, menghapus, atau mengintervensi sesi pengerjaan peserta secara langsung.
                    </div>
                </div>
            </div>
        </>
    );
}
