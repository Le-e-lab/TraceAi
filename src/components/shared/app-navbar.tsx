
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
// import { useTheme } from "next-themes"; // Assuming next-themes is or will be installed
import { useEffect, useState } from "react";
import {
  SidebarTrigger,
  useSidebar, // Import useSidebar
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";


export function AppNavbar() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  // const { theme, setTheme } = useTheme(); // Placeholder if next-themes is not set up
  const [currentTheme, setCurrentTheme] = useState('light');
  const { isMobile } = useSidebar(); // Get isMobile from context


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
    // Basic skeleton to prevent layout shifts and hydration errors
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
         <div className="flex items-center gap-2">
            {/* Placeholder for trigger to avoid layout shift if it were visible */}
            <div className="h-10 w-10 lg:hidden" /> 
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
              <ActivitySquare className="h-6 w-6" />
              <span className="text-lg">TraceWise</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full" />
            <div className="h-10 w-10 rounded-full" />
            <div className="h-9 w-9 rounded-full" />
          </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {/* 
            SidebarTrigger logic:
            - Hidden on small screens (sm) because MobileBottomNavbar is primary.
            - Visible on medium screens (md) to trigger the Sheet sidebar.
            - Hidden on large screens (lg) because full Sidebar is visible.
          */}
          <SidebarTrigger className={cn(
            "hidden", // Default hidden
            "md:block", // Visible on md
            "lg:hidden"  // Hidden on lg (desktop sidebar takes over)
            // Implicitly hidden on sm because md:block is more specific than a general 'block'
            // and isMobile check in MobileBottomNavbar handles sm
          )} />
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
