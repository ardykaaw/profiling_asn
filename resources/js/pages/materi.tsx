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
    ArrowLeft
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
    { id: 'semua', name: 'Semua Modul Asesmen' },
    { id: 'manajerial', name: 'Manajerial & Sosio-Kultural', icon: Users },
    { id: 'digital', name: 'Literasi Digital ASN', icon: Cpu },
    { id: 'emerging', name: 'Emerging Skills & Analitis', icon: Zap },
    { id: 'potensi', name: 'Potensi Kognitif & Figural', icon: Brain },
];

const fallbackMateri: ModuleItem[] = [
    {
        id: 1,
        judul: 'Panduan Standar Kompetensi Manajerial ASN (PermenPAN-RB No. 38/2017)',
        kat: 'manajerial',
        category_name: 'Manajerial & Sosio-Kultural',
        tipe: 'Modul Teori & Kasus',
        durasi: '30 Menit',
        level: 'Madya & Pratama',
        done: true,
        locked: false,
        desc: 'Rangkuman lengkap 8 kompetensi manajerial (Integritas, Kerjasama, Komunikasi, Orientasi Hasil, Pelayanan Publik, Pengembangan Diri, Mengelola Perubahan, Pengambilan Keputusan).',
        content: 'Standar Kompetensi Manajerial ASN merupakan pedoman pokok dalam pemetaan talent pool dan seleksi terbuka jabatan pimpinan tinggi (JPT) maupun fungsional ahli. Pahami kata kunci indikator perilaku dan situasi dilematis etika birokrasi.'
    },
    {
        id: 2,
        judul: 'Literasi Digital ASN: 4 Pilar Indonesia Makin Cakap Digital',
        kat: 'digital',
        category_name: 'Literasi Digital ASN',
        tipe: 'Panduan SPBE & UU PDP',
        durasi: '25 Menit',
        level: 'Semua Jenjang Jabatan',
        done: false,
        locked: false,
        desc: 'Kupas tuntas Digital Skills, Digital Culture, Digital Ethics, dan Digital Safety untuk ASN di era Satu Data Indonesia dan Sistem Pemerintahan Berbasis Elektronik (SPBE).',
        content: 'Literasi digital bukan sekadar kemampuan mengoperasikan komputer, melainkan kesadaran etika bermedia sosial, kepatuhan pelindungan data pribadi (UU PDP), dan pencegahan rekayasa sosial di lingkungan birokrasi.'
    },
    {
        id: 3,
        judul: 'Emerging Skills & Analytical Thinking: Kunci Menembus Box 9 Talent Pool',
        kat: 'emerging',
        category_name: 'Emerging Skills',
        tipe: 'Studi Kasus & Analisis',
        durasi: '40 Menit',
        level: 'Lanjutan (Advanced)',
        done: false,
        locked: false,
        desc: 'Metode membedah masalah publik kompleks, teknik triangulasi data silang, pembuatan scenario planning anggaran, serta adopsi AI dan otomasi dalam tata kelola pelayanan publik.',
        content: 'Emerging Skills menuntut aparatur memiliki analytical mindset. Pelajari cara mengidentifikasi bottleneck proses kerja, merumuskan hipotesis perbaikan, dan menyusun rekomendasi kebijakan berbasis bukti kuantitatif.'
    },
    {
        id: 4,
        judul: 'Mastery Penalaran Figural, Logika Silogisme & Tes Potensi ASN',
        kat: 'potensi',
        category_name: 'Potensi Kognitif',
        tipe: 'Drill Soal & Pembahasan',
        durasi: '35 Menit',
        level: 'Semua Jenjang',
        done: false,
        locked: false,
        desc: 'Trik cepat membaca rotasi pola gambar spasial, keteraturan matriks bangun, penalaran analitis hubungan berantai, serta silogisme kategorik.',
        content: 'Tes potensi kognitif dan figural menilai ketahanan mental dan kecepatan berpikir kritis. Kuasai rumus eliminasi opsi dan identifikasi pola rotasi 90/180/270 derajat.'
    }
];

interface MateriProps {
    dbMaterials?: ModuleItem[];
    categories?: any[];
}

export default function MateriPage({ dbMaterials = [] }: MateriProps) {
    const materiList = dbMaterials && dbMaterials.length > 0 ? dbMaterials : fallbackMateri;
    const [selectedTab, setSelectedTab] = useState('semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeModule, setActiveModule] = useState<ModuleItem | null>(null);

    const filteredMateri = materiList.filter((m) => {
        const matchCategory = selectedTab === 'semua' || m.kat === selectedTab;
        const matchSearch = m.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            m.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <Head title="Modul Materi & Kisi-Kisi Profiling ASN" />

            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header in Mac Window */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                    <MacWindowControls title="Pusat Modul & Kisi-Kisi Uji Kompetensi" badge="KISI-KISI BKN" />
                    <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Pusat Referensi Manajemen Talenta ASN</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                Modul & Bahan Ajar Asesmen ASN
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                                Pelajari kisi-kisi 4 dimensi penilaian: Standar Kompetensi Manajerial MenPAN-RB, Literasi Digital SPBE, Emerging Skills, dan Penalaran Kognitif.
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Cari materi / kata kunci..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                                    ? 'bg-emerald-800 text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredMateri.map((modul) => (
                        <div
                            key={modul.id}
                            className="rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden"
                        >
                            <MacWindowControls title={modul.judul} badge={modul.tipe} />
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                                        <span className="font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                                            {modul.category_name || modul.kat}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {modul.durasi}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900">
                                        {modul.judul}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {modul.desc}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 font-medium">
                                        Tingkat: {modul.level}
                                    </span>
                                    <button
                                        onClick={() => setActiveModule(modul)}
                                        className="px-4 py-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold transition-all shadow-xs"
                                    >
                                        Buka Bahan Ajar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal View for Material Reading in Mac Window */}
                {activeModule && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
                        <div className="max-w-2xl w-full rounded-2xl border border-slate-300 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                            <MacWindowControls title="Dokumen Panduan Asesmen" badge="KISI-KISI" />
                            <div className="p-6 overflow-y-auto space-y-4 flex-1">
                                <div>
                                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                                        {activeModule.category_name || activeModule.kat}
                                    </span>
                                    <h2 className="text-lg font-bold text-slate-900 mt-2">
                                        {activeModule.judul}
                                    </h2>
                                </div>
                                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    {activeModule.content || activeModule.desc}
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                                <button
                                    onClick={() => setActiveModule(null)}
                                    className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
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
