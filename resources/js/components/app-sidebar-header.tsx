import { Link } from '@inertiajs/react';
import { Award, Flame, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border/50 px-4 md:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0A500]/10 border border-[#F0A500]/25 text-xs text-[#F0A500] font-mono">
                    <Flame className="size-3.5 fill-[#F0A500]" />
                    <span className="font-bold">Streak 7 Hari</span>
                </div>

                <Link
                    href="/tryout"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0A500] text-[#0B1023] font-bold text-xs hover:bg-[#FFD166] transition-colors shadow-sm"
                >
                    <Award className="size-3.5" />
                    <span className="hidden xs:inline">Mulai Try Out</span>
                </Link>
            </div>
        </header>
    );
}

