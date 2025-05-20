
"use client";

import type { LoginData, SignupData } from '@/lib/schemas';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'public' | 'healthcare_worker';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginData, role: UserRole) => Promise<void>;
  signup: (details: SignupData, role: UserRole) => Promise<void>; // Updated signature
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'traceWiseUser';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginData, role: UserRole) => {
    setIsLoading(true);
    
    if (role === 'healthcare_worker' && !credentials.email.endsWith('@traceworker.com')) {
      setIsLoading(false);
      throw new Error("Healthcare worker email must end with @traceworker.com");
    }

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const loggedInUser: User = { id: Date.now().toString(), email: credentials.email, role };
    setUser(loggedInUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
    setIsLoading(false);
    router.push(loggedInUser.role === 'healthcare_worker' ? '/admin' : '/dashboard');
  };

  // Updated signup to accept role as a parameter
  const signup = async (details: SignupData, role: UserRole) => {
    setIsLoading(true);

    if (role === 'healthcare_worker' && !details.email.endsWith('@traceworker.com')) {
      setIsLoading(false);
      throw new Error("Healthcare worker email must end with @traceworker.com for signup.");
    }

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // 'role' now comes from the parameter, not details.role
    const newUser: User = { id: Date.now().toString(), email: details.email, role: role };
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    router.push(newUser.role === 'healthcare_worker' ? '/admin' : '/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
