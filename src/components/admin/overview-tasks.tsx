
// src/components/admin/overview-tasks.tsx
"use client";

import type { AdminTask } from "@/types/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Edit3, MoreHorizontal } from "lucide-react";

interface OverviewTasksProps {
  tasks: AdminTask[];
}

export function OverviewTasks({ tasks }: OverviewTasksProps) {
  const getStatusBadgeVariant = (status: AdminTask["status"]) => {
    switch (status) {
      case "In Progress":
        return "secondary"; // Yellow/Orange
      case "Completed":
        return "default"; // Green (assuming default is primary/success)
      case "Pending":
        return "outline";
      case "Needs Review":
        return "destructive"; // Red
      default:
        return "outline";
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Open Tasks
          <Badge variant="outline" className="ml-2">{tasks.length}</Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">View All</Button>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length === 0 && <p className="text-sm text-muted-foreground col-span-full">No open tasks.</p>}
        {tasks.map((task) => (
          <Card key={task.id} className="p-3 bg-muted/30">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-sm text-foreground">{task.title}</h3>
               <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal size={16} />
              </Button>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <Clock size={12} className="mr-1" /> Due: {task.dueDate}
              <Badge variant={getStatusBadgeVariant(task.status)} className="ml-auto text-xs px-1.5 py-0.5">{task.status}</Badge>
            </div>
            {task.description && <p className="text-xs text-foreground/80 mb-2.5">{task.description}</p>}
            {task.actionLabel && (
              <Button variant="link" size="sm" className="text-xs p-0 h-auto text-primary hover:underline">
                <Edit3 size={12} className="mr-1" />
                {task.actionLabel}
              </Button>
            )}
             {task.assignedTo && <p className="text-xs text-muted-foreground mt-1">Assigned: {task.assignedTo}</p>}
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
