"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Lock,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import {
  cn,
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FLAT_RATE,
} from "@/lib/utils";

const FIELD =
  "w-full rounded-md border border-line bg-soft px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold";

const LABEL = "mb-2 block text-xs tracking-wide text-muted";

const STEPS = ["Shipping", "Payment"] as const;

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [orderNo] = useState(
    () => `EQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  );

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <CheckCircle2 size={52} className="text-gold" />
        <h1 className="display mt-6 text-4xl sm:text-5xl">Order confirmed</h1>
        <p className="mt-4 text-muted">
          Thank you — order{" "}
          <span className="font-semibold text-foreground">{orderNo}</span> is being
          prepared in the atelier. A confirmation is on its way to your inbox.
        </p>
        <Link
          href="/collections"
          className="btn-primary mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
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
          className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
        >
          Explore the collections <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Checkout</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">Complete your order</h1>

      {/* Step indicator */}
      <ol className="mt-8 flex items-center gap-3" aria-label="Checkout progress">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const current = step === n;
          return (
            <li key={label} className="flex items-center gap-3">
              <span
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  done && "border-gold bg-gold text-background",
                  current && "border-gold text-gold",
                  !done && !current && "border-line text-faint"
                )}
              >
                {done ? <Check size={14} /> : n}
              </span>
              <span
                className={cn(
                  "text-xs uppercase tracking-[0.18em]",
                  current ? "text-foreground" : "text-faint"
                )}
              >
                {label}
              </span>
              {n < STEPS.length && (
                <span aria-hidden className="ml-1 h-px w-8 bg-line sm:w-14" />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px]">
        {/* ------------------------------------------------ Phase 1: shipping */}
        <form
          className={cn("space-y-10", step !== 1 && "hidden")}
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <p className="rounded-md border border-line bg-soft px-4 py-3 text-xs leading-relaxed text-muted">
            All fields are required. Your details are used only to fulfil and
            insure this order.
          </p>

          <fieldset>
            <legend className="eyebrow">Shipping details</legend>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="ck-name" className={LABEL}>
                  Full name <span aria-hidden className="text-gold">*</span>
                </label>
                <input id="ck-name" name="name" required autoComplete="name" className={FIELD} placeholder="Ada Lovelace" />
              </div>
              <div>
                <label htmlFor="ck-email" className={LABEL}>
                  Email <span aria-hidden className="text-gold">*</span>
                </label>
                <input id="ck-email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="ck-phone" className={LABEL}>
                  Phone number <span aria-hidden className="text-gold">*</span>
                </label>
                <input
                  id="ck-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  pattern="[+0-9][0-9 \-()]{5,20}"
                  title="Enter a valid phone number, e.g. +39 02 1234 5678"
                  className={FIELD}
                  placeholder="+39 02 1234 5678"
                />
                <p className="mt-1.5 text-xs text-faint">
                  For delivery updates and courier contact only.
                </p>
              </div>
              <div>
                <label htmlFor="ck-country" className={LABEL}>
                  Country <span aria-hidden className="text-gold">*</span>
                </label>
                <select id="ck-country" name="country" required autoComplete="country-name" className={FIELD} defaultValue="Italy">
                  <option>Italy</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>United Arab Emirates</option>
                  <option>Japan</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="ck-address" className={LABEL}>
                  Address <span aria-hidden className="text-gold">*</span>
                </label>
                <input id="ck-address" name="address" required autoComplete="street-address" className={FIELD} placeholder="12 Avenida del Sol" />
              </div>
              <div>
                <label htmlFor="ck-city" className={LABEL}>
                  City <span aria-hidden className="text-gold">*</span>
                </label>
                <input id="ck-city" name="city" required autoComplete="address-level2" className={FIELD} placeholder="Milano" />
              </div>
              <div>
                <label htmlFor="ck-zip" className={LABEL}>
                  Postal code <span aria-hidden className="text-gold">*</span>
                </label>
                <input id="ck-zip" name="zip" required autoComplete="postal-code" className={FIELD} placeholder="20121" />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide sm:w-auto"
          >
            Continue to payment <ArrowRight size={16} />
          </button>
        </form>

        {/* ------------------------------------------------ Phase 2: payment */}
        <form
          className={cn("space-y-10", step !== 2 && "hidden")}
          onSubmit={(e) => {
            e.preventDefault();
            clear();
            setPlaced(true);
          }}
        >
          <fieldset>
            <legend className="eyebrow">Payment</legend>
            <p className="mt-3 flex items-center gap-2 text-xs text-faint">
              <Lock size={13} /> Demonstration checkout — no payment is processed.
            </p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="ck-card" className={LABEL}>
                  Card number <span aria-hidden className="text-gold">*</span>
                </label>
                <input
                  id="ck-card"
                  name="card"
                  inputMode="numeric"
                  required
                  autoComplete="cc-number"
                  pattern="[0-9 ]{12,23}"
                  title="Enter the 12–19 digit card number"
                  maxLength={23}
                  className={FIELD}
                  placeholder="4242 4242 4242 4242"
                />
              </div>
              <div>
                <label htmlFor="ck-exp" className={LABEL}>
                  Expiry <span aria-hidden className="text-gold">*</span>
                </label>
                <input
                  id="ck-exp"
                  name="expiry"
                  required
                  autoComplete="cc-exp"
                  pattern="(0[1-9]|1[0-2])\s*/\s*[0-9]{2}"
                  title="Enter expiry as MM / YY"
                  maxLength={7}
                  className={FIELD}
                  placeholder="MM / YY"
                />
              </div>
              <div>
                <label htmlFor="ck-cvc" className={LABEL}>
                  CVC <span aria-hidden className="text-gold">*</span>
                </label>
                <input
                  id="ck-cvc"
                  name="cvc"
                  inputMode="numeric"
                  required
                  autoComplete="cc-csc"
                  pattern="[0-9]{3,4}"
                  title="Enter the 3 or 4 digit security code"
                  maxLength={4}
                  className={FIELD}
                  placeholder="123"
                />
              </div>
            </div>
          </fieldset>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-sm tracking-wide text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowLeft size={15} /> Back
              </button>
              <button
                type="submit"
                className="btn-primary inline-flex flex-1 items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide sm:flex-none"
              >
                Place order — {formatPrice(total)} <ArrowRight size={16} />
              </button>
            </div>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-faint">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={13} /> Secure 256-bit encrypted checkout
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RotateCcw size={13} /> 30-day returns
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={13} /> Lifetime service warranty
              </span>
            </p>
          </div>
        </form>

        {/* ------------------------------------------------------- Summary */}
        <aside className="order-first h-fit rounded-md border border-line bg-soft p-6 lg:order-last lg:sticky lg:top-24">
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
