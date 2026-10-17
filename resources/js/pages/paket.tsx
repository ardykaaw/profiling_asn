import { Head, usePage } from '@inertiajs/react';
import { 
    Award, 
    Check, 
    Clock, 
    ExternalLink, 
    ShieldCheck, 
    Sparkles, 
    Users, 
    Zap 
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';
import type { SharedData } from '@/types';

const LYNK_ID_STORE_URL = 'https://lynk.id';

const lynkProducts = [
    {
        id: 'profiling-mandiri',
        name: 'Akses Mandiri Profiling ASN',
        desc: 'Akses penuh simulasi CAT 4 Dimensi Kompetensi standar BKN.',
        badge: null,
        features: [
            { text: 'Simulasi CAT 4 Dimensi Tanpa Batas', ok: true },
            { text: 'Bank Soal Kasus Manajerial & Sosio-Kultural', ok: true },
            { text: 'Kunci & Pembahasan Rasionalisasi BKN', ok: true },
            { text: 'Rapor Analisis Skor 9 Box SIMATA', ok: true },
            { text: 'Modul Teori & Kisi-Kisi Lengkap', ok: true },
            { text: 'Konsultasi Pemetaan Karir Privat', ok: false },
        ],
    },
    {
        id: 'profiling-pro',
        name: 'Akses Eksklusif Menuju Box 9',
        desc: 'Pilihan terfavorit pejabat fungsional & pelamar seleksi terbuka JPT.',
        badge: 'REKOMENDASI TERBAIK',
        features: [
            { text: 'Simulasi CAT 4 Dimensi Tanpa Batas', ok: true },
            { text: 'Bedah Kasus Kompleks Emerging Skills & AI', ok: true },
            { text: 'Latihan Literasi Digital & Keamanan SPBE', ok: true },
            { text: 'Rapor Radar Chart & Analisis Gap Kompetensi', ok: true },
            { text: 'Materi Lengkap PermenPAN-RB No. 38/2017', ok: true },
            { text: 'Grup Diskusi Persiapan Uji Kompetensi Nasional', ok: true },
        ],
    },
    {
        id: 'kolektif-dinas',
        name: 'Lisensi Instansi / BKD',
        desc: 'Solusi terpadu pemetaan talenta dan uji kompetensi pegawai instansi.',
        badge: 'INSTANSI & OPD',
        features: [
            { text: 'Multi-Akun ASN untuk Seluruh OPD', ok: true },
            { text: 'Dashboard Rekapitulasi 9 Box SIMATA Instansi', ok: true },
            { text: 'Laporan Agregat Indeks Literasi Digital OPD', ok: true },
            { text: 'Export Laporan Rekap Format Excel/PDF', ok: true },
            { text: 'Custom Bank Soal Sesuai Kebutuhan Daerah', ok: true },
            { text: 'Pendampingan Teknis Implementasi', ok: true },
        ],
    },
];

export default function PaketPage() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <Head title="Status Akun & Paket Akses Profiling ASN" />

            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header in Mac Window */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                    <MacWindowControls title="Status Keanggotaan Akun" badge="KEPEGAWAIAN" />
                    <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Status Keanggotaan: Aktif & Terverifikasi</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                Akses Penuh Simulasi Profiling ASN
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                                Akun Anda atas nama <strong>{user?.name}</strong> telah terhubung dengan hak akses penuh seluruh bank soal uji kompetensi dan modul kisi-kisi BKN.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {lynkProducts.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`rounded-2xl border bg-white shadow-md overflow-hidden flex flex-col justify-between transition-all ${
                                pkg.badge ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
                            }`}
                        >
                            <MacWindowControls title={pkg.name} badge={pkg.badge || 'PROFILING'} />
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">{pkg.name}</h3>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pkg.desc}</p>
                                </div>

                                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                                    {pkg.features.map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                                            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                feat.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                            </span>
                                            <span className={feat.ok ? 'text-slate-800 font-medium' : 'text-slate-400 line-through'}>
                                                {feat.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <a
                                        href={LYNK_ID_STORE_URL}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                                    >
                                        <span>Aktifkan via Lynk.id</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
