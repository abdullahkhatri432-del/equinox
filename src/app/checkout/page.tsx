"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Lock, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const FIELD =
  "w-full rounded-md border border-line bg-soft px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNo] = useState(
    () => `EQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  );

  const shipping = subtotal >= 1500 || subtotal === 0 ? 0 : 45;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <CheckCircle2 size={52} className="text-gold" />
        <h1 className="display mt-6 text-4xl sm:text-5xl">Order confirmed</h1>
        <p className="mt-4 text-muted">
          Thank you — order <span className="font-semibold text-foreground">{orderNo}</span> is
          being prepared in the atelier. A confirmation is on its way to your inbox.
        </p>
        <Link
          href="/collections"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          Continue browsing <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <ShoppingBag size={44} className="text-faint" />
        <h1 className="display mt-6 text-4xl">Nothing to check out</h1>
        <p className="mt-4 text-muted">Your selection is empty.</p>
        <Link
          href="/collections"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-background"
          style={{ background: "var(--primary)" }}
        >
          Explore the collections <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="eyebrow">Checkout</p>
      <h1 className="display mt-3 text-5xl sm:text-6xl">Complete your order</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_420px]">
        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            clear();
            setPlaced(true);
          }}
        >
          <fieldset>
            <legend className="eyebrow">Shipping details</legend>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="ck-name" className="mb-2 block text-xs tracking-wide text-muted">
                  Full name
                </label>
                <input id="ck-name" name="name" required autoComplete="name" className={FIELD} placeholder="Ada Lovelace" />
              </div>
              <div>
                <label htmlFor="ck-email" className="mb-2 block text-xs tracking-wide text-muted">
                  Email
                </label>
                <input id="ck-email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="you@example.com" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="ck-address" className="mb-2 block text-xs tracking-wide text-muted">
                  Address
                </label>
                <input id="ck-address" name="address" required autoComplete="street-address" className={FIELD} placeholder="12 Avenida del Sol" />
              </div>
              <div>
                <label htmlFor="ck-city" className="mb-2 block text-xs tracking-wide text-muted">
                  City
                </label>
                <input id="ck-city" name="city" required autoComplete="address-level2" className={FIELD} placeholder="Milano" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ck-zip" className="mb-2 block text-xs tracking-wide text-muted">
                    Postal code
                  </label>
                  <input id="ck-zip" name="zip" required autoComplete="postal-code" className={FIELD} placeholder="20121" />
                </div>
                <div>
                  <label htmlFor="ck-country" className="mb-2 block text-xs tracking-wide text-muted">
                    Country
                  </label>
                  <select id="ck-country" name="country" required className={FIELD} defaultValue="Italy">
                    <option>Italy</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>United Arab Emirates</option>
                    <option>Japan</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow">Payment</legend>
            <p className="mt-3 flex items-center gap-2 text-xs text-faint">
              <Lock size={13} /> Demonstration checkout — no payment is processed.
            </p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="ck-card" className="mb-2 block text-xs tracking-wide text-muted">
                  Card number
                </label>
                <input id="ck-card" name="card" inputMode="numeric" required autoComplete="cc-number" className={FIELD} placeholder="4242 4242 4242 4242" />
              </div>
              <div>
                <label htmlFor="ck-exp" className="mb-2 block text-xs tracking-wide text-muted">
                  Expiry
                </label>
                <input id="ck-exp" name="expiry" required autoComplete="cc-exp" className={FIELD} placeholder="MM / YY" />
              </div>
              <div>
                <label htmlFor="ck-cvc" className="mb-2 block text-xs tracking-wide text-muted">
                  CVC
                </label>
                <input id="ck-cvc" name="cvc" inputMode="numeric" required autoComplete="cc-csc" className={FIELD} placeholder="123" />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-background transition-colors"
            style={{ background: "var(--primary)" }}
          >
            Place order — {formatPrice(total)} <ArrowRight size={16} />
          </button>
        </form>

        <aside className="h-fit rounded-md border border-line bg-soft p-6 lg:sticky lg:top-24">
          <h2 className="eyebrow">Order summary</h2>
          <ul className="mt-5 space-y-5">
            {items.map((item) => {
              const product = products.find((p) => p.slug === item.slug);
              return (
                <li key={item.slug} className="flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-line bg-background">
                    {product && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold tracking-wide">{item.name}</p>
                    <p className="text-xs text-faint">
                      Qty {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
            </div>
            {shipping === 0 && subtotal > 0 && (
              <p className="text-xs text-gold">Free shipping unlocked.</p>
            )}
            <div className="flex items-baseline justify-between border-t border-line pt-4">
              <span className="font-semibold text-foreground">Total</span>
              <span className="display text-2xl">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
