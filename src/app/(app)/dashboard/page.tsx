
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { ArrowRight, BarChart2, CalendarCheck2, Activity, Users, AlertTriangle, MapPin, ShieldCheck as ProtectionIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CurrentRiskDisplay, type RiskLevel } from "@/components/dashboard/current-risk-display";
import { UserStatsDashboardSection } from "@/components/dashboard/user-stats-dashboard-section";

// Mock data for "Today's fight" section based on image
const mockDashboardData = {
  totalCheckInToday: 12329,
  feelingGoodPercent: 80,
  someSymptomsPercent: 20,
  latestUpdateStat: 2615,
};

// Mock data for pre-calculated risk
const mockCurrentRisk = {
  score: 42,
  level: "medium" as RiskLevel,
  advice: "Consider limiting non-essential activities."
};

// Mock data for User Stats section
const mockUserStats = {
  exposures: { value: 4, label: "Last 14 days", icon: Users },
  highRiskContacts: { value: 1, label: "Exposures", icon: AlertTriangle },
  localHotspots: { value: 3, label: "Nearby areas", icon: MapPin },
  protectionLevel: { value: "High", label: "Fully Vaccinated (Mock)", icon: ProtectionIcon },
};


export default function DashboardPage() {
  const { user } = useAuth();
  const [currentRiskLevel, setCurrentRiskLevel] = useState<RiskLevel>("medium");
  const [currentRiskScore, setCurrentRiskScore] = useState<number>(42);
  const [currentRiskAdvice, setCurrentRiskAdvice] = useState("Consider limiting non-essential activities.");

  useEffect(() => {
    // In a real app, you might fetch this data or calculate it
    setCurrentRiskScore(mockCurrentRisk.score);
    setCurrentRiskLevel(mockCurrentRisk.level);
    setCurrentRiskAdvice(mockCurrentRisk.advice);
  }, []);


  return (
    <div className="container mx-auto py-2 space-y-6">
      {/* User Greeting - could be added if desired like "Hello, {user?.email}" */}
      {/* 
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-foreground">Hello, {user?.email?.split('@')[0]}!</h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      */}

      {/* Current Risk Display */}
      <CurrentRiskDisplay 
        riskScore={currentRiskScore} 
        riskLevel={currentRiskLevel} 
        advice={currentRiskAdvice} 
      />

      {/* User Stats Section */}
      <UserStatsDashboardSection stats={mockUserStats} />
      
      {/* Symptom Check-In Link Card - Hidden on mobile, visible on md+ */}
      <Card className="shadow-lg bg-card hover:bg-muted/50 transition-colors hidden md:block">
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
      
      {/* "National Picture" section - placeholder */}
      <Card className="shadow-lg bg-card hover:bg-muted/50 transition-colors">
        <Link href="#" passHref> {/* Consider linking to /news or a dedicated analytics page */}
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

      {/* The RiskScoreCalculator form is now removed from the main dashboard to match the new design. 
          It could be moved to a dedicated page or modal if calculation input is still desired. */}

    </div>
  );
}
