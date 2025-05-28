
"use client";

import type { UserRole } from "@/contexts/auth-context";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

// Import panel components
import { OverviewPanel } from "./panels/overview-panel";
import { ExposureContactLogsPanel } from "./panels/exposure-contact-logs-panel";
import { HotspotMappingPanel } from "./panels/hotspot-mapping-panel";
import { SymptomReportsPanel } from "./panels/symptom-reports-panel";
import { AIRiskScoresPanel } from "./panels/ai-risk-scores-panel";
import { AnalyticsReportsPanel } from "./panels/analytics-reports-panel";
import { CommunicationAlertsPanel } from "./panels/communication-alerts-panel";
import { AccessManagementPanel } from "./panels/access-management-panel";
import { PrivacyEthicsPanel } from "./panels/privacy-ethics-panel";

interface AdminDashboardContentProps {
  userRole: UserRole | undefined | null;
  activeTab: string; // New prop to control which panel is visible
}

export function AdminDashboardContent({ userRole, activeTab }: AdminDashboardContentProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200); 
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
  
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="ml-3 text-muted-foreground">Loading Dashboard...</p>
      </div>
    );
  }

  const renderActivePanel = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPanel />;
      case "exposure-logs":
        return <ExposureContactLogsPanel />;
      case "hotspot-mapping":
        return <HotspotMappingPanel />;
      case "symptom-reports":
        return <SymptomReportsPanel />;
      case "risk-scores":
        return <AIRiskScoresPanel />;
      case "analytics":
        return <AnalyticsReportsPanel />;
      case "communication":
        return <CommunicationAlertsPanel />;
      case "access-management":
        return <AccessManagementPanel />;
      case "privacy-ethics":
        return <PrivacyEthicsPanel />;
      default:
        return <OverviewPanel />; // Fallback to overview
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Title is now dynamically set within each panel or removed if sidebar handles titles */}
      {/* <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Healthcare Worker Dashboard</h1> */}
      
      {/* Tabs component removed, content is now rendered based on activeTab prop */}
      {renderActivePanel()}
    </div>
  );
}
