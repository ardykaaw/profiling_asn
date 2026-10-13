import { Head, usePage } from '@inertiajs/react';
import { 
    Award, 
    Check, 
    ChevronDown, 
    Clock, 
    ExternalLink, 
    HelpCircle, 
    KeyRound, 
    ShieldCheck, 
    ShoppingBag, 
    Sparkles, 
    Users, 
    Zap 
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { SharedData } from '@/types';

// URL etalase resmi toko Lynk.id (dapat disesuaikan tautan resminya nanti)
const LYNK_ID_STORE_URL = 'https://lynk.id';

const lynkProducts = [
    {
        id: 'skd',
        name: 'Akses Mandiri SKD',
        desc: 'Akses penuh latihan dan simulasi CAT BKN untuk Seleksi Kompetensi Dasar.',
        badge: null,
        color: '#0EA5A0',
        features: [
            { text: 'Try Out SKD Standar BKN Tak Terbatas', ok: true },
            { text: '120 Modul Materi SKD Lengkap', ok: true },
            { text: 'Kunci & Pembahasan Teks Lengkap', ok: true },
            { text: 'Perankingan Nasional Real-Time', ok: true },
            { text: 'Analisis AI & Prediksi Skor', ok: false },
            { text: 'Mentoring Tatap Muka Online', ok: false },
        ],
    },
    {
        id: 'komplit',
        name: 'Akses Komplit SKD & SKB',
        desc: 'Pilihan paling diminati pejuang NIP dengan materi video & ribuan bank soal.',
        badge: 'REKOMENDASI TERBAIK',
        color: '#F0A500',
        features: [
            { text: 'Try Out SKD & SKB Tak Terbatas', ok: true },
            { text: '380+ Modul Video & PDF Super Lengkap', ok: true },
            { text: 'Pembahasan Video oleh Alumni CPNS', ok: true },
            { text: 'Analisis AI Kelemahan & Rekomendasi Soal', ok: true },
            { text: 'Prediksi Kelulusan Formasi Instansi', ok: true },
            { text: 'Akses Grup Diskusi Komunitas Telegram', ok: true },
        ],
    },
    {
        id: 'vip',
        name: 'Akses VIP Mentoring',
        desc: 'Bimbingan intensif tatap muka daring sampai pengumuman NIP resmi.',
        badge: 'VIP BUNDLE',
        color: '#8B5CF6',
        features: [
            { text: 'Semua Fitur Paket Komplit', ok: true },
            { text: 'Mentoring Interaktif Live 2x Seminggu', ok: true },
            { text: 'Konsultasi 1-on-1 Pemilihan Formasi BKN', ok: true },
            { text: 'Simulasi Wawancara & Psikotes SKB', ok: true },
            { text: 'Akses Bank Soal VIP 15.000+ Butir', ok: true },
            { text: 'Garansi Uang Kembali 30 Hari', ok: true },
        ],
    },
];

const faqs = [
    {
        q: 'Bagaimana sistem pembayaran SiapCPNS?',
        a: 'SiapCPNS menggunakan sistem sekali bayar (One-Time Purchase) melalui etalase resmi kami di Lynk.id. Tidak ada sistem langganan bulanan maupun potongan otomatis. Cukup beli sekali, akun Anda aktif selamanya.',
    },
    {
        q: 'Bagaimana cara akun saya aktif setelah checkout di Lynk.id?',
        a: 'Saat melakukan checkout di Lynk.id, pastikan Anda mencatat nama dan email yang digunakan. Setelah itu, daftar atau login di SiapCPNS menggunakan email tersebut. Sistem akan otomatis memvalidasi data pembelian Anda.',
    },
    {
        q: 'Metode pembayaran apa saja yang tersedia di Lynk.id?',
        a: 'Lynk.id mendukung seluruh metode pembayaran di Indonesia: QRIS (GoPay, OVO, Dana, ShopeePay, LinkAja), Virtual Account BCA, Mandiri, BRI, BNI, Permata, serta kartu debit/kredit internasional.',
    },
    {
        q: 'Apakah bisa diakses selamanya (Lifetime)?',
        a: 'Ya, lisensi akses Anda berlaku permanen tanpa masa kedaluwarsa. Anda dapat mengerjakan seluruh latihan soal dan mengakses materi kapan pun Anda mempersiapkan seleksi CPNS.',
    },
    {
        q: 'Apakah soal dan materi diperbarui sesuai kisi-kisi terbaru?',
        a: 'Semua bank soal TWK, TIU, TKP dan materi secara berkala diperbarui oleh tim admin kami sesuai keputusan Menteri PAN-RB dan BKN terbaru tanpa biaya tambahan.',
    },
];

export default function PaketPage() {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;

    return (
        <AppLayout breadcrumbs={[{ title: 'Status Akses & Etalase Lynk.id', href: '/paket' }]}>
            <Head title="Status Akses & Etalase Lynk.id — SiapCPNS" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-card via-card/90 to-[#141D33] border border-[#1E2C4A] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1.5">
                                <ShieldCheck className="size-3.5" />
                                <span>ETALASE RESMI LYNK.ID</span>
                            </span>
                            <span className="text-xs text-muted-foreground">• Sekali Bayar Tanpa Iuran Berkala</span>
                        </div>
                        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                            Status Akses & Etalase Lisensi
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                            Aplikasi SiapCPNS dapat diakses setelah melakukan checkout dari etalase resmi kami di Lynk.id. Lisensi berlaku seumur hidup tanpa biaya langganan bulanan.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://lynk.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 rounded-xl font-bold text-xs bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] transition-all shadow-md flex items-center gap-2"
                        >
                            <ShoppingBag className="size-4" />
                            <span>Buka Etalase Lynk.id ↗</span>
                        </a>
                    </div>
                </div>

                {/* Current Active User Status Card */}
                <div className="p-6 rounded-2xl border border-[#10B981]/30 bg-gradient-to-br from-[#10B981]/10 via-card to-card">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
                        <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-bold">
                                <KeyRound className="size-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-display text-lg font-bold text-foreground">
                                        Hak Akses Akun Anda: Aktif & Terverifikasi
                                    </h3>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981] text-[#0B1023]">
                                        LIFETIME
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Terdaftar atas nama <strong className="text-foreground">{user?.name}</strong> ({user?.email})
                                </p>
                            </div>
                        </div>

                        <div className="text-left sm:text-right">
                            <span className="text-[11px] font-mono text-muted-foreground">Status Lisensi:</span>
                            <p className="text-xs font-mono font-bold text-[#10B981] flex items-center sm:justify-end gap-1.5">
                                <ShieldCheck className="size-3.5" />
                                <span>TERVERIFIKASI LYNK.ID</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
                        <div className="flex items-center gap-2 text-foreground font-medium">
                            <span className="text-[#10B981]">✓</span>
                            <span>Simulasi Try Out CAT BKN</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground font-medium">
                            <span className="text-[#10B981]">✓</span>
                            <span>380+ Modul PDF & Video</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground font-medium">
                            <span className="text-[#10B981]">✓</span>
                            <span>Perhitungan Skor TWK, TIU, TKP</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground font-medium">
                            <span className="text-[#10B981]">✓</span>
                            <span>Analisis AI & Evaluasi Nasional</span>
                        </div>
                    </div>
                </div>

                {/* 3 Step Visual Activation Flow */}
                <div className="p-6 rounded-2xl border border-border bg-card">
                    <p className="font-mono text-xs uppercase tracking-widest text-[#F0A500] font-bold mb-1 text-center">
                        CARA KERJA & AKTIVASI LISENSI
                    </p>
                    <h2 className="font-display text-xl text-center text-foreground font-bold mb-6">
                        3 Langkah Mudah Memperoleh Akses SiapCPNS
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 relative">
                        <div className="p-5 rounded-xl border border-border bg-background relative flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-full bg-[#F0A500] text-[#0B1023] font-bold flex items-center justify-center font-mono mb-3 shadow-md">
                                1
                            </div>
                            <h4 className="font-semibold text-sm text-foreground mb-1">
                                Checkout di Lynk.id
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Beli produk akses SiapCPNS di etalase Lynk.id menggunakan QRIS, e-wallet, atau transfer bank instan.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl border border-border bg-background relative flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-full bg-[#0EA5A0] text-[#0B1023] font-bold flex items-center justify-center font-mono mb-3 shadow-md">
                                2
                            </div>
                            <h4 className="font-semibold text-sm text-foreground mb-1">
                                Daftarkan Akun Anda
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Buat akun di SiapCPNS menggunakan nama dan alamat email yang sama dengan data pembelian di Lynk.id.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl border border-border bg-background relative flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-full bg-[#10B981] text-[#0B1023] font-bold flex items-center justify-center font-mono mb-3 shadow-md">
                                3
                            </div>
                            <h4 className="font-semibold text-sm text-foreground mb-1">
                                Akses Terbuka Selamanya
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Masuk dan nikmati seluruh simulasi ujian CAT BKN, unduhan materi PDF, dan video pembahasan seumur hidup!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Available Products on Lynk.id */}
                <div>
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <p className="font-mono text-xs uppercase tracking-widest text-[#F0A500] font-bold mb-1">
                            KATALOG ETALASE LYNK.ID
                        </p>
                        <h2 className="font-display text-2xl md:text-3xl text-foreground font-bold">
                            Pilihan Akses di Etalase Resmi
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                            Beli untuk diri sendiri atau rekan pejuang CPNS Anda dengan sekali pembayaran
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {lynkProducts.map((plan) => {
                            const isRecommended = plan.id === 'komplit';

                            return (
                                <div
                                    key={plan.id}
                                    className={`relative rounded-2xl border p-6 flex flex-col transition-all bg-card ${
                                        isRecommended
                                            ? 'border-[#F0A500] shadow-[0_0_35px_rgba(240,165,0,0.12)] ring-1 ring-[#F0A500]'
                                            : 'border-border hover:border-[#F0A500]/50'
                                    }`}
                                >
                                    {plan.badge && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#F0A500] text-[#0B1023] tracking-wider uppercase shadow-md">
                                            {plan.badge}
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <h3 className="font-display text-xl text-foreground font-bold mb-1">
                                            {plan.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground min-h-[32px]">
                                            {plan.desc}
                                        </p>
                                    </div>

                                    {/* Lynk.id Price & Checkout Notice */}
                                    <div className="mb-5 p-4 rounded-xl bg-background border border-border">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-mono font-bold text-[#F0A500] uppercase tracking-wider">
                                                Etalase Lynk.id
                                            </span>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] font-bold">
                                                One-Time
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-foreground mt-1">
                                            Cek Harga & Promo Resmi
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Akses aktif selamanya sekali bayar di Lynk.id
                                        </p>
                                    </div>

                                    {/* Features Checklist */}
                                    <div className="space-y-2.5 mb-6 flex-1">
                                        {plan.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <span className={`text-xs mt-0.5 shrink-0 ${f.ok ? 'text-[#10B981]' : 'text-muted-foreground/40'}`}>
                                                    {f.ok ? '✓' : '×'}
                                                </span>
                                                <span className={`text-xs leading-normal ${f.ok ? 'text-foreground/90' : 'text-muted-foreground/50'}`}>
                                                    {f.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href={LYNK_ID_STORE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full py-3 rounded-xl font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 ${
                                            isRecommended
                                                ? 'bg-[#F0A500] text-[#0B1023] hover:bg-[#FFD166] shadow-md'
                                                : 'border border-border bg-background text-foreground hover:border-[#F0A500]'
                                        }`}
                                    >
                                        <span>Buka Etalase Lynk.id →</span>
                                        <ExternalLink className="size-3.5" />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FAQ Section */}
                <div id="faq" className="mt-8 p-6 md:p-8 rounded-2xl border border-border bg-card">
                    <div className="flex items-center gap-2 mb-2">
                        <HelpCircle className="size-4 text-[#F0A500]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#F0A500] font-bold">
                            TANYA JAWAB
                        </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-6">
                        Pertanyaan Seputar Akses & Pembelian di Lynk.id
                    </h3>

                    <div className="space-y-4">
                        {faqs.map((f, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-border bg-background">
                                <h4 className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-2">
                                    <span className="text-[#F0A500] font-mono">Q:</span>
                                    <span>{f.q}</span>
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                                    {f.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
