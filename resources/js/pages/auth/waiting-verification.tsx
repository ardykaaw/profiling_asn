import { Head, usePage, router } from '@inertiajs/react';
import { 
    Clock, 
    ShieldAlert, 
    MessageCircle, 
    RefreshCw, 
    LogOut, 
    Sparkles, 
    Mail, 
    CheckCircle2, 
    AlertTriangle 
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';
import type { SharedData } from '@/types';

export default function WaitingVerification() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user as any;

    const handleRefresh = () => {
        router.reload();
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const cleanPhone = '6282292223334'; // Nomor CS / Admin Lynk.id / ProASN
    const waText = encodeURIComponent(
        `Halo Admin proASN, saya sudah mendaftar di portal simulasi.\n\n` +
        `Nama: ${user?.name || ''}\n` +
        `Email: ${user?.email || ''}\n` +
        `Mohon bantu verifikasi akun saya agar bisa mulai latihan asesmen. Terima kasih!`
    );
    const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <Head title="Menunggu Konfirmasi Admin — proASN" />

            <div className="max-w-xl w-full">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <MacWindowControls 
                        title="Verifikasi Akses Anggota" 
                        badge="PENDING APPROVAL" 
                    />

                    <div className="p-6 sm:p-8 space-y-6 text-center">
                        {/* Animated Status Icon */}
                        <div className="relative w-20 h-20 mx-auto">
                            <div className="absolute inset-0 rounded-3xl bg-amber-400/20 animate-ping opacity-75" />
                            <div className="relative w-20 h-20 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-600 flex items-center justify-center shadow-inner">
                                <Clock className="w-10 h-10 animate-pulse" />
                            </div>
                        </div>

                        {/* Title & Status */}
                        <div className="space-y-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                Menunggu Verifikasi Admin
                            </span>
                            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                Pendaftaran Akun Anda Sedang Diproses
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                                Halo <strong>{user?.name}</strong>, akun Anda telah terdaftar dan saat ini sedang menunggu persetujuan verifikasi oleh Tim Admin proASN.
                            </p>
                        </div>

                        {/* CRITICAL WARNING NOTICE BOX */}
                        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-left space-y-2 text-xs">
                            <div className="flex items-start gap-2.5">
                                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-amber-950">
                                        Penting: Pencocokan Email Checkout Lynk.id
                                    </p>
                                    <p className="text-amber-900 mt-1 leading-relaxed text-[11px]">
                                        Pastikan alamat email yang Anda daftarkan (<strong className="font-mono text-amber-950">{user?.email}</strong>) <strong>sama persis</strong> dengan email yang Anda gunakan saat bertransaksi di Lynk.id. Admin akan mencocokkan email tersebut sebelum mengaktifkan hak akses Anda.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Verification Timeline Tracker */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Alur Aktivasi Keanggotaan
                            </h4>
                            <div className="space-y-2.5 text-xs">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="font-medium">1. Pendaftaran Akun Portal (Selesai)</span>
                                </div>
                                <div className="flex items-center gap-3 text-amber-800 font-bold">
                                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                                        <Clock className="w-3.5 h-3.5 animate-spin" />
                                    </span>
                                    <span>2. Sinkronisasi & Verifikasi Transaksi Lynk.id (Sedang Berjalan)</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 text-[10px] font-bold">
                                        3
                                    </span>
                                    <span>3. Akses Aktif 1 Tahun & Notifikasi Otomatis proASN by Ketik.in</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2.5 pt-2">
                            <div className="flex flex-col sm:flex-row gap-2.5">
                                <button
                                    type="button"
                                    onClick={handleRefresh}
                                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Periksa Status Ulang</span>
                                </button>
                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                                >
                                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                                    <span>Konfirmasi via WhatsApp</span>
                                </a>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full py-2.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Keluar dari Akun</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
