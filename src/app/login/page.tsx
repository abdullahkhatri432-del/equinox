import type { Metadata } from "next";
import { AuthShell } from "@/components/site/auth-shell";
import { LoginForm, LoginFooter } from "@/components/site/login-form";

export const metadata: Metadata = {
  title: "Sign in — SPEEDERSMANIA",
  description: "Access your SPEEDERSMANIA account.",
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Members"
      title="Welcome back."
      subtitle="Sign in to track orders, keep a wish list and hear about limited runs first."
      footer={<LoginFooter />}
    >
      <LoginForm />
    </AuthShell>
  );
}
