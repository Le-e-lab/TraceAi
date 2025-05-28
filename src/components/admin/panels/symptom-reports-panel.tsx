
// src/components/admin/panels/symptom-reports-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList, UserCircle, CalendarDays, AlertCircle, Search, Send, Edit3, CheckCircle } from "lucide-react";
import type { SymptomReport } from "@/types/admin-dashboard";
import { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';

// Mock Data
const generateMockSymptomReports = (): SymptomReport[] => {
  const severities: ("Mild" | "Moderate" | "Severe")[] = ["Mild", "Moderate", "Severe"];
  const statuses: ("New" | "FollowUp" | "Resolved")[] = ["New", "FollowUp", "Resolved"];
  const commonSymptoms = ["Fever", "Cough", "Fatigue", "Headache", "Sore Throat", "Loss of Smell/Taste", "Shortness of Breath"];
  
  return Array.from({ length: Math.floor(Math.random() * 15) + 5 }, (_, i) => {
    const numSymptoms = Math.floor(Math.random() * 3) + 1;
    const symptoms = [];
    for(let j=0; j<numSymptoms; j++) {
        symptoms.push(commonSymptoms[Math.floor(Math.random() * commonSymptoms.length)]);
    }

    return {
        id: `report-${i + 1}`,
        userId: `User_Anon_${Math.floor(Math.random() * 10000)}`,
        timestamp: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
        location: Math.random() > 0.5 ? `District ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}` : undefined,
        symptoms: [...new Set(symptoms)], // Ensure unique symptoms
        severity: severities[Math.floor(Math.random() * severities.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        notes: Math.random() > 0.7 ? "Advised to monitor. Follow-up scheduled." : undefined,
    };
  });
};


export function SymptomReportsPanel() {
  const [reports, setReports] = useState<SymptomReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<SymptomReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const mockData = generateMockSymptomReports();
    setReports(mockData);
    setFilteredReports(mockData);
  }, []);

  useEffect(() => {
    let tempReports = reports;
    if (searchTerm) {
      tempReports = tempReports.filter(report => report.userId.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (severityFilter !== "all") {
      tempReports = tempReports.filter(report => report.severity.toLowerCase() === severityFilter.toLowerCase());
    }
    if (statusFilter !== "all") {
      tempReports = tempReports.filter(report => report.status.toLowerCase() === statusFilter.toLowerCase());
    }
    setFilteredReports(tempReports);
  }, [searchTerm, severityFilter, statusFilter, reports]);

  const getSeverityBadgeVariant = (severity: SymptomReport["severity"]) => {
    if (severity === "Severe") return "destructive";
    if (severity === "Moderate") return "secondary"; // yellow-ish
    return "default"; // green-ish
  };
  
  const getStatusBadgeVariant = (status: SymptomReport["status"]) => {
    if (status === "New") return "default"; // blue/primary
    if (status === "FollowUp") return "secondary"; // yellow
    return "outline"; // gray/resolved
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            Symptom Reports Management
          </CardTitle>
          <CardDescription>Track and triage incoming symptom self-reports from users.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 p-1 rounded-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by User ID..."
                className="pl-8 w-full bg-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input">
                <SelectValue placeholder="Filter by Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Mild">Mild</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Severe">Severe</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="FollowUp">Follow-Up</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredReports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Symptoms</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium text-xs py-2">{report.userId}</TableCell>
                    <TableCell className="text-xs py-2">{format(parseISO(report.timestamp), "MMM d, yyyy HH:mm")}</TableCell>
                    <TableCell className="text-xs py-2">{report.symptoms.join(", ")}</TableCell>
                    <TableCell className="py-2">
                      <Badge variant={getSeverityBadgeVariant(report.severity)} className="text-xs">
                        {report.severity}
                      </Badge>
                    </TableCell>
                     <TableCell className="py-2">
                      <Badge variant={getStatusBadgeVariant(report.status)} className="text-xs">
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs py-2">{report.location || "N/A"}</TableCell>
                    <TableCell className="text-right space-x-1 py-2">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        <Edit3 className="h-3 w-3 mr-1" /> Mark
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        <Send className="h-3 w-3 mr-1" /> Notify
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No symptom reports match your current filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

