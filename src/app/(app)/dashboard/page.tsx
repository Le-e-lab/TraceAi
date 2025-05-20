
"use client";
import { RiskScoreCalculator } from "@/components/dashboard/risk-score-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { ArrowRight, BarChart2, CalendarCheck2, ShieldCheck, Activity } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress"; // For mock progress bars

export default function DashboardPage() {
  const { user } = useAuth();

  // Mock data for "Today's fight" section based on image
  const mockData = {
    totalCheckInToday: 12329,
    feelingGoodPercent: 80,
    someSymptomsPercent: 20,
    latestUpdateStat: 2615,
  };

  return (
    <div className="container mx-auto py-2 space-y-6">
      {/* Header - removed for simpler look, title is in AppNavbar */}
      {/* 
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome, {user?.email}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s your TraceWise overview. Stay informed and safe.
        </p>
      </div>
      */}

      {/* Symptom Check-In Link Card - Prominent like the design */}
      <Card className="shadow-lg bg-card hover:bg-muted/50 transition-colors">
        <Link href="/symptoms" passHref>
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer p-4">
            <div className="flex items-center gap-3">
              <CalendarCheck2 className="h-8 w-8 text-secondary" />
              <div>
                <CardTitle className="text-lg text-foreground">Symptom Check-In</CardTitle>
                <CardDescription className="text-xs">Let us know if you have symptoms today.</CardDescription>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
        </Link>
      </Card>

      {/* Today's Summary / Risk Score Area - "Today's fight" from design */}
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2 text-foreground">
            <Activity className="h-6 w-6 text-primary" />
            Today&apos;s Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
            <div className="rounded-lg bg-primary/10 p-3">
              <p className="text-2xl font-bold text-primary">{mockData.totalCheckInToday.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Check-Ins Today (Mock)</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <p className="text-2xl font-bold text-primary">{mockData.latestUpdateStat.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">App Engagements (Mock)</p>
            </div>
          </div>
          
          {/* Mock Progress Bars */}
          <div className="space-y-2 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-green-600">Feeling Good</span>
                <span className="text-green-600">{mockData.feelingGoodPercent}%</span>
              </div>
              <Progress value={mockData.feelingGoodPercent} className="h-2 [&>div]:bg-green-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-orange-600">Some Symptoms</span>
                <span className="text-orange-600">{mockData.someSymptomsPercent}%</span>
              </div>
              <Progress value={mockData.someSymptomsPercent} className="h-2 [&>div]:bg-orange-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Score Calculator - integrated or can be separate card */}
      <RiskScoreCalculator />
      
      {/* "Latest update" section from design - placeholder */}
      <Card className="shadow-lg bg-card hover:bg-muted/50 transition-colors">
        <Link href="#" passHref>
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer p-4">
            <div className="flex items-center gap-3">
              <BarChart2 className="h-8 w-8 text-secondary" />
              <div>
                <CardTitle className="text-lg text-foreground">National Picture</CardTitle>
                <CardDescription className="text-xs">Tap for county breakdown & insights (Coming Soon).</CardDescription>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
        </Link>
      </Card>

      {/* Removed "Quick Actions" and "Digital Contact Tracing" info card to match new design's focus */}
    </div>
  );
}
