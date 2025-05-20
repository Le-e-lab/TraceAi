
"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function MockHeatmap() {
  // This component is currently not used in the new admin dashboard design.
  // It can be repurposed or removed later.
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Exposure Zone Heatmap</CardTitle>
        <CardDescription>Aggregated GPS data showing potential exposure zones. (Mock Data)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
          <Image
            src="https://placehold.co/800x450.png"
            alt="Mock Heatmap"
            width={800}
            height={450}
            layout="responsive"
            data-ai-hint="map heatmap"
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          This is a visual representation. In a real system, this would be an interactive map.
        </p>
      </CardContent>
    </Card>
  );
}
