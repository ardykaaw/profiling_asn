import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Edit3, Layers, Save, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Category {
    id: number;
    name: string;
    code: string;
    passing_grade: number;
    question_count: number;
    max_score: number;
    description?: string | null;
    color: string;
    questions_count?: number;
    materials_count?: number;
}

interface Props {
    categories: Category[];
}

export default function AdminCategories({ categories }: Props) {
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { data, setData, put, processing, reset, errors } = useForm({
        name: '',
        passing_grade: 65,
        question_count: 30,
        max_score: 150,
        description: '',
        color: '#F0A500',
    });

    const openEdit = (c: Category) => {
        setEditingCategory(c);
        setData({
            name: c.name,
            passing_grade: c.passing_grade,
            question_count: c.question_count,
            max_score: c.max_score,
            description: c.description || '',
            color: c.color,
        });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;

        put(`/admin/kategori/${editingCategory.id}`, {
            onSuccess: () => {
                setEditingCategory(null);
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Standar Nilai Kelulusan & Kategori SKD" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F0A500]/15 text-[#F0A500]">
                            STANDAR RESMI BKN
                        </span>
                        <span className="text-xs text-muted-foreground">• Regulasi KepmenPAN-RB SKD CPNS</span>
                    </div>
                    <h1 className="font-display text-2xl font-bold text-foreground">
                        Standar Nilai Kelulusan (Passing Grade)
                    </h1>
                    <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                        Atur ambang batas nilai kelulusan (passing grade), jumlah butir soal, dan bobot skor maksimal untuk masing-masing subtes SKD (TWK, TIU, TKP) dan SKB.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((c) => (
                        <div key={c.id} className="p-6 rounded-2xl border border-border bg-card space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span
                                        className="font-mono text-sm font-bold px-2.5 py-1 rounded"
                                        style={{ backgroundColor: `${c.color}20`, color: c.color }}
                                    >
                                        {c.code}
                                    </span>
                                    <button
                                        onClick={() => openEdit(c)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-accent text-xs font-semibold text-foreground transition-colors"
                                    >
                                        <Edit3 className="size-3.5 text-muted-foreground" />
                                        <span>Edit Standar</span>
                                    </button>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-base text-foreground">
                                        {c.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        {c.description}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-border grid grid-cols-3 gap-2 text-xs font-mono">
                                <div className="p-2.5 rounded-xl bg-accent/20 text-center">
                                    <p className="text-[10px] text-muted-foreground">Passing Grade</p>
                                    <p className="text-base font-bold text-[#F0A500] mt-0.5">{c.passing_grade}</p>
                                </div>
                                <div className="p-2.5 rounded-xl bg-accent/20 text-center">
                                    <p className="text-[10px] text-muted-foreground">Jumlah Soal</p>
                                    <p className="text-base font-bold text-foreground mt-0.5">{c.question_count}</p>
                                </div>
                                <div className="p-2.5 rounded-xl bg-accent/20 text-center">
                                    <p className="text-[10px] text-muted-foreground">Skor Maksimal</p>
                                    <p className="text-base font-bold text-foreground mt-0.5">{c.max_score}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* EDIT CATEGORY MODAL */}
            {editingCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="rounded-2xl border border-border bg-[#131B2E] w-full max-w-md p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-border">
                            <h2 className="font-display text-lg font-bold text-foreground">
                                Edit Standar {editingCategory.code}
                            </h2>
                            <button onClick={() => setEditingCategory(null)}>
                                <X className="size-4 text-muted-foreground" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4 text-xs">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Nama Kategori Subtes</Label>
                                <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="h-10 text-xs rounded-xl bg-card border-border"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Passing Grade</Label>
                                    <Input
                                        type="number"
                                        value={data.passing_grade}
                                        onChange={(e) => setData('passing_grade', Number(e.target.value))}
                                        className="h-10 text-xs rounded-xl bg-card border-border font-mono font-bold"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Jumlah Soal</Label>
                                    <Input
                                        type="number"
                                        value={data.question_count}
                                        onChange={(e) => setData('question_count', Number(e.target.value))}
                                        className="h-10 text-xs rounded-xl bg-card border-border font-mono"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Skor Max</Label>
                                    <Input
                                        type="number"
                                        value={data.max_score}
                                        onChange={(e) => setData('max_score', Number(e.target.value))}
                                        className="h-10 text-xs rounded-xl bg-card border-border font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Deskripsi Cakupan Materi</Label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-xl bg-card border border-border text-foreground p-3 text-xs"
                                />
                            </div>

                            <div className="pt-3 border-t border-border flex items-center justify-end gap-2.5">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditingCategory(null)}
                                    className="text-xs h-10 rounded-xl"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="text-xs font-bold h-10 rounded-xl bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166]"
                                >
                                    Simpan Standar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

AdminCategories.layout = {
    breadcrumbs: [
        {
            title: 'Panel Admin',
            href: '/admin',
        },
        {
            title: 'Standar Kategori SKD',
            href: '/admin/kategori',
        },
    ],
};
