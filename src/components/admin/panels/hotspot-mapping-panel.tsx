
// src/components/admin/panels/hotspot-mapping-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge"; // Added import
import { MapPin as HotspotIcon, Building, TestTube2, AlertTriangle, Flame } from "lucide-react";
import type { Hotspot, MedicalResource } from "@/types/admin-dashboard";
import Image from "next/image";
import { useState, useEffect } from "react";

// Mock Data
const generateMockHotspots = (): Hotspot[] => {
  const riskLevels: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
  const locations = ["Downtown Mall", "Central Park", "Community Center", "North Library", "Westside Cafe"];
  return Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, i) => ({
    id: `hotspot-${i + 1}`,
    name: locations[i % locations.length] || `Area ${i + 1}`,
    location: `${locations[i % locations.length]}, Cityville`,
    coordinates: { lat: 34.0522 + Math.random() * 0.1, lng: -118.2437 + Math.random() * 0.1 },
    riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    type: Math.random() > 0.3 ? "current" : "predicted",
    reason: Math.random() > 0.3 ? undefined : "Increased symptom reports & low mask adherence noted."
  }));
};

const generateMockMedicalResources = (): MedicalResource[] => [
  { id: "res-1", name: "City General Hospital", type: "Hospital", address: "123 Main St, Cityville", coordinates: { lat: 34.06, lng: -118.25 } },
  { id: "res-2", name: "Downtown Testing Center", type: "Testing Center", address: "456 Oak Ave, Cityville", coordinates: { lat: 34.04, lng: -118.23 } },
  { id: "res-3", name: "Community Clinic North", type: "Clinic", address: "789 Pine Ln, Cityville", coordinates: { lat: 34.07, lng: -118.26 } },
];


export function HotspotMappingPanel() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [medicalResources, setMedicalResources] = useState<MedicalResource[]>([]);
  const [showTestingCenters, setShowTestingCenters] = useState(true);
  const [showMedicalResources, setShowMedicalResources] = useState(false);

  useEffect(() => {
    setHotspots(generateMockHotspots());
    setMedicalResources(generateMockMedicalResources());
  }, []);
  
  const getRiskBadgeVariant = (level: "low" | "medium" | "high") => {
    if (level === "high") return "destructive";
    if (level === "medium") return "secondary";
    return "default";
  };


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <HotspotIcon className="h-6 w-6 text-primary" />
            Hotspot Mapping
          </CardTitle>
          <CardDescription>Identify and visualize outbreak-prone areas and related resources.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Map Area */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Interactive Heatmap</CardTitle>
                  <CardDescription>Aggregated GPS & BLE data. (Zoomable by city, neighborhood, facility - Mock)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                     <Image
                        src="https://placehold.co/800x450.png"
                        alt="Mock Heatmap with Overlays"
                        width={800}
                        height={450}
                        layout="responsive"
                        data-ai-hint="map city heatmap points"
                        className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground text-center">
                    Placeholder for interactive map. Actual map would display hotspot intensities and resource locations.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Controls & Info Area */}
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Overlay Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="testing-centers" checked={showTestingCenters} onCheckedChange={(checked) => setShowTestingCenters(!!checked)} />
                    <Label htmlFor="testing-centers" className="text-sm font-normal">Show Testing Centers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="medical-resources" checked={showMedicalResources} onCheckedChange={(checked) => setShowMedicalResources(!!checked)} />
                    <Label htmlFor="medical-resources" className="text-sm font-normal">Show Other Medical Resources</Label>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-orange-500"/>
                    Current & Predicted Hotspots
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-60 overflow-y-auto space-y-2 text-xs pr-1">
                  {hotspots.length > 0 ? hotspots.map(spot => (
                    <div key={spot.id} className="p-2 border rounded-md bg-muted/50">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground/90">{spot.name}</span>
                        <Badge variant={getRiskBadgeVariant(spot.riskLevel)} className="text-xs">{spot.riskLevel}</Badge>
                      </div>
                      <p className="text-muted-foreground">{spot.location} ({spot.type})</p>
                      {spot.type === "predicted" && spot.reason && <p className="text-orange-600 dark:text-orange-400 text-[11px] italic mt-0.5">{spot.reason}</p>}
                    </div>
                  )) : <p className="text-muted-foreground">No hotspots identified.</p>}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <CardTitle className="text-lg mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                AI Prediction Alerts (Mock)
            </CardTitle>
            <div className="space-y-3">
                <Alert variant="destructive" className="shadow-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="text-sm">Potential Hotspot: "Northwood Mall Food Court"</AlertTitle>
                    <AlertDescription className="text-xs">AI predicts increased risk in 3-5 days based on recent mobility patterns and low check-in rates. Consider targeted messaging.</AlertDescription>
                </Alert>
                <Alert variant="default" className="border-yellow-500/60 bg-yellow-500/10 shadow-sm">
                     <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertTitle className="text-sm text-yellow-700 dark:text-yellow-400">Increased Activity: "Riverside Park Area"</AlertTitle>
                    <AlertDescription className="text-xs text-yellow-600 dark:text-yellow-500">Higher than average congregation reported. Monitor symptom reports from this zone.</AlertDescription>
                </Alert>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

