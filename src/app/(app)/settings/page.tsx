
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react"; // Renamed to avoid conflict

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-2 space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
            <SettingsIcon className="h-7 w-7 text-primary" />
            Settings
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Manage your application preferences and account settings here. (Functionality Coming Soon)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">This page is under construction. Please check back later for settings options.</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Update your email, password, and profile information.</p>
              </CardContent>
            </Card>
            <Card className="bg-card hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Manage how you receive alerts and updates from TraceWise.</p>
              </CardContent>
            </Card>
            <Card className="bg-card hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Theme Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Choose your preferred theme (e.g., Light/Dark mode).</p>
              </CardContent>
            </Card>
             <Card className="bg-card hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Control your data sharing and privacy options.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
