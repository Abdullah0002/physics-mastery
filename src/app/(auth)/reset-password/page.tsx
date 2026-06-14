import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password — AbdOfPhysics",
};

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Reset your password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Password reset form arriving in Phase 2
      </p>
    </div>
  );
}
