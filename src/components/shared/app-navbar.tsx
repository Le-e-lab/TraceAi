
"use client";

import Link from "next/link";
import { User, ChevronLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { TraceAiLogo } from "./trace-ai-logo"; // Import the logo

export function AppNavbar() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const showBackButton = !["/dashboard", "/admin", "/notifications", "/profile"].includes(pathname) && isMobile;

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme'); 
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
         <div className="flex items-center gap-2">
            <div className="h-10 w-10 lg:hidden" /> 
            <TraceAiLogo className="h-8 w-auto"/>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="h-8 w-8 rounded-full bg-muted" />
          </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {showBackButton ? (
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-foreground hover:bg-accent">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          ) : (
            <SidebarTrigger className={cn(
              "text-foreground hover:bg-accent", 
              "hidden", 
              "md:block", 
              "lg:hidden" 
            )} />
          )}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
             <TraceAiLogo className="h-8 w-auto hidden sm:block"/>
             <span className="sm:hidden text-xl font-bold text-primary">TraceAI</span> {/* Show text on small mobile */}
          </Link>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications" className="text-foreground hover:bg-accent" onClick={() => router.push('/notifications')}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Profile" className="text-foreground hover:bg-accent" onClick={() => router.push('/profile')}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

