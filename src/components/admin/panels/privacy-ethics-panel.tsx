
// src/components/admin/panels/privacy-ethics-panel.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EyeOff, UserCog, FileLock, AlertTriangle, ShieldQuestion } from "lucide-react";
import { useState } from "react";

export function PrivacyEthicsPanel() {
  const [dataAnonymization, setDataAnonymization] = useState(true);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <ShieldQuestion className="h-6 w-6 text-primary" />
            Privacy & Ethics Controls
          </CardTitle>
          <CardDescription>Ensure user data is handled responsibly and ethically.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><EyeOff className="h-5 w-5"/>Data Handling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                        <Label htmlFor="anonymization-toggle" className="font-medium">Global Data Anonymization</Label>
                        <p className="text-xs text-muted-foreground">Pseudonymize user identifiers in analytical views.</p>
                    </div>
                    <Switch
                        id="anonymization-toggle"
                        checked={dataAnonymization}
                        onCheckedChange={setDataAnonymization}
                        aria-label="Toggle data anonymization"
                    />
                </div>
                <p className="text-sm text-muted-foreground">
                    Current Status: Data anonymization is <span className="font-semibold text-foreground">{dataAnonymization ? "ENABLED" : "DISABLED"}</span> for non-essential views.
                    Direct case management may require de-anonymization with proper authorization.
                </p>
                 <Button variant="outline" size="sm" className="text-xs">
                    <UserCog className="mr-1.5 h-4 w-4" /> View Detailed Data Policies (Mock)
                </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><FileLock className="h-5 w-5"/>Consent Management</CardTitle>
                 <CardDescription>Overview of user consent for data collection and usage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    All users provide explicit consent upon signup. Consent records are logged and auditable.
                    Withdrawal of consent is processed within 24 hours, leading to data deletion or full anonymization based on policy.
                </p>
                <Button variant="outline" size="sm" className="text-xs">
                    View Consent Records Dashboard (Mock)
                </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive"/>Red Flag System & Data Misuse</CardTitle>
                <CardDescription>Mechanisms for flagging and investigating potential misuse of data.</CardDescription>
            </CardHeader>
            <CardContent>
                <Alert variant="default" className="border-yellow-500/60 bg-yellow-500/10">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertTitle className="text-sm text-yellow-700 dark:text-yellow-400">No Active Red Flags</AlertTitle>
                    <AlertDescription className="text-xs text-yellow-600 dark:text-yellow-500">
                        The system has not detected any suspicious data access patterns in the last 24 hours.
                        (This is a mock status)
                    </AlertDescription>
                </Alert>
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <Button variant="destructive" size="sm" className="text-xs">
                        Report Suspicious Activity (Mock)
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                        View Data Access Guidelines (Mock)
                    </Button>
                </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

