
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink as AppNavLinkType } from "@/components/shared/nav-links";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar"; // To get isMobile

interface MobileBottomNavbarProps {
  navLinks: AppNavLinkType[];
}

export function MobileBottomNavbar({ navLinks }: MobileBottomNavbarProps) {
  const pathname = usePathname();
  const { isMobile } = useSidebar(); // Get isMobile from context

  if (!isMobile) {
    return null;
  }

  // Filter for essential links, e.g., max 4-5 items.
  // For now, use all filteredLinks, but consider a more specific filter if many links.
  const bottomNavLinks = navLinks.slice(0, 4); // Example: take first 4

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-card shadow-t-lg md:hidden">
      {bottomNavLinks.map((link) => {
        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard');
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex h-full flex-col items-center justify-center gap-1 px-2 text-xs font-medium transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-primary",
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
