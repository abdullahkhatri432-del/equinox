import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_440px] lg:py-24">
      {/* Brand panel */}
      <aside
        aria-hidden
        className="relative hidden flex-col justify-between overflow-hidden rounded-lg border border-line bg-soft p-10 lg:flex"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 70% 20%, rgba(201,162,95,0.18), transparent 65%), radial-gradient(45% 45% at 15% 90%, rgba(183,113,60,0.14), transparent 60%)",
          }}
        />
        <p className="display relative text-3xl tracking-wide">SPEEDERSMANIA</p>
        <blockquote className="relative">
          <p className="display max-w-sm text-3xl leading-snug">
            &ldquo;Time is the only true luxury —{" "}
            <em className="gold-text font-normal">wear it accordingly.</em>&rdquo;
          </p>
          <footer className="mt-6 text-xs uppercase tracking-[0.28em] text-faint">
            The SPEEDERSMANIA credo, Milano
          </footer>
        </blockquote>
        <ul className="relative space-y-2 text-sm text-muted">
          <li>Chronometer-grade instruments, built by hand</li>
          <li>Members hear about limited runs first</li>
          <li>Lifetime service on every piece</li>
        </ul>
      </aside>

      {/* Form column */}
      <div className="flex flex-col justify-center">
        <header>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{subtitle}</p>
        </header>

        <div className="mt-8">{children}</div>

        <div className="mt-6 text-sm text-muted">{footer}</div>

        <p className="mt-8 text-xs leading-relaxed text-faint">
          By continuing you agree to the house terms and privacy policy.
          Questions?{" "}
          <Link href="/contact" className="text-gold underline-offset-4 hover:underline">
            Write to the atelier
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
