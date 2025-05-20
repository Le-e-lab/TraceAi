
// src/components/admin/overview-case-notes.tsx
"use client";

import type { CaseNote } from "@/types/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Edit3, FileText, PlusCircle } from "lucide-react";

interface OverviewCaseNotesProps {
  notes: CaseNote[];
}

export function OverviewCaseNotes({ notes }: OverviewCaseNotesProps) {
    const getStatusBadgeVariant = (status: CaseNote["status"]) => {
    switch (status) {
      case "Active":
        return "default"; // Greenish
      case "Resolved":
        return "outline";
      case "Pending Review":
        return "secondary"; // Yellow/Orange
      case "Referred":
        return "secondary";
      default:
        return "outline";
    }
  };


  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Case Notes & Flags
           <Badge variant="outline" className="ml-2">{notes.length}</Badge>
        </CardTitle>
         <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-xs h-8">View All</Button>
            <Button variant="outline" size="sm" className="text-xs h-8">
                <PlusCircle size={14} className="mr-1.5" /> New Note
            </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
         {notes.length === 0 && <p className="text-sm text-muted-foreground">No case notes or flags for this individual.</p>}
        {notes.map((note) => (
          <Card key={note.id} className="p-3 bg-muted/30">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-sm text-foreground">{note.noteType}</h3>
                 <Badge variant={getStatusBadgeVariant(note.status)} className="text-xs px-1.5 py-0.5">{note.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Date: {note.date} {note.author && `by ${note.author}`}</p>
            <p className="text-xs text-foreground/90 mt-1">{note.details}</p>
             <div className="mt-2">
                 <Button variant="link" size="sm" className="text-xs p-0 h-auto text-primary hover:underline">
                    <Edit3 size={12} className="mr-1" /> Edit Note
                </Button>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
