
import type { UserRole } from "@/contexts/auth-context";
import { LayoutDashboard, ClipboardList, MessageCircleHeart, ShieldAlert, AreaChart, Users } from "lucide-react";
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
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["public", "healthcare_worker"],
    tooltip: "Overview of your status and tools.",
  },
  {
    href: "/symptoms",
    label: "Report Symptoms",
    icon: ClipboardList,
    roles: ["public", "healthcare_worker"],
    tooltip: "Log your current health status.",
  },
  {
    href: "/feedback",
    label: "App Feedback",
    icon: MessageCircleHeart,
    roles: ["public", "healthcare_worker"],
    tooltip: "Share your experience with the app.",
  },
  {
    href: "/admin",
    label: "Admin Dashboard",
    icon: AreaChart,
    roles: ["healthcare_worker"],
    tooltip: "Monitor regional risk levels and insights.",
    subLinks: [
        // Example sublinks if needed later
        // { href: "/admin/users", label: "Manage Users", icon: Users, roles: ["healthcare_worker"], tooltip: "User management"},
        // { href: "/admin/zones", label: "Exposure Zones", icon: Map, roles: ["healthcare_worker"], tooltip: "View heatmaps"},
    ]
  },
];

export const getFilteredNavLinks = (role: UserRole | undefined | null): NavLink[] => {
  if (!role) return [];
  return navLinks.filter(link => link.roles.includes(role));
};
