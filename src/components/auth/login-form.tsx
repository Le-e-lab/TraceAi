
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth, type UserRole } from "@/contexts/auth-context";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const { login, isLoading: authLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('public');
  const { toast } = useToast();

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginData) {
    try {
      await login(data, selectedRole);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormItem className="pt-2">
          <FormLabel className="text-xs">Select Your Role</FormLabel>
          <RadioGroup
            onValueChange={(value) => setSelectedRole(value as UserRole)}
            defaultValue={selectedRole}
            className="flex space-x-4 pt-1"
          >
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <RadioGroupItem value="public" id="role-public" />
              </FormControl>
              <FormLabel htmlFor="role-public" className="font-normal text-xs">Public User</FormLabel>
            </FormItem>
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <RadioGroupItem value="healthcare_worker" id="role-healthcare" />
              </FormControl>
              <FormLabel htmlFor="role-healthcare" className="font-normal text-xs">Healthcare Worker</FormLabel>
            </FormItem>
          </RadioGroup>
        </FormItem>

        <Button type="submit" className="w-full !mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={authLoading}>
          {authLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="mr-2 h-4 w-4" />
          )}
          Login to TraceWise
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-secondary hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </Form>
  );
}
