
import type { UserRole } from "@/contexts/auth-context";
import { LayoutGrid, CalendarCheck2, MessageSquare, Share2, BarChart3, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
  tooltip?: string;
  subLinks?: NavLink[];
}

// Icons inspired by the design:
// Updates -> LayoutGrid (like a status board)
// COVID Check-In -> CalendarCheck2 or ClipboardCheck
// Contact Tracing -> Users (people icon) or ShieldCheck
// Share App -> Share2
// Settings -> Settings (already available)

export const navLinks: NavLink[] = [
  {
    href: "/dashboard",
    label: "Overview", // Was "Dashboard", mapping to "Updates" idea
    icon: LayoutGrid,
    roles: ["public", "healthcare_worker"],
    tooltip: "Your current status and overview.",
  },
  {
    href: "/symptoms",
    label: "Check-In", // Was "Report Symptoms"
    icon: CalendarCheck2,
    roles: ["public", "healthcare_worker"],
    tooltip: "Log your symptoms or health status.",
  },
  // The design has "Contact Tracing" as a main nav.
  // For TraceWise, this is integrated into the risk score.
  // We can make the dashboard itself represent this, or add a dedicated info page.
  // For now, let's assume "Overview" covers this.
  // If we want a "Contact Tracing" specific item, we'd add it here.
  // Example:
  // {
  //   href: "/contact-info", // A new page or section
  //   label: "Contact Log",
  //   icon: Users, 
  //   roles: ["public", "healthcare_worker"],
  //   tooltip: "View contact tracing information.",
  // },
  {
    href: "/feedback",
    label: "Feedback",
    icon: MessageSquare,
    roles: ["public", "healthcare_worker"],
    tooltip: "Share your app experience.",
  },
  {
    href: "/share", // Placeholder link
    label: "Share App",
    icon: Share2,
    roles: ["public", "healthcare_worker"],
    tooltip: "Help spread the word.",
  },
  {
    href: "/admin",
    label: "Analytics", // Was "Admin Dashboard"
    icon: BarChart3, 
    roles: ["healthcare_worker"],
    tooltip: "Monitor regional data and insights.",
  },
];

export const getFilteredNavLinks = (role: UserRole | undefined | null): NavLink[] => {
  if (!role) return [];
  // Ensure "Share App" is not the last one for aesthetics in bottom bar if possible
  const links = navLinks.filter(link => link.roles.includes(role));
  const shareIndex = links.findIndex(link => link.label === "Share App");
  if (shareIndex > -1 && shareIndex === links.length -1 && links.length > 2) {
    // Move "Share App" to be second to last if it's last and there are other items
    const shareItem = links.splice(shareIndex, 1)[0];
    links.splice(links.length - 1, 0, shareItem);
  }
  return links;
};
