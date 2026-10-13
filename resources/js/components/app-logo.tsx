export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-stone-900 font-mono text-xs font-black text-amber-400 shadow-md border border-stone-700">
                ASN
            </div>
            <div className="ml-2 grid flex-1 text-left">
                <span className="font-display text-base font-black leading-tight tracking-tight text-stone-900">
                    ProASN<span className="text-amber-600">.</span>
                </span>
                <span className="text-[10px] font-mono font-semibold text-stone-500 uppercase tracking-wider">
                    Profiling & Talent Pool
                </span>
            </div>
        </>
    );
}
