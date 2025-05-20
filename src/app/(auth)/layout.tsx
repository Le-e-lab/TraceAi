
import { ActivitySquare } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center space-x-2 text-primary">
        <ActivitySquare size={40} />
        <h1 className="text-4xl font-bold">TraceWise</h1>
      </div>
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg sm:p-8">
        {children}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Enhancing Contact Tracing with AI
      </p>
    </div>
  );
}
