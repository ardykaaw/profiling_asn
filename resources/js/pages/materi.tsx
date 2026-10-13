import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    BookOpen, 
    Search, 
    Play, 
    FileText, 
    Zap, 
    CheckCircle2, 
    Lock, 
    ArrowLeft, 
    Sparkles, 
    Clock,
    Award
} from 'lucide-react';

interface ModuleItem {
    id: number;
    kat: 'twk' | 'tiu' | 'tkp' | 'skb';
    judul: string;
    tipe: 'video' | 'pdf' | 'ringkasan';
    durasi: string;
    level: 'Dasar' | 'Menengah' | 'Lanjutan';
    done: boolean;
    locked: boolean;
    desc: string;
    content?: string | null;
    file_path?: string | null;
    video_url?: string | null;
}

const categoryTabs = [
    { id: 'twk', name: 'TWK (Wawasan Kebangsaan)', count: 30, desc: 'Pilar Negara, Nasionalisme, Integritas' },
    { id: 'tiu', name: 'TIU (Intelegensia Umum)', count: 35, desc: 'Silogisme, Numerik, Figural' },
    { id: 'tkp', name: 'TKP (Karakteristik Pribadi)', count: 45, desc: 'Pelayanan Publik, Profesionalisme' },
    { id: 'skb', name: 'SKB (Bidang Keahlian)', count: 100, desc: 'Kompetensi Formasi Instansi' },
];

const fallbackMateri: ModuleItem[] = [
    {
        id: 1,
        judul: 'Pancasila & Pembukaan UUD 1945 Komprehensif',
        kat: 'twk',
        tipe: 'video',
        durasi: '35 Menit',
        level: 'Dasar',
        done: true,
        locked: false,
        desc: 'Bedah tuntas butir-butir Pancasila, sejarah BPUPKI & PPKI, serta penerapan nilai dasar.',
    },
    {
        id: 2,
        judul: 'Tata Negara & Hirarki Peraturan Perundangan',
        kat: 'twk',
        tipe: 'pdf',
        durasi: '18 Halaman',
        level: 'Menengah',
        done: false,
        locked: false,
        desc: 'Struktur lembaga negara paska amandemen UUD 1945 dan wewenang MPR, DPR, DPD, MK, MA, KY.',
    },
    {
        id: 3,
        judul: 'Trik Cepat Soal TIU Silogisme & Logika Posisi',
        kat: 'tiu',
        tipe: 'video',
        durasi: '42 Menit',
        level: 'Menengah',
        done: true,
        locked: false,
        desc: 'Metode eliminasi cepat kesimpulan premis mayor & minor dan penalaran logis.',
    },
    {
        id: 4,
        judul: 'Formula Cepat Baris, Deret Angka & Huruf',
        kat: 'tiu',
        tipe: 'pdf',
        durasi: '24 Halaman',
        level: 'Dasar',
        done: false,
        locked: false,
        desc: 'Pola deret aritmetika bertingkat, geometri, dan trik pecahan desimal tanpa coretan panjang.',
    },
    {
        id: 5,
        judul: 'Strategi Meraih Skor Maksimal 5 di Setiap Soal TKP',
        kat: 'tkp',
        tipe: 'video',
        durasi: '50 Menit',
        level: 'Lanjutan',
        done: false,
        locked: false,
        desc: 'Sudut pandang ASN profesional dalam melayani masyarakat dan menyelesaikan konflik internal.',
    },
    {
        id: 6,
        judul: 'Ringkasan SKB Jabatan Fungsional Terpopuler',
        kat: 'skb',
        tipe: 'pdf',
        durasi: '45 Halaman',
        level: 'Lanjutan',
        done: false,
        locked: false,
        desc: 'Panduan teknis jabatan Analis Kebijakan, Pranata Komputer, Auditor, dan Guru Ahli Pertama.',
    },
];

interface MateriPageProps {
    dbMaterials?: ModuleItem[];
    categories?: Array<{ id: number; name: string; code: string }>;
}

export default function MateriPage({ dbMaterials, categories = [] }: MateriPageProps) {
    const allMateriList: ModuleItem[] = dbMaterials && dbMaterials.length > 0 ? dbMaterials : fallbackMateri;

    const [activeKat, setActiveKat] = useState<'twk' | 'tiu' | 'tkp' | 'skb'>('twk');
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState<ModuleItem | null>(null);

    const filtered = allMateriList.filter(
        (m: ModuleItem) =>
            m.kat === activeKat &&
            (search === '' || m.judul.toLowerCase().includes(search.toLowerCase()))
    );

    const doneCount = allMateriList.filter((m: ModuleItem) => m.kat === activeKat && m.done).length;
    const totalCount = allMateriList.filter((m: ModuleItem) => m.kat === activeKat).length;

    return (
        <>
            <Head title="Modul Materi Belajar CPNS" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {selectedItem ? (
                    /* DETAIL VIEW */
                    <div className="max-w-4xl mx-auto w-full space-y-6">
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="size-4" />
                            <span>Kembali ke Daftar Materi</span>
                        </button>

                        <div className="p-6 md:p-8 rounded-2xl border border-border bg-card space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#F0A500]/15 text-[#F0A500]">
                                    {selectedItem.kat.toUpperCase()}
                                </span>
                                <span className="text-xs px-2.5 py-1 rounded border border-border text-muted-foreground font-mono">
                                    Tingkat: {selectedItem.level}
                                </span>
                                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                                    <Clock className="size-3 text-[#F0A500]" />
                                    {selectedItem.durasi}
                                </span>
                            </div>

                            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                                {selectedItem.judul}
                            </h1>

                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                {selectedItem.desc}
                            </p>

                            {/* Media Player Showcase */}
                            {selectedItem.tipe === 'video' && (
                                <div className="aspect-video rounded-xl border border-border bg-accent/30 flex items-center justify-center relative overflow-hidden group">
                                    <div className="text-center p-6">
                                        <div className="w-16 h-16 rounded-full bg-[#F0A500] text-[#0B1023] flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                                            <Play className="size-6 fill-current ml-0.5" />
                                        </div>
                                        <p className="text-sm font-semibold text-foreground">
                                            Putar Pembahasan Video ({selectedItem.durasi})
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Kualitas 1080p Full HD • Bimbingan Mentor Berpengalaman
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Key Takeaways */}
                            <div className="p-5 rounded-xl border border-border bg-accent/20 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="size-4 text-[#F0A500]" />
                                    <h4 className="font-semibold text-sm text-foreground">
                                        Poin Kunci & Rumus Cepat
                                    </h4>
                                </div>
                                <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10B981] font-bold">✓</span>
                                        <span>Konsep fundamental yang selalu keluar dalam 3 periode tes CASN terakhir.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10B981] font-bold">✓</span>
                                        <span>Trik eliminasi pilihan jawaban yang menyesatkan kurang dari 30 detik per soal.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10B981] font-bold">✓</span>
                                        <span>Pola analogi dan sinonim kata serapan asing yang paling sering muncul di BKN.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4 flex flex-wrap gap-3">
                                <Link
                                    href="/tryout"
                                    className="px-6 py-3 rounded-xl font-bold text-xs bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all flex items-center gap-2"
                                >
                                    <Award className="size-4" />
                                    <span>Lanjut Kerjakan Latihan Terkait</span>
                                </Link>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="px-5 py-3 rounded-xl font-semibold text-xs border border-border bg-card text-foreground hover:bg-accent transition-all"
                                >
                                    Tandai Selesai & Kembali
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* LIST VIEW */
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-card to-card/60 border border-border shadow-sm">
                            <div>
                                <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                    Pusat Modul Materi SKD & SKB
                                </h1>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Kurikulum terstruktur berbasis kisi-kisi KepmenPAN-RB terkini untuk persiapan matang.
                                </p>
                            </div>

                            {/* Search Bar */}
                            <div className="flex items-center gap-2">
                                <div className="relative min-w-[260px]">
                                    <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari topik atau rumus..."
                                        className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-accent/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#F0A500]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Subtest Category Nav Tabs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {categoryTabs.map((tab) => {
                                const isActive = activeKat === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveKat(tab.id as typeof activeKat)}
                                        className={`p-4 rounded-xl border text-left transition-all ${
                                            isActive
                                                ? 'border-[#F0A500] bg-[#F0A500]/10 shadow-sm'
                                                : 'border-border bg-card hover:border-[#F0A500]/40'
                                        }`}
                                    >
                                        <p className={`font-semibold text-sm ${isActive ? 'text-[#F0A500]' : 'text-foreground'}`}>
                                            {tab.name.split(' ')[0]}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                            {tab.name.split('(')[1]?.replace(')', '') || tab.count}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Progress Header */}
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                            <span className="text-xs font-semibold text-foreground">
                                Progres Pembelajaran Subtes: {doneCount} dari {totalCount} Selesai
                            </span>
                            <div className="w-48 h-2 rounded-full bg-border overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-[#10B981] transition-all"
                                    style={{ width: `${(doneCount / (totalCount || 1)) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Modules Cards List */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {filtered.map((item: ModuleItem) => (
                                <div
                                    key={item.id}
                                    onClick={() => !item.locked && setSelectedItem(item)}
                                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                                        item.locked
                                            ? 'border-border bg-card/60 opacity-75'
                                            : 'border-border bg-card hover:border-[#F0A500] cursor-pointer card-hover'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`p-1.5 rounded-lg text-xs ${
                                                    item.tipe === 'video' 
                                                        ? 'bg-[#EF4444]/15 text-[#EF4444]' 
                                                        : item.tipe === 'pdf' 
                                                        ? 'bg-[#0EA5A0]/15 text-[#0EA5A0]' 
                                                        : 'bg-[#8B5CF6]/15 text-[#8B5CF6]'
                                                }`}>
                                                    {item.tipe === 'video' ? <Play className="size-3 fill-current" /> : item.tipe === 'pdf' ? <FileText className="size-3" /> : <Zap className="size-3" />}
                                                </span>
                                                <span className="font-mono text-xs text-muted-foreground uppercase">
                                                    {item.tipe} • {item.durasi}
                                                </span>
                                            </div>

                                            {item.done ? (
                                                <span className="text-xs font-mono font-bold text-[#10B981] flex items-center gap-1">
                                                    <CheckCircle2 className="size-3.5" />
                                                    <span>Selesai</span>
                                                </span>
                                            ) : item.locked ? (
                                                <span className="text-xs font-mono text-[#F0A500] flex items-center gap-1">
                                                    <Lock className="size-3.5" />
                                                    <span>VIP Member</span>
                                                </span>
                                            ) : (
                                                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent text-muted-foreground">
                                                    {item.level}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-semibold text-sm md:text-base text-foreground mb-1.5">
                                            {item.judul}
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                                        <span className="text-[#F0A500] font-semibold">
                                            {item.locked ? 'Buka Kunci dengan VIP' : 'Buka Modul Belajar →'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

MateriPage.layout = {
    breadcrumbs: [
        {
            title: 'Modul Materi CPNS',
            href: '/materi',
        },
    ],
};
