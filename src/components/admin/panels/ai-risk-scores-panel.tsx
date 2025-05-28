
// src/components/admin/panels/ai-risk-scores-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, UserCircle, CalendarDays, MapPin, Search, Filter, AlertCircle } from "lucide-react";
import type { UserRiskProfile, RiskLevel } from "@/types/admin-dashboard";
import { useState, useEffect } from "react";
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

// Mock Data
const generateMockUserRiskProfiles = (): UserRiskProfile[] => {
  const riskLevels: RiskLevel[] = ["low", "medium", "high"];
  const locations = ["City Center", "North Suburb", "East Industrial", "West Park", "Downtown"];
  
  return Array.from({ length: Math.floor(Math.random() * 20) + 10 }, (_, i) => ({
    id: `user-risk-${i + 1}`,
    displayName: `User_Anon_${Math.floor(Math.random() * 10000)}`,
    riskScore: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    riskScoreValue: Math.random() > 0.3 ? Math.floor(Math.random() * 100) : undefined,
    lastExposureTimestamp: Math.random() > 0.2 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    location: Math.random() > 0.4 ? locations[Math.floor(Math.random() * locations.length)] : undefined,
    factors: Math.random() > 0.5 ? ["Close contact with positive case", "Visited high-risk area"] : ["Attended large gathering"]
  }));
};

export function AIRiskScoresPanel() {
  const [profiles, setProfiles] = useState<UserRiskProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<UserRiskProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [sortKey, setSortKey] = useState<"riskScoreValue" | "lastExposureTimestamp">("riskScoreValue");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");


  useEffect(() => {
    const mockData = generateMockUserRiskProfiles();
    setProfiles(mockData);
  }, []);

  useEffect(() => {
    let tempProfiles = [...profiles]; // Create a new array for sorting
    
    // Filtering
    if (searchTerm) {
      tempProfiles = tempProfiles.filter(profile => profile.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (riskFilter !== "all") {
      tempProfiles = tempProfiles.filter(profile => profile.riskScore === riskFilter);
    }

    // Sorting
    tempProfiles.sort((a, b) => {
      let valA, valB;
      if (sortKey === "riskScoreValue") {
        valA = a.riskScoreValue ?? (a.riskScore === "high" ? 100 : a.riskScore === "medium" ? 50 : 0);
        valB = b.riskScoreValue ?? (b.riskScore === "high" ? 100 : b.riskScore === "medium" ? 50 : 0);
      } else { // lastExposureTimestamp
        valA = a.lastExposureTimestamp ? parseISO(a.lastExposureTimestamp).getTime() : 0;
        valB = b.lastExposureTimestamp ? parseISO(b.lastExposureTimestamp).getTime() : 0;
      }
      
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

    setFilteredProfiles(tempProfiles);
  }, [searchTerm, riskFilter, profiles, sortKey, sortOrder]);


  const getRiskBadgeVariant = (level: RiskLevel) => {
    if (level === "high") return "destructive";
    if (level === "medium") return "secondary";
    return "default";
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            AI Risk Scores Management
          </CardTitle>
          <CardDescription>View, manage, and sort individuals based on AI-determined risk.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 p-1 rounded-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by User ID/Name..."
                className="pl-8 w-full bg-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={riskFilter} onValueChange={(value) => setRiskFilter(value as RiskLevel | "all")}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input">
                <SelectValue placeholder="Filter by Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
             <Select value={sortKey} onValueChange={(value) => setSortKey(value as "riskScoreValue" | "lastExposureTimestamp")}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="riskScoreValue">Risk Score</SelectItem>
                <SelectItem value="lastExposureTimestamp">Last Exposure</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")} className="w-full sm:w-auto">
              Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
            </Button>
          </div>

          {filteredProfiles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><UserCircle className="inline h-4 w-4 mr-1"/>User ID</TableHead>
                  <TableHead><ShieldCheck className="inline h-4 w-4 mr-1"/>Risk Level</TableHead>
                  <TableHead>Score Value</TableHead>
                  <TableHead><CalendarDays className="inline h-4 w-4 mr-1"/>Last Exposure</TableHead>
                  <TableHead><MapPin className="inline h-4 w-4 mr-1"/>Location</TableHead>
                  <TableHead>Factors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium text-xs py-2">{profile.displayName}</TableCell>
                    <TableCell className="py-2">
                      <Badge variant={getRiskBadgeVariant(profile.riskScore)} className="text-xs">
                        {profile.riskScore.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs py-2">{profile.riskScoreValue ?? 'N/A'}</TableCell>
                    <TableCell className="text-xs py-2">
                      {profile.lastExposureTimestamp ? 
                        `${formatDistanceToNowStrict(parseISO(profile.lastExposureTimestamp))} ago` 
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-xs py-2">{profile.location || "N/A"}</TableCell>
                    <TableCell className="text-xs py-2">{profile.factors?.join(", ") || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="text-center py-8">
              <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No user risk profiles match your current filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

