
"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export type RiskLevel = "low" | "medium" | "high" | null;

interface CurrentRiskDisplayProps {
  riskScore: number;
  riskLevel: RiskLevel;
  advice: string;
}

export function CurrentRiskDisplay({ riskScore, riskLevel, advice }: CurrentRiskDisplayProps) {
  const getRiskStyling = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return {
          bgColor: "bg-green-500", // Using Tailwind direct color for strong green
          textColor: "text-white",
          label: "Low Risk",
        };
      case "medium":
        return {
          bgColor: "bg-yellow-500", // Using Tailwind direct color for strong yellow/orange
          textColor: "text-white",
          label: "Medium Risk",
        };
      case "high":
        return {
          bgColor: "bg-red-600", // Using Tailwind direct color for strong red
          textColor: "text-white",
          label: "High Risk",
        };
      default:
        return {
          bgColor: "bg-gray-500",
          textColor: "text-white",
          label: "Unknown Risk",
        };
    }
  };

  const { bgColor, textColor, label } = getRiskStyling(riskLevel);

  return (
    <Card className={cn("shadow-xl w-full overflow-hidden rounded-2xl", bgColor)}>
      <CardContent className={cn("p-5 md:p-6 flex items-center justify-between", textColor)}>
        <div className="text-center pr-4 md:pr-6 border-r border-white/30">
          <p className="text-5xl md:text-6xl font-bold leading-none">{riskScore}</p>
          <p className="text-xs md:text-sm opacity-90 mt-1">Risk Score</p>
        </div>
        <div className="flex-1 pl-4 md:pl-6">
          <h2 className="text-xl md:text-2xl font-semibold">{label}</h2>
          <p className="text-xs md:text-sm opacity-90 mt-1">{advice}</p>
        </div>
      </CardContent>
    </Card>
  );
}
