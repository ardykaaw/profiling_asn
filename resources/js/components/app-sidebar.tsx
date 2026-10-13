import { Link, usePage } from '@inertiajs/react';
import { 
    Award, 
    BookOpen, 
    LayoutGrid, 
    Sparkles, 
    FileText, 
    FolderKanban, 
    Layers, 
    SlidersHorizontal,
    Users,
    ShieldCheck
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
        title: 'Dashboard Profiling',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Simulasi Asesmen CAT',
        href: '/tryout',
        icon: Award,
    },
    {
        title: 'Modul & Kisi-Kisi ASN',
        href: '/materi',
        icon: BookOpen,
    },
    {
        title: 'Status & Paket Akses',
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
        title: 'Verifikasi Akun ASN',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Kelola Bank Soal',
        href: '/admin/soal',
        icon: FolderKanban,
    },
    {
        title: 'Upload Bahan Asesmen',
        href: '/admin/materi',
        icon: FileText,
    },
    {
        title: 'Standar Dimensi BKN',
        href: '/admin/kategori',
        icon: Layers,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const isAdmin = user?.role === 'admin';

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-stone-200/80 bg-[#F4EFE6]/70">
            <SidebarHeader className="border-b border-stone-200/70 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
                <NavMain items={userNavItems} />

                {isAdmin && (
                    <SidebarGroup className="mt-4">
                        <SidebarGroupLabel className="text-[11px] font-mono uppercase text-stone-500 tracking-wider">
                            Administrator Panel
                        </SidebarGroupLabel>
                        <NavMain items={adminNavItems} />
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter className="border-t border-stone-200/70 p-3">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
