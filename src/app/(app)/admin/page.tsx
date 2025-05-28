
"use client";

import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search params
  const activeTab = searchParams.get("tab") || "overview"; // Default to 'overview'

  useEffect(() => {
    if (!isLoading && user?.role !== 'healthcare_worker') {
      router.replace('/dashboard'); 
    }
  }, [user, isLoading, router]);

  if (isLoading || (!isLoading && user?.role !== 'healthcare_worker')) {
    return (
      <div className="flex h-[calc(100vh-theme(spacing.16))] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full"> 
       <div className="mb-4 px-1">
      </div>
      <AdminDashboardContent userRole={user?.role} activeTab={activeTab} />
    </div>
  );
}
