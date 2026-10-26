import { 
    Users, 
    FileText, 
    BarChart3, 
    Trophy, 
    AlertTriangle, 
    Target, 
    TrendingUp, 
    Lightbulb 
} from 'lucide-react';

export default function NineBoxSimata({ activeBox, axisX, axisY }: { activeBox: number; axisX?: number; axisY?: number }) {
    return (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 shadow-sm space-y-6">
            {/* Infographic Header */}
            <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#0d2a4a] text-amber-400 flex items-center justify-center font-black text-sm">
                            KA
                        </div>
                        <div>
                            <div className="text-xs font-black tracking-wider text-[#0d2a4a] leading-none">KLINIK ASN</div>
                            <div className="text-[9px] font-bold text-slate-500 tracking-tight mt-0.5">SOLUSI KARIER KINERJA MASA DEPAN</div>
                        </div>
                    </div>
                    <div className="text-[10px] sm:text-xs font-black tracking-wider text-slate-600 uppercase">
                        ASN Berkembang Indonesia Lebih Maju
                    </div>
                </div>

                <div className="text-center pt-2">
                    <h2 className="text-2xl sm:text-4xl font-black text-[#0d2a4a] tracking-tight uppercase">
                        9 BOX SIMATA
                    </h2>
                    <div className="mt-1">
                        <span className="inline-block bg-[#d4af37] text-[#0d2a4a] font-black text-xs sm:text-sm px-6 py-1 rounded-full uppercase tracking-wider shadow-xs">
                            Peta Talenta ASN
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto mt-2.5 leading-relaxed">
                        9 Box adalah alat dalam Manajemen Talenta untuk memetakan ASN berdasarkan <strong>KINERJA</strong> dan <strong>POTENSIAL</strong> sebagai dasar pengembangan, penugasan, dan rencana suksesi.
                    </p>
                </div>
            </div>

            {/* The 9-Box Grid with Y and X Axes */}
            <div className="overflow-x-auto pb-2">
                <div className="min-w-[620px] max-w-4xl mx-auto">
                    {/* Upper Grid Area: Left Y-Axis + 3x3 Box Matrix */}
                    <div className="flex gap-3">
                        {/* Y-Axis (Vertical: KINERJA) */}
                        <div className="flex gap-2 shrink-0">
                            {/* Vertical Arrow Strip */}
                            <div className="relative w-8 bg-[#0d2a4a] rounded-xl flex items-center justify-center py-6 text-white shadow-sm overflow-hidden">
                                <div className="absolute top-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white" />
                                <span className="[writing-mode:vertical-rl] rotate-180 font-black text-xs tracking-widest uppercase">
                                    KINERJA
                                </span>
                            </div>

                            {/* Y-Axis Tier Labels (3 Rows) */}
                            <div className="flex flex-col justify-between py-2 text-right w-24 shrink-0">
                                <div className="h-32 flex flex-col justify-center pr-2">
                                    <span className="font-black text-xs text-slate-800 uppercase">TINGGI</span>
                                    <span className="text-[11px] font-bold text-slate-500 font-mono">(≥ 80)</span>
                                </div>
                                <div className="h-32 flex flex-col justify-center pr-2">
                                    <span className="font-black text-xs text-slate-800 uppercase">MENENGAH</span>
                                    <span className="text-[11px] font-bold text-slate-500 font-mono">(60 - &lt; 80)</span>
                                </div>
                                <div className="h-32 flex flex-col justify-center pr-2">
                                    <span className="font-black text-xs text-slate-800 uppercase">RENDAH</span>
                                    <span className="text-[11px] font-bold text-slate-500 font-mono">(&lt; 60)</span>
                                </div>
                            </div>
                        </div>

                        {/* 3x3 Boxes Grid */}
                        <div className="grid grid-cols-3 gap-3 flex-1">
                            {/* Row 1: Kinerja Tinggi (Boxes 4, 7, 9) */}
                            {/* Box 4 */}
                            <div className={`p-4 rounded-2xl flex flex-col justify-between transition-all relative ${activeBox === 4 ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02] shadow-xl z-10' : 'shadow-xs'} bg-[#38bdf8] text-slate-950`}>
                                {activeBox === 4 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                                        ★ Posisi Anda
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-[#0d2a4a] text-white flex items-center justify-center font-black text-sm">
                                        4
                                    </div>
                                    <BarChart3 className="w-5 h-5 text-white/90" />
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h4 className="font-black text-xs sm:text-sm text-slate-950 leading-snug">
                                        Kinerja Tinggi Potensial Rendah
                                    </h4>
                                    <p className="text-[11px] text-slate-900/90 leading-tight">
                                        Kinerja sangat baik, namun potensi pengembangan masih terbatas.
                                    </p>
                                </div>
                            </div>

                            {/* Box 7 */}
                            <div className={`p-4 rounded-2xl flex flex-col justify-between transition-all relative ${activeBox === 7 ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02] shadow-xl z-10' : 'shadow-xs'} bg-[#2dd4bf] text-slate-950`}>
                                {activeBox === 7 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                                        ★ Posisi Anda
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-[#0d2a4a] text-white flex items-center justify-center font-black text-sm">
                                        7
                                    </div>
                                    <TrendingUp className="w-5 h-5 text-white/90" />
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h4 className="font-black text-xs sm:text-sm text-slate-950 leading-snug">
                                        Kinerja Tinggi Potensial Menengah
                                    </h4>
                                    <p className="text-[11px] text-slate-900/90 leading-tight">
                                        Kinerja sangat baik, potensi cukup untuk berkembang lebih tinggi.
                                    </p>
                                </div>
                            </div>

                            {/* Box 9 (Talenta Unggul) */}
                            <div className={`p-4 rounded-2xl flex flex-col justify-between transition-all relative ${activeBox === 9 ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02] shadow-xl z-10' : 'shadow-xs'} bg-[#15803d] text-white`}>
                                {activeBox === 9 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                                        ★ Posisi Anda
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-white text-[#15803d] flex items-center justify-center font-black text-sm shadow-xs">
                                        9
                                    </div>
                                    <Trophy className="w-6 h-6 text-amber-300 drop-shadow-sm" />
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h4 className="font-black text-xs sm:text-sm text-white leading-snug">
                                        Kinerja Tinggi Potensial Tinggi
                                    </h4>
                                    <p className="text-[11px] text-emerald-50/90 leading-tight">
                                        Kinerja sangat baik dan potensi sangat tinggi.
                                    </p>
                                </div>
                                <div className="mt-2 text-center">
                                    <span className="inline-block w-full py-1 px-2 rounded-full bg-[#f6c343] text-[#3d2700] text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm">
                                        Talenta Unggul
                                    </span>
                                </div>
                            </div>

                            {/* Row 2: Kinerja Menengah (Boxes 2, 5, 8) */}
                            {/* Box 2 */}
                            <div className={`p-4 rounded-2xl flex flex-col justify-between transition-all relative ${activeBox === 2 ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02] shadow-xl z-10' : 'shadow-xs'} bg-[#fcd34d] text-slate-950`}>
                                {activeBox === 2 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                                        ★ Posisi Anda
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-[#0d2a4a] text-white flex items-center justify-center font-black text-sm">
                                        2
                                    </div>
                                    <FileText className="w-5 h-5 text-slate-800" />
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h4 className="font-black text-xs sm:text-sm text-slate-950 leading-snug">
                                        Kinerja Sesuai Potensial Rendah
                                    </h4>
                                    <p className="text-[11px] text-slate-900/90 leading-tight">
                                        Kinerja sesuai harapan, namun potensi pengembangan masih rendah.
                                    </p>
                                </div>
                            </div>

                            {/* Box 5 */}
                            <div className={`p-4 rounded-2xl flex flex-col justify-between transition-all relative ${activeBox === 5 ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02] shadow-xl z-10' : 'shadow-xs'} bg-[#93c5fd] text-slate-950`}>
                                {activeBox === 5 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                                        ★ Posisi Anda
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-[#0d2a4a] text-white flex items-center justify-center font-black text-sm">
                                        5
                                    </div>
                                    <Users className="w-5 h-5 text-slate-800" />
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h4 className="font-black text-xs sm:text-sm text-slate-950 leading-snug">
                                        Kinerja Sesuai Potensial Menengah
                                    </h4>
                                    <p className="text-[11px] text-slate-900/90 leading-tight">
                                        Kinerja sesuai harapan dan memiliki potensi untuk berkembang.
                                    </p>
                                </div>
                            </div>

                            {/* Box 8 */}
                            <div className={`p-4 rounded-2xl flex flex-col justify-between transition-all relative ${activeBox === 8 ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02] shadow-xl z-10' : 'shadow-xs'} bg-[#22d3ee] text-slate-950`}>
                                {activeBox === 8 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                                        ★ Posisi Anda
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-[#0d2a4a] text-white flex items-center justify-center font-black text-sm">
                                        8
                                    </div>
                                    <Target className="w-5 h-5 text-slate-800" />
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h4 className="font-black text-xs sm:text-sm text-slate-950 leading-snug">
                                        Kinerja Sesuai Potensial Tinggi
                                    </h4>
                                    <p className="text-[11px] text-slate-900/90 leading-tight">
                                        Kinerja sudah sesuai, potensi sangat tinggi untuk peran yang lebih besar.
                                    </p>
                                </div>
                            </div>

                            {/* Row 3: Kinerja Rendah (Boxes 1, 3, 6) */}
                            {/* Box 1 */}
                            <div className={`p-4 rounded-2xl flex flex-col justify-between transition-all relative ${activeBox === 1 ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02] shadow-xl z-10' : 'shadow-xs'} bg-[#f87171] text-white`}>
                                {activeBox === 1 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                                        ★ Posisi Anda
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-[#0d2a4a] text-white flex items-center justify-center font-black text-sm">
                                        1
                                    </div>
                                    <AlertTriangle className="w-5 h-5 text-white/95" />
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h4 className="font-black text-xs sm:text-sm text-white leading-snug">
                                        Kinerja Rendah Potensial Rendah
                                    </h4>
                                    <p className="text-[11px] text-rose-50/90 leading-tight">
                                        Kinerja dan potensi masih rendah.
                                    </p>
                                </div>
                            </div>

                            {/* Box 3 */}
                            <div className={`p-4 rounded-2xl flex flex-col justify-between transition-all relative ${activeBox === 3 ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02] shadow-xl z-10' : 'shadow-xs'} bg-[#fb923c] text-white`}>
                                {activeBox === 3 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                                        ★ Posisi Anda
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-[#0d2a4a] text-white flex items-center justify-center font-black text-sm">
                                        3
                                    </div>
                                    <BarChart3 className="w-5 h-5 text-white/95" />
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h4 className="font-black text-xs sm:text-sm text-white leading-snug">
                                        Kinerja Rendah Potensial Menengah
                                    </h4>
                                    <p className="text-[11px] text-orange-50/90 leading-tight">
                                        Kinerja rendah, namun memiliki potensi yang cukup.
                                    </p>
                                </div>
                            </div>

                            {/* Box 6 */}
                            <div className={`p-4 rounded-2xl flex flex-col justify-between transition-all relative ${activeBox === 6 ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02] shadow-xl z-10' : 'shadow-xs'} bg-[#c084fc] text-white`}>
                                {activeBox === 6 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                                        ★ Posisi Anda
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-[#0d2a4a] text-white flex items-center justify-center font-black text-sm">
                                        6
                                    </div>
                                    <Lightbulb className="w-5 h-5 text-white/95" />
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h4 className="font-black text-xs sm:text-sm text-white leading-snug">
                                        Kinerja Rendah Potensial Tinggi
                                    </h4>
                                    <p className="text-[11px] text-purple-50/90 leading-tight">
                                        Kinerja rendah, namun memiliki potensi sangat tinggi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* X-Axis (Horizontal: POTENSIAL) */}
                    <div className="flex gap-3 mt-3">
                        {/* Spacer matching Y-axis width */}
                        <div className="w-[136px] shrink-0" />

                        {/* Horizontal Arrow & Labels */}
                        <div className="flex-1 space-y-2">
                            {/* Horizontal Arrow Strip */}
                            <div className="relative h-8 bg-[#0d2a4a] rounded-xl flex items-center justify-center text-white shadow-sm overflow-hidden px-6">
                                <span className="font-black text-xs tracking-widest uppercase">
                                    POTENSIAL
                                </span>
                                <div className="absolute right-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
                            </div>

                            {/* Column Tier Labels */}
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div className="py-1">
                                    <div className="font-black text-xs text-slate-800 uppercase">RENDAH</div>
                                    <div className="text-[11px] font-bold text-slate-500 font-mono">(&lt; 60)</div>
                                </div>
                                <div className="py-1">
                                    <div className="font-black text-xs text-slate-800 uppercase">MENENGAH</div>
                                    <div className="text-[11px] font-bold text-slate-500 font-mono">(60 - &lt; 80)</div>
                                </div>
                                <div className="py-1">
                                    <div className="font-black text-xs text-slate-800 uppercase">TINGGI</div>
                                    <div className="text-[11px] font-bold text-slate-500 font-mono">(≥ 80)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Infographic Banner */}
            <div className="space-y-3 pt-2">
                <div className="bg-[#fef3c7]/60 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
                    <div className="w-10 h-10 rounded-xl bg-white border border-amber-300 flex items-center justify-center text-[#0d2a4a] shadow-xs shrink-0">
                        <Target className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-700 tracking-wide">
                            9 BOX MEMBANTU MEMBACA POSISI TALENTA ASN:
                        </div>
                        <div className="text-sm font-black text-[#0d2a4a] tracking-tight">
                            KINERJA SAAT INI × POTENSI MASA DEPAN
                        </div>
                    </div>
                </div>

                <div className="bg-[#0d2a4a] text-white p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                    <div className="font-black text-xs tracking-wider text-amber-400 uppercase">
                        SIMATA • MANAJEMEN TALENTA ASN
                    </div>
                    <div className="text-[10px] text-slate-300 max-w-xl">
                        Sumber: UU No. 20 Tahun 2023 • PermenPANRB No. 3 Tahun 2020 jo. PermenPANRB No. 20 Tahun 2025 • Kepka BKN No. 411 Tahun 2025
                    </div>
                    <div className="text-xs italic font-serif text-emerald-300 shrink-0">
                        Talenta Menguatkan Pelayanan
                    </div>
                </div>
            </div>
        </div>
    );
}

