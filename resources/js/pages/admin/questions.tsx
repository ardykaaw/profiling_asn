import { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { 
    Award, 
    Check, 
    CheckCircle2, 
    ChevronLeft, 
    ChevronRight, 
    Edit3, 
    Filter, 
    FolderKanban, 
    HelpCircle, 
    Image as ImageIcon,
    Layers, 
    Plus, 
    Search, 
    Trash2, 
    UploadCloud, 
    X,
    ZoomIn 
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

interface Question {
    id: number;
    category_id: number;
    sub_category: string;
    question: string;
    image_path?: string | null;
    image_url?: string | null;
    options: string[];
    correct_answer: number;
    scores?: number[] | null;
    explanation?: string | null;
    is_active: boolean;
    category?: Category;
}

interface PaginatedQuestions {
    data: Question[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    prev_page_url?: string | null;
    next_page_url?: string | null;
}

interface Props {
    questions: PaginatedQuestions;
    categories: Category[];
    filters: {
        category_id?: string;
        search?: string;
    };
}

export default function AdminQuestions({ questions, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [viewingImage, setViewingImage] = useState<{ url: string; title?: string } | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setViewingImage(null);
            }
        };
        if (viewingImage) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [viewingImage]);

    // Form state for creating question
    const { data, setData, post, processing, reset, errors } = useForm<{
        category_id: number;
        sub_category: string;
        question: string;
        options: string[];
        correct_answer: number;
        scores: number[];
        explanation: string;
        is_active: boolean;
        image: File | null;
        remove_image: boolean;
    }>({
        category_id: categories[0]?.id || 1,
        sub_category: '',
        question: '',
        options: ['', '', '', '', ''],
        correct_answer: 0,
        scores: [5, 4, 3, 2, 1],
        explanation: '',
        is_active: true,
        image: null,
        remove_image: false,
    });

    const activeCat = categories.find((c) => c.id === Number(data.category_id));
    const isTKP = activeCat?.code === 'TKP';

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/soal', {
            search,
            category_id: selectedCategory,
        }, { preserveState: true });
    };

    const handleCategoryFilter = (catId: string) => {
        setSelectedCategory(catId);
        router.get('/admin/soal', {
            search,
            category_id: catId,
        }, { preserveState: true });
    };

    const openCreateModal = () => {
        setEditingQuestion(null);
        setImagePreview(null);
        reset();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (q: Question) => {
        setEditingQuestion(q);
        setImagePreview(q.image_url || null);
        setData({
            category_id: q.category_id,
            sub_category: q.sub_category,
            question: q.question,
            options: [...q.options],
            correct_answer: q.correct_answer,
            scores: q.scores ? [...q.scores] : [5, 4, 3, 2, 1],
            explanation: q.explanation || '',
            is_active: q.is_active,
            image: null,
            remove_image: false,
        });
        setIsCreateModalOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData((prev) => ({ ...prev, image: file, remove_image: false }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setData((prev) => ({ ...prev, image: null, remove_image: true }));
        setImagePreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingQuestion) {
            router.post(`/admin/soal/${editingQuestion.id}`, {
                _method: 'put',
                ...data,
            }, {
                forceFormData: true,
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                    reset();
                    setImagePreview(null);
                },
            });
        } else {
            post('/admin/soal', {
                forceFormData: true,
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                    reset();
                    setImagePreview(null);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus butir soal ini dari bank soal?')) {
            router.delete(`/admin/soal/${id}`);
        }
    };

    // Quick import sample questions
    const handleQuickSampleImport = () => {
        const sampleBatch = [
            {
                category_id: categories[0]?.id || 1,
                sub_category: 'Pilar Negara (UUD 1945)',
                question: 'Lembaga negara yang berwenang memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan oleh UUD 1945 adalah...',
                options: ['Mahkamah Konstitusi', 'Mahkamah Agung', 'Komisi Yudisial', 'Dewan Perwakilan Rakyat', 'Majelis Permusyawaratan Rakyat'],
                correct_answer: 0,
                explanation: 'Berdasarkan Pasal 24C ayat (1) UUD 1945, Mahkamah Konstitusi berwenang mengadili pada tingkat pertama dan terakhir untuk memutus sengketa kewenangan lembaga negara.',
            },
            {
                category_id: categories[1]?.id || 2,
                sub_category: 'Numerik (Kecepatan & Jarak)',
                question: 'Sebuah mobil berangkat pukul 08.00 dengan kecepatan rata-rata 60 km/jam menuju kota B yang berjarak 180 km. Di tengah jalan mobil berhenti istirahat 30 menit. Pukul berapa mobil tiba di kota B?',
                options: ['11.00', '11.30', '12.00', '12.30', '10.30'],
                correct_answer: 1,
                explanation: 'Waktu tempuh murni = 180 km ÷ 60 km/jam = 3 jam. Waktu istirahat = 30 menit. Total waktu = 3 jam 30 menit. Tiba di tujuan: 08.00 + 03.30 = 11.30.',
            },
        ];

        router.post('/admin/soal/import', { questions: sampleBatch }, {
            onSuccess: () => setIsImportModalOpen(false),
        });
    };

    return (
        <>
            <Head title="Kelola Bank Soal CAT CPNS" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-border">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F0A500]/15 text-[#F0A500]">
                                BANK SOAL CAT BKN
                            </span>
                            <span className="text-xs text-muted-foreground">• Total {questions.total} Butir Soal Terdaftar</span>
                        </div>
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            Kelola Butir Soal Ujian
                        </h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Input manual butir soal baru atau import massal soal standar TWK, TIU, dan TKP berskor resmi BKN.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Button
                            onClick={() => setIsImportModalOpen(true)}
                            variant="outline"
                            className="text-xs font-semibold h-10 rounded-xl border-border bg-card text-foreground hover:bg-accent"
                        >
                            <UploadCloud className="size-4 mr-1.5 text-muted-foreground" />
                            Import Massal
                        </Button>
                        <Button
                            onClick={openCreateModal}
                            className="text-xs font-bold h-10 rounded-xl bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all shadow-sm"
                        >
                            <Plus className="size-4 mr-1.5" />
                            + Input Soal Baru
                        </Button>
                    </div>
                </div>

                {/* Filters & Search Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Category Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
                        <button
                            onClick={() => handleCategoryFilter('')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                                selectedCategory === ''
                                    ? 'bg-[#F0A500] text-[#0B1023] shadow-sm'
                                    : 'border border-border bg-card text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Semua Subtes
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

                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-72">
                        <div className="relative w-full">
                            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari soal / topik..."
                                className="pl-9 h-9 text-xs rounded-xl bg-card border-border"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs">
                            Cari
                        </Button>
                    </form>
                </div>

                {/* Questions List Table */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="border-b border-border bg-accent/30 font-mono text-muted-foreground uppercase text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-4 w-12 text-center">No</th>
                                    <th className="py-3.5 px-4 w-28">Kategori</th>
                                    <th className="py-3.5 px-4 w-44">Sub-Topik</th>
                                    <th className="py-3.5 px-4">Teks Soal & Opsi</th>
                                    <th className="py-3.5 px-4 w-32 text-center">Kunci / Skor</th>
                                    <th className="py-3.5 px-4 w-24 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {questions.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-muted-foreground text-sm">
                                            Belum ada butir soal pada kategori ini. Klik "+ Input Soal Baru" untuk mulai menambahkan.
                                        </td>
                                    </tr>
                                ) : (
                                    questions.data.map((q, idx) => {
                                        const optionLetters = ['A', 'B', 'C', 'D', 'E'];
                                        const isTKPQuestion = q.category?.code === 'TKP';

                                        return (
                                            <tr key={q.id} className="hover:bg-accent/20 transition-colors">
                                                <td className="py-3 px-4 font-mono text-center text-muted-foreground">
                                                    {(questions.current_page - 1) * questions.per_page + idx + 1}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#F0A500]/15 text-[#F0A500]">
                                                        {q.category?.code ?? 'TWK'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 font-medium text-foreground">
                                                    {q.sub_category}
                                                </td>
                                                <td className="py-3 px-4 space-y-1.5 max-w-xl">
                                                    <p className="font-medium text-foreground line-clamp-2">
                                                        {q.question}
                                                    </p>
                                                    {q.image_url && (
                                                        <div className="flex items-center gap-2 pt-0.5">
                                                            <button
                                                                type="button"
                                                                onClick={() => setViewingImage({
                                                                    url: q.image_url!,
                                                                    title: `${q.category?.name ?? 'Soal'} (${q.sub_category})`
                                                                })}
                                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/25 hover:border-blue-400/50 hover:text-blue-300 transition-all cursor-pointer shadow-xs group"
                                                            >
                                                                <ImageIcon className="size-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                                                                <span>Lihat Gambar Soal</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {q.options.map((opt, optIdx) => (
                                                            <span
                                                                key={optIdx}
                                                                className={`text-[10px] px-1.5 py-0.5 rounded font-mono truncate max-w-[140px] ${
                                                                    !isTKPQuestion && optIdx === q.correct_answer
                                                                        ? 'bg-[#10B981]/20 text-[#10B981] font-bold border border-[#10B981]/40'
                                                                        : 'bg-accent/40 text-muted-foreground'
                                                                }`}
                                                            >
                                                                {optionLetters[optIdx]}. {opt}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-center font-mono">
                                                    {isTKPQuestion ? (
                                                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#8B5CF6]/15 text-[#8B5CF6] font-bold">
                                                            Skor 1-5
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded text-[11px] bg-[#10B981]/15 text-[#10B981] font-bold">
                                                            Kunci: {optionLetters[q.correct_answer]} (+5)
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <button
                                                            onClick={() => openEditModal(q)}
                                                            className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                                                            title="Edit Soal"
                                                        >
                                                            <Edit3 className="size-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(q.id)}
                                                            className="p-1.5 rounded-lg border border-border hover:bg-[#EF4444]/10 text-muted-foreground hover:text-[#EF4444] transition-colors"
                                                            title="Hapus Soal"
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
                    {questions.last_page > 1 && (
                        <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                                Halaman {questions.current_page} dari {questions.last_page} ({questions.total} total butir soal)
                            </span>
                            <div className="flex items-center gap-2">
                                {questions.prev_page_url && (
                                    <button
                                        onClick={() => router.get(questions.prev_page_url!)}
                                        className="p-1.5 rounded-lg border border-border hover:bg-accent"
                                    >
                                        <ChevronLeft className="size-4" />
                                    </button>
                                )}
                                {questions.next_page_url && (
                                    <button
                                        onClick={() => router.get(questions.next_page_url!)}
                                        className="p-1.5 rounded-lg border border-border hover:bg-accent"
                                    >
                                        <ChevronRight className="size-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CREATE / EDIT QUESTION MODAL */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
                    <div className="rounded-2xl border border-border bg-[#131B2E] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-border">
                            <div>
                                <h2 className="font-display text-xl font-bold text-foreground">
                                    {editingQuestion ? 'Edit Butir Soal' : 'Input Butir Soal Baru'}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    Format soal standar CAT BKN dengan 5 pilihan jawaban (A, B, C, D, E)
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="p-1 rounded-lg hover:bg-accent text-muted-foreground"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-4">
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
                                    <Label className="text-xs font-semibold">Sub-Kategori / Topik Soal</Label>
                                    <Input
                                        value={data.sub_category}
                                        onChange={(e) => setData('sub_category', e.target.value)}
                                        placeholder="Contoh: Pilar Negara (Pancasila)"
                                        className="h-10 text-xs rounded-xl bg-card border-border"
                                        required
                                    />
                                    {errors.sub_category && <p className="text-destructive text-[11px]">{errors.sub_category}</p>}
                                </div>
                            </div>

                            {/* Soal Text */}
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Teks Pertanyaan</Label>
                                <textarea
                                    value={data.question}
                                    onChange={(e) => setData('question', e.target.value)}
                                    rows={3}
                                    placeholder="Tuliskan butir soal lengkap di sini..."
                                    className="w-full rounded-xl bg-card border border-border text-foreground p-3 text-xs focus:ring-[#F0A500]"
                                    required
                                />
                                {errors.question && <p className="text-destructive text-[11px]">{errors.question}</p>}
                            </div>

                            {/* Soal Figural (Upload Gambar Kualitas Tinggi) */}
                            <div className="space-y-2 p-3.5 rounded-xl border border-dashed border-border bg-card/60">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs font-semibold flex items-center gap-1.5 text-foreground">
                                        <ImageIcon className="size-4 text-[#F0A500]" />
                                        Gambar Soal Figural (Kualitas Tinggi)
                                    </Label>
                                    <span className="text-[10px] text-muted-foreground">PNG / JPG / WebP hingga 10MB</span>
                                </div>

                                {imagePreview ? (
                                    <div className="relative mt-2 p-3 rounded-xl bg-card border border-border flex flex-col items-center justify-center">
                                        <div
                                            className="group relative cursor-pointer overflow-hidden rounded-lg"
                                            onClick={() => setViewingImage({ url: imagePreview, title: 'Pratinjau Gambar Soal' })}
                                            title="Klik untuk memperbesar gambar"
                                        >
                                            <img
                                                src={imagePreview}
                                                alt="Pratinjau Gambar Soal"
                                                className="max-h-56 max-w-full rounded-lg object-contain shadow-sm border border-border/50 transition-transform duration-200 group-hover:scale-[1.02]"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-medium text-xs rounded-lg backdrop-blur-[1px]">
                                                <ZoomIn className="size-4" />
                                                <span>Klik untuk memperbesar</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-3">
                                            <label
                                                htmlFor="replace-question-image"
                                                className="cursor-pointer text-xs font-semibold text-[#F0A500] hover:underline flex items-center gap-1"
                                            >
                                                <UploadCloud className="size-3.5" /> Ganti Gambar
                                            </label>
                                            <input
                                                id="replace-question-image"
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                            <span className="text-muted-foreground">•</span>
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="text-xs font-semibold text-red-500 hover:text-red-400 flex items-center gap-1"
                                            >
                                                <Trash2 className="size-3.5" /> Hapus Gambar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-1">
                                        <input
                                            type="file"
                                            id="new-question-image"
                                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="new-question-image"
                                            className="flex flex-col items-center justify-center p-4 border border-dashed border-border/80 rounded-xl cursor-pointer hover:bg-accent/30 transition-colors"
                                        >
                                            <UploadCloud className="size-6 text-muted-foreground mb-1" />
                                            <span className="text-xs font-semibold text-foreground">Klik atau Tarik Gambar Soal ke Sini</span>
                                            <span className="text-[10px] text-muted-foreground mt-0.5">Mendukung visual grafik resolusi tinggi (Lossless HD)</span>
                                        </label>
                                    </div>
                                )}
                                {errors.image && <p className="text-destructive text-[11px]">{errors.image}</p>}
                            </div>

                            {/* 5 Options A-E */}
                            <div className="space-y-3 pt-2 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs font-semibold">Pilihan Jawaban (A - E)</Label>
                                    <span className="text-[11px] text-muted-foreground font-mono">
                                        {isTKP ? 'Mode TKP: Tentukan poin 1 - 5 per opsi' : 'Pilih satu opsi sebagai Kunci Jawaban Benar'}
                                    </span>
                                </div>

                                {['A', 'B', 'C', 'D', 'E'].map((letter, optIndex) => (
                                    <div key={letter} className="flex items-center gap-3">
                                        {/* Radio for TWK/TIU correct answer */}
                                        {!isTKP ? (
                                            <input
                                                type="radio"
                                                name="correct_answer_radio"
                                                checked={data.correct_answer === optIndex}
                                                onChange={() => setData('correct_answer', optIndex)}
                                                className="size-4 text-[#F0A500] focus:ring-[#F0A500]"
                                                title={`Tandai Opsi ${letter} sebagai Kunci Jawaban`}
                                            />
                                        ) : (
                                            <div className="w-16 shrink-0 flex items-center gap-1">
                                                <span className="text-[10px] text-muted-foreground font-mono">Poin:</span>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={data.scores[optIndex]}
                                                    onChange={(e) => {
                                                        const newScores = [...data.scores];
                                                        newScores[optIndex] = Number(e.target.value);
                                                        setData('scores', newScores);
                                                    }}
                                                    className="w-10 h-8 rounded-lg bg-card border border-border text-center text-xs font-mono font-bold"
                                                />
                                            </div>
                                        )}

                                        <span className="font-mono font-bold w-4 text-center text-[#F0A500]">
                                            {letter}
                                        </span>

                                        <Input
                                            value={data.options[optIndex]}
                                            onChange={(e) => {
                                                const newOpts = [...data.options];
                                                newOpts[optIndex] = e.target.value;
                                                setData('options', newOpts);
                                            }}
                                            placeholder={`Ketik pilihan jawaban ${letter}...`}
                                            className="h-9 text-xs rounded-xl bg-card border-border flex-1"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Pembahasan */}
                            <div className="space-y-1.5 pt-2 border-t border-border">
                                <Label className="text-xs font-semibold">Penjelasan & Pembahasan Kunci Jawaban</Label>
                                <textarea
                                    value={data.explanation}
                                    onChange={(e) => setData('explanation', e.target.value)}
                                    rows={3}
                                    placeholder="Jelaskan alasan kunci jawaban dan trik cepat penyelesaiannya..."
                                    className="w-full rounded-xl bg-card border border-border text-foreground p-3 text-xs focus:ring-[#F0A500]"
                                />
                            </div>

                            {/* Submit Buttons */}
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
                                    {editingQuestion ? 'Simpan Perubahan' : 'Tambahkan ke Bank Soal'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* IMPORT MODAL */}
            {isImportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="rounded-2xl border border-border bg-[#131B2E] w-full max-w-lg p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-border">
                            <h3 className="font-display text-lg font-bold text-foreground">
                                Import Soal Massal
                            </h3>
                            <button onClick={() => setIsImportModalOpen(false)}>
                                <X className="size-4 text-muted-foreground" />
                            </button>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Anda dapat mengimpor puluhan butir soal sekaligus menggunakan format data terstruktur agar persiapan bank soal try out nasional dapat diselesaikan lebih cepat.
                        </p>

                        <div className="p-4 rounded-xl border border-border bg-accent/20 space-y-2">
                            <p className="font-semibold text-xs text-foreground">Template Siap Pakai:</p>
                            <p className="text-[11px] text-muted-foreground font-mono">
                                2 butir soal simulasi (TWK Mahkamah Konstitusi & TIU Kecepatan Mobil) siap dimasukkan otomatis ke database.
                            </p>
                            <Button
                                onClick={handleQuickSampleImport}
                                className="w-full mt-2 text-xs font-bold bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166]"
                            >
                                Import 2 Soal Contoh Sekarang
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* IMAGE LIGHTBOX MODAL */}
            {viewingImage && (
                <div 
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setViewingImage(null)}
                >
                    <div 
                        className="relative rounded-2xl border border-white/10 bg-[#0F172A] max-w-4xl max-h-[92vh] w-full flex flex-col shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#131D33]">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                                    <ImageIcon className="size-4" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-white">
                                        {viewingImage.title || 'Gambar Bagan Soal'}
                                    </h4>
                                    <p className="text-[11px] text-slate-400">Pratinjau modal beresolusi penuh</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setViewingImage(null)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-slate-950/70 max-h-[calc(92vh-100px)]">
                            <img
                                src={viewingImage.url}
                                alt="Gambar Soal"
                                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-white/5 bg-white/5"
                            />
                        </div>
                        <div className="px-5 py-2.5 border-t border-white/10 bg-[#131D33] flex items-center justify-between text-xs text-slate-400">
                            <span>Tekan <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">ESC</kbd> atau klik area luar untuk menutup</span>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setViewingImage(null)}
                                className="h-7 text-xs border-white/20 text-slate-300 hover:text-white hover:bg-white/10"
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

AdminQuestions.layout = {
    breadcrumbs: [
        {
            title: 'Panel Admin',
            href: '/admin',
        },
        {
            title: 'Kelola Bank Soal',
            href: '/admin/soal',
        },
    ],
};
