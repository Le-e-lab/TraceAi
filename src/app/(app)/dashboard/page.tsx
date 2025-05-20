
"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { ArrowRight, BarChart2, CalendarCheck2, Activity, Users, AlertTriangle, MapPin, ShieldCheck as ProtectionIcon, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CurrentRiskDisplay, type RiskLevel } from "@/components/dashboard/current-risk-display";
import { UserStatsDashboardSection } from "@/components/dashboard/user-stats-dashboard-section";
import type { LucideIcon } from "lucide-react";

interface StatItem {
  value: string | number;
  label: string;
  icon: LucideIcon;
}

interface UserStats {
  exposures: StatItem;
  highRiskContacts: StatItem;
  localHotspots: StatItem;
  protectionLevel: StatItem;
}

export default function DashboardPage() {
  const { user } = useAuth();
  
  const [userName, setUserName] = useState<string | null>(null);
  const [currentRiskLevel, setCurrentRiskLevel] = useState<RiskLevel>("low");
  const [currentRiskScore, setCurrentRiskScore] = useState<number>(0);
  const [currentRiskAdvice, setCurrentRiskAdvice] = useState("Keep up the good work and follow safety guidelines.");
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  useEffect(() => {
    if (user?.email) {
      setUserName(user.email.split('@')[0]);
    }

    // Generate random risk score and advice
    const randomScore = Math.floor(Math.random() * 101); // 0-100
    setCurrentRiskScore(randomScore);

    let level: RiskLevel = "low";
    let advice = "Keep up the good work and follow safety guidelines.";
    if (randomScore > 70) {
      level = "high";
      advice = "High risk detected. Please take precautions and consider testing.";
    } else if (randomScore > 40) {
      level = "medium";
      advice = "Medium risk. Stay cautious and monitor your health.";
    }
    setCurrentRiskLevel(level);
    setCurrentRiskAdvice(advice);

    // Generate random user stats
    const numExposures = Math.floor(Math.random() * 11); // 0-10
    const numHighRiskContacts = Math.floor(Math.random() * (numExposures + 1)); // 0 to numExposures
    const protectionLevels = ["High", "Medium", "Low"];
    const randomProtectionLevel = protectionLevels[Math.floor(Math.random() * protectionLevels.length)];

    setUserStats({
      exposures: { value: numExposures, label: "Last 14 days", icon: Users },
      highRiskContacts: { value: numHighRiskContacts, label: "Exposures", icon: AlertTriangle },
      localHotspots: { value: Math.floor(Math.random() * 6), label: "Nearby areas", icon: MapPin },
      protectionLevel: { value: randomProtectionLevel, label: `Protection: ${randomProtectionLevel}`, icon: ProtectionIcon },
    });

  }, [user]);


  return (
    <div className="container mx-auto py-2 space-y-6">
      {userName && (
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-foreground">Hello, {userName}!</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back to TraceWise. Here's your current status.
          </p>
        </div>
      )}
      
      {/* Current Risk Display */}
      <CurrentRiskDisplay 
        riskScore={currentRiskScore} 
        riskLevel={currentRiskLevel} 
        advice={currentRiskAdvice} 
      />

      {/* User Stats Section */}
      {userStats && <UserStatsDashboardSection stats={userStats} />}
      
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
        <Link href="/news" passHref> 
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer p-4">
            <div className="flex items-center gap-3">
              <BarChart2 className="h-8 w-8 text-secondary" />
              <div>
                <CardTitle className="text-lg text-foreground">National Picture</CardTitle>
                <CardDescription className="text-xs">Tap for county breakdown & insights.</CardDescription>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
        </Link>
      </Card>

      {/* The RiskScoreCalculator form is now removed from the main dashboard to match the new design. */}

    </div>
  );
}
