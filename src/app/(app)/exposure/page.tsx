
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, AlertTriangle, ListChecks, CalendarDays, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockHotExposureAreas = [
  { id: 1, name: "Downtown Shopping Mall", lastVisit: "2023-10-25", risk: "High", detailsLink: "#" },
  { id: 2, name: "Central City Park", lastVisit: "2023-10-22", risk: "Medium", detailsLink: "#" },
  { id: 3, name: "Community Center", lastVisit: "2023-10-20", risk: "High", detailsLink: "#" },
];

const mockRecentExposures = [
  { id: 1, type: "Close Contact", eventName: "Public Transit - Route 5", date: "2023-10-26", riskLevel: "Medium", advice: "Monitor for symptoms for 7 days." },
  { id: 2, type: "Location Visit", eventName: "Grocery Store (Peak Hours)", date: "2023-10-24", riskLevel: "Low", advice: "Standard precautions advised." },
  { id: 3, type: "Potential Contact", eventName: "Reported case at Workplace Cafeteria", date: "2023-10-23", riskLevel: "High", advice: "Consider testing and limit contact." },
];

export default function ExposurePage() {
  return (
    <div className="container mx-auto py-2 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <MapPin className="h-8 w-8 text-primary" />
          Exposure Details
        </h1>
        <p className="text-muted-foreground">
          Information about potential exposure areas and recent contacts.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            Hot Exposure Areas Visited
          </CardTitle>
          <CardDescription className="text-xs">
            Places you've recently visited that are flagged as potential exposure zones. (Mock Data)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border bg-muted">
            <Image
              src="https://placehold.co/800x450.png"
              alt="Map of hot exposure areas"
              width={800}
              height={450}
              layout="responsive"
              data-ai-hint="map city locations"
              className="object-cover"
            />
          </div>
          {mockHotExposureAreas.map((area) => (
            <div key={area.id} className="p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-md text-foreground">{area.name}</h3>
                  <p className="text-xs text-muted-foreground">Last visit: {area.lastVisit}</p>
                </div>
                <Badge variant={area.risk === "High" ? "destructive" : area.risk === "Medium" ? "secondary" : "default"} className="text-xs">
                  {area.risk} Risk
                </Badge>
              </div>
            </div>
          ))}
           <p className="text-xs text-muted-foreground text-center mt-2">
            This is a visual representation. Actual data would be based on reported outbreaks and your location history (if enabled).
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" />
            Recent Potential Exposures
          </CardTitle>
          <CardDescription className="text-xs">
            Summary of recent events or contacts that might pose an exposure risk. (Mock Data)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockRecentExposures.length > 0 ? (
            mockRecentExposures.map((exp) => (
              <Alert key={exp.id} variant={exp.riskLevel === "High" ? "destructive" : "default"} className="shadow-sm">
                 <ShieldAlert className="h-4 w-4" />
                <AlertTitle className="text-sm font-semibold">
                  {exp.type}: {exp.eventName} - <span className="font-normal">{exp.date}</span>
                </AlertTitle>
                <AlertDescription className="text-xs">
                  Risk Level: <Badge variant={exp.riskLevel === "High" ? "destructive" : exp.riskLevel === "Medium" ? "secondary" : "default"} className="text-xs ml-1">{exp.riskLevel}</Badge>
                  <br />
                  Advice: {exp.advice}
                </AlertDescription>
              </Alert>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No recent potential exposures logged.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6 shadow-md bg-muted/30">
        <CardContent className="p-4">
          <p className="text-xs text-center text-muted-foreground">
            Exposure data is currently mocked for demonstration purposes.
            Accurate exposure tracking requires user consent for location services and integration with public health data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
