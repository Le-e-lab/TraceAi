
// src/components/admin/individual-header.tsx
"use client";

import type { MonitoredIndividual } from "@/types/admin-dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin as LocationIcon, UserCircle, ShieldAlert, Briefcase } from "lucide-react";

interface IndividualHeaderProps {
  individual: MonitoredIndividual;
}

export function IndividualHeader({ individual }: IndividualHeaderProps) {
  const getRiskBadgeVariant = (level: typeof individual.overallRiskLevel) => {
    if (level === "high") return "destructive";
    if (level === "medium") return "secondary"; // Or a custom orange/yellow
    return "default"; // Assuming default is greenish or neutral
  };
  
  const getRiskFactorBadgeVariant = (level: typeof individual.overallRiskLevel | undefined) => {
    if (!level) return "outline";
    if (level === "high") return "destructive";
    if (level === "medium") return "secondary";
    return "default";
  };


  return (
    <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        <Avatar className="h-20 w-20 border-2 border-primary">
          <AvatarImage src={individual.avatarUrl} alt={individual.name} data-ai-hint="person portrait" />
          <AvatarFallback>{individual.avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="mt-4 md:mt-0 flex-1">
          <h1 className="text-2xl font-bold text-foreground">{individual.name}</h1>
          <div className="text-sm text-muted-foreground space-y-0.5 mt-1">
            <p>DOB: {individual.dateOfBirth} ({individual.age}y) &bull; {individual.gender} &bull; ID: {individual.traceWiseId}</p>
            <p className="flex items-center gap-1.5"><Phone size={14} /> {individual.phone}</p>
            <p className="flex items-center gap-1.5"><LocationIcon size={14} /> {individual.address}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:text-right space-y-2 text-sm">
          <div>
            <p className="font-medium text-foreground">Contact Source</p>
            <p className="text-muted-foreground">{individual.contactSource}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Assigned Health Officer</p>
            <p className="text-muted-foreground flex items-center md:justify-end gap-1.5">
              <Briefcase size={14}/> {individual.assignedHealthOfficer}
            </p>
          </div>
           <div>
            <p className="font-medium text-foreground">Overall Risk Level</p>
            <Badge variant={getRiskBadgeVariant(individual.overallRiskLevel)} className="text-xs mt-0.5">
              <ShieldAlert size={12} className="mr-1" />
              {individual.overallRiskLevel?.toUpperCase() || "N/A"}
            </Badge>
          </div>
          {individual.riskFactors && (
            <div className="mt-1">
              <span className="text-xs text-muted-foreground">Factors: </span>
              {individual.riskFactors.clinical && (
                 <Badge variant={getRiskFactorBadgeVariant(individual.riskFactors.clinical)} className="text-xs ml-1">
                   Clinical: {individual.riskFactors.clinical}
                 </Badge>
              )}
              {individual.riskFactors.dda && (
                 <Badge variant={getRiskFactorBadgeVariant(individual.riskFactors.dda)} className="text-xs ml-1">
                   DDA: {individual.riskFactors.dda}
                 </Badge>
              )}
            </div>
          )}
        </div>
      </div>
       {/* Placeholder for Clinical Enrolled Programs / Patient Notes counts from image */}
      {(individual.recentContactLogCount || individual.statusNotes) && (
        <div className="mt-3 pt-3 border-t flex gap-4 text-sm">
          {individual.recentContactLogCount && (
            <a href="#" className="text-primary hover:underline">Contact Logs ({individual.recentContactLogCount})</a>
          )}
          {individual.statusNotes && individual.statusNotes.length > 0 && (
             <a href="#" className="text-primary hover:underline">Status Notes ({individual.statusNotes.length})</a>
          )}
        </div>
      )}
    </div>
  );
}
