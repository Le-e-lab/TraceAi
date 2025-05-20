
// src/components/admin/overview-recommendations.tsx
"use client";

import type { RecommendedAction } from "@/types/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, CheckCircle2, Edit3, MoreHorizontal, PlusCircle } from "lucide-react";

interface OverviewRecommendationsProps {
  actions: RecommendedAction[];
}

export function OverviewRecommendations({ actions }: OverviewRecommendationsProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Recommended Actions
          <Badge variant="outline" className="ml-2">{actions.length}</Badge>
        </CardTitle>
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-xs h-8">View All</Button>
            <Button variant="outline" size="sm" className="text-xs h-8">
                <PlusCircle size={14} className="mr-1.5" /> New Action
            </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.length === 0 && <p className="text-sm text-muted-foreground">No specific actions recommended at this time.</p>}
        {actions.map((action) => (
          <Card key={action.id} className="p-3 bg-muted/30">
             <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-semibold text-sm text-foreground">{action.actionName}</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal size={16} />
                </Button>
             </div>
            <p className="text-xs text-muted-foreground">
              Start Date: {action.startDate} {action.duration && `(${action.duration})`}
            </p>
            <p className="text-xs text-muted-foreground">Reason: {action.reason}</p>
            <p className="text-xs text-foreground/90 mt-1">{action.details}</p>
            <div className="mt-2">
                 <Button variant="link" size="sm" className="text-xs p-0 h-auto text-primary hover:underline">
                    <Edit3 size={12} className="mr-1" /> Edit Action
                </Button>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
