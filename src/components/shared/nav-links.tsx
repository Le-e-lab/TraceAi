
import type { UserRole } from "@/contexts/auth-context";
import { LayoutGrid, CalendarCheck2, MessageSquare, Newspaper, BarChart3, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
  tooltip?: string;
  subLinks?: NavLink[];
}

export const navLinks: NavLink[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutGrid,
    roles: ["public", "healthcare_worker"],
    tooltip: "Your current status and overview.",
  },
  {
    href: "/symptoms",
    label: "Check-In",
    icon: CalendarCheck2,
    roles: ["public", "healthcare_worker"],
    tooltip: "Log your symptoms or health status.",
  },
  {
    href: "/news",
    label: "News",
    icon: Newspaper,
    roles: ["public", "healthcare_worker"],
    tooltip: "Latest health news and alerts.",
  },
  {
    href: "/feedback",
    label: "Feedback",
    icon: MessageSquare,
    roles: ["public", "healthcare_worker"],
    tooltip: "Share your app experience.",
  },
  {
    href: "/admin",
    label: "Analytics",
    icon: BarChart3, 
    roles: ["healthcare_worker"],
    tooltip: "Monitor regional data and insights.",
  },
];

export const getFilteredNavLinks = (role: UserRole | undefined | null): NavLink[] => {
  if (!role) return [];
  return navLinks.filter(link => link.roles.includes(role));
};
