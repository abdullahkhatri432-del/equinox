import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { getCatalogue } from "@/lib/catalogue";
import { ProductCard } from "@/components/site/product-card";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { TrustStrip } from "@/components/site/trust-strip";
import { Testimonials } from "@/components/site/testimonials";

export const revalidate = 30;

export default async function HomePage() {
  const catalogue = await getCatalogue();
  const featured = catalogue.filter((p) => p.featured).slice(0, 6);
  const hero = catalogue.find((p) => p.slug === "meridian-38") ?? catalogue[0];

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
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:min-h-[78vh] lg:py-24">
          <div>
            <p className="eyebrow animate-[fadeIn_0.8s_ease]">Maison of time &amp; light</p>
            <h1 className="display mt-6 max-w-xl text-5xl sm:text-6xl lg:text-7xl">
              The second never waits
              <br />
              <em className="gold-text font-normal">for the shadow.</em>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
              Precision timepieces and sun-crafted eyewear, designed in Milan and
              tuned by hand. Instruments, not accessories.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/collections"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide"
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

            <TrustStrip className="mt-14 border-t border-line pt-8" />
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 40%, rgba(201,162,95,0.25), transparent 70%)",
              }}
            />
            <Link
              href={`/products/${hero.slug}`}
              className="group relative block overflow-hidden rounded-lg border border-line bg-soft shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] transition-colors hover:border-gold"
            >
              <div className="relative aspect-square">
                <Image
                  src={hero.image}
                  alt={hero.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent px-6 pb-5 pt-16">
                <div>
                  <p className="eyebrow">{hero.badge}</p>
                  <p className="mt-1 text-sm font-semibold tracking-wide text-white">
                    {hero.name}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-background/85 px-4 py-2 text-sm font-semibold text-gold backdrop-blur-sm transition-colors group-hover:bg-gold group-hover:text-background">
                  {formatPrice(hero.price)}
                </span>
              </div>
            </Link>
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
            const sample = catalogue.find((p) => p.category === col.slug)!;
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

      {/* ------------------------------------------------- Social proof */}
      <Testimonials />

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