import { Link } from '@inertiajs/react';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen bg-[#0B1023] text-[#EDF0FF] flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F0A500]/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Top Bar with Back Link */}
            <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between py-2">
                <Link
                    href={home()}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#8FA0C0] hover:text-[#EDF0FF] transition-colors py-1 px-3 rounded-lg hover:bg-[#1E2C4A]/40"
                >
                    <ArrowLeft className="size-4" />
                    <span>Kembali ke Halaman Utama</span>
                </Link>

                <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#8FA0C0] font-mono">
                    <Sparkles className="size-3.5 text-[#F0A500]" />
                    <span>Persiapan SKD CPNS 2025/2026</span>
                </div>
            </div>

            {/* Central Auth Container */}
            <div className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
                {/* Brand Header */}
                <div className="flex flex-col items-center text-center mb-6">
                    <Link href={home()} className="flex items-center gap-2 mb-4 group">
                        <AppLogo />
                    </Link>
                    <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#EDF0FF]">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1.5 text-sm text-[#8FA0C0] max-w-sm text-balance">
                            {description}
                        </p>
                    )}
                </div>

                {/* Card Wrapper */}
                <div className="rounded-2xl border border-[#1E2C4A] bg-[#131B2E]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/50">
                    {children}
                </div>

                {/* Trust Footer Indicator */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#8FA0C0]">
                    <ShieldCheck className="size-4 text-[#10B981]" />
                    <span>Enkripsi SSL 256-bit • Standar Simulasi CAT BKN</span>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="relative z-10 text-center py-2 text-xs text-[#8FA0C0]/70 font-mono">
                &copy; {new Date().getFullYear()} SiapCPNS. Hak Cipta Dilindungi.
            </div>
        </div>
    );
}

