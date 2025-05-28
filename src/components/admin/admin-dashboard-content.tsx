
"use client";

import type { UserRole } from "@/contexts/auth-context";
import { AlertTriangle, LayoutDashboard, Network, MapPin as HotspotIcon, ClipboardList, ShieldCheck, BarChartBig, Megaphone, Users, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}

export function AdminDashboardContent({ userRole }: AdminDashboardContentProps) {
  const [isLoading, setIsLoading] = useState(true); // Simulate initial loading if needed

  useEffect(() => {
    // Simulate data fetching for the dashboard if necessary
    setTimeout(() => {
      setIsLoading(false);
    }, 200); // Short delay
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

  const tabsConfig = [
    { value: "overview", label: "Overview", icon: LayoutDashboard, panel: <OverviewPanel /> },
    { value: "exposure-logs", label: "Exposure Logs", icon: Network, panel: <ExposureContactLogsPanel /> },
    { value: "hotspot-mapping", label: "Hotspot Mapping", icon: HotspotIcon, panel: <HotspotMappingPanel /> },
    { value: "symptom-reports", label: "Symptom Reports", icon: ClipboardList, panel: <SymptomReportsPanel /> },
    { value: "risk-scores", label: "AI Risk Scores", icon: ShieldCheck, panel: <AIRiskScoresPanel /> },
    { value: "analytics", label: "Analytics & Reports", icon: BarChartBig, panel: <AnalyticsReportsPanel /> },
    { value: "communication", label: "Communication", icon: Megaphone, panel: <CommunicationAlertsPanel /> },
    { value: "access-management", label: "Access Management", icon: Users, panel: <AccessManagementPanel /> },
    { value: "privacy-ethics", label: "Privacy & Ethics", icon: EyeOff, panel: <PrivacyEthicsPanel /> },
  ];

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Healthcare Worker Dashboard</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 mb-4">
          {tabsConfig.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-xs sm:text-sm py-2 px-1 flex items-center gap-1.5">
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsConfig.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0">
            {tab.panel}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
