
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink as AppNavLinkType } from "@/components/shared/nav-links";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar"; 

interface MobileBottomNavbarProps {
  navLinks: AppNavLinkType[];
}

export function MobileBottomNavbar({ navLinks }: MobileBottomNavbarProps) {
  const pathname = usePathname();
  const { isMobile } = useSidebar(); 

  if (!isMobile) {
    return null;
  }

  // Take up to 5 links for the bottom bar, prioritize core features
  const bottomNavLinks = navLinks.slice(0, 5); 

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-stretch justify-around border-t border-border bg-card shadow-t-lg md:hidden">
      {bottomNavLinks.map((link) => {
        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard' && link.href !== '/'); // Adjusted active logic
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium transition-colors",
              isActive
                ? "text-secondary" // Use secondary color for active items (teal)
                : "text-muted-foreground hover:text-secondary/80",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <link.icon className="h-5 w-5 shrink-0" />
            <span className="truncate">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
