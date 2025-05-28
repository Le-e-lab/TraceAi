
// src/components/admin/panels/analytics-reports-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChartBig, LineChart, PieChart, Download, Share2 } from "lucide-react";
import Image from "next/image";

export function AnalyticsReportsPanel() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChartBig className="h-6 w-6 text-primary" />
            Analytics & Reports
          </CardTitle>
          <CardDescription>Provide data summaries, trends, and export options.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-secondary" />
                    Exposure Trends Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                    <Image src="https://placehold.co/600x338.png" alt="Exposure Trends Chart" data-ai-hint="line graph statistics" width={600} height={338} layout="responsive"/>
                </div>
                <p className="mt-2 text-xs text-muted-foreground text-center">Mock line chart showing exposure trends.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-secondary" />
                    Symptom Reporting Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                    <Image src="https://placehold.co/600x338.png" alt="Symptom Reporting Chart" data-ai-hint="pie chart statistics" width={600} height={338} layout="responsive"/>
                </div>
                <p className="mt-2 text-xs text-muted-foreground text-center">Mock pie chart for symptom types.</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Public Sentiment Trends (NLP)</CardTitle>
              <CardDescription>Analysis of public feedback and sentiment over time.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                    <Image src="https://placehold.co/800x450.png" alt="Sentiment Trends Chart" data-ai-hint="area graph statistics" width={800} height={450} layout="responsive"/>
                </div>
                <p className="mt-2 text-xs text-muted-foreground text-center">Mock area chart for sentiment trends.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="text-lg">Export & Share Reports</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3">
                <Button variant="default" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" /> Export as PDF (Mock)
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" /> Export as CSV (Mock)
                </Button>
                <Button variant="secondary" className="w-full sm:w-auto">
                    <Share2 className="mr-2 h-4 w-4" /> Share Link (Mock)
                </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

