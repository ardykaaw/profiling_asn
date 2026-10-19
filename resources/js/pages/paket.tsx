import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { 
    Award, 
    Check, 
    Clock, 
    Share2, 
    ShieldCheck, 
    Sparkles, 
    Users, 
    CheckCircle2, 
    Copy, 
    ExternalLink, 
    MessageCircle, 
    Send, 
    Calendar,
    BookOpen,
    Layers,
    FileText
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';
import type { SharedData } from '@/types';

interface SubscriptionProps {
    subscription?: {
        is_verified: boolean;
        status: string;
        verified_at: string | null;
        expires_at: string | null;
        remaining_days: number | null;
        duration_label: string;
        email: string;
        lynk_order_id: string | null;
    };
}

export default function PaketPage({ subscription }: SubscriptionProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user as any;

    const [isCopied, setIsCopied] = useState(false);

    const shareUrl = window.location.origin;
    const shareMessage = 
        `Halo Bapak/Ibu Rekan ASN! 🌟\n\n` +
        `Bagi rekan-rekan yang sedang mempersiapkan Uji Kompetensi & Profiling Asesmen BKN, saya merekomendasikan portal *proASN by Ketik.in*.\n\n` +
        `✅ Simulasi CAT 4 Dimensi Standar BKN (773 Soal)\n` +
        `✅ Rasionalisasi Pembahasan Lengkap\n` +
        `✅ Pemetaan Talenta 9 Box SIMATA & Rapor Rinci\n\n` +
        `Cek dan mulai latihan di: ${shareUrl}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareMessage);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
    };

    const handleShareWA = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
        window.open(url, '_blank');
    };

    const handleShareTelegram = () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Persiapan Profiling & Asesmen Mandiri ASN standar BKN 2026')}`;
        window.open(url, '_blank');
    };

    const verifiedDate = subscription?.verified_at || user?.verified_at_formatted || 'Aktif';
    const expiresDate = subscription?.expires_at || user?.expires_at_formatted || '1 Tahun ke Depan';
    const remainingDays = subscription?.remaining_days ?? user?.remaining_days ?? 365;

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <Head title="Status Keanggotaan & Lisensi 1 Tahun — proASN" />

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Window */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                    <MacWindowControls title="Status Keanggotaan & Lisensi Akses" badge="AKTIF 1 TAHUN" />
                    
                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold shadow-2xs">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Status Lisensi: Terverifikasi Aktif</span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                    Lisensi Akun Aktif 1 Tahun Penuh
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                                    Akun atas nama <strong>{user?.name}</strong> telah diverifikasi oleh admin. Anda memiliki hak akses tanpa batas ke seluruh modul asesmen, materi, dan rapor kompetensi.
                                </p>
                            </div>

                            {/* Remaining Days Box */}
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white shadow-lg text-center min-w-[200px]">
                                <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block">
                                    Sisa Masa Aktif
                                </span>
                                <div className="text-3xl sm:text-4xl font-black font-mono my-1 text-amber-300">
                                    {remainingDays}
                                </div>
                                <span className="text-xs text-emerald-100 font-semibold block">
                                    Hari Tersisa
                                </span>
                            </div>
                        </div>

                        {/* Subscription Detail Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                    Tanggal Diverifikasi
                                </span>
                                <p className="font-bold text-xs sm:text-sm text-slate-900">
                                    {verifiedDate}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                                    Berlaku Hingga
                                </span>
                                <p className="font-bold text-xs sm:text-sm text-emerald-700">
                                    {expiresDate}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Award className="w-3.5 h-3.5 text-blue-600" />
                                    Durasi Paket
                                </span>
                                <p className="font-bold text-xs sm:text-sm text-slate-900">
                                    365 Hari (1 Tahun)
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                                    Email Lynk.id
                                </span>
                                <p className="font-bold text-xs text-slate-900 truncate" title={user?.email}>
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits / Feature Access Grid */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                    <MacWindowControls title="Fasilitas & Hak Akses Anggota Aktif" badge="FITUR UNGGULAN" />
                    
                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                {
                                    title: 'Simulasi CAT 4 Sesi Standar BKN',
                                    desc: 'Akses penuh ke seluruh 773 butir soal: Tes Potensi (525 butir), Mansoskul (45 butir), Literasi Digital (35 butir), dan Preferensi Karir (168 butir).',
                                    icon: Award,
                                },
                                {
                                    title: 'Kunci Jawaban & Rasionalisasi Lengkap',
                                    desc: 'Setiap butir soal dilengkapi analisis pembahasan komprehensif berbasis kamus kompetensi PermenPAN-RB No. 38 Tahun 2017.',
                                    icon: BookOpen,
                                },
                                {
                                    title: 'Rapor Analisis 9 Box SIMATA Otomatis',
                                    desc: 'Sistem memetakan kuadran kinerja dan potensi Anda secara matematis untuk persiapan pemetaan talenta instansi.',
                                    icon: Layers,
                                },
                                {
                                    title: 'Bank Bahan Materi & Modul Regulasi',
                                    desc: 'Unduh bahan bacaan resmi, standar kompetensi manajerial sosio kultural, dan tips sukses wawancara asesmen.',
                                    icon: FileText,
                                },
                                {
                                    title: 'Unduh Rekapitulasi Rapor PDF',
                                    desc: 'Cetak dan unduh hasil asesmen dalam format dokumen resmi untuk portofolio kepegawaian Anda.',
                                    icon: Sparkles,
                                },
                                {
                                    title: 'Dukungan Prioritas proASN by Ketik.in',
                                    desc: 'Bantuan konsultasi teknis via WhatsApp dan integrasi ekosistem produktivitas naskah dinas Ketik.in.',
                                    icon: Users,
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                                        <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* VIRAL SHARE SECTION: BAGIKAN KE REKAN SEJAWAT ASN */}
                <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50/40 to-emerald-50/50 shadow-xl overflow-hidden">
                    <MacWindowControls title="Ajak Rekan Sejawat ASN" badge="BAGIKAN LISENSI" />
                    
                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 uppercase tracking-wider">
                                    <Share2 className="w-3.5 h-3.5 text-blue-600" />
                                    Bagikan Manfaat Persiapan Profiling ASN
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                    Bantu Rekan ASN di Instansi Anda Lolos Box 9!
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                                    Ajak rekan kerja, bawahan, atau sejawat Anda untuk bersama-sama mempersiapkan uji kompetensi mandiri. Bagikan tautan langsung dengan pesan rekomendasi di bawah ini.
                                </p>
                            </div>
                        </div>

                        {/* Message Preview Box */}
                        <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-inner space-y-3">
                            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                                <span>Pratinjau Pesan Rekomendasi</span>
                                {isCopied && (
                                    <span className="text-emerald-600 font-bold flex items-center gap-1 animate-pulse">
                                        <Check className="w-3.5 h-3.5" /> Berhasil Disalin!
                                    </span>
                                )}
                            </div>
                            <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                {shareMessage}
                            </pre>
                        </div>

                        {/* Share Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={handleShareWA}
                                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                            >
                                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                                <span>Bagikan ke WhatsApp</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleShareTelegram}
                                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                            >
                                <Send className="w-4 h-4 text-white" />
                                <span>Bagikan ke Telegram</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleCopy}
                                className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
                            >
                                <Copy className="w-4 h-4 text-slate-500" />
                                <span>{isCopied ? 'Tersalin ke Clipboard' : 'Salin Teks & Tautan'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
