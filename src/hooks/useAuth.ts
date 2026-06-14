"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role as UserRole);
  };

  const isAdmin = hasRole("ADMIN");
  const isFaculty = hasRole(["FACULTY", "ADMIN"]);
  const isStudent = hasRole("STUDENT");

  const loginWithGoogle = () =>
    signIn("google", { callbackUrl: "/dashboard" });

  const loginWithCredentials = (email: string, password: string, callbackUrl = "/dashboard") =>
    signIn("credentials", { email, password, callbackUrl });

  const logout = () =>
    signOut({ callbackUrl: "/" });

  const requireAuth = (redirectTo = "/login") => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    isAdmin,
    isFaculty,
    isStudent,
    hasRole,
    loginWithGoogle,
    loginWithCredentials,
    logout,
    requireAuth,
  };
}
