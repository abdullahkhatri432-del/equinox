"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function AdminAccessPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setError(true);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <div className="rounded-lg border border-line bg-soft p-8">
        <Lock size={28} className="text-gold" />
        <h1 className="display mt-4 text-3xl">Atelier console</h1>
        <p className="mt-2 text-sm text-muted">
          Enter the admin passcode to continue.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {error && (
            <p role="alert" className="rounded-md border border-wine/50 bg-wine/10 px-4 py-3 text-sm">
              Galat passcode — try again.
            </p>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passcode"
            required
            autoFocus
            aria-label="Admin passcode"
            className="w-full rounded-md border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full rounded-full py-3 text-sm font-semibold disabled:opacity-70"
          >
            {busy ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}
