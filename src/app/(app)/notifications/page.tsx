
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, CheckCircle2, Info, Trash2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  icon: React.ElementType;
  iconColor?: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    title: "High Risk Exposure Alert",
    description: "You may have been exposed at 'Downtown Cafe' on Oct 26. Monitor symptoms.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "notif-2",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    title: "Symptom Report Logged",
    description: "Your symptom report for Oct 27 has been successfully logged. Thank you!",
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: "notif-3",
    icon: Info,
    iconColor: "text-primary",
    title: "App Update Available",
    description: "A new version of TraceAI is available with improved features and bug fixes.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "notif-4",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    title: "Medium Risk Area Visited",
    description: "Central Park was recently reported as a medium-risk area. Be mindful of symptoms.",
    timestamp: "2 days ago",
    read: false,
  },
   {
    id: "notif-5",
    icon: XCircle,
    iconColor: "text-destructive",
    title: "Login Attempt Blocked",
    description: "An unusual login attempt to your account was blocked from an unrecognized device.",
    timestamp: "3 days ago",
    read: true,
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simulate fetching notifications
    setNotifications(mockNotifications);
    setMounted(true);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="container mx-auto py-2 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Bell className="h-8 w-8 text-primary" />
          Notifications
        </h1>
        {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAllNotifications} className="text-xs">
                <Trash2 className="mr-1.5 h-3.5 w-3.5"/>
                Clear All
            </Button>
        )}
      </div>

      {mounted && notifications.length === 0 && (
        <Card className="shadow-lg animate-in fade-in-50 slide-in-from-top-5 duration-500">
          <CardContent className="p-6 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">No New Notifications</p>
            <p className="text-sm text-muted-foreground">You're all caught up!</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {notifications.map((notif, index) => (
          <Card 
            key={notif.id} 
            className={cn(
              "shadow-lg transition-all duration-500 ease-out transform-gpu",
              "animate-in fade-in-0 slide-in-from-top-3", // Entrance animation
              !notif.read ? "bg-primary/5 border-primary/20" : "bg-card"
            )}
            style={{ animationDelay: `${index * 100}ms` }} // Stagger animation
          >
            <CardContent className="p-4 flex items-start gap-4">
              <notif.icon className={cn("h-6 w-6 mt-1 shrink-0", notif.iconColor || "text-muted-foreground")} />
              <div className="flex-1">
                <CardTitle className="text-md">{notif.title}</CardTitle>
                <CardDescription className="text-xs mt-1">{notif.description}</CardDescription>
                <p className="text-xs text-muted-foreground mt-2">{notif.timestamp}</p>
              </div>
              <div className="flex flex-col space-y-1 items-end">
                {!notif.read && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notif.id)} className="h-7 px-2 text-xs text-primary">
                    Mark as Read
                  </Button>
                )}
                 <Button variant="ghost" size="icon" onClick={() => deleteNotification(notif.id)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                 </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
