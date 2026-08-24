"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, Truck, X } from "lucide-react";
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

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center justify-center gap-2 bg-gold/10 px-6 py-2 text-center text-xs tracking-wide text-goldbright">
        <Truck size={13} aria-hidden />
        <span>
          Complimentary insured shipping over €1,500 &middot; 30-day returns
        </span>
      </div>

      <div className="border-b border-line bg-background/80 backdrop-blur-md">
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
      </div>

      <nav
        className={cn(
          "overflow-hidden border-b border-line bg-background transition-[max-height] duration-300 ease-out md:hidden",
          open ? "max-h-96" : "max-h-0 border-b-0"
        )}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <ul className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
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
    </header>
  );
}
