
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
import { Loader2, Zap, ShieldCheck } from "lucide-react"; 
import { RiskScoreMeter } from "./risk-score-meter";
import { useToast } from "@/hooks/use-toast";
import type { RiskLevel } from "./current-risk-display"; // Use RiskLevel from current-risk-display

// This component is no longer directly rendered on the main dashboard page by default
// but is kept here as it contains the form logic for calculating risk score.
// It could be used on a separate page or in a modal if detailed input is needed.

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

  const determineRiskScore = (data: RiskScoreInputData): RiskLevel => {
    let score = 0;
    if (data.contactFrequency > 5) score += 1;
    if (data.contactFrequency > 10) score += 1;
    if (data.contactDuration > 60) score += 1; 
    if (data.contactDuration > 180) score +=1; 
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
      {/* RiskScoreMeter shows results after calculation */}
      {calculatedRisk && (
        <RiskScoreMeter riskLevel={calculatedRisk} explanation={riskExplanation} />
      )}
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Calculate Your Detailed AI Risk Score
          </CardTitle>
          <CardDescription className="text-xs">
            Input your recent activity to estimate your potential exposure risk and get an AI-powered explanation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="contactFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Contact Frequency</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5 contacts" {...field} className="bg-input text-sm"/>
                    </FormControl>
                    <FormDescription className="text-xs">Close contacts in last 7 days.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Avg. Contact Duration (mins)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 30 minutes" {...field} className="bg-input text-sm"/>
                    </FormControl>
                    <FormDescription className="text-xs">Average duration of close contacts.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationRiskLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Visited Location Risk</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-input text-sm">
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low Risk Locations</SelectItem>
                        <SelectItem value="medium">Medium Risk Locations</SelectItem>
                        <SelectItem value="high">High Risk Locations</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">Predominant risk level of locations visited.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full !mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={isLoading}>
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
