
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Loader2, LogOut } from "lucide-react";
import { AppNavbar } from "@/components/shared/app-navbar";
import { getFilteredNavLinks, type NavLink as AppNavLinkType } from "@/components/shared/nav-links";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  useSidebar, // Import useSidebar to get isMobile status
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MobileBottomNavbar } from "@/components/shared/mobile-bottom-navbar";

// Inner component to access useSidebar context
function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useSidebar(); // Get isMobile from context

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const filteredLinks = getFilteredNavLinks(user.role);

  return (
    <>
      <Sidebar 
        variant="sidebar" 
        collapsible="icon" 
        className="border-r" // This sidebar will be hidden on small mobile by its internal logic
      >
        <SidebarHeader className="p-4">
          {/* Sidebar header content if needed, like a logo or app name for collapsed view */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {filteredLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard')}
                    tooltip={link.tooltip || link.label}
                    className="justify-start"
                  >
                    <a>
                      <link.icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <Separator className="my-2" />
           <Button variant="ghost" onClick={logout} className="w-full justify-start gap-2 text-sm">
             <LogOut className="h-5 w-5" />
             <span>Logout</span>
           </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppNavbar />
        <main className={cn(
          "flex-1 p-4 md:p-6 lg:p-8 overflow-auto",
          isMobile ? "pb-20" : "" // Add padding-bottom for the mobile navbar (16 for h-16 + 4 for some spacing)
        )}>
            {children}
        </main>
      </SidebarInset>
      <MobileBottomNavbar navLinks={filteredLinks} />
    </>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
