
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from 'recharts'; // Ensure recharts is installed
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell } from 'recharts';
import { MockHeatmap } from "./mock-heatmap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, Users, MapPin } from "lucide-react";

const riskLevelData = [
  { name: 'Region A', low: 400, medium: 240, high: 100 },
  { name: 'Region B', low: 300, medium: 139, high: 210 },
  { name: 'Region C', low: 200, medium: 480, high: 50 },
  { name: 'Region D', low: 278, medium: 390, high: 150 },
  { name: 'Region E', low: 189, medium: 200, high: 300 },
];

const overallRiskData = [
  { name: 'Low Risk', value: 45, fill: 'var(--chart-1)' }, // Using HSL vars from globals.css via ui/chart
  { name: 'Medium Risk', value: 35, fill: 'var(--chart-2)' },
  { name: 'High Risk', value: 20, fill: 'var(--chart-4)' }, // chart-4 for destructive-like color
];
const chartConfig = {
  low: { label: "Low", color: "hsl(var(--chart-1))" },
  medium: { label: "Medium", color: "hsl(var(--chart-2))" },
  high: { label: "High", color: "hsl(var(--chart-4))" }, // Mapped to a destructive-like color from theme
  value: { label: "Individuals" }
};


export function AdminDashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,250</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Zones</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Cases Reported</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73</div>
            <p className="text-xs text-muted-foreground">In the last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Regional Risk Levels</CardTitle>
            <CardDescription>Number of individuals by risk category per region. (Mock Data)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskLevelData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    content={<ChartTooltipContent indicator="dot" />}
                    cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
                  />
                  <Legend content={<ChartLegendContent />} />
                  <Bar dataKey="low" stackId="a" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="medium" stackId="a" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="high" stackId="a" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Overall Risk Distribution</CardTitle>
            <CardDescription>Distribution of users across risk categories. (Mock Data)</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
                  <Pie data={overallRiskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {overallRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                   <Legend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <MockHeatmap />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Alerts & Notifications</CardTitle>
          <CardDescription>Recent important system alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>High Risk Spike in Region C</AlertTitle>
            <AlertDescription>
              A sudden increase in high-risk individuals detected in Region C. Further investigation recommended. (Mock Alert)
            </AlertDescription>
          </Alert>
          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertTitle>Increased Symptom Reporting</AlertTitle>
            <AlertDescription>
              Symptom reporting rates are up by 15% system-wide in the last 48 hours. (Mock Alert)
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

