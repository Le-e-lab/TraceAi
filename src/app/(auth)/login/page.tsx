
import { LoginForm } from "@/components/auth/login-form";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";

const features = [
  { name: "AI Risk Scoring", description: "Understand your potential exposure with smart analysis.", icon: ShieldCheck },
  { name: "Symptom Check-In", description: "Log your symptoms easily and help monitor community health.", icon: CheckCircle },
  { name: "Privacy First", description: "Your data is handled with care and privacy in mind.", icon: Users },
];

export default function LoginPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-foreground">Welcome to TraceWise</CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in to access your dashboard and help keep our community safe.
        </CardDescription>
      </CardHeader>

      <div className="my-6 flex justify-around items-end">
        <Image src="https://placehold.co/80x130.png" alt="Person illustration" width={60} height={100} data-ai-hint="person standing" className="opacity-80" />
        <Image src="https://placehold.co/100x150.png" alt="Person illustration" width={70} height={110} data-ai-hint="person waving" className="opacity-90" />
        <Image src="https://placehold.co/90x140.png" alt="Person illustration" width={65} height={105} data-ai-hint="person walking" className="opacity-80" />
      </div>
      
      <div className="space-y-3 my-6 text-sm text-muted-foreground">
        {features.map((feature) => (
          <div key={feature.name} className="flex items-start">
            <feature.icon className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-secondary" />
            <div>
              <p className="font-medium text-foreground">{feature.name}</p>
              <p className="text-xs">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <LoginForm />
       <p className="mt-6 text-center text-xs text-muted-foreground">
        By signing in, you agree to our Terms & Conditions.
      </p>
    </>
  );
}
