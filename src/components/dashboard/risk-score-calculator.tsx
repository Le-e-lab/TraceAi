
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { RiskScoreInputData } from "@/lib/schemas";
import { RiskScoreInputSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { explainRiskScore, type ExplainRiskScoreInput } from "@/ai/flows/risk-score-explanation";
import { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { RiskScoreMeter } from "./risk-score-meter";
import { useToast } from "@/hooks/use-toast";

type RiskLevel = "low" | "medium" | "high";

export function RiskScoreCalculator() {
  const [isLoading, setIsLoading] = useState(false);
  const [riskExplanation, setRiskExplanation] = useState<string | undefined>(undefined);
  const [calculatedRisk, setCalculatedRisk] = useState<RiskLevel | null>(null);
  const { toast } = useToast();

  const form = useForm<RiskScoreInputData>({
    resolver: zodResolver(RiskScoreInputSchema),
    defaultValues: {
      contactFrequency: 0,
      contactDuration: 0,
      locationRiskLevel: "low",
    },
  });

  // Simple logic to determine risk score for MVP
  const determineRiskScore = (data: RiskScoreInputData): RiskLevel => {
    let score = 0;
    if (data.contactFrequency > 5) score += 1;
    if (data.contactFrequency > 10) score += 1;
    if (data.contactDuration > 60) score += 1; // More than 1 hour
    if (data.contactDuration > 180) score +=1; // More than 3 hours
    if (data.locationRiskLevel === "medium") score += 1;
    if (data.locationRiskLevel === "high") score += 2;

    if (score <= 1) return "low";
    if (score <= 3) return "medium";
    return "high";
  };

  async function onSubmit(data: RiskScoreInputData) {
    setIsLoading(true);
    setRiskExplanation(undefined);

    const currentRiskScore = determineRiskScore(data);
    setCalculatedRisk(currentRiskScore);

    const aiInput: ExplainRiskScoreInput = {
      riskScore: currentRiskScore,
      contactFrequency: data.contactFrequency,
      contactDuration: data.contactDuration,
      locationRiskLevel: data.locationRiskLevel,
    };

    try {
      const result = await explainRiskScore(aiInput);
      setRiskExplanation(result.explanation);
      toast({
        title: "Risk Score Explained",
        description: "AI has provided an explanation for your risk score.",
      });
    } catch (error) {
      console.error("Error getting risk score explanation:", error);
      setRiskExplanation("Failed to load AI explanation. Please try again.");
       toast({
        title: "Error",
        description: "Could not fetch AI explanation for the risk score.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <RiskScoreMeter riskLevel={calculatedRisk} explanation={riskExplanation} />
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Calculate Your Risk Score</CardTitle>
          <CardDescription>
            Enter details about your recent contacts and locations to estimate your risk level and get an AI-powered explanation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="contactFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Frequency</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormDescription>Number of unique close contacts in the last 7 days.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Contact Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 30" {...field} />
                    </FormControl>
                    <FormDescription>Average duration of close contacts in minutes.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationRiskLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visited Location Risk Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low Risk Locations</SelectItem>
                        <SelectItem value="medium">Medium Risk Locations</SelectItem>
                        <SelectItem value="high">High Risk Locations</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Predominant risk level of locations visited recently.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="mr-2 h-4 w-4" />
                )}
                Calculate & Explain Risk
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
