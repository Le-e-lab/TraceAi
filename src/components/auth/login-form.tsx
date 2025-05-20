
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LoginData } from "@/lib/schemas";
import { LoginSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth, type UserRole } from "@/contexts/auth-context";
import { Loader2, LogIn, Briefcase } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const { login, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: LoginData, role: UserRole) {
    try {
      await login(data, role);
      toast({
        title: "Login Successful",
        description: `Welcome back to TraceWise!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: (error as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  const onSubmitPublic = (data: LoginData) => handleLogin(data, 'public');
  const onSubmitHealthcare = (data: LoginData) => handleLogin(data, 'healthcare_worker');

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Email Address</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} className="bg-input text-sm"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} className="bg-input text-sm"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Role selection removed */}

        <Button 
          type="button" // Change to button to prevent default form submission
          onClick={form.handleSubmit(onSubmitPublic)} 
          className="w-full !mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90" 
          disabled={authLoading}
        >
          {authLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="mr-2 h-4 w-4" />
          )}
          Login to TraceWise
        </Button>

        <Button 
          type="button" // Change to button
          onClick={form.handleSubmit(onSubmitHealthcare)}
          variant="outline" 
          className="w-full" 
          disabled={authLoading}
        >
          {authLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Briefcase className="mr-2 h-4 w-4" />
          )}
          Healthcare Worker Sign In
        </Button>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-secondary hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </Form>
  );
}
