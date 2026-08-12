import Link from "next/link";
import { collections, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { cn } from "@/lib/utils";

const VIEWS = [
  { id: "all", label: "All" },
  { id: "watches", label: "Watches" },
  { id: "sunglasses", label: "Sunglasses" },
] as const;

export default async function CollectionsPage(
  props: PageProps<"/collections">
) {
  const searchParams = await props.searchParams;
  const view = (searchParams?.view ?? "all") as "watches" | "sunglasses" | "all";
  const visible = view === "all" ? products : products.filter((p) => p.category === view);
  const collection = collections.find((c) => c.slug === view);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-12">
        <p className="eyebrow">Collections</p>
        <h1 className="display mt-3 text-5xl sm:text-6xl">
          {view === "all" ? "The full atelier" : collection?.name}
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          {view === "all"
            ? "Every piece is assembled, adjusted and signed in the Milan atelier — twelve instruments across two houses."
            : collection?.description}
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-1 rounded-full border border-line bg-soft p-1"
          role="tablist"
          aria-label="Filter products"
        >
          {VIEWS.map((v) => (
            <Link
              key={v.id}
              href={v.id === "all" ? "/collections" : `/collections?view=${v.id}`}
              role="tab"
              aria-selected={view === v.id}
              className={cn(
                "rounded-full px-5 py-2 text-sm tracking-wide transition-colors",
                view === v.id
                  ? "bg-gold font-semibold text-background"
                  : "text-muted hover:text-foreground"
              )}
            >
              {v.label}
            </Link>
          ))}
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      <p className="mt-12 text-sm text-faint">
        {visible.length} instrument{visible.length === 1 ? "" : "s"} · prices
        exclude duties and shipping
      </p>
    </div>
  );
}