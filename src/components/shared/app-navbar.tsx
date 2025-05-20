
"use client";

import Link from "next/link";
import { User, ChevronLeft, Bell } from "lucide-react"; // Changed Settings to User
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export function AppNavbar() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const showBackButton = !["/dashboard", "/admin"].includes(pathname) && isMobile;

  useEffect(() => {
    setMounted(true);
    // Ensure light theme is applied by default (dark class is not added)
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme'); // Remove any saved theme preference
  }, []);

  if (!mounted) {
    // Basic skeleton to prevent layout shift, matches new blended style
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
         <div className="flex items-center gap-2">
            <div className="h-10 w-10 lg:hidden" /> 
            <span className="text-xl font-bold text-primary">TraceWise</span>
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
              "text-foreground hover:bg-accent", // Adjusted for bg-background
              "hidden", 
              "md:block", 
              "lg:hidden" 
            )} />
          )}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            TraceWise
          </Link>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Dark mode toggle removed */}
          <Button variant="ghost" size="icon" aria-label="Notifications" className="text-foreground hover:bg-accent">
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
