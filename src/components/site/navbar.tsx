"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/collections?view=watches", label: "Watches" },
  { href: "/collections?view=sunglasses", label: "Sunglasses" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="display text-2xl tracking-wide text-foreground">
            Equinox
          </span>
          <span className="eyebrow hidden sm:inline">Time &amp; Light</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition-colors hover:text-gold",
                isActive(link.href) ? "text-gold" : "text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openCart}
            className="relative text-foreground transition-colors hover:text-gold"
            aria-label={`Shopping cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBag size={21} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-background">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-background md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-3 text-sm tracking-wide",
                    isActive(link.href) ? "text-gold" : "text-muted"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
