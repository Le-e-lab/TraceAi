
// src/components/admin/panels/access-management-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, KeyRound, UserPlus, ShieldCheck, FileText, Edit3, Trash2, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock Data Structures
interface MockUser {
  id: string;
  email: string;
  role: "Admin" | "Analyst" | "Data Entry" | "Supervisor";
  lastLogin: string;
  status: "Active" | "Inactive";
}

interface MockAuditLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  ipAddress: string;
}

// Initial Mock Data
const initialMockUsers: MockUser[] = [
  { id: "user1", email: "admin@traceworker.com", role: "Admin", lastLogin: "2023-10-27 10:00 AM", status: "Active" },
  { id: "user2", email: "analyst1@traceworker.com", role: "Analyst", lastLogin: "2023-10-26 14:30 PM", status: "Active" },
  { id: "user3", email: "hcw_basic@traceworker.com", role: "Data Entry", lastLogin: "2023-10-25 09:15 AM", status: "Inactive" },
  { id: "user4", email: "supervisor@traceworker.com", role: "Supervisor", lastLogin: "2023-10-27 11:00 AM", status: "Active" },
  { id: "user5", email: "new_analyst@traceworker.com", role: "Analyst", lastLogin: "2023-10-28 09:00 AM", status: "Active" },
];

const mockAuditLogs: MockAuditLog[] = [
    {id: "log1", user: "admin@traceworker.com", action: "Viewed High-Risk User List", timestamp: "2023-10-27 10:05 AM", ipAddress: "192.168.1.10"},
    {id: "log2", user: "analyst1@traceworker.com", action: "Generated Exposure Trend Report", timestamp: "2023-10-26 14:35 PM", ipAddress: "10.0.0.5"},
    {id: "log3", user: "admin@traceworker.com", action: "Sent Broadcast Alert: 'New Testing Site'", timestamp: "2023-10-26 09:00 AM", ipAddress: "192.168.1.10"},
    {id: "log4", user: "supervisor@traceworker.com", action: "Reviewed symptom reports for North Region", timestamp: "2023-10-27 11:30 AM", ipAddress: "172.16.0.55"},
];

export function AccessManagementPanel() {
  const { toast } = useToast();
  const [users, setUsers] = useState<MockUser[]>(initialMockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddUser = () => {
    const newUserEmail = `user${Math.floor(Math.random() * 1000)}@traceworker.com`;
    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email: newUserEmail,
      role: "Analyst", // Default role
      lastLogin: new Date().toLocaleString(),
      status: "Active",
    };
    setUsers(prevUsers => [newUser, ...prevUsers]);
    toast({
      title: "User Added (Mock)",
      description: `${newUserEmail} has been added to the list.`,
    });
  };

  const handleEditUser = (userId: string, userEmail: string) => {
    toast({
      title: "Edit User (Mock)",
      description: `You would now edit user: ${userEmail}. (ID: ${userId})`,
    });
    // In a real app, this would open a modal or form
  };

  const handleDeleteUser = (userId: string, userEmail: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    toast({
      title: "User Deleted (Mock)",
      description: `${userEmail} has been removed.`,
      variant: "destructive"
    });
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg flex items-center gap-2"><KeyRound className="h-5 w-5"/>Healthcare Worker Accounts</CardTitle>
                <CardDescription className="text-xs mt-1">Manage staff accounts and their roles.</CardDescription>
              </div>
              <Button onClick={handleAddUser} variant="default" size="sm" className="text-xs h-8 w-full sm:w-auto">
                <UserPlus className="mr-1.5 h-4 w-4" /> Add New User
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Filter users by email..."
                  className="pl-8 w-full sm:w-72 bg-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
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
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium text-xs whitespace-nowrap">{user.email}</TableCell>
                          <TableCell className="text-xs whitespace-nowrap"><Badge variant={user.role === "Admin" ? "destructive" : "secondary"} className="text-xs">{user.role}</Badge></TableCell>
                          <TableCell className="text-xs whitespace-nowrap">{user.lastLogin}</TableCell>
                          <TableCell className="whitespace-nowrap"><Badge variant={user.status === "Active" ? "default" : "outline"} className="text-xs">{user.status}</Badge></TableCell>
                          <TableCell className="text-right space-x-1 whitespace-nowrap">
                            <Button variant="outline" size="sm" className="text-xs h-7 px-2" onClick={() => handleEditUser(user.id, user.email)}>
                              <Edit3 className="h-3 w-3 mr-1"/> Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs h-7 px-2 hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDeleteUser(user.id, user.email)}>
                              <Trash2 className="h-3 w-3 mr-1"/> Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                 <p className="text-sm text-muted-foreground text-center py-4">No users match your filter.</p>
              )}
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
                 <div className="overflow-x-auto">
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
                                    <TableCell className="text-xs whitespace-nowrap">{log.user}</TableCell>
                                    <TableCell className="text-xs">{log.action}</TableCell>
                                    <TableCell className="text-xs whitespace-nowrap">{log.timestamp}</TableCell>
                                    <TableCell className="text-xs whitespace-nowrap">{log.ipAddress}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 </div>
                <p className="mt-2 text-xs text-muted-foreground">Displaying recent audit logs. Full history is maintained. (Mock)</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
