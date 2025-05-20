
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Loader2, LogOut, User } from "lucide-react"; // Changed Settings to User
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
      {/* Desktop/Tablet Sidebar - styled to use sidebar specific theme */}
      <Sidebar 
        variant="sidebar" 
        collapsible="icon" 
        className="border-r bg-sidebar hidden md:flex" // Use bg-sidebar
      >
        <SidebarHeader className="p-4">
          {/* Optional: TraceWise text logo for collapsed sidebar */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {filteredLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard' && link.href !== '/')}
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
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <Separator className="my-2 bg-sidebar-border" />
           <Button variant="ghost" onClick={() => router.push('/profile')} className="w-full justify-start gap-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
             <User className="h-5 w-5" /> {/* Changed to User icon */}
             <span>Profile</span> {/* Changed label to Profile */}
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
  return (
    <SidebarProvider defaultOpen={false}> 
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
