
import { LoginForm } from "@/components/auth/login-form";
import { CardContent, CardDescription, CardHeader, CardTitle, Card } from "@/components/ui/card";
// Removed unused imports: CheckCircle, ShieldCheck, Users, TrendingUp, Activity, Eye, Image
// Removed unused features array

export default function LoginPage() {
  return (
    <>
      <CardHeader className="text-center p-0 mb-6"> {/* Increased bottom margin for spacing */}
        <CardTitle className="text-3xl font-bold text-foreground">Welcome to TraceAI</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">
          Sign in to access your dashboard and help keep our community safe.
        </CardDescription>
      </CardHeader>

      {/* Removed Illustrations section */}
      {/* Removed Key Features section */}
      
      <LoginForm />
       <p className="mt-6 text-center text-xs text-muted-foreground">
        By signing in, you agree to our Terms & Conditions.
      </p>
    </>
  );
}
