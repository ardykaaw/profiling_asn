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
    ExternalLink
} from 'lucide-react';

interface UserItem {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    lynk_order_id: string | null;
    is_active: boolean;
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
    };
}

export default function AdminUsers({ users, filters, stats }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

    const toggleUserStatus = (id: number) => {
        router.post(`/admin/users/${id}/toggle-status`, {}, { preserveScroll: true });
    };

    const deleteUser = (id: number, name: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus akun ${name}? Riwayat try out peserta ini juga akan terhapus.`)) {
            router.delete(`/admin/users/${id}`, { preserveScroll: true });
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
            <Head title="Verifikasi Pengguna Lynk.id — SiapCPNS Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-card via-card/90 to-[#141D33] border border-[#1E2C4A] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#F0A500]/15 text-[#F0A500] border border-[#F0A500]/30 flex items-center gap-1.5">
                                <Users className="size-3.5" />
                                <span>VERIFIKASI PENGGUNA</span>
                            </span>
                            <span className="text-xs text-muted-foreground">• Sinkronisasi Etalase Lynk.id</span>
                        </div>
                        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                            Kelola & Aktivasi Akses Member
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                            Verifikasi peserta yang telah melakukan checkout di etalase resmi Lynk.id. Aktifkan atau nonaktifkan hak akses ujian CAT dan modul materi.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all shadow-sm flex items-center gap-2"
                        >
                            <Plus className="size-4" />
                            <span>Tambah Pengguna Manual</span>
                        </button>
                    </div>
                </div>

                {/* KPI Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl border border-border bg-card">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Total Peserta Terdaftar</span>
                            <Users className="size-4 text-[#8B5CF6]" />
                        </div>
                        <p className="font-mono text-3xl font-bold text-foreground">{stats.total}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">Registrasi via Web SiapCPNS</p>
                    </div>

                    <div className="p-5 rounded-2xl border border-border bg-card">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Akses Aktif (Terverifikasi)</span>
                            <UserCheck className="size-4 text-[#10B981]" />
                        </div>
                        <p className="font-mono text-3xl font-bold text-[#10B981]">{stats.active}</p>
                        <p className="text-[11px] text-[#10B981] mt-1">Bisa akses try out & materi</p>
                    </div>

                    <div className="p-5 rounded-2xl border border-border bg-card">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Menunggu Verifikasi</span>
                            <Clock className="size-4 text-[#F0A500]" />
                        </div>
                        <p className="font-mono text-3xl font-bold text-[#F0A500]">{stats.pending}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">Belum diaktifkan / verifikasi</p>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="p-4 rounded-2xl border border-border bg-card flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama, email, no WA, invoice..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#F0A500]"
                        />
                    </form>

                    <div className="flex items-center gap-2 self-start md:self-auto overflow-x-auto w-full md:w-auto">
                        <Filter className="size-4 text-muted-foreground shrink-0" />
                        {[
                            { id: 'all', label: 'Semua Status' },
                            { id: 'active', label: 'Aktif Terverifikasi' },
                            { id: 'pending', label: 'Menunggu Aktivasi' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleFilterStatus(item.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                                    statusFilter === item.id
                                        ? 'bg-[#F0A500] text-[#0B1023]'
                                        : 'bg-background border border-border text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Users Table */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-background/80 border-b border-border text-muted-foreground font-mono">
                                <tr>
                                    <th className="p-4">Peserta</th>
                                    <th className="p-4">Kontak / WhatsApp</th>
                                    <th className="p-4">Info Order Lynk.id</th>
                                    <th className="p-4 text-center">Sesi Ujian</th>
                                    <th className="p-4 text-center">Status Akses</th>
                                    <th className="p-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                            Tidak ada data pengguna yang sesuai dengan pencarian.
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((u) => {
                                        const cleanPhone = u.phone ? u.phone.replace(/[^0-9]/g, '') : null;
                                        const waLink = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}` : null;

                                        return (
                                            <tr key={u.id} className="hover:bg-accent/30 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-[#1E2C4A] text-[#F0A500] font-bold flex items-center justify-center font-mono text-xs">
                                                            {u.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-foreground">{u.name}</p>
                                                            <p className="text-[11px] text-muted-foreground">{u.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    {u.phone ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-mono text-foreground">{u.phone}</span>
                                                            {waLink && (
                                                                <a
                                                                    href={waLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-1 rounded bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/30 transition-colors"
                                                                    title="Hubungi via WhatsApp"
                                                                >
                                                                    <MessageCircle className="size-3.5" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground/60 italic">—</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    {u.lynk_order_id ? (
                                                        <span className="font-mono px-2 py-0.5 rounded bg-accent text-[#F0A500] border border-border">
                                                            #{u.lynk_order_id}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground/60 italic">Order Reguler</span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-center font-mono font-bold text-foreground">
                                                    {u.tryout_sessions_count}x
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                                                        u.is_active
                                                            ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                                                            : 'bg-[#F0A500]/15 text-[#F0A500] border border-[#F0A500]/30'
                                                    }`}>
                                                        {u.is_active ? (
                                                            <>
                                                                <CheckCircle2 className="size-3" />
                                                                <span>AKTIF (LIFETIME)</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Clock className="size-3" />
                                                                <span>MENUNGGU AKTIVASI</span>
                                                            </>
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => toggleUserStatus(u.id)}
                                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                                                u.is_active
                                                                    ? 'bg-accent border border-border text-muted-foreground hover:text-foreground'
                                                                    : 'bg-[#10B981] text-[#0B1023] hover:bg-[#34D399] font-bold'
                                                            }`}
                                                        >
                                                            {u.is_active ? 'Nonaktifkan' : 'Aktifkan Akses ✓'}
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUser(u.id, u.name)}
                                                            className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                            title="Hapus Akun"
                                                        >
                                                            <Trash2 className="size-4" />
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
                </div>
            </div>

            {/* Modal Tambah Pengguna Manual */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-up">
                    <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl relative">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1"
                        >
                            <X className="size-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-[#F0A500]/15 text-[#F0A500]">
                                <Users className="size-5" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl font-bold text-foreground">
                                    Tambah Peserta Baru Manual
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Aktivasi akun untuk pembeli yang checkout di luar etalase Lynk.id
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Nama Lengkap Peserta *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Contoh: Budi Santoso"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-[#F0A500]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                        Email Peserta *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="nama@email.com"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-[#F0A500]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                        No. WhatsApp / Telepon
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="08123456789"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-[#F0A500]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                        No. Order / ID Lynk.id
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lynk_order_id}
                                        onChange={(e) => setFormData({ ...formData, lynk_order_id: e.target.value })}
                                        placeholder="Contoh: LNK-99210"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-[#F0A500]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                        Kata Sandi Awal *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-[#F0A500]"
                                    />
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-accent border border-border flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-foreground">Langsung Aktifkan Akses?</p>
                                    <p className="text-[11px] text-muted-foreground">Peserta langsung dapat login dan ujian</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="w-4 h-4 rounded text-[#F0A500] focus:ring-[#F0A500]"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all"
                                >
                                    Simpan & Beri Hak Akses
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground"
                                >
                                    Batal
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
            title: 'Panel Admin SiapCPNS',
            href: '/admin',
        },
        {
            title: 'Verifikasi User Lynk.id',
            href: '/admin/users',
        },
    ],
};
