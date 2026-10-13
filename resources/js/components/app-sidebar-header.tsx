import { Link } from '@inertiajs/react';
import { Award, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/90 px-4 md:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                    <Sparkles className="size-3.5 text-amber-600" />
                    <span className="font-semibold">Standar BKN 2026</span>
                </div>

                <Link
                    href="/tryout"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors shadow-xs"
                >
                    <Award className="size-3.5" />
                    <span className="hidden xs:inline">Uji Asesmen ASN</span>
                </Link>
            </div>
        </header>
    );
}
