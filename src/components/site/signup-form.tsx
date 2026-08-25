"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const FIELD =
  "w-full rounded-md border border-line bg-soft px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold";
const LABEL = "mb-2 block text-xs tracking-wide text-muted";

export function SignupForm() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Tell us your name — at least 2 characters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Choose a password of at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      await signUp(name.trim(), email.trim(), password);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not create your account. Try again."
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
        <label htmlFor="signup-name" className={LABEL}>
          Full name
        </label>
        <input
          id="signup-name"
          type="text"
          required
          autoComplete="name"
          className={FIELD}
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="signup-email" className={LABEL}>
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          required
          autoComplete="email"
          className={FIELD}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="signup-password" className={LABEL}>
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={FIELD}
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="signup-confirm" className={LABEL}>
            Confirm password
          </label>
          <input
            id="signup-confirm"
            type="password"
            required
            autoComplete="new-password"
            className={FIELD}
            placeholder="Repeat it"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-70"
      >
        {busy ? "Creating your account…" : "Create account"}{" "}
        {!busy && <ArrowRight size={16} />}
      </button>

      <p className="text-xs leading-relaxed text-faint">
        Demo note: accounts are stored locally in your browser until the Firebase
        configuration goes live.
      </p>
    </form>
  );
}

export function SignupFooter() {
  return (
    <>
      Already with the house?{" "}
      <Link href="/login" className="text-gold underline-offset-4 hover:underline">
        Sign in instead
      </Link>
    </>
  );
}
