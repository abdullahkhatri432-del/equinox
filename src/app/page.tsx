import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Hourglass, Sparkles } from "lucide-react";
import { collections, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { NewsletterForm } from "@/components/site/newsletter-form";

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 72% 30%, rgba(201,162,95,0.16), transparent 65%), radial-gradient(45% 50% at 18% 85%, rgba(183,113,60,0.12), transparent 60%)",
          }}
        />
        <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 py-20">
          <p className="eyebrow animate-[fadeIn_0.8s_ease]">Maison of time &amp; light</p>
          <h1 className="display mt-6 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">
            The second never waits
            <br />
            <em className="gold-text font-normal">for the shadow.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            Precision timepieces and sun-crafted eyewear, designed in Milan and
            tuned by hand. Instruments, not accessories.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors"
              style={{ background: "var(--primary)", color: "#0b0b0d" }}
            >
              Explore the collections <ArrowRight size={16} />
            </Link>
            <Link
              href="/collections?view=watches"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm tracking-wide text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              The Hour — watches
            </Link>
          </div>

          <div className="mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {[
              { icon: Hourglass, title: "72h of reserve", body: "Fully wound in a single day" },
              { icon: Sparkles, title: "Hand-ground lenses", body: "Zeiss-class clarity" },
              { icon: Compass, title: "Traveller-ready", body: "GMT from Milano to anywhere" },
            ].map((s) => (
              <div key={s.title} className="flex items-start gap-3">
                <s.icon size={20} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="mt-1 text-sm text-faint">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Collections */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Two houses</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Choose your instrument</h2>
          </div>
          <Link
            href="/collections"
            className="hidden shrink-0 items-center gap-2 text-sm text-muted transition-colors hover:text-gold sm:inline-flex"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {collections.map((col) => {
            const sample = products.find((p) => p.category === col.slug)!;
            return (
              <Link
                key={col.slug}
                href={`/collections?view=${col.slug}`}
                className="group relative overflow-hidden rounded-md border border-line bg-soft transition-colors hover:border-gold"
              >
                <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-sm sm:h-44 sm:w-64">
                    <Image
                      src={sample.image}
                      alt={sample.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-faint">{col.index} / {col.slug}</p>
                    <h3 className="display mt-2 text-3xl">{col.name}</h3>
                    <p className="mt-2 text-sm italic text-gold">{col.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {col.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------- Featured */}
      <section className="border-y border-line bg-soft/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">This season</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">Featured instruments</h2>
            </div>
            <Link
              href="/collections"
              className="hidden shrink-0 items-center gap-2 text-sm text-muted transition-colors hover:text-gold sm:inline-flex"
            >
              Browse all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Credo split */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The house rules</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              We judge time and light the same way.
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                n: "01",
                t: "The second is honest",
                b: "Every watch leaves the atelier regulated to ±2 seconds a day. No claims we can't measure.",
              },
              {
                n: "02",
                t: "Light builds, never burns",
                b: "Lenses are ground to filter brilliance without turning the world flat — colour, depth and shadow stay.",
              },
              {
                n: "03",
                t: "Repair over replace",
                b: "A calibre or a hinge is made to be serviced for decades. We keep parts for every piece we've ever built.",
              },
            ].map((r) => (
              <div key={r.n} className="flex gap-5 border-t border-line pt-6">
                <span className="display text-2xl text-gold">{r.n}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-wide">{r.t}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{r.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Newsletter CTA */}
      <section className="border-t border-line bg-soft">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="eyebrow">Newsletter</p>
          <h2 className="display mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl">
            A letter, roughly once per equinox.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted">
            New calibres, lens drops and atelier stories. No more than four times
            a year, never shared.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}