import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { AddToCart } from "@/components/site/add-to-cart";
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product ? `${product.name} — Equinox` : "Equinox",
    description: product?.tagline ?? "Equinox — time & light.",
  };
}

export default async function ProductPage(
  props: PageProps<"/products/[slug]">
) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/collections"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
      >
        <ArrowLeft size={15} /> Back to collections
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* Visual */}
        <div
          className="relative flex aspect-square w-full max-h-[520px] items-center justify-center overflow-hidden rounded-md border border-line bg-soft p-6"
          style={{
            background:
              "radial-gradient(70% 70% at 50% 40%, rgba(201,162,95,0.12), transparent 70%)",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.badge && (
            <span className="eyebrow absolute left-6 top-6 rounded-full border border-line bg-background/80 px-3 py-1.5 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="eyebrow">{product.category}</p>
          <h1 className="display mt-3 text-5xl sm:text-6xl">{product.name}</h1>
          <p className="mt-4 text-lg italic text-gold">{product.tagline}</p>

          <p className="mt-8 text-lg font-semibold text-foreground">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            {product.description}
          </p>

          <h2 className="eyebrow mt-10">Specification</h2>
          <ul className="mt-4 space-y-3">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-muted">
                <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                {f}
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-10">Materials</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.materials.map((m) => (
              <span
                key={m}
                className="rounded-full border border-line px-4 py-1.5 text-xs tracking-wide text-muted"
              >
                {m}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <AddToCart product={product} />
            <Link
              href={`/contact?product=${product.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm tracking-wide text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Request a private viewing <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-6 space-y-3 rounded-md border border-line bg-soft p-5 text-sm">
            <p className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="relative flex h-2 w-2"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>
                <span className="font-semibold text-foreground">In the atelier</span>{" "}
                <span className="text-muted">— ships within 48 hours</span>
              </span>
            </p>
            <p className="flex items-center gap-2.5 text-muted">
              <Truck size={15} className="shrink-0 text-gold" />
              {product.price >= FREE_SHIPPING_THRESHOLD
                ? "Complimentary insured shipping on this piece"
                : `Insured shipping ${formatPrice(SHIPPING_FLAT_RATE)}, complimentary over ${formatPrice(FREE_SHIPPING_THRESHOLD)}`}
            </p>
            <p className="flex items-center gap-2.5 text-muted">
              <RotateCcw size={15} className="shrink-0 text-gold" />
              30-day returns, collection from your door
            </p>
            <p className="flex items-center gap-2.5 text-muted">
              <ShieldCheck size={15} className="shrink-0 text-gold" />
              Lifetime service warranty &amp; certificate of origin
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-24">
        <div className="mb-8">
          <p className="eyebrow">Continue exploring</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            More {product.category}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}