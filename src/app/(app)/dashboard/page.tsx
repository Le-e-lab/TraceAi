
"use client";
import { RiskScoreCalculator } from "@/components/dashboard/risk-score-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { ClipboardList, MessageCircleHeart } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-2">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome, {user?.email}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s your TraceWise overview. Stay informed and safe.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RiskScoreCalculator />
        </div>

        <div className="space-y-6 lg:col-span-1">
          <Card className="shadow-md hidden md:block">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access important features quickly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/symptoms">
                  <ClipboardList className="mr-2 h-5 w-5" /> Report Symptoms
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/feedback">
                  <MessageCircleHeart className="mr-2 h-5 w-5" /> Provide Feedback
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-primary/5 text-primary-foreground border-primary/20">
            <CardHeader>
                <CardTitle className="text-primary">Digital Contact Tracing</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-foreground">
                    This app would typically use BLE (Bluetooth Low Energy) for proximity detection and GPS for movement tracking (with your consent).
                    For this MVP, these features are simulated. Your contact data for risk assessment is based on the inputs you provide in the calculator.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                    In a full version, contact logs would be stored locally on your device for privacy.
                </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
