
// src/components/admin/panels/access-management-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, KeyRound, UserPlus, ShieldCheck, FileText } from "lucide-react";

// Mock Data
const mockUsers = [
  { id: "user1", email: "admin@traceworker.com", role: "Admin", lastLogin: "2023-10-27 10:00 AM", status: "Active" },
  { id: "user2", email: "analyst1@traceworker.com", role: "Analyst", lastLogin: "2023-10-26 14:30 PM", status: "Active" },
  { id: "user3", email: "hcw_basic@traceworker.com", role: "Data Entry", lastLogin: "2023-10-25 09:15 AM", status: "Inactive" },
  { id: "user4", email: "supervisor@traceworker.com", role: "Supervisor", lastLogin: "2023-10-27 11:00 AM", status: "Active" },
];

const mockAuditLogs = [
    {id: "log1", user: "admin@traceworker.com", action: "Viewed High-Risk User List", timestamp: "2023-10-27 10:05 AM", ipAddress: "192.168.1.10"},
    {id: "log2", user: "analyst1@traceworker.com", action: "Generated Exposure Trend Report", timestamp: "2023-10-26 14:35 PM", ipAddress: "10.0.0.5"},
    {id: "log3", user: "admin@traceworker.com", action: "Sent Broadcast Alert: 'New Testing Site'", timestamp: "2023-10-26 09:00 AM", ipAddress: "192.168.1.10"},
];

export function AccessManagementPanel() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Access Management
          </CardTitle>
          <CardDescription>Secure, role-based access for different levels of healthcare staff.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2"><KeyRound className="h-5 w-5"/>Healthcare Worker Accounts</CardTitle>
              <Button variant="default" size="sm" className="text-xs h-8">
                <UserPlus className="mr-1.5 h-4 w-4" /> Add New User (Mock)
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-xs">{user.email}</TableCell>
                      <TableCell className="text-xs"><Badge variant="secondary">{user.role}</Badge></TableCell>
                      <TableCell className="text-xs">{user.lastLogin}</TableCell>
                      <TableCell><Badge variant={user.status === "Active" ? "default" : "outline"} className="text-xs">{user.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="text-xs h-7">Edit (Mock)</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><ShieldCheck className="h-5 w-5"/>Role Definitions (Mock Overview)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
                <p><span className="font-semibold text-foreground">Admin:</span> Full data access, configuration, user management, messaging capabilities.</p>
                <p><span className="font-semibold text-foreground">Supervisor:</span> Data access for their team, report generation, alert approvals.</p>
                <p><span className="font-semibold text-foreground">Analyst:</span> View-only access to aggregated data and reports, no PII access.</p>
                <p><span className="font-semibold text-foreground">Data Entry:</span> Limited access for inputting specific data types (e.g., lab results not from users).</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5"/>Audit Logs</CardTitle>
              <CardDescription>Track who accessed what data and when for accountability.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>IP Address</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockAuditLogs.map(log => (
                            <TableRow key={log.id}>
                                <TableCell className="text-xs">{log.user}</TableCell>
                                <TableCell className="text-xs">{log.action}</TableCell>
                                <TableCell className="text-xs">{log.timestamp}</TableCell>
                                <TableCell className="text-xs">{log.ipAddress}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
                <p className="mt-2 text-xs text-muted-foreground">Displaying recent audit logs. Full history is maintained. (Mock)</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

