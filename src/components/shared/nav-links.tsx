
import type { UserRole } from "@/contexts/auth-context";
import { 
  Home, 
  CalendarCheck2, 
  MessageSquare, 
  Newspaper, 
  MapPin, 
  Users,
  LayoutDashboard, // Added for Admin Overview
  Network,        // Added for Exposure Logs
  ClipboardList,  // Added for Symptom Reports
  ShieldCheck,    // Added for AI Risk Scores
  BarChartBig,    // Added for Analytics
  Megaphone,      // Added for Communication
  EyeOff          // Added for Privacy & Ethics
} from "lucide-react";
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
  // Public User Links
  {
    href: "/dashboard",
    label: "Home", 
    icon: Home,    
    roles: ["public"],
    tooltip: "Your current status and overview.",
  },
  {
    href: "/symptoms",
    label: "Check-In",
    icon: CalendarCheck2,
    roles: ["public"],
    tooltip: "Log your symptoms or health status.",
  },
  {
    href: "/exposure", 
    label: "Exposure",
    icon: MapPin, // Using MapPin for exposure
    roles: ["public"],
    tooltip: "View potential exposure areas and contacts.",
  },
  {
    href: "/news",
    label: "News",
    icon: Newspaper,
    roles: ["public"],
    tooltip: "Latest health news and alerts.",
  },
  {
    href: "/feedback",
    label: "Feedback",
    icon: MessageSquare,
    roles: ["public"],
    tooltip: "Share your app experience.",
  },

  // Healthcare Worker Links (formerly admin tabs)
  {
    href: "/admin?tab=overview",
    label: "Overview",
    icon: LayoutDashboard,
    roles: ["healthcare_worker"],
    tooltip: "Public Health Overview",
  },
  {
    href: "/admin?tab=exposure-logs",
    label: "Exposure Logs",
    icon: Network,
    roles: ["healthcare_worker"],
    tooltip: "View contact histories",
  },
  {
    href: "/admin?tab=hotspot-mapping",
    label: "Hotspot Mapping",
    icon: MapPin, // Re-using MapPin as HotspotIcon
    roles: ["healthcare_worker"],
    tooltip: "Identify outbreak-prone areas",
  },
  {
    href: "/admin?tab=symptom-reports",
    label: "Symptom Reports",
    icon: ClipboardList,
    roles: ["healthcare_worker"],
    tooltip: "Manage symptom self-reports",
  },
  {
    href: "/admin?tab=risk-scores",
    label: "AI Risk Scores",
    icon: ShieldCheck,
    roles: ["healthcare_worker"],
    tooltip: "Manage AI-determined risk scores",
  },
  {
    href: "/admin?tab=analytics",
    label: "Analytics & Reports",
    icon: BarChartBig,
    roles: ["healthcare_worker"],
    tooltip: "View data summaries and trends",
  },
  {
    href: "/admin?tab=communication",
    label: "Communication",
    icon: Megaphone,
    roles: ["healthcare_worker"],
    tooltip: "Send alerts and messages",
  },
  {
    href: "/admin?tab=access-management",
    label: "Access Management",
    icon: Users, // Re-using Users icon
    roles: ["healthcare_worker"],
    tooltip: "Manage staff access",
  },
  {
    href: "/admin?tab=privacy-ethics",
    label: "Privacy & Ethics",
    icon: EyeOff,
    roles: ["healthcare_worker"],
    tooltip: "Privacy controls and ethics",
  },
];

export const getFilteredNavLinks = (role: UserRole | undefined | null): NavLink[] => {
  if (!role) return [];
  return navLinks.filter(link => link.roles.includes(role));
};
