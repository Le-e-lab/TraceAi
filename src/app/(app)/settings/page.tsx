
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-2 space-y-6">
      <Card className="shadow-lg border-yellow-500/50 bg-yellow-500/10">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
            <AlertTriangle className="h-7 w-7" />
            Page Deprecated
          </CardTitle>
          <CardDescription className="text-sm text-yellow-600 dark:text-yellow-500">
            This settings page has been replaced by the new Profile page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-yellow-700 dark:text-yellow-400">
            Please visit your <Link href="/profile" className="font-semibold underline hover:text-yellow-500 dark:hover:text-yellow-300">Profile page</Link> to manage your account and application settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
