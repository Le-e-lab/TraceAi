
"use client";

import Link from "next/link";
import { ActivitySquare, Bell, LogOut, UserCircle, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes"; // Assuming next-themes is or will be installed
import { useEffect, useState } from "react";
import {
  SidebarTrigger,
} from "@/components/ui/sidebar";


// If next-themes is not installed, run: npm install next-themes
// Add ThemeProvider in src/app/layout.tsx if not already there.
// For this MVP, I'll mock theme toggling if next-themes isn't set up.

export function AppNavbar() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  // const { theme, setTheme } = useTheme(); // Placeholder if next-themes is not set up
  const [currentTheme, setCurrentTheme] = useState('light');


  useEffect(() => {
    setMounted(true);
    // If using next-themes, this would be handled by it.
    // For now, let's try to get system preference.
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setCurrentTheme(preferredTheme);
    // Apply to html tag for basic dark mode if not using next-themes provider
    document.documentElement.classList.toggle('dark', preferredTheme === 'dark');
  }, []);


  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    // if (setTheme) setTheme(newTheme); // Use if next-themes is set up
     document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
         <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
              <ActivitySquare className="h-6 w-6" />
              <span className="text-lg">TraceWise</span>
            </Link>
          </div>
      </header>
    ); // Avoid hydration mismatch
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="lg:hidden" /> {/* Hidden on lg and up, shown on md and sm */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
            <ActivitySquare className="h-6 w-6" />
            <span className="text-lg">TraceWise</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {currentTheme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://placehold.co/100x100.png?text=${user.email[0].toUpperCase()}`} alt={user.email} data-ai-hint="user avatar" />
                    <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.role === 'public' ? 'Public User' : 'Healthcare Worker'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
