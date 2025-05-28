
// src/components/admin/panels/overview-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Minus, Users, Activity, AlertTriangle, BarChart, Map, ShieldAlert } from "lucide-react";
import type { OverviewMetric } from "@/types/admin-dashboard";
import Image from "next/image";
import { useState, useEffect } from "react";

// Mock Data
const generateMockOverviewMetrics = (): OverviewMetric[] => [
  { id: "active-cases", title: "Active Exposure Cases", value: Math.floor(Math.random() * 200) + 50, trend: Math.random() > 0.5 ? "up" : "down", trendValue: `${Math.floor(Math.random() * 10) + 1}%`, icon: Users },
  { id: "new-reports", title: "Daily New Symptom Reports", value: Math.floor(Math.random() * 50) + 5, trend: "up", trendValue: `+${Math.floor(Math.random() * 5) + 1}`, icon: Activity },
  { id: "high-risk-users", title: "Users Flagged High Risk", value: Math.floor(Math.random() * 100) + 20, trend: Math.random() > 0.3 ? "down" : "up", trendValue: `${Math.floor(Math.random() * 5) + 1}%`, icon: ShieldAlert },
  { id: "sentiment", title: "Public Sentiment (Avg)", value: (Math.random() * 0.4 + 0.1).toFixed(2), trend: "stable", trendValue: "Neutral", icon: BarChart },
];

const StatCard = ({ metric }: { metric: OverviewMetric }) => {
  const TrendIcon = metric.trend === "up" ? TrendingUp : metric.trend === "down" ? TrendingDown : Minus;
  const trendColor = metric.trend === "up" ? "text-red-500" : metric.trend === "down" ? "text-green-500" : "text-muted-foreground";

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
        {metric.icon && <metric.icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{metric.value}</div>
        {metric.trendValue && (
          <p className={`text-xs ${trendColor} flex items-center`}>
            <TrendIcon className={`h-3 w-3 mr-1 ${trendColor}`} />
            {metric.trendValue} vs last period
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export function OverviewPanel() {
  const [metrics, setMetrics] = useState<OverviewMetric[]>([]);
  const [dateRange, setDateRange] = useState("7d");
  const [region, setRegion] = useState("all");

  useEffect(() => {
    setMetrics(generateMockOverviewMetrics());
  }, [dateRange, region]); // Re-generate if filters change

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            Public Health Overview
          </CardTitle>
          <CardDescription>Key metrics and trends for the selected period and region.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North Region</SelectItem>
                <SelectItem value="south">South Region</SelectItem>
                <SelectItem value="east">East Region</SelectItem>
                <SelectItem value="west">West Region</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto">Apply Filters</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map(metric => <StatCard key={metric.id} metric={metric} />)}
          </div>

          <Card className="mt-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Heatmap of High-Risk Zones
              </CardTitle>
              <CardDescription>Visual representation of areas with concentrated high-risk individuals or reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                <Image
                  src="https://placehold.co/800x450.png"
                  alt="Mock Heatmap"
                  width={800}
                  height={450}
                  layout="responsive"
                  data-ai-hint="map heatmap locations"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-center">
                This is a placeholder heatmap. Interactive map would show live data.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
