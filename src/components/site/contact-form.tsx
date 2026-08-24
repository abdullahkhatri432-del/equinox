"use client";

import { useState } from "react";
import { ArrowRight, Clock, Mail, MapPin } from "lucide-react";
import type { Product } from "@/lib/products";

const FIELD =
  "w-full rounded-md border border-line bg-soft px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold";

export function ContactForm({ product }: { product?: Product }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        {product && (
          <div className="flex items-center gap-3 rounded-md border border-gold/40 bg-gold/10 px-5 py-4 text-sm">
            <span className="eyebrow">Enquiry about</span>
            <span className="font-semibold text-foreground">{product.name}</span>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs tracking-wide text-muted">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className={FIELD}
              placeholder="Ada Lovelace"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-xs tracking-wide text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={FIELD}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="interest" className="mb-2 block text-xs tracking-wide text-muted">
            I am writing about
          </label>
          <select
            id="interest"
            name="interest"
            className={FIELD}
            defaultValue={product?.category ?? "a piece"}
          >
            <option value="a piece">A specific piece</option>
            <option value="watches">The Hour — watches</option>
            <option value="sunglasses">The Light — sunglasses</option>
            <option value="bespoke">A bespoke commission</option>
            <option value="care">Care or repair</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-xs tracking-wide text-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={`${FIELD} resize-none`}
            placeholder="Tell us about the light you live in, the hour you keep…"
          />
        </div>

        {sent ? (
          <p className="rounded-md border border-gold/40 bg-gold/10 px-5 py-4 text-sm text-foreground">
            Thank you — your note has been logged with the atelier. We will
            reply within one working day.
          </p>
        ) : (
          <button
            type="submit"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide"
          >
            Send to the atelier <ArrowRight size={16} />
          </button>
        )}
      </form>

      <aside className="space-y-8">
        {[
          {
            icon: MapPin,
            title: "The atelier",
            body: "12 Avenida del Sol, Milano 20121.\nVisits by appointment, three days a week.",
          },
          {
            icon: Mail,
            title: "Correspondence",
            body: "atelier@equinox.shop\nPress: press@equinox.shop",
          },
          {
            icon: Clock,
            title: "Hours",
            body: "Tue – Sat, 10:00 – 18:00 CET.\nClosed on the equinox, by tradition.",
          },
        ].map((c) => (
          <div key={c.title} className="border-t border-line pt-6">
            <div className="flex items-center gap-3">
              <c.icon size={18} className="text-gold" />
              <h2 className="text-sm font-semibold tracking-wide">{c.title}</h2>
            </div>
            <pre className="mt-3 whitespace-pre-line font-sans text-sm leading-relaxed text-muted">
              {c.body}
            </pre>
          </div>
        ))}

        <div className="rounded-md border border-line bg-soft p-6">
          <p className="eyebrow">Bespoke</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A dial engraved with a date, a lens tinted to a latitude. If you
            can describe it, we can try to build it.
          </p>
        </div>
      </aside>
    </div>
  );
}
