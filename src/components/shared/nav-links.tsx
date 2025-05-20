
import type { UserRole } from "@/contexts/auth-context";
import { Home, CalendarCheck2, MessageSquare, Newspaper, BarChart3, MapPin, Users } from "lucide-react"; // Added Home, MapPin
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
    label: "Home", 
    icon: Home,    
    roles: ["public"], // Only for public users
    tooltip: "Your current status and overview.",
  },
  {
    href: "/symptoms",
    label: "Check-In",
    icon: CalendarCheck2,
    roles: ["public"], // Only for public users
    tooltip: "Log your symptoms or health status.",
  },
  {
    href: "/exposure", 
    label: "Exposure",
    icon: MapPin,
    roles: ["public"], // Only for public users
    tooltip: "View potential exposure areas and contacts.",
  },
  {
    href: "/news",
    label: "News",
    icon: Newspaper,
    roles: ["public"], // Only for public users
    tooltip: "Latest health news and alerts.",
  },
  {
    href: "/feedback",
    label: "Feedback",
    icon: MessageSquare,
    roles: ["public"], // Only for public users
    tooltip: "Share your app experience.",
  },
  {
    href: "/admin",
    label: "Analytics", // This is the main/only link for healthcare_worker
    icon: BarChart3,
    roles: ["healthcare_worker"],
    tooltip: "Monitor regional data and insights.",
  },
];

export const getFilteredNavLinks = (role: UserRole | undefined | null): NavLink[] => {
  if (!role) return [];
  return navLinks.filter(link => link.roles.includes(role));
};
