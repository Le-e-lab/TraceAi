
// src/components/admin/panels/communication-alerts-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone, Send, MessageSquare, Users2, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function CommunicationAlertsPanel() {
  const { toast } = useToast();
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");

  const [individualMessageUserId, setIndividualMessageUserId] = useState("");
  const [individualMessageContent, setIndividualMessageContent] = useState("");


  const handleSendBroadcast = () => {
    if(!broadcastTitle.trim() || !broadcastMessage.trim()){
        toast({ title: "Broadcast Error", description: "Title and message cannot be empty.", variant: "destructive"});
        return;
    }
    // Mock sending
    toast({ title: "Broadcast Sent (Mock)", description: `Alert "${broadcastTitle}" sent to ${targetAudience}.` });
    setBroadcastTitle("");
    setBroadcastMessage("");
  };

  const handleSendIndividualMessage = () => {
    if(!individualMessageUserId.trim() || !individualMessageContent.trim()){
        toast({ title: "Message Error", description: "User ID and message cannot be empty.", variant: "destructive"});
        return;
    }
    // Mock sending
    toast({ title: "Individual Message Sent (Mock)", description: `Message sent to User ID: ${individualMessageUserId}.` });
    setIndividualMessageUserId("");
    setIndividualMessageContent("");
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-primary" />
            Communication & Alerts Panel
          </CardTitle>
          <CardDescription>Send real-time alerts and messages to users.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Users2 className="h-5 w-5"/>Broadcast Alerts</CardTitle>
              <CardDescription>Send health warnings, testing announcements, or lockdown info to groups of users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="broadcast-title" className="text-xs">Alert Title</Label>
                <Input id="broadcast-title" placeholder="e.g., COVID-19 Testing Update" value={broadcastTitle} onChange={(e) => setBroadcastTitle(e.target.value)} className="bg-input"/>
              </div>
              <div>
                <Label htmlFor="broadcast-message" className="text-xs">Message Content</Label>
                <Textarea id="broadcast-message" placeholder="Enter your alert message here..." value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)} className="min-h-[100px] bg-input"/>
              </div>
              <div>
                <Label htmlFor="target-audience" className="text-xs">Target Audience</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger id="target-audience" className="w-full sm:w-[280px] bg-input">
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="high-risk">High-Risk Users Only</SelectItem>
                    <SelectItem value="region-north">Users in North Region</SelectItem>
                    <SelectItem value="symptomatic">Users Reporting Symptoms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSendBroadcast} className="w-full sm:w-auto">
                <Send className="mr-2 h-4 w-4" /> Send Broadcast (Mock)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><MessageSquare className="h-5 w-5"/>Individual Messaging</CardTitle>
              <CardDescription>Notify high-risk users to isolate, get tested, or provide specific guidance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="individual-userid" className="text-xs">User ID (Target)</Label>
                <Input id="individual-userid" placeholder="Enter User ID (e.g., User_Anon_1234)" value={individualMessageUserId} onChange={(e) => setIndividualMessageUserId(e.target.value)} className="bg-input"/>
              </div>
              <div>
                <Label htmlFor="individual-message" className="text-xs">Message Content</Label>
                <Textarea id="individual-message" placeholder="Enter your message for the individual user..." value={individualMessageContent} onChange={(e) => setIndividualMessageContent(e.target.value)} className="min-h-[80px] bg-input"/>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSendIndividualMessage} className="w-full sm:w-auto">
                    <Send className="mr-2 h-4 w-4" /> Send Message (Mock)
                </Button>
                 <Button variant="outline" className="w-full sm:w-auto">
                    Use Template (Mock)
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><History className="h-5 w-5"/>Sent Alerts History</CardTitle>
              <CardDescription>Log of recently sent communications.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Alert history will be displayed here. (Mock)</p>
                {/* Placeholder for a table or list of sent alerts */}
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </div>
  );
}

