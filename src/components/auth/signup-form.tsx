
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SignupData } from "@/lib/schemas"; // SignupData will no longer have role
import { SignupSchema } from "@/lib/schemas";
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
import { Loader2, UserPlus, Briefcase } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export function SignupForm() {
  const { signup, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const form = useForm<SignupData>({ // SignupData no longer includes role
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      // role: "public", // Default role removed from form values
    },
  });

  async function handleSignup(data: SignupData, role: UserRole) {
    try {
      await signup(data, role); // Pass role explicitly
      toast({
        title: "Signup Successful",
        description: "Your TraceWise account has been created.",
      });
    } catch (error) {
       toast({
        title: "Signup Failed",
        description: (error as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }
  
  const onSubmitPublic = (data: SignupData) => handleSignup(data, 'public');
  const onSubmitHealthcare = (data: SignupData) => handleSignup(data, 'healthcare_worker');


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
                <Input placeholder="you@example.com" {...field} className="bg-input text-sm" />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} className="bg-input text-sm"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Role Select removed */}

        <Button 
          type="button" 
          onClick={form.handleSubmit(onSubmitPublic)} 
          className="w-full !mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90" 
          disabled={authLoading}
        >
          {authLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="mr-2 h-4 w-4" />
          )}
          Create Account
        </Button>

        <Button 
          type="button" 
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
          Sign Up as Healthcare Worker
        </Button>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-secondary hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </Form>
  );
}
