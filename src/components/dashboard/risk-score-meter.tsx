
"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

type RiskLevel = "low" | "medium" | "high" | null;

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
          color: "bg-green-500", // Direct Tailwind color for simplicity in this component
          textColor: "text-green-600 dark:text-green-400",
          icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
          value: 25,
          description: "Your current estimated risk level is low. Continue to follow safety guidelines.",
        };
      case "medium":
        return {
          label: "Medium Risk",
          color: "bg-yellow-500",
          textColor: "text-yellow-600 dark:text-yellow-400",
          icon: <ShieldAlert className="h-8 w-8 text-yellow-500" />,
          value: 60,
          description: "Your current estimated risk level is medium. Be cautious and monitor your health.",
        };
      case "high":
        return {
          label: "High Risk",
          color: "bg-red-500",
          textColor: "text-red-600 dark:text-red-400",
          icon: <ShieldAlert className="h-8 w-8 text-red-500" />,
          value: 90,
          description: "Your current estimated risk level is high. Please take necessary precautions and consider seeking advice.",
        };
      default:
        return {
          label: "Undetermined",
          color: "bg-gray-400",
          textColor: "text-gray-500 dark:text-gray-400",
          icon: <ShieldQuestion className="h-8 w-8 text-gray-500" />,
          value: 0,
          description: "Risk level has not been determined yet. Please input your data.",
        };
    }
  };

  const riskProps = getRiskProps(riskLevel);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">AI Risk Score</CardTitle>
          {riskProps.icon}
        </div>
        <CardDescription>{riskProps.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className={cn("text-3xl font-bold", riskProps.textColor)}>{riskProps.label}</p>
        </div>
        <Progress value={riskProps.value} className={cn("h-4 [&>*]:transition-all [&>*]:duration-500", riskProps.color)} />
        {explanation && (
          <div className="mt-4 rounded-md border bg-secondary/50 p-3">
            <h4 className="font-semibold text-foreground">AI Explanation:</h4>
            <p className="text-sm text-muted-foreground">{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
