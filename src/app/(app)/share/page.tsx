
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";

export default function ShareAppPage() {
  return (
    <div className="container mx-auto py-2">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Share2 className="h-7 w-7 text-primary" />
            Share TraceWise
          </CardTitle>
          <CardDescription className="text-sm">
            Help us grow the community and enhance safety for everyone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Thank you for your interest in sharing TraceWise! 
          </p>
          <div className="p-4 border border-dashed rounded-lg text-center bg-muted/50">
            <p className="text-sm text-foreground">
              Sharing functionality (like a unique link or social media buttons) will be implemented here soon. 
              For now, you can encourage others to visit our website or search for TraceWise in their app store (once available).
            </p>
          </div>
          <p className="text-xs text-muted-foreground pt-4">
            Your support in spreading the word is greatly appreciated!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
