import type { Metadata } from "next";
import { AuthShell } from "@/components/site/auth-shell";
import { SignupForm, SignupFooter } from "@/components/site/signup-form";

export const metadata: Metadata = {
  title: "Create your account — Speedersmania",
  description: "Join the house of Speedersmania.",
};

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Join the house"
      title="An account worth keeping."
      subtitle="Create your Speedersmania account to follow orders from atelier to doorstep and reserve limited pieces before they surface."
      footer={<SignupFooter />}
    >
      <SignupForm />
    </AuthShell>
  );
}
