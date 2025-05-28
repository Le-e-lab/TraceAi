
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Added useSearchParams
import React, { useEffect } from "react";
import { Loader2, LogOut, User } from "lucide-react"; 
import { AppNavbar } from "@/components/shared/app-navbar";
import { getFilteredNavLinks } from "@/components/shared/nav-links";
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
  useSidebar, 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MobileBottomNavbar } from "@/components/shared/mobile-bottom-navbar";

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // For reading query params
  const { isMobile } = useSidebar(); 

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
        className="border-r bg-sidebar hidden md:flex"
      >
        <SidebarHeader className="p-4">
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {filteredLinks.map((link) => {
              const [linkPath, linkQuery] = link.href.split('?');
              const linkTabName = new URLSearchParams(linkQuery || '').get('tab');
              const currentUrlTabName = searchParams.get('tab');

              let buttonIsActive = false;
              if (linkTabName) { // This link is for a tab (e.g., /admin?tab=overview)
                if (pathname === linkPath) {
                  if (currentUrlTabName === linkTabName) {
                    buttonIsActive = true;
                  } else if (!currentUrlTabName && linkTabName === 'overview') {
                    // If URL is base path (e.g., /admin) and link is for overview tab, mark active
                    buttonIsActive = true;
                  }
                }
              } else { // This link does not have a tab (e.g., /profile)
                // Original logic for non-tabbed links or parent routes (though admin tabs are now flat)
                buttonIsActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard' && link.href !== '/' && link.href !== '/admin');
              }
              
              return (
                <SidebarMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      asChild
                      isActive={buttonIsActive}
                      tooltip={link.tooltip || link.label}
                      className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                    >
                      <a>
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <Separator className="my-2 bg-sidebar-border" />
           <Button variant="ghost" onClick={() => router.push('/profile')} className="w-full justify-start gap-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
             <User className="h-5 w-5" />
             <span>Profile</span>
           </Button>
           <Button variant="ghost" onClick={logout} className="w-full justify-start gap-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
             <LogOut className="h-5 w-5" />
             <span>Logout</span>
           </Button>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset>
        <AppNavbar />
        <main className={cn(
          "flex-1 p-4 md:p-6 lg:p-8 overflow-auto bg-background",
          isMobile ? "pb-20" : "" 
        )}>
            {children}
        </main>
      </SidebarInset>
      <MobileBottomNavbar navLinks={filteredLinks} />
    </>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Set defaultOpen to true to have sidebar expanded by default on larger screens
  return (
    <SidebarProvider defaultOpen={true}> 
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
