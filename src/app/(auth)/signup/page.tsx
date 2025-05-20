
import { SignupForm } from "@/components/auth/signup-form";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-foreground">Create Your Account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Join TraceWise and contribute to a safer community.
        </CardDescription>
      </CardHeader>
      <SignupForm />
      <p className="mt-6 text-center text-xs text-muted-foreground">
        By creating an account, you agree to our Terms & Conditions.
      </p>
    </>
  );
}
