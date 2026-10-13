import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2.5">
            <AppLogoIcon className="size-8.5 shrink-0" />
            <div className="flex flex-col text-left">
                <span className="font-sans text-base font-black tracking-tight text-slate-900 leading-none">
                    ProASN<span className="text-emerald-600">.</span>
                </span>
                <span className="text-[10px] font-sans font-semibold text-slate-500 tracking-wider uppercase mt-1">
                    Talent Assessment
                </span>
            </div>
        </div>
    );
}
