
import { SignupForm } from "@/components/auth/signup-form";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function SignupPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-foreground">Create Your Account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Join TraceAI and contribute to a safer community.
        </CardDescription>
      </CardHeader>
       {/* Optional: Small illustration for visual consistency */}
      <div className="my-4 flex justify-center opacity-70">
        <Image src="https://placehold.co/100x100.png" alt="Community illustration" width={80} height={80} data-ai-hint="community people" className="rounded-full"/>
      </div>
      <SignupForm />
      <p className="mt-6 text-center text-xs text-muted-foreground">
        By creating an account, you agree to our Terms & Conditions.
      </p>
    </>
  );
}
