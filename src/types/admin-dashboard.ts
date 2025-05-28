
// src/types/admin-dashboard.ts

import type { RiskLevel } from "@/components/dashboard/current-risk-display";

// --- Old types (kept for reference or potential future use, but not central to new dashboard) ---
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
    clinical?: RiskLevel;
    dda?: RiskLevel;
  };
  statusNotes?: string[];
  recentContactLogCount?: number;
}

export interface AdminTask {
  id: string;
  title: string;
  dueDate: string; // "MM/DD/YYYY"
  status: "In Progress" | "Completed" | "Pending" | "Needs Review";
  assignedTo?: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
}

export interface ExposureEvent {
  id: string;
  eventType: "Close Contact" | "Location Visit" | "Household Contact" | "Workplace Exposure";
  locationName: string;
  facilityType?: string;
  exposureDate: string; // "MM/DD/YYYY"
  endDate?: string;
  notifiedOn?: string;
  status?: "Verified" | "Unverified" | "Auto-Logged" | "Under Investigation";
}

export interface RecommendedAction {
  id: string;
  actionName: string;
  startDate: string; // "MM/DD/YYYY"
  reason: string;
  details: string;
  duration?: string;
}

export interface CaseNote {
  id: string;
  noteType: "General Update" | "Escalation" | "Intervention" | "Follow-up";
  status: "Active" | "Resolved" | "Pending Review" | "Referred";
  date: string; // "MM/DD/YYYY"
  details: string;
  author?: string;
}

// --- New types for the redesigned Healthcare Worker Dashboard ---

// 1. Overview Panel
export interface OverviewMetric {
  id: string;
  title: string;
  value: string | number;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon?: React.ElementType; // Lucide icon
}

export interface HeatmapDataPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export interface SentimentDataPoint {
  date: string; // "YYYY-MM-DD"
  score: number; // e.g., -1 to 1
  trend: "positive" | "negative" | "neutral";
}

// 2. Exposure Contact Logs
export interface ContactNode {
  id: string; // User ID (anonymized/pseudonymized)
  riskScore: RiskLevel;
  isConfirmedCase?: boolean;
  isSuspectedCase?: boolean;
}

export interface ContactEdge {
  source: string; // User ID
  target: string; // User ID
  durationMinutes: number;
  proximity: "close" | "near" | "far"; // Simplified
  contactDate: string; // "YYYY-MM-DD HH:mm"
}

export interface FlaggedContact {
  id: string;
  contactUserId: string;
  caseUserId: string; // ID of the confirmed/suspected case they contacted
  contactDate: string;
  durationMinutes: number;
  proximity: "close" | "near" | "far";
  contactUserRiskScore: RiskLevel;
}

// 3. Hotspot Mapping
export interface Hotspot {
  id: string;
  name: string;
  location: string; // e.g., "City Park Playground"
  coordinates: { lat: number; lng: number };
  riskLevel: RiskLevel;
  type: "current" | "predicted";
  reason?: string; // For predicted hotspots
}

export interface MedicalResource {
  id: string;
  name: string;
  type: "Testing Center" | "Hospital" | "Clinic";
  address: string;
  coordinates: { lat: number; lng: number };
}

// 4. Symptom Reports Management
export interface SymptomReport {
  id: string;
  userId: string; // Anonymized or real if permissions allow
  timestamp: string; // ISO Date string
  location?: string; // General location if provided
  symptoms: string[];
  severity: "Mild" | "Moderate" | "Severe";
  status: "New" | "FollowUp" | "Resolved";
  notes?: string;
}

// 5. AI Risk Scores Management
export interface UserRiskProfile {
  id: string; // User ID
  displayName: string; // Name or anonymous ID
  riskScore: RiskLevel;
  riskScoreValue?: number; // Numerical score if available (0-100)
  lastExposureTimestamp?: string; // ISO Date string
  location?: string;
  factors?: string[]; // Contributing factors to risk
}

// 6. Analytics & Reports (placeholder types)
export interface TrendDataPoint {
  date: string;
  value: number;
}

// 7. Communication & Alerts Panel
export interface AlertMessage {
  id: string;
  title: string;
  content: string;
  type: "Broadcast" | "Individual";
  targetAudience?: string; // e.g., "All Users", "High-Risk Users in Downtown"
  sentAt?: string; // ISO Date string
}

// No specific types for 8. Access Management & 9. Privacy Controls for mock UI beyond text

// Main data structure for the entire dashboard (if needed, or panels manage their own)
export interface AdminDashboardDataV2 {
  overviewMetrics: OverviewMetric[];
  heatmapData?: HeatmapDataPoint[]; // Optional
  sentimentTrends?: SentimentDataPoint[];
  contactLogs?: { nodes: ContactNode[], edges: ContactEdge[] };
  flaggedContacts?: FlaggedContact[];
  hotspots?: Hotspot[];
  medicalResources?: MedicalResource[];
  symptomReports?: SymptomReport[];
  userRiskProfiles?: UserRiskProfile[];
  // Add more as needed
}
