
"use client";

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { TraceAiLogo } from '@/components/shared/trace-ai-logo'; // Import the logo

export default function HomePage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // Optional: add a slight delay for splash screen visibility
        setTimeout(() => {
            router.replace(user.role === 'healthcare_worker' ? '/admin' : '/dashboard');
        }, 500); // 0.5 second delay
      } else {
         setTimeout(() => {
            router.replace('/login');
         }, 500);
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background space-y-6">
      <TraceAiLogo className="h-24 w-auto text-primary" />
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
