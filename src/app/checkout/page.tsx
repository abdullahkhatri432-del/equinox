"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { saveOrder } from "@/lib/store";
import { cartOrderLink } from "@/lib/whatsapp";
import { cn, formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE } from "@/lib/utils";

const FIELD =
  "w-full rounded-md border border-line bg-soft px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold";

const LABEL = "mb-2 block text-xs tracking-wide text-muted";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [waLink, setWaLink] = useState<string | null>(null);

  const shippingCost =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shippingCost;

  if (items.length === 0 && !placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <ShoppingBag size={44} className="text-faint" />
        <h1 className="display mt-6 text-4xl">Your selection is empty</h1>
        <p className="mt-4 text-muted">Add an instrument to get started.</p>
        <Link
          href="/collections"
          className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
        >
          Explore the collections <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <CheckCircle2 size={52} className="text-[#25d366]" />
        <h1 className="display mt-6 text-4xl sm:text-5xl">Almost there</h1>
        <p className="mt-4 text-muted">
          WhatsApp should have opened with your order. Just hit{" "}
          <span className="font-semibold text-foreground">send</span> and we
          confirm your delivery right away.
        </p>
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
          >
            Open WhatsApp again <ArrowRight size={16} />
          </a>
        )}
        <Link
          href="/collections"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          Continue browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Order via WhatsApp</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        Your details, then straight to chat
      </h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px]">
        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            const customer = Object.fromEntries(
              new FormData(e.currentTarget)
            ) as Record<string, string>;
            const link = cartOrderLink(items, total, customer);
            saveOrder({
              customer: {
                name: customer.name ?? "",
                email: customer.email ?? "",
                phone: customer.phone ?? "",
                address: customer.address ?? "",
                city: customer.city ?? "",
                zip: customer.zip ?? "",
                country: customer.country ?? "",
              },
              items: items.map((i) => ({
                slug: i.slug,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                costPrice: products.find((p) => p.slug === i.slug)?.costPrice,
              })),
              subtotal,
              shipping: shippingCost,
              total,
            });
            setWaLink(link);
            clear();
            setPlaced(true);
            window.open(link, "_blank", "noopener,noreferrer");
          }}
        >
          <fieldset>
            <legend className="eyebrow">Delivery details</legend>
            <p className="mt-3 flex items-center gap-2 text-xs text-faint">
              <Lock size={13} /> All fields are required — they pre-fill your
              WhatsApp order.
            </p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="ck-name" className={LABEL}>
                  Full name <span aria-hidden className="text-gold">*</span>
                </label>
                <input id="ck-name" name="name" required autoComplete="name" className={FIELD} placeholder="Ada Lovelace" />
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
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="ck-email" className={LABEL}>
                  Email <span aria-hidden className="text-gold">*</span>
                </label>
                <input id="ck-email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="you@example.com" />
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
              <div className="sm:col-span-2">
                <label htmlFor="ck-country" className={LABEL}>
                  Country <span aria-hidden className="text-gold">*</span>
                </label>
                <select id="ck-country" name="country" required autoComplete="country-name" className={FIELD} defaultValue="Italy">
                  <option>Italy</option>
                  <option>India</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>United Arab Emirates</option>
                </select>
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn-whatsapp inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide sm:w-auto"
          >
            Send order on WhatsApp — {formatPrice(total)} <ArrowRight size={16} />
          </button>

          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-faint">
            <span className="inline-flex items-center gap-1.5">
              <Lock size={13} /> Details used only for this order
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RotateCcw size={13} /> Easy returns in chat
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={13} /> Insured delivery
            </span>
          </p>
        </form>

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

          <div className={cn("mt-6 space-y-2 border-t border-line pt-5 text-sm")}>
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span>
                {shippingCost === 0 ? "Confirmed in chat" : `~${formatPrice(shippingCost)}`}
              </span>
            </div>
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
