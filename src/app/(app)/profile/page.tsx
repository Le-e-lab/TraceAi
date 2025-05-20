
"use client"; // Required for form handling and mock data state

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Bell, Edit3, LogOut, Save } from "lucide-react";
import { useAuth } from "@/contexts/auth-context"; // To get user info for placeholders
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

// Mock user data structure
interface ProfileData {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  initials: string;
}

export default function ProfilePage() {
  const { user, logout } = useAuth(); // Use actual user from auth if available
  const { toast } = useToast();

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Public User",
    avatarUrl: "https://placehold.co/100x100.png",
    initials: "AJ",
  });

  // Update profileData if auth user changes (e.g., on initial load)
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev, // keep avatar and initials if not in auth user
        email: user.email,
        role: user.role === 'healthcare_worker' ? "Healthcare Worker" : "Public User",
        // Potentially derive initials from email if name isn't in auth user
        initials: user.email.substring(0, 2).toUpperCase(), 
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountUpdate = () => {
    // Mock update
    console.log("Updating account with:", profileData);
    toast({
      title: "Profile Updated (Mock)",
      description: "Your account details have been 'saved'.",
    });
  };
  
  const handlePasswordChange = () => {
     toast({
      title: "Password Change (Mock)",
      description: "This would navigate to a password change screen.",
    });
  };

  return (
    <div className="container mx-auto py-2 space-y-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-primary shadow-md">
          <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint="user portrait" />
          <AvatarFallback className="text-3xl">{profileData.initials}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-foreground">{profileData.name}</h1>
          <p className="text-md text-muted-foreground">{profileData.email}</p>
          <p className="text-sm text-primary font-medium mt-1">{profileData.role}</p>
          {/* Removed Edit Profile button, fields are directly editable below */}
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
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-xs">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={profileData.name} 
                onChange={handleInputChange} 
                className="bg-input text-sm" 
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">Email Address</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={profileData.email} 
                onChange={handleInputChange} 
                className="bg-input text-sm" 
              />
            </div>
            <Button onClick={handleAccountUpdate} className="w-full text-xs mt-2">
              <Save className="mr-2 h-4 w-4" /> Update Account
            </Button>
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
            <Button variant="outline" onClick={handlePasswordChange} className="w-full text-xs justify-start gap-2">Change Password</Button>
            <Button variant="outline" className="w-full text-xs justify-start gap-2">Privacy Settings (Mock)</Button>
            <Button variant="outline" className="w-full text-xs justify-start gap-2">Manage Data Sharing (Mock)</Button>
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
            <Button variant="outline" className="w-full text-xs">Edit Notification Settings (Mock)</Button>
          </CardContent>
        </Card>
      </div>
       <div className="mt-8 flex justify-center">
          <Button variant="destructive" onClick={logout} className="text-xs">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
            Profile page is for demonstration. Updates are not persisted.
        </p>
    </div>
  );
}
