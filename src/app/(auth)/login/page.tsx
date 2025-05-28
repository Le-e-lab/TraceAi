
import { LoginForm } from "@/components/auth/login-form";
import { CardContent, CardDescription, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { TraceAiLogo } from "@/components/shared/trace-ai-logo";

export default function LoginPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-6 flex flex-col items-center">
        <TraceAiLogo className="h-16 w-auto text-primary mb-4"/>
        <CardTitle className="text-3xl font-bold text-foreground">Welcome to TraceAI</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">
          Sign in to access your dashboard and help keep our community safe.
        </CardDescription>
      </CardHeader>
      
      <LoginForm />
       <p className="mt-6 text-center text-xs text-muted-foreground">
        By signing in, you agree to our Terms & Conditions.
      </p>
    </>
  );
}
