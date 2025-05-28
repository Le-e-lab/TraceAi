
// src/components/admin/panels/exposure-contact-logs-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Network, UserCheck, Search, AlertOctagon } from "lucide-react";
import type { FlaggedContact } from "@/types/admin-dashboard";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

// Mock Data
const generateMockFlaggedContacts = (): FlaggedContact[] => {
  const riskLevels: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
  return Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => ({
    id: `contact-${i + 1}`,
    contactUserId: `User_Anon_${Math.floor(Math.random() * 10000)}`,
    caseUserId: `Case_${Math.floor(Math.random() * 500)}`,
    contactDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: Math.floor(Math.random() * 120) + 10,
    proximity: Math.random() > 0.5 ? "close" : "near",
    contactUserRiskScore: riskLevels[Math.floor(Math.random() * riskLevels.length)],
  }));
};


export function ExposureContactLogsPanel() {
  const [flaggedContacts, setFlaggedContacts] = useState<FlaggedContact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFlaggedContacts(generateMockFlaggedContacts());
  }, []);

  const filteredContacts = flaggedContacts.filter(contact => 
    contact.contactUserId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.caseUserId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
            <Network className="h-6 w-6 text-primary" />
            Exposure Contact Logs
          </CardTitle>
          <CardDescription>View contact histories and flagged interactions. (Anonymized/Pseudonymized Data)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Chain Viewer</CardTitle>
              <CardDescription>Visual representation of contact networks.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                <Image
                    src="https://placehold.co/800x450.png"
                    alt="Mock Contact Graph"
                    width={800}
                    height={450}
                    layout="responsive"
                    data-ai-hint="network graph connections"
                    className="object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-center">
                Placeholder for interactive contact graph. Real implementation would show anonymized user connections.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertOctagon className="h-5 w-5 text-destructive" />
                Flagged Contacts
              </CardTitle>
              <CardDescription>Users who had close contact with confirmed or suspected cases.</CardDescription>
                 <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by User ID or Case ID..."
                      className="pl-8 w-full sm:w-1/2 bg-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
            </CardHeader>
            <CardContent>
              {filteredContacts.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact User ID</TableHead>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Duration (min)</TableHead>
                      <TableHead>Proximity</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium text-xs">{contact.contactUserId}</TableCell>
                        <TableCell className="text-xs">{contact.caseUserId}</TableCell>
                        <TableCell className="text-xs">{contact.contactDate}</TableCell>
                        <TableCell className="text-xs">{contact.durationMinutes}</TableCell>
                        <TableCell className="text-xs"><Badge variant={contact.proximity === "close" ? "outline" : "default"}>{contact.proximity}</Badge></TableCell>
                        <TableCell>
                          <Badge variant={getRiskBadgeVariant(contact.contactUserRiskScore)} className="text-xs">
                            {contact.contactUserRiskScore.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="text-xs h-7">
                            <UserCheck className="h-3.5 w-3.5 mr-1" /> View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No flagged contacts match your search or criteria.</p>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
