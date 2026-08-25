"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Folder,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Folder },
  { href: "/admin/orders", label: "Orders", icon: TrendingUp },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-background md:flex">
        <div className="border-b border-line px-6 py-5">
          <p className="eyebrow">SPEEDERSMANIA</p>
          <p className="display mt-1 text-xl">Atelier Console</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm tracking-wide transition-colors",
                  active
                    ? "bg-gold/10 font-semibold text-gold"
                    : "text-muted hover:bg-surface hover:text-foreground"
                )}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center justify-between border-t border-line px-6 py-4">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.18em] text-faint transition-colors hover:text-gold"
          >
            ← Store
          </Link>
          <button
            type="button"
            onClick={() =>
              fetch("/api/admin/login", { method: "DELETE" }).then(() => {
                window.location.href = "/";
              })
            }
            className="text-xs uppercase tracking-[0.18em] text-faint transition-colors hover:text-gold"
          >
            Exit console
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 bg-gray-50 p-6 lg:p-8">
        {/* Mobile nav */}
        <nav
          className="mb-6 flex flex-wrap gap-2 md:hidden"
          aria-label="Admin sections"
        >
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm",
                  active
                    ? "border-gold bg-gold font-semibold text-background"
                    : "border-gray-200 text-gray-600"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <h1 className="mb-6 text-2xl font-bold text-gray-900">{title}</h1>
        {children}
      </main>
    </div>
  );
}
