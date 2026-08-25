"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const FIELD =
  "w-full rounded-md border border-line bg-soft px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold";
const LABEL = "mb-2 block text-xs tracking-wide text-muted";

export function LoginForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Your password is at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      await signIn(email.trim(), password);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not sign you in. Try again."
      );
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <p
          role="alert"
          className="rounded-md border border-wine/50 bg-wine/10 px-4 py-3 text-sm text-foreground"
        >
          {error}
        </p>
      )}

      <div>
        <label htmlFor="login-email" className={LABEL}>
          Email
        </label>
        <input
          id="login-email"
          type="email"
          required
          autoComplete="email"
          className={FIELD}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="login-password" className={LABEL}>
          Password
        </label>
        <input
          id="login-password"
          type="password"
          required
          autoComplete="current-password"
          className={FIELD}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-70"
      >
        {busy ? "Signing in…" : "Sign in"} {!busy && <ArrowRight size={16} />}
      </button>

      <p className="text-xs leading-relaxed text-faint">
        Demo note: accounts are stored locally in your browser until the Firebase
        configuration goes live.
      </p>
    </form>
  );
}

export function LoginFooter() {
  return (
    <>
      New to the house?{" "}
      <Link href="/signup" className="text-gold underline-offset-4 hover:underline">
        Create an account
      </Link>
    </>
  );
}
