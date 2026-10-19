import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
    CheckCircle2, 
    Clock, 
    Filter, 
    MessageCircle, 
    Plus, 
    Search, 
    ShieldAlert, 
    ShieldCheck, 
    Trash2, 
    UserCheck, 
    Users, 
    X,
    ExternalLink,
    Calendar,
    Sparkles,
    UserX,
    AlertCircle,
    RotateCcw
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';
import ConfirmModal from '@/components/confirm-modal';

interface UserItem {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    lynk_order_id: string | null;
    is_active: boolean;
    verification_status?: 'pending' | 'verified' | 'rejected';
    is_verified?: boolean;
    is_expired?: boolean;
    remaining_days?: number;
    verified_at_formatted?: string | null;
    expires_at_formatted?: string | null;
    role: string;
    created_at: string;
    tryout_sessions_count: number;
}

interface PaginatedUsers {
    data: UserItem[];
    current_page: number;
    last_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    users: PaginatedUsers;
    filters: {
        search: string;
        status: string;
    };
    stats: {
        total: number;
        active: number;
        pending: number;
        expired: number;
    };
}

export default function AdminUsers({ users, filters, stats }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Confirmation dialog state
    const [confirmAction, setConfirmAction] = useState<{
        type: 'verify' | 'extend' | 'delete' | 'toggle';
        user: UserItem;
    } | null>(null);
    const [isProcessingAction, setIsProcessingAction] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        lynk_order_id: '',
        password: 'password123',
        is_active: true,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/users', { search, status: statusFilter }, { preserveState: true });
    };

    const handleFilterStatus = (newStatus: string) => {
        setStatusFilter(newStatus);
        router.get('/admin/users', { search, status: newStatus }, { preserveState: true });
    };

    const openConfirmVerify = (user: UserItem) => {
        setConfirmAction({ type: 'verify', user });
    };

    const openConfirmExtend = (user: UserItem) => {
        setConfirmAction({ type: 'extend', user });
    };

    const openConfirmDelete = (user: UserItem) => {
        setConfirmAction({ type: 'delete', user });
    };

    const executeConfirmAction = () => {
        if (!confirmAction) return;
        setIsProcessingAction(true);
        const { type, user } = confirmAction;

        if (type === 'verify') {
            router.post(`/admin/users/${user.id}/verify`, {}, {
                preserveScroll: true,
                onFinish: () => {
                    setIsProcessingAction(false);
                    setConfirmAction(null);
                },
            });
        } else if (type === 'extend') {
            router.post(`/admin/users/${user.id}/extend`, {}, {
                preserveScroll: true,
                onFinish: () => {
                    setIsProcessingAction(false);
                    setConfirmAction(null);
                },
            });
        } else if (type === 'delete') {
            router.delete(`/admin/users/${user.id}`, {
                preserveScroll: true,
                onFinish: () => {
                    setIsProcessingAction(false);
                    setConfirmAction(null);
                },
            });
        }
    };

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/users', formData, {
            onSuccess: () => {
                setIsAddModalOpen(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    lynk_order_id: '',
                    password: 'password123',
                    is_active: true,
                });
            }
        });
    };

    return (
        <>
            <Head title="Verifikasi Pengguna Lynk.id — ProASN Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
                                <Users className="size-3.5" />
                                <span>VERIFIKASI PENGGUNA</span>
                            </span>
                            <span className="text-xs text-slate-500">• Sinkronisasi Etalase Lynk.id</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                            Kelola & Aktivasi Akses Member
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
                            Verifikasi pembelian dari Lynk.id, aktifkan lisensi 1 tahun penuh, dan pantau masa aktif akun peserta secara real-time.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                        >
                            <Plus className="size-4" />
                            <span>Tambah Peserta Manual</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                            <Users className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Total Terdaftar</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-0.5">{stats.total}</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/90 dark:border-emerald-900/50 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <ShieldCheck className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Aktif 1 Tahun</p>
                            <p className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mt-0.5">{stats.active}</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/90 dark:border-amber-900/50 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                            <Clock className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">Menunggu Verifikasi</p>
                            <p className="text-2xl font-black text-amber-800 dark:text-amber-300 mt-0.5">{stats.pending}</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/90 dark:border-rose-900/50 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 flex items-center justify-center shrink-0">
                            <UserX className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs text-rose-700 dark:text-rose-400 font-bold">Kadaluarsa</p>
                            <p className="text-2xl font-black text-rose-800 dark:text-rose-300 mt-0.5">{stats.expired || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                        <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama, email, atau order ID..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                        />
                    </form>

                    <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                        <button
                            onClick={() => handleFilterStatus('all')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                statusFilter === 'all'
                                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            Semua ({stats.total})
                        </button>
                        <button
                            onClick={() => handleFilterStatus('pending')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                statusFilter === 'pending'
                                    ? 'bg-amber-600 text-white shadow-xs'
                                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 hover:bg-amber-100'
                            }`}
                        >
                            Menunggu Verifikasi ({stats.pending})
                        </button>
                        <button
                            onClick={() => handleFilterStatus('active')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                statusFilter === 'active'
                                    ? 'bg-emerald-700 text-white shadow-xs'
                                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100'
                            }`}
                        >
                            Aktif 1 Tahun ({stats.active})
                        </button>
                        <button
                            onClick={() => handleFilterStatus('expired')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                statusFilter === 'expired'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 hover:bg-rose-100'
                            }`}
                        >
                            Kadaluarsa ({stats.expired || 0})
                        </button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                                <tr>
                                    <th className="py-3.5 px-4">Peserta & Email</th>
                                    <th className="py-3.5 px-4">Info Order Lynk.id</th>
                                    <th className="py-3.5 px-4">Status & Masa Aktif 1 Tahun</th>
                                    <th className="py-3.5 px-4 text-center">Riwayat Tes</th>
                                    <th className="py-3.5 px-4 text-right">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-slate-400">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Users className="size-8 text-slate-300" />
                                                <p className="font-medium text-sm">Tidak ada peserta ditemukan.</p>
                                                <p className="text-xs">Coba sesuaikan kata kunci pencarian atau filter status.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((u) => {
                                        const isPending = !u.is_active || u.verification_status === 'pending';
                                        const isExpired = u.is_expired;

                                        return (
                                            <tr key={u.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="py-3.5 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                                                            {u.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                                                                {u.name}
                                                            </div>
                                                            <div className="font-mono text-slate-500 text-[11px]">
                                                                {u.email}
                                                            </div>
                                                            {u.phone && (
                                                                <a 
                                                                    href={`https://wa.me/${u.phone.replace(/[^0-9]/g, '')}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer" 
                                                                    className="text-emerald-700 dark:text-emerald-400 text-[11px] hover:underline inline-flex items-center gap-1 mt-0.5"
                                                                >
                                                                    <MessageCircle className="size-3" />
                                                                    <span>{u.phone}</span>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-4">
                                                    {u.lynk_order_id ? (
                                                        <div className="space-y-1">
                                                            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 inline-flex items-center gap-1">
                                                                <CheckCircle2 className="size-3 text-emerald-600" />
                                                                <span>{u.lynk_order_id}</span>
                                                            </span>
                                                            <p className="text-[10px] text-slate-400">Order Lynk.id Valid</p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-1">
                                                            <span className="font-mono text-[11px] text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                                                Manual / Belum input
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="py-3.5 px-4">
                                                    {isPending ? (
                                                        <div className="space-y-1">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                                                                <Clock className="size-3 text-amber-600" />
                                                                <span>Menunggu Verifikasi</span>
                                                            </span>
                                                            <p className="text-[10px] text-slate-500">Pendaftaran baru / Belum verifikasi</p>
                                                        </div>
                                                    ) : isExpired ? (
                                                        <div className="space-y-1">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
                                                                <UserX className="size-3 text-rose-600" />
                                                                <span>Kadaluarsa</span>
                                                            </span>
                                                            <p className="text-[10px] text-rose-600">Berakhir pada {u.expires_at_formatted}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-1">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                                                                <ShieldCheck className="size-3 text-emerald-600" />
                                                                <span>Aktif ({u.remaining_days ?? 365} hari lagi)</span>
                                                            </span>
                                                            <p className="text-[10px] text-slate-500 flex items-center gap-1">
                                                                <Calendar className="size-3 text-slate-400" />
                                                                <span>Hingga {u.expires_at_formatted ?? '-'}</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="py-3.5 px-4 text-center">
                                                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">
                                                        {u.tryout_sessions_count} sesi
                                                    </span>
                                                </td>

                                                <td className="py-3.5 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        {isPending ? (
                                                            <button
                                                                onClick={() => openConfirmVerify(u)}
                                                                className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                                                                title="Verifikasi Akun & Aktifkan Lisensi 1 Tahun"
                                                            >
                                                                <UserCheck className="size-3.5" />
                                                                <span>Verifikasi (1 Thn)</span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => openConfirmExtend(u)}
                                                                className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                                                                title="Perpanjang Masa Aktif 1 Tahun"
                                                            >
                                                                <RotateCcw className="size-3" />
                                                                <span>+1 Thn</span>
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => openConfirmDelete(u)}
                                                            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                                            title="Hapus Akun Peserta"
                                                        >
                                                            <Trash2 className="size-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links.length > 3 && (
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                            <div>
                                Menampilkan halaman <span className="font-bold text-slate-800 dark:text-slate-200">{users.current_page}</span> dari <span className="font-bold text-slate-800 dark:text-slate-200">{users.last_page}</span> ({users.total} total peserta)
                            </div>
                            <div className="flex items-center gap-1">
                                {users.links.map((link, lIdx) => (
                                    <button
                                        key={lIdx}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                                            link.active
                                                ? 'bg-emerald-800 text-white border-emerald-800 font-bold'
                                                : link.url
                                                ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                                                : 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Konfirmasi Tindakan (Verify, Extend, Delete) */}
            {confirmAction && (
                <ConfirmModal
                    isOpen={Boolean(confirmAction)}
                    onClose={() => !isProcessingAction && setConfirmAction(null)}
                    onConfirm={executeConfirmAction}
                    isProcessing={isProcessingAction}
                    variant={
                        confirmAction.type === 'delete'
                            ? 'danger'
                            : confirmAction.type === 'verify'
                            ? 'success'
                            : 'info'
                    }
                    title={
                        confirmAction.type === 'verify'
                            ? 'Verifikasi Akun Peserta?'
                            : confirmAction.type === 'extend'
                            ? 'Perpanjang Masa Aktif Akun?'
                            : 'Hapus Akun Peserta?'
                    }
                    windowTitle={
                        confirmAction.type === 'verify'
                            ? 'Aktivasi Akses 1 Tahun'
                            : confirmAction.type === 'extend'
                            ? 'Perpanjangan Masa Aktif'
                            : 'Penghapusan Data Peserta'
                    }
                    badgeText={
                        confirmAction.type === 'verify'
                            ? 'VERIFIKASI'
                            : confirmAction.type === 'extend'
                            ? 'PERPANJANG'
                            : 'HAPUS PERMANEN'
                    }
                    confirmText={
                        confirmAction.type === 'verify'
                            ? 'Verifikasi & Aktifkan (1 Thn)'
                            : confirmAction.type === 'extend'
                            ? 'Perpanjang +1 Tahun'
                            : 'Ya, Hapus Akun'
                    }
                    description={
                        confirmAction.type === 'verify' ? (
                            <span>
                                Akun peserta <strong>{confirmAction.user.name}</strong> akan diaktifkan penuh selama <strong>1 Tahun (365 Hari)</strong> dan email notifikasi resmi bertuliskan <strong>proASN by Ketik.in</strong> akan otomatis dikirimkan ke email peserta.
                            </span>
                        ) : confirmAction.type === 'extend' ? (
                            <span>
                                Masa aktif akun <strong>{confirmAction.user.name}</strong> akan diperpanjang <strong>+365 Hari (1 Tahun)</strong> dari tanggal kedaluwarsa saat ini.
                            </span>
                        ) : (
                            <span>
                                Apakah Anda yakin ingin menghapus akun <strong>{confirmAction.user.name}</strong>? Seluruh data profil dan riwayat asesmen peserta ini akan dihapus secara permanen.
                            </span>
                        )
                    }
                    details={
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 font-medium">Email Peserta:</span>
                                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{confirmAction.user.email}</span>
                            </div>
                            {confirmAction.user.lynk_order_id && (
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">ID Lynk.id:</span>
                                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">{confirmAction.user.lynk_order_id}</span>
                                </div>
                            )}
                            {confirmAction.user.expires_at_formatted && (
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">Masa Aktif Saat Ini:</span>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">s/d {confirmAction.user.expires_at_formatted}</span>
                                </div>
                            )}
                        </div>
                    }
                />
            )}

            {/* Modal Tambah Pengguna Manual */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
                        <MacWindowControls title="Tambah Peserta Baru" badge="ADMIN INPUT" />
                        <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Tambah Akun Peserta</h3>
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div>
                                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Lengkap & Gelar *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Contoh: Budi Santoso, S.STP"
                                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>

                                <div>
                                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Alamat Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="nama@email.com"
                                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>

                                <div>
                                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nomor WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="081234567890"
                                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>

                                <div>
                                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ID Order Lynk.id (Opsional)</label>
                                    <input
                                        type="text"
                                        value={formData.lynk_order_id}
                                        onChange={(e) => setFormData({ ...formData, lynk_order_id: e.target.value })}
                                        placeholder="Misal: LYNK-928172"
                                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                                    />
                                </div>

                                <div>
                                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kata Sandi Default</label>
                                    <input
                                        type="text"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                                    />
                                </div>

                                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-emerald-950 dark:text-emerald-200 text-xs">Langsung Aktifkan 1 Tahun</p>
                                        <p className="text-[10px] text-emerald-700 dark:text-emerald-400">Kirim email konfirmasi aktivasi otomatis</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md cursor-pointer"
                                >
                                    Simpan Pengguna
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

AdminUsers.layout = {
    breadcrumbs: [
        {
            title: 'Panel Admin ProASN',
            href: '/admin',
        },
        {
            title: 'Verifikasi User Lynk.id',
            href: '/admin/users',
        },
    ],
};
