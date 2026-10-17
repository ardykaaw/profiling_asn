import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    BookOpen, 
    Search, 
    Clock, 
    Sparkles, 
    Users, 
    Cpu, 
    Zap, 
    Brain,
    FileDown,
    ExternalLink,
    FileText,
    Download
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';

interface ModuleItem {
    id: number;
    kat: 'manajerial' | 'digital' | 'emerging' | 'potensi' | string;
    category_code?: string;
    category_name?: string;
    judul: string;
    tipe: string;
    durasi: string;
    level: string;
    done: boolean;
    locked: boolean;
    desc: string;
    content?: string | null;
    file_path?: string | null;
    video_url?: string | null;
}

const categoryTabs = [
    { id: 'semua', name: 'Semua Modul (9 Dokumen)' },
    { id: 'potensi', name: 'Tes Potensi Kognitif & Figural', icon: Brain },
    { id: 'manajerial', name: 'Manajerial & Sosio-Kultural', icon: Users },
    { id: 'digital', name: 'Literasi Digital SPBE & Keamanan', icon: Cpu },
    { id: 'karir', name: 'DNA Talent & Preferensi Karir', icon: Zap },
];

interface MateriProps {
    dbMaterials?: ModuleItem[];
    categories?: any[];
}

export default function MateriPage({ dbMaterials = [] }: MateriProps) {
    const [selectedTab, setSelectedTab] = useState('semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeModule, setActiveModule] = useState<ModuleItem | null>(null);

    const materials = dbMaterials && dbMaterials.length > 0 ? dbMaterials : [];

    const filteredMateri = materials.filter((item) => {
        const matchesTab = selectedTab === 'semua' || item.kat === selectedTab;
        const matchesSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesTab && matchesSearch;
    });

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full font-sans text-slate-900 bg-[#F8F9FA] min-h-screen">
            <Head title="Modul Kisi-Kisi & Bank Materi ASN" />

            <div className="space-y-6">
                {/* Header Window */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <MacWindowControls title="Pusat Dokumen & Modul Asesmen Resmi" badge="9 DOKUMEN PDF" />
                    <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1.5">
                            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Bahan Asesmen Asli Profiling ASN</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Modul & Bahan Ajar Asesmen ASN
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                                Seluruh materi PDF resmi mencakup 4 dimensi uji kompetensi: Manajerial MenPAN-RB, Literasi Digital SPBE, Emerging Skills, dan Penalaran Kognitif & Figural.
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Cari modul atau topik..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                    {categoryTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                selectedTab === tab.id
                                    ? 'bg-emerald-800 text-white shadow-xs'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredMateri.map((modul) => (
                        <div
                            key={modul.id}
                            className="rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden"
                        >
                            <MacWindowControls title={modul.category_name || 'Modul Asesmen'} badge={modul.tipe.toUpperCase()} />
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                                        <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                                            {modul.category_code || 'ASN'}
                                        </span>
                                        <span className="flex items-center gap-1 font-mono">
                                            <Clock className="w-3 h-3 text-slate-400" />
                                            {modul.durasi}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                                        {modul.judul}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                                        {modul.desc}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                    <span className="text-[11px] font-mono text-slate-500 truncate">
                                        {modul.level}
                                    </span>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {modul.file_path && (
                                            <a
                                                href={modul.file_path}
                                                download
                                                className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                                                title="Unduh File PDF"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => setActiveModule(modul)}
                                            className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                                        >
                                            <FileText className="w-3.5 h-3.5" />
                                            <span>Baca</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal View for Material Reading & Direct PDF Download */}
                {activeModule && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
                        <div className="max-w-2xl w-full rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                            <MacWindowControls title={activeModule.judul} badge="DOKUMEN ASLI" />
                            <div className="p-6 overflow-y-auto space-y-4 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                        {activeModule.category_name || activeModule.category_code}
                                    </span>
                                    <span className="text-xs text-slate-500 font-mono">
                                        Estimasi: {activeModule.durasi} • Tingkat: {activeModule.level}
                                    </span>
                                </div>

                                <h2 className="text-lg font-bold text-slate-900">
                                    {activeModule.judul}
                                </h2>

                                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <p className="font-semibold text-slate-900">Ringkasan Modul:</p>
                                    <p>{activeModule.desc}</p>
                                    {activeModule.content && (
                                        <p className="pt-2 border-t border-slate-200 text-slate-600">{activeModule.content}</p>
                                    )}
                                </div>

                                {activeModule.file_path && (
                                    <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-2 rounded-lg bg-emerald-800 text-white">
                                                <FileDown className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-900">Berkas PDF Dokumen Lengkap</div>
                                                <div className="text-[11px] text-slate-600">Bahan studi resmi dapat diunduh atau dibuka di browser</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={activeModule.file_path}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-3.5 py-2 rounded-xl border border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                                            >
                                                <span>Buka PDF</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                            <a
                                                href={activeModule.file_path}
                                                download
                                                className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                                            >
                                                <span>Unduh</span>
                                                <Download className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                                <button
                                    onClick={() => setActiveModule(null)}
                                    className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                                >
                                    Tutup Dokumen
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

MateriPage.layout = {
    breadcrumbs: [
        {
            title: 'Modul Materi ASN',
            href: '/materi',
        },
    ],
};
