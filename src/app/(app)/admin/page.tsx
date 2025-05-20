
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

  if (isLoading || (!isLoading && user?.role !== 'healthcare_worker')) {
    return (
      <div className="flex h-[calc(100vh-theme(spacing.16))] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    // container and py-2 removed to allow content to fill more space like in the image
    <div className="w-full"> 
       <div className="mb-4 px-1"> {/* Added slight padding for the title if needed */}
        {/* Title is more integrated into the new design via IndividualHeader */}
        {/* 
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Case Overview
        </h1>
        <p className="text-muted-foreground">
          Detailed view of the selected individual and related information.
        </p> 
        */}
      </div>
      <AdminDashboardContent userRole={user?.role} />
    </div>
  );
}
