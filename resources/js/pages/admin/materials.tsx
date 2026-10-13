import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { 
    BookOpen, 
    CheckCircle2, 
    Clock, 
    Edit3, 
    FileText, 
    FileUp, 
    Lock, 
    Play, 
    Plus, 
    Search, 
    Trash2, 
    Unlock, 
    Upload, 
    Video, 
    X, 
    ExternalLink 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Category {
    id: number;
    name: string;
    code: string;
    color: string;
}

interface Material {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    type: 'video' | 'pdf' | 'ringkasan';
    level: 'Dasar' | 'Menengah' | 'Lanjutan';
    duration: string;
    summary: string;
    content?: string | null;
    file_path?: string | null;
    video_url?: string | null;
    is_published: boolean;
    is_free: boolean;
    created_at: string;
    category?: Category;
}

interface PaginatedMaterials {
    data: Material[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

interface Props {
    materials: PaginatedMaterials;
    categories: Category[];
    filters: {
        category_id?: string;
        search?: string;
    };
}

export default function AdminMaterials({ materials, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm<{
        category_id: number;
        title: string;
        type: 'video' | 'pdf' | 'ringkasan';
        level: 'Dasar' | 'Menengah' | 'Lanjutan';
        duration: string;
        summary: string;
        content: string;
        video_url: string;
        file: File | null;
        is_published: boolean;
        is_free: boolean;
    }>({
        category_id: categories[0]?.id || 1,
        title: '',
        type: 'video',
        level: 'Dasar',
        duration: '20 min',
        summary: '',
        content: '',
        video_url: '',
        file: null,
        is_published: true,
        is_free: true,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/materi', {
            search,
            category_id: selectedCategory,
        }, { preserveState: true });
    };

    const handleCategoryFilter = (catId: string) => {
        setSelectedCategory(catId);
        router.get('/admin/materi', {
            search,
            category_id: catId,
        }, { preserveState: true });
    };

    const openCreateModal = () => {
        setEditingMaterial(null);
        reset();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (m: Material) => {
        setEditingMaterial(m);
        setData({
            category_id: m.category_id,
            title: m.title,
            type: m.type,
            level: m.level,
            duration: m.duration,
            summary: m.summary,
            content: m.content || '',
            video_url: m.video_url || '',
            file: null,
            is_published: m.is_published,
            is_free: m.is_free,
        });
        setIsCreateModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingMaterial) {
            put(`/admin/materi/${editingMaterial.id}`, {
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/materi', {
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus modul materi ini?')) {
            router.delete(`/admin/materi/${id}`);
        }
    };

    return (
        <>
            <Head title="Kelola & Upload Modul Materi CPNS" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-border">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#06B6D4]/15 text-[#06B6D4]">
                                MODUL PEMBELAJARAN
                            </span>
                            <span className="text-xs text-muted-foreground">• Total {materials.total} Modul Tersedia</span>
                        </div>
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            Kelola & Upload Modul Materi
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Unggah bahan ajar berupa dokumen PDF, materi video interaktif, dan rangkuman kisi-kisi resmi BKN.
                        </p>
                    </div>

                    <Button
                        onClick={openCreateModal}
                        className="text-xs font-bold h-10 rounded-xl bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all shadow-sm flex items-center gap-1.5"
                    >
                        <Upload className="size-4" />
                        <span>Upload Modul Baru</span>
                    </Button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
                        <button
                            onClick={() => handleCategoryFilter('')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                                selectedCategory === ''
                                    ? 'bg-[#F0A500] text-[#0B1023] shadow-sm'
                                    : 'border border-border bg-card text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Semua Modul
                        </button>
                        {categories.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => handleCategoryFilter(String(c.id))}
                                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                                    selectedCategory === String(c.id)
                                        ? 'bg-[#F0A500] text-[#0B1023] shadow-sm'
                                        : 'border border-border bg-card text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {c.code}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-72">
                        <div className="relative w-full">
                            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul modul..."
                                className="pl-9 h-9 text-xs rounded-xl bg-card border-border"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs">
                            Cari
                        </Button>
                    </form>
                </div>

                {/* Materials List Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {materials.data.length === 0 ? (
                        <div className="col-span-full text-center py-12 rounded-2xl border border-border bg-card text-muted-foreground text-sm">
                            Belum ada modul materi pada kategori ini. Klik "Upload Modul Baru" untuk menambahkan materi pertama.
                        </div>
                    ) : (
                        materials.data.map((m) => (
                            <div key={m.id} className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-4 hover:border-[#F0A500]/40 transition-all card-hover">
                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#06B6D4]/15 text-[#06B6D4] uppercase">
                                            {m.category?.code ?? 'TWK'}
                                        </span>
                                        <div className="flex items-center gap-2 text-muted-foreground font-mono text-[11px]">
                                            <span className="flex items-center gap-1">
                                                <Clock className="size-3" />
                                                {m.duration}
                                            </span>
                                            <span>•</span>
                                            <span>{m.level}</span>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-sm text-foreground line-clamp-2">
                                        {m.title}
                                    </h3>

                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {m.summary}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-border flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                            m.type === 'video' ? 'bg-[#EF4444]/15 text-[#EF4444]' : 'bg-[#10B981]/15 text-[#10B981]'
                                        }`}>
                                            {m.type === 'video' ? '🎥 Video' : '📄 PDF/Bacaan'}
                                        </span>
                                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                            m.is_free ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#F0A500]/15 text-[#F0A500]'
                                        }`}>
                                            {m.is_free ? 'Gratis' : 'VIP'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => openEditModal(m)}
                                            className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                                            title="Edit Materi"
                                        >
                                            <Edit3 className="size-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(m.id)}
                                            className="p-1.5 rounded-lg border border-border hover:bg-[#EF4444]/10 text-muted-foreground hover:text-[#EF4444] transition-colors"
                                            title="Hapus Materi"
                                        >
                                            <Trash2 className="size-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* CREATE / EDIT MATERIAL MODAL */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
                    <div className="rounded-2xl border border-border bg-[#131B2E] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-border">
                            <div>
                                <h2 className="font-display text-xl font-bold text-foreground">
                                    {editingMaterial ? 'Edit Modul Materi' : 'Upload Modul Materi Baru'}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    Sediakan materi berstandar SKD BKN (Video YouTube, Dokumen PDF, atau Rangkuman Teks)
                                </p>
                            </div>
                            <button onClick={() => setIsCreateModalOpen(false)}>
                                <X className="size-5 text-muted-foreground" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Judul Modul Materi</Label>
                                <Input
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Pilar Negara: Pengamalan Sila Pancasila dalam Kehidupan Berbangsa"
                                    className="h-10 text-xs rounded-xl bg-card border-border"
                                    required
                                />
                                {errors.title && <p className="text-destructive text-[11px]">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Kategori Subtes</Label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', Number(e.target.value))}
                                        className="w-full h-10 rounded-xl bg-card border border-border text-foreground px-3 text-xs focus:ring-[#F0A500]"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.code} - {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Tipe Format</Label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value as any)}
                                        className="w-full h-10 rounded-xl bg-card border border-border text-foreground px-3 text-xs focus:ring-[#F0A500]"
                                    >
                                        <option value="video">Video Pembahasan</option>
                                        <option value="pdf">Dokumen PDF / File</option>
                                        <option value="ringkasan">Ringkasan Teks / E-Book</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Tingkat Kesulitan</Label>
                                    <select
                                        value={data.level}
                                        onChange={(e) => setData('level', e.target.value as any)}
                                        className="w-full h-10 rounded-xl bg-card border border-border text-foreground px-3 text-xs focus:ring-[#F0A500]"
                                    >
                                        <option value="Dasar">Dasar (Pemula)</option>
                                        <option value="Menengah">Menengah</option>
                                        <option value="Lanjutan">Lanjutan (HOTS)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Estimasi Durasi Belajar</Label>
                                    <Input
                                        value={data.duration}
                                        onChange={(e) => setData('duration', e.target.value)}
                                        placeholder="Contoh: 25 min"
                                        className="h-10 text-xs rounded-xl bg-card border-border"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Tautan Video (YouTube / URL)</Label>
                                    <Input
                                        value={data.video_url}
                                        onChange={(e) => setData('video_url', e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="h-10 text-xs rounded-xl bg-card border-border"
                                    />
                                </div>
                            </div>

                            {/* File Upload input */}
                            <div className="space-y-1.5 pt-2 border-t border-border">
                                <Label className="text-xs font-semibold">Upload File Dokumen Modul (PDF / DOC / ZIP)</Label>
                                <div className="p-4 rounded-xl border border-dashed border-border bg-card/60 text-center">
                                    <input
                                        type="file"
                                        id="material_file"
                                        accept=".pdf,.doc,.docx,.zip"
                                        onChange={(e) => setData('file', e.target.files ? e.target.files[0] : null)}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="material_file"
                                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-foreground hover:bg-accent/80 text-xs font-medium"
                                    >
                                        <FileUp className="size-4 text-[#F0A500]" />
                                        <span>{data.file ? data.file.name : 'Pilih File PDF dari Komputer'}</span>
                                    </label>
                                    <p className="text-[11px] text-muted-foreground mt-2">
                                        Maksimal ukuran file: 20 MB (Format: .pdf, .docx, .zip)
                                    </p>
                                </div>
                            </div>

                            {/* Summary Text */}
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Ringkasan Singkat Modul</Label>
                                <textarea
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    rows={2}
                                    placeholder="Jelaskan ringkasan isi modul yang akan dipelajari peserta..."
                                    className="w-full rounded-xl bg-card border border-border text-foreground p-3 text-xs focus:ring-[#F0A500]"
                                    required
                                />
                            </div>

                            {/* Content Text */}
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Isi Materi Lengkap / Catatan Modul</Label>
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={4}
                                    placeholder="Tuliskan materi pembelajaran lengkap (mendukung format markdown)..."
                                    className="w-full rounded-xl bg-card border border-border text-foreground p-3 text-xs font-mono focus:ring-[#F0A500]"
                                />
                            </div>

                            {/* Toggles */}
                            <div className="flex items-center gap-6 pt-2 border-t border-border">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_free}
                                        onChange={(e) => setData('is_free', e.target.checked)}
                                        className="size-4 text-[#F0A500] rounded focus:ring-[#F0A500]"
                                    />
                                    <span className="text-xs text-foreground">Bisa diakses Gratis (Member Free)</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="size-4 text-[#F0A500] rounded focus:ring-[#F0A500]"
                                    />
                                    <span className="text-xs text-foreground">Publikasikan Langsung ke Peserta</span>
                                </label>
                            </div>

                            {/* Buttons */}
                            <div className="pt-4 border-t border-border flex items-center justify-end gap-2.5">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="text-xs h-10 rounded-xl"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="text-xs font-bold h-10 rounded-xl bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166]"
                                >
                                    {editingMaterial ? 'Simpan Perubahan' : 'Upload & Terbitkan Modul'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

AdminMaterials.layout = {
    breadcrumbs: [
        {
            title: 'Panel Admin',
            href: '/admin',
        },
        {
            title: 'Upload Modul Materi',
            href: '/admin/materi',
        },
    ],
};
