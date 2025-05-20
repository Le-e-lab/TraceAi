
import { SignupForm } from "@/components/auth/signup-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Create an Account</CardTitle>
        <CardDescription>
          Join TraceWise to help keep our community safe.
        </CardDescription>
      </CardHeader>
      <SignupForm />
    </>
  );
}
