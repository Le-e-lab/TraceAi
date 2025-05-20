
"use client";

import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== 'healthcare_worker') {
      router.replace('/dashboard'); // Or an unauthorized page
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== 'healthcare_worker') {
    return (
      <div className="flex h-[calc(100vh-theme(spacing.16))] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-2">
       <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time monitoring and insights for health authorities.
        </p>
      </div>
      <AdminDashboardContent />
    </div>
  );
}
