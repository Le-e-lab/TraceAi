
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatItem {
  value: string | number;
  label: string;
  icon: LucideIcon;
}

interface UserStatsDashboardSectionProps {
  stats: {
    exposures: StatItem;
    highRiskContacts: StatItem;
    localHotspots: StatItem;
    protectionLevel: StatItem;
  };
}

export function UserStatsDashboardSection({ stats }: UserStatsDashboardSectionProps) {
  const statItems = [
    { title: "Exposures", data: stats.exposures },
    { title: "High Risk Contacts", data: stats.highRiskContacts },
    { title: "Local Hotspots", data: stats.localHotspots },
    { title: "Protection Level", data: stats.protectionLevel },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-3">Your Stats</h2>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {statItems.map((item) => (
          <Card key={item.title} className="shadow-lg bg-card">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-muted-foreground">{item.title}</p>
                <item.data.icon className="h-4 w-4 text-secondary" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground truncate">
                {item.data.value}
              </p>
              <p className="text-xs text-muted-foreground truncate">{item.data.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
