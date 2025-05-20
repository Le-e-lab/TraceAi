
// src/types/admin-dashboard.ts

import type { UserRole } from "@/contexts/auth-context";
import type { RiskLevel } from "@/components/dashboard/current-risk-display";

export interface MonitoredIndividual {
  id: string;
  name: string;
  avatarUrl: string;
  avatarFallback: string;
  dateOfBirth: string; // "MM/DD/YYYY"
  age: number;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  traceWiseId: string; // Analogous to MRN
  phone: string;
  address: string;
  contactSource: string; // e.g., "Self-Reported", "Contact Tracing", "Health Clinic Referral"
  assignedHealthOfficer: string; // Analogous to PCP
  overallRiskLevel: RiskLevel; // low, medium, high
  riskFactors?: {
    clinical?: RiskLevel; // e.g. underlying conditions impact
    dda?: RiskLevel; // Data-driven assessment
  };
  statusNotes?: string[]; // Analogous to Patient Notes
  recentContactLogCount?: number; // Analogous to Clinical Enrolled Programs
}

export interface AdminTask {
  id: string;
  title: string;
  dueDate: string; // "MM/DD/YYYY"
  status: "In Progress" | "Completed" | "Pending" | "Needs Review";
  assignedTo?: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string; // or an onClick handler
}

export interface ExposureEvent {
  id: string;
  eventType: "Close Contact" | "Location Visit" | "Household Contact" | "Workplace Exposure";
  locationName: string;
  facilityType?: string; // e.g., "Restaurant", "Office", "Public Transport"
  exposureDate: string; // "MM/DD/YYYY"
  endDate?: string; // "MM/DD/YYYY" (e.g. for a period of infectiousness)
  notifiedOn?: string; // Date contacts were notified
  status?: "Verified" | "Unverified" | "Auto-Logged" | "Under Investigation";
}

export interface RecommendedAction {
  id: string;
  actionName: string; // e.g., "Self-Quarantine", "Get Tested", "Monitor Symptoms"
  startDate: string; // "MM/DD/YYYY"
  reason: string; // e.g., "Potential Exposure", "Symptomatic"
  details: string; // Instructions or notes
  duration?: string; // e.g. "14 days"
}

export interface CaseNote {
  id: string;
  noteType: "General Update" | "Escalation" | "Intervention" | "Follow-up";
  status: "Active" | "Resolved" | "Pending Review" | "Referred";
  date: string; // "MM/DD/YYYY"
  details: string; // e.g. "Referred to local health department for testing support."
  author?: string; // Health officer name
}

export interface AdminDashboardData {
  selectedIndividual: MonitoredIndividual;
  openTasks: AdminTask[];
  exposureHistory: ExposureEvent[];
  recommendedActions: RecommendedAction[];
  caseNotes: CaseNote[];
}
