"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, Truck, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections?view=watches", label: "Watches" },
  { href: "/collections?view=sunglasses", label: "Sunglasses" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();
  const { user, signOut } = useAuth();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Announcement bar — scrolls away with the page */}
      <div className="flex items-center justify-center gap-2 px-6 py-2 text-center text-xs tracking-wide text-goldbright">
        <Truck size={13} aria-hidden />
        <span>
          Complimentary insured shipping over €1,500 &middot; 30-day returns
        </span>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
          scrolled
            ? "border-line shadow-[0_12px_32px_-20px_rgba(0,0,0,0.9)]"
            : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="display text-2xl tracking-wide text-foreground">
              Speedersmania
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

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold text-sm font-semibold text-gold"
                  title={user.email}
                  aria-label={`Signed in as ${user.name}`}
                >
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  className="hidden text-xs uppercase tracking-[0.18em] text-faint transition-colors hover:text-gold sm:block"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-gold hover:text-gold"
                aria-label="Sign in to your account"
              >
                <User size={18} />
              </Link>
            )}
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-gold hover:text-gold"
              aria-label={`Shopping cart, ${count} item${count === 1 ? "" : "s"}`}
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-background">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-gold md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <nav
          className={cn(
            "overflow-hidden border-t border-line bg-background transition-[max-height] duration-300 ease-out md:hidden",
            open ? "max-h-96" : "max-h-0 border-t-0"
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
    </>
  );
}
