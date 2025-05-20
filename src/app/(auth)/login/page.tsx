
import { LoginForm } from "@/components/auth/login-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Welcome Back!</CardTitle>
        <CardDescription>
          Sign in to your TraceWise account to continue.
        </CardDescription>
      </CardHeader>
      <LoginForm />
    </>
  );
}
