import { Link, usePage } from '@inertiajs/react';
import { 
    Award, 
    BookOpen, 
    HelpCircle, 
    LayoutGrid, 
    Sparkles, 
    ShieldCheck, 
    FileText, 
    FolderKanban, 
    Layers, 
    SlidersHorizontal,
    Users 
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';

const userNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Try Out CAT',
        href: '/tryout',
        icon: Award,
    },
    {
        title: 'Modul Materi',
        href: '/materi',
        icon: BookOpen,
    },
    {
        title: 'Status & Beli Akses',
        href: '/paket',
        icon: Sparkles,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Admin Overview',
        href: '/admin',
        icon: SlidersHorizontal,
    },
    {
        title: 'Verifikasi User Lynk.id',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Kelola Bank Soal',
        href: '/admin/soal',
        icon: FolderKanban,
    },
    {
        title: 'Upload Modul Materi',
        href: '/admin/materi',
        icon: FileText,
    },
    {
        title: 'Standar Kategori SKD',
        href: '/admin/kategori',
        icon: Layers,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Pusat Bantuan & FAQ',
        href: '/paket#faq',
        icon: HelpCircle,
    },
];

export function AppSidebar() {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;
    const isAdmin = user?.role === 'admin';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={isAdmin ? '/admin' : dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {isAdmin ? (
                    /* ADMIN PANEL SIDEBAR (No User Features) */
                    <SidebarGroup className="py-2">
                        <div className="mx-2 mb-3 p-2.5 rounded-xl bg-[#F0A500]/10 border border-[#F0A500]/30 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-[#F0A500] font-bold font-mono">
                                <ShieldCheck className="size-4" />
                                <span>PANEL ADMINISTRATOR</span>
                            </div>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F0A500] text-[#0B1023] font-bold">
                                ADMIN
                            </span>
                        </div>
                        <SidebarGroupLabel className="text-[11px] font-mono tracking-wider text-[#F0A500] uppercase font-bold">
                            Menu Administrasi
                        </SidebarGroupLabel>
                        <NavMain items={adminNavItems} />
                    </SidebarGroup>
                ) : (
                    /* PESERTA/USER SIDEBAR */
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                            Menu Belajar
                        </SidebarGroupLabel>
                        <NavMain items={userNavItems} />
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter>
                {!isAdmin && <NavFooter items={footerNavItems} className="mt-auto" />}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
