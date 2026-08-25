"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { cartOrderLink } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import {
  cn,
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FLAT_RATE,
} from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, remove, subtotal } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-background shadow-2xl">
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-gold" />
            <h2 className="display text-xl">Your selection</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="text-muted transition-colors hover:text-foreground"
          >
            <X size={20} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={40} className="text-faint" />
            <p className="text-sm text-muted">Your selection is empty.</p>
            <Link
              href="/collections"
              onClick={closeCart}
              className="rounded-full border border-line px-6 py-2.5 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Browse the collections
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              {items.map((item) => {
                const product = products.find((p) => p.slug === item.slug);
                return (
                  <li key={item.slug} className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-line bg-soft">
                      {product && (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-semibold tracking-wide hover:text-gold"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-0.5 text-xs text-faint">{item.category}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(item.slug)}
                          aria-label={`Remove ${item.name}`}
                          className="text-faint transition-colors hover:text-foreground"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.slug, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="p-2 text-muted transition-colors hover:text-gold"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.slug, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="p-2 text-muted transition-colors hover:text-gold"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-line px-6 py-6">
              <div className="mb-5">
                <p
                  className="text-xs leading-relaxed"
                  aria-live="polite"
                >
                  {remaining > 0 ? (
                    <>
                      You&rsquo;re{" "}
                      <span className="font-semibold text-goldbright">
                        {formatPrice(remaining)}
                      </span>{" "}
                      away from complimentary shipping.
                    </>
                  ) : (
                    <span className="text-gold">Complimentary shipping unlocked.</span>
                  )}
                </p>
                <div
                  className="mt-2 h-1 overflow-hidden rounded-full bg-surface"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  aria-label="Progress toward free shipping"
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-[width] duration-500",
                      remaining > 0 ? "bg-copper" : "bg-gold"
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="display text-2xl">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-faint">
                Duties calculated at checkout &middot;{" "}
                {remaining > 0
                  ? `otherwise ${formatPrice(SHIPPING_FLAT_RATE)} insured shipping`
                  : "insured shipping included"}
              </p>
              <a
                href={cartOrderLink(items, subtotal)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeCart}
                className="btn-whatsapp mt-5 flex items-center justify-center gap-2 rounded-full py-3.5 text-center text-sm font-semibold tracking-wide"
              >
                <WhatsAppGlyph className="h-4.5 w-4.5" /> Order on WhatsApp
              </a>
              <p className="mt-2 text-center text-xs text-faint">
                Your order list opens in WhatsApp — we confirm delivery there.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
