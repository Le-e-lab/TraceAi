
"use client";

import Link from "next/link";
import { Settings, Moon, Sun, ChevronLeft } from "lucide-react";
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
  const { user } = useAuth(); // Logout not used here anymore
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  // Determine if back button should be shown
  // Typically, root dashboard/admin pages don't show back, sub-pages might.
  const showBackButton = !["/dashboard", "/admin"].includes(pathname) && isMobile;

  useEffect(() => {
    setMounted(true);
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setCurrentTheme(preferredTheme);
    document.documentElement.classList.toggle('dark', preferredTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-primary px-4 md:px-6">
         <div className="flex items-center gap-2">
            <div className="h-10 w-10 lg:hidden" /> 
            <span className="text-xl font-bold text-primary-foreground">TraceWise</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20" />
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20" />
          </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/20 bg-primary shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {showBackButton ? (
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground hover:bg-primary-foreground/10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          ) : (
            <SidebarTrigger className={cn(
              "text-primary-foreground hover:bg-primary-foreground/10",
              "hidden", 
              "md:block", 
              "lg:hidden" 
            )} />
          )}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary-foreground">
            TraceWise
          </Link>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="text-primary-foreground hover:bg-primary-foreground/10">
            {currentTheme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          {/* Settings icon similar to design */}
          <Button variant="ghost" size="icon" aria-label="Settings" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Settings className="h-5 w-5" />
          </Button>
          {/* User Dropdown/Avatar is removed to match simpler design from image */}
        </div>
      </div>
    </header>
  );
}
