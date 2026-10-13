import { usePage } from '@inertiajs/react';

import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground shadow-sm">
                CP
            </div>
            <div className="ml-2 grid flex-1 text-left">
                <span className="font-display text-base font-bold leading-tight tracking-tight text-foreground">
                    SiapCPNS<span className="text-primary">.</span>
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Try Out Platform
                </span>
            </div>
        </>
    );
}
