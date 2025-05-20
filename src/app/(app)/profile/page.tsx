
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Bell, Palette, Edit3, LogOut } from "lucide-react"; // Added LogOut for completeness
import Link from "next/link";

// Mock user data for display
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Public User", // or "Healthcare Worker"
  avatarUrl: "https://placehold.co/100x100.png",
  initials: "AJ",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-2 space-y-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-primary shadow-md">
          <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} data-ai-hint="user portrait" />
          <AvatarFallback className="text-3xl">{mockUser.initials}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-foreground">{mockUser.name}</h1>
          <p className="text-md text-muted-foreground">{mockUser.email}</p>
          <p className="text-sm text-primary font-medium mt-1">{mockUser.role}</p>
          <Button variant="outline" size="sm" className="mt-3 text-xs">
            <Edit3 className="mr-2 h-3 w-3" /> Edit Profile
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              Account Information
            </CardTitle>
            <CardDescription className="text-xs">Manage your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-xs">Full Name</Label>
              <Input id="name" defaultValue={mockUser.name} className="bg-input text-sm" />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">Email Address</Label>
              <Input id="email" type="email" defaultValue={mockUser.email} className="bg-input text-sm" />
            </div>
            <Button className="w-full text-xs mt-2">Update Account</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Security & Privacy
            </CardTitle>
            <CardDescription className="text-xs">Change password and privacy settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full text-xs justify-start gap-2">Change Password</Button>
            <Button variant="outline" className="w-full text-xs justify-start gap-2">Privacy Settings</Button>
            <Button variant="outline" className="w-full text-xs justify-start gap-2">Manage Data Sharing</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription className="text-xs">Control how you receive alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
             <p className="text-sm text-muted-foreground">Email Notifications: <span className="text-foreground font-medium">Enabled</span></p>
             <p className="text-sm text-muted-foreground">Push Notifications: <span className="text-foreground font-medium">Disabled</span></p>
            <Button variant="outline" className="w-full text-xs">Edit Notification Settings</Button>
          </CardContent>
        </Card>

        {/* Theme settings card removed as dark mode toggle is removed */}

      </div>
       <div className="mt-8 flex justify-center">
          <Button variant="destructive" className="text-xs">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
            This is a placeholder profile page. Functionality is illustrative.
        </p>
    </div>
  );
}
