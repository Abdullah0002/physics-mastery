import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email — AbdOfPhysics",
};

export default function VerifyEmailPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a verification link to your email address. Click it to activate your account.
        </p>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Email verification flow arriving in Phase 2
      </p>
    </div>
  );
}
