
import { TraceAiLogo } from "@/components/shared/trace-ai-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 overflow-hidden">
      {/* Optional: Decorative shapes or elements for the background */}
      <div className="absolute -bottom-1/4 left-0 w-full h-1/2 bg-primary/5 rounded-t-full opacity-50 transform scale-x-150"></div>
      
      {/* The main branding block (Logo, "TraceAI" H1, tagline) has been removed from here. */}
      {/* The logo and relevant title will now be part of the child page's CardHeader. */}

      <div className="z-10 w-full max-w-md p-6 sm:p-8">
        {children}
      </div>
      <p className="z-10 mt-8 text-center text-sm text-muted-foreground/80">
        Enhancing Community Safety with AI
      </p>
    </div>
  );
}

