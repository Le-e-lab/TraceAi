
"use client";

import type { UserRole } from "@/contexts/auth-context";
import { AlertTriangle, Loader2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { AdminDashboardData } from "@/types/admin-dashboard";

import { IndividualHeader } from "./individual-header";
import { OverviewTasks } from "./overview-tasks";
import { OverviewExposureHistory } from "./overview-exposure-history";
import { OverviewRecommendations } from "./overview-recommendations";
import { OverviewCaseNotes } from "./overview-case-notes";
import { Button } from "@/components/ui/button";

// Mock Data Generation (should ideally be fetched from an API)
const generateMockData = (): AdminDashboardData => {
  const today = new Date();
  const formatDate = (date: Date) => date.toLocaleDateString('en-US');

  return {
    selectedIndividual: {
      id: "ind-001",
      name: "Stephan Bastian", // From image
      avatarUrl: "https://placehold.co/100x100.png",
      avatarFallback: "SB",
      dateOfBirth: "08/04/1959", // From image
      age: 64, // Calculated from DOB
      gender: "Male",
      traceWiseId: "MRN 456789", // From image
      phone: "(701) 293-4945", // From image
      address: "900 Oak Ridge CIR, Brighton, MI 48116", // From image
      contactSource: "Health Clinic Referral", // Analogous to "SafeLife BlueShield" / "Mayo Clinic" practice
      assignedHealthOfficer: "Dr. Dawn Baker", // From image (PCP)
      overallRiskLevel: "medium", // From image "Moderate"
      riskFactors: { // From image
        clinical: "medium", 
        dda: "high" 
      },
      recentContactLogCount: 6, // From image "Clinical Enrolled Programs 6"
      statusNotes: ["Requires follow-up for recent travel history.", "Vaccination status pending verification."], // From image "Patient Notes 6"
    },
    openTasks: [
      { id: "task-1", title: "Additional Info needed", dueDate: formatDate(new Date(today.setDate(today.getDate() + 2))), status: "In Progress", description: "Gather travel history for the last 14 days.", actionLabel: "Add Info", assignedTo: "Admin User"},
      { id: "task-2", title: "Contact Tracing Review", dueDate: formatDate(new Date(today.setDate(today.getDate() + 3))), status: "Pending", description: "Review new contacts reported by the individual.", actionLabel: "Review Contacts", assignedTo: "Jane Doe"},
      { id: "task-3", title: "Testing Follow-up", dueDate: formatDate(new Date(today.setDate(today.getDate() + 1))), status: "Needs Review", description: "Confirm if COVID-19 test was scheduled and results received.", actionLabel: "Update Status", assignedTo: "Admin User"},
    ],
    exposureHistory: [
      { id: "exp-1", eventType: "Location Visit", locationName: "Downtown Grocery Store", facilityType: "Retail", exposureDate: "10/25/2023", status: "Verified" },
      { id: "exp-2", eventType: "Close Contact", locationName: "Friend's Gathering", facilityType: "Residential", exposureDate: "10/22/2023", status: "Unverified" },
      { id: "exp-3", eventType: "Workplace Exposure", locationName: "Office Building - Floor 3", facilityType: "Commercial", exposureDate: "10/20/2023", status: "Under Investigation" },
      { id: "exp-4", eventType: "Location Visit", locationName: "Central City Park", facilityType: "Outdoor", exposureDate: "10/18/2023", status: "Auto-Logged"},
    ],
    recommendedActions: [
      { id: "act-1", actionName: "10-Day Self-Quarantine", startDate: formatDate(new Date(today.setDate(today.getDate() - 5))), reason: "High-Risk Exposure", details: "Monitor for symptoms daily. Avoid contact with others. Test on day 5 post-exposure.", duration: "10 days" },
      { id: "act-2", actionName: "PCR Test Recommended", startDate: formatDate(today), reason: "Symptom Onset", details: "Schedule a PCR test at the nearest facility. Isolate until results are negative.", duration: "Until Result"},
    ],
    caseNotes: [
      { id: "note-1", noteType: "General Update", status: "Active", date: formatDate(new Date(today.setDate(today.getDate() - 2))), details: "Individual reported mild cough, advised to monitor.", author: "Dr. Smith" },
      { id: "note-2", noteType: "Intervention", status: "Referred", date: formatDate(today), details: "Referred to local public health for welfare check due to prolonged isolation.", author: "Support Team"},
    ],
  };
};


interface AdminDashboardContentProps {
  userRole: UserRole | undefined | null;
}

export function AdminDashboardContent({ userRole }: AdminDashboardContentProps) {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setIsLoading(true);
    setTimeout(() => {
      setData(generateMockData());
      setIsLoading(false);
    }, 500); // Simulate network delay
  }, []);


  if (userRole !== 'healthcare_worker') {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] p-4 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">Access Denied</h2>
        <p className="text-muted-foreground">
          You do not have the necessary permissions to view this dashboard.
        </p>
      </div>
    );
  }
  
  if (isLoading || !data) {
    return (
      <div className="flex h-[calc(100vh-200px)] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="ml-3 text-muted-foreground">Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <IndividualHeader individual={data.selectedIndividual} />
      
      <div className="flex justify-end mb-4">
        <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
            <PlusCircle size={18} className="mr-2"/>
            New Exposure/Visit
        </Button>
      </div>

      {/* Overview Section */}
      <div className="space-y-6">
        <OverviewTasks tasks={data.openTasks} />
        <OverviewExposureHistory history={data.exposureHistory} />
        <OverviewRecommendations actions={data.recommendedActions} />
        <OverviewCaseNotes notes={data.caseNotes} />
      </div>
      
      {/* Removed old charts and summary cards */}
    </div>
  );
}
