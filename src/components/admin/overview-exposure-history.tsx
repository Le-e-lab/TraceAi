
// src/components/admin/overview-exposure-history.tsx
"use client";

import type { ExposureEvent } from "@/types/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListFilter, CheckCircle2, AlertTriangle, Info, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";


interface OverviewExposureHistoryProps {
  history: ExposureEvent[];
}

export function OverviewExposureHistory({ history }: OverviewExposureHistoryProps) {
  const [filter, setFilter] = useState("all"); // Example filter state

  const getStatusBadgeVariant = (status?: ExposureEvent["status"]) => {
    if (!status) return "outline";
    if (status === "Verified") return "default"; // Green
    if (status === "Unverified" || status === "Under Investigation") return "secondary"; // Yellow/Orange
    if (status === "Auto-Logged") return "outline";
    return "outline";
  };

  const getStatusIcon = (status?: ExposureEvent["status"]) => {
    if (!status) return <Info size={14} className="mr-1 text-muted-foreground" />;
    if (status === "Verified") return <CheckCircle2 size={14} className="mr-1 text-green-600" />;
    if (status === "Unverified" || status === "Under Investigation") return <AlertTriangle size={14} className="mr-1 text-yellow-600" />;
    return <Info size={14} className="mr-1 text-muted-foreground" />;
  }
  
  const filteredHistory = history.filter(event => {
    if (filter === "all") return true;
    // Add more sophisticated filtering based on 'filter' state if needed
    return event.status?.toLowerCase().includes(filter) || event.eventType.toLowerCase().includes(filter);
  }).slice(0, 5); // Display up to 5 recent events

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Exposure History
           <Badge variant="outline" className="ml-2">{history.length}</Badge>
        </CardTitle>
        <div className="flex items-center gap-2">
            {/* Placeholder for tabs/filters like in the image: Admits/Discharges, Number of Visits, In Rolling Year */}
            {/* For now, a simple filter dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <ListFilter className="mr-1.5 h-3.5 w-3.5" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                  <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="verified">Verified</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="unverified">Unverified</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="investigation">Under Investigation</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          <Button variant="ghost" size="sm" className="text-xs h-8">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredHistory.length === 0 ? (
          <p className="text-sm text-muted-foreground">No exposure events recorded for this individual.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Event Type</TableHead>
                <TableHead>Location / Facility</TableHead>
                <TableHead>Exposure Date</TableHead>
                <TableHead className="w-[150px]">Status</TableHead>
                <TableHead className="text-right w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium text-xs py-2.5">{event.eventType}</TableCell>
                  <TableCell className="text-xs py-2.5">
                    {event.locationName}
                    {event.facilityType && <span className="text-muted-foreground"> ({event.facilityType})</span>}
                  </TableCell>
                  <TableCell className="text-xs py-2.5">{event.exposureDate}</TableCell>
                  <TableCell className="text-xs py-2.5">
                    <Badge variant={getStatusBadgeVariant(event.status)} className="text-xs px-1.5 py-0.5 flex items-center w-fit">
                      {getStatusIcon(event.status)}
                      {event.status || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-2.5">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {history.length > 5 && (
            <p className="text-xs text-muted-foreground text-center mt-3">Showing {filteredHistory.length} of {history.length} events. <Button variant="link" size="sm" className="p-0 h-auto text-xs">View All</Button></p>
        )}
      </CardContent>
    </Card>
  );
}
