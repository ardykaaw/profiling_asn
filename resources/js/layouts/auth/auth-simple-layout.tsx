import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import MacWindowControls from '@/components/mac-window-controls';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col justify-between p-4 sm:p-6">
            {/* Top Bar with Clean Back Link to Home */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between py-2">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors py-1.5 px-3 rounded-xl hover:bg-slate-200/60"
                >
                    <ArrowLeft className="size-4" />
                    <span>Kembali ke Beranda</span>
                </a>

                <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Sparkles className="size-3.5 text-amber-600" />
                    <span>Portal Asesmen Manajemen Talenta ASN</span>
                </div>
            </div>

            {/* Central Auth Container with Mac Window Framing */}
            <div className="relative z-10 w-full max-w-md mx-auto my-auto py-6">
                {/* Brand Header */}
                <div className="flex flex-col items-center text-center mb-6">
                    <a href="/" className="flex items-center gap-2 mb-3">
                        <AppLogo />
                    </a>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-sm">
                            {description}
                        </p>
                    )}
                </div>

                {/* Card Wrapper with Mac Window Controls */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                    <MacWindowControls
                        title="Otentikasi Akun ASN"
                        badge="KEPEGAWAIAN"
                    />
                    <div className="p-6 sm:p-8">
                        {children}
                    </div>
                </div>

                {/* Trust Footer Indicator */}
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span>Akses Terenkripsi • Standar Uji Kompetensi BKN</span>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="relative z-10 text-center py-2 text-xs text-slate-500 font-medium">
                &copy; {new Date().getFullYear()} ProASN. Hak Cipta Dilindungi.
            </div>
        </div>
    );
}
