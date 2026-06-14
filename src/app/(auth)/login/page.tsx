import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to ${siteConfig.name} to access your personalized learning dashboard.`,
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue your Physics journey
        </p>
      </div>

      <LoginForm
        callbackUrl={searchParams.callbackUrl}
        error={searchParams.error}
      />

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Create one free
        </Link>
      </p>
    </div>
  );
}
