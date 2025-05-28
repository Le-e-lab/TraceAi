
import { TraceAiLogo } from "@/components/shared/trace-ai-logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 overflow-hidden">
      {/* Optional: Decorative shapes or elements for the background */}
      <div className="absolute -bottom-1/4 left-0 w-full h-1/2 bg-primary/5 rounded-t-full opacity-50 transform scale-x-150"></div>
      
      <div className="z-10 mb-8 flex flex-col items-center space-y-2">
        <TraceAiLogo className="h-20 w-auto text-primary mb-2"/>
        <h1 className="text-5xl font-bold tracking-tight text-primary">TraceAI</h1>
        <p className="text-lg text-center text-muted-foreground">
          Stay Informed, Stay Safe.
        </p>
      </div>
      <div className="z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
        {children}
      </div>
      <p className="z-10 mt-8 text-center text-sm text-muted-foreground/80">
        Enhancing Community Safety with AI
      </p>
    </div>
  );
}
