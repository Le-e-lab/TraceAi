
"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShieldAlert, ShieldCheck, ShieldQuestion, Info } from "lucide-react";
import type { RiskLevel } from "./current-risk-display"; // Import RiskLevel

// This component displays the risk meter after a calculation from RiskScoreCalculator
// It might be used if the full calculator form is shown (e.g., on a separate page or modal)

interface RiskScoreMeterProps {
  riskLevel: RiskLevel;
  explanation?: string;
}

export function RiskScoreMeter({ riskLevel, explanation }: RiskScoreMeterProps) {
  const getRiskProps = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return {
          label: "Low Risk",
          progressColor: "bg-green-500", 
          textColor: "text-green-700 dark:text-green-400",
          icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
          value: 25,
          description: "Your estimated risk is low. Keep following safety guidelines.",
        };
      case "medium":
        return {
          label: "Medium Risk",
          progressColor: "bg-yellow-500",
          textColor: "text-yellow-700 dark:text-yellow-400",
          icon: <ShieldAlert className="h-6 w-6 text-yellow-500" />,
          value: 60,
          description: "Your estimated risk is medium. Stay cautious and monitor your health.",
        };
      case "high":
        return {
          label: "High Risk",
          progressColor: "bg-red-500",
          textColor: "text-red-700 dark:text-red-400",
          icon: <ShieldAlert className="h-6 w-6 text-red-500" />,
          value: 90,
          description: "Your estimated risk is high. Please take precautions and consider advice.",
        };
      default: 
        return {
          label: "Undetermined",
          progressColor: "bg-gray-400",
          textColor: "text-gray-600 dark:text-gray-400",
          icon: <ShieldQuestion className="h-6 w-6 text-gray-500" />,
          value: 0,
          description: "Risk level not yet calculated.",
        };
    }
  };

  const riskProps = getRiskProps(riskLevel);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 text-foreground">
            {riskProps.icon}
            Calculated Risk Level
          </CardTitle>
          <span className={cn("text-xl font-bold", riskProps.textColor)}>{riskProps.label}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <Progress value={riskProps.value} className={cn("h-3 rounded", riskProps.progressColor)} />
        <CardDescription className="text-xs">{riskProps.description}</CardDescription>
        {explanation && (
          <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <h4 className="font-semibold text-sm text-primary flex items-center gap-1.5">
              <Info className="h-4 w-4" />
              AI Explanation:
            </h4>
            <p className="text-xs text-foreground/80">{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
