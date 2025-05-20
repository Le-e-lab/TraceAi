
import { LoginForm } from "@/components/auth/login-form";
import { CardContent, CardDescription, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Users, TrendingUp, Activity, Eye } from "lucide-react";
import Image from "next/image";

const features = [
  { name: "AI Risk Scoring", description: "Understand your potential exposure with smart analysis.", icon: ShieldCheck },
  { name: "Symptom Check-In", description: "Log your symptoms easily and help monitor community health.", icon: Activity },
  { name: "Exposure Tracking", description: "Get notified about potential exposure areas.", icon: Eye },
  { name: "Privacy First", description: "Your data is handled with care and privacy in mind.", icon: Users },
];

export default function LoginPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-4">
        <CardTitle className="text-3xl font-bold text-foreground">Welcome to TraceWise</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">
          Sign in to access your dashboard and help keep our community safe.
        </CardDescription>
      </CardHeader>

      {/* Illustrations - less prominent */}
      <div className="my-4 flex justify-center items-end space-x-4 opacity-70">
        <Image src="https://placehold.co/60x100.png" alt="Person illustration" width={40} height={70} data-ai-hint="person standing" />
        <Image src="https://placehold.co/70x110.png" alt="Person illustration" width={50} height={80} data-ai-hint="person waving" />
        <Image src="https://placehold.co/65x105.png" alt="Person illustration" width={45} height={75} data-ai-hint="person walking" />
      </div>
      
      <div className="my-6 space-y-3">
        <h3 className="text-md font-semibold text-center text-foreground mb-3">Key Features</h3>
        {features.map((feature) => (
          <Card key={feature.name} className="bg-muted/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3 flex items-start">
              <feature.icon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-secondary" />
              <div>
                <p className="font-medium text-sm text-foreground">{feature.name}</p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <LoginForm />
       <p className="mt-6 text-center text-xs text-muted-foreground">
        By signing in, you agree to our Terms & Conditions.
      </p>
    </>
  );
}
