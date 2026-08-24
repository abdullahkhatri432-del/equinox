"use client";

import { useEffect, useMemo, useState } from "react";
import { collections, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "watches", label: "Watches" },
  { id: "sunglasses", label: "Sunglasses" },
] as const;

const PRICE_RANGES = [
  { id: "any", label: "Any price", test: () => true },
  {
    id: "under-500",
    label: "Under €500",
    test: (price: number) => price < 500,
  },
  {
    id: "mid",
    label: "€500 – €1,500",
    test: (price: number) => price >= 500 && price < 1500,
  },
  {
    id: "over-1500",
    label: "Over €1,500",
    test: (price: number) => price >= 1500,
  },
] as const;

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];
type RangeId = (typeof PRICE_RANGES)[number]["id"];
type SortId = (typeof SORTS)[number]["id"];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm tracking-wide transition-colors",
        active
          ? "border-gold bg-gold font-semibold text-background"
          : "border-line bg-transparent text-muted hover:border-faint hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function ProductFilters({ initialView }: { initialView: string }) {
  const validInitial = CATEGORIES.some((c) => c.id === initialView)
    ? (initialView as CategoryId)
    : "all";
  const [category, setCategory] = useState<CategoryId>(validInitial);
  const [range, setRange] = useState<RangeId>("any");
  const [sort, setSort] = useState<SortId>("featured");

  // Keep the URL in sync so filtered views can be shared/bookmarked
  useEffect(() => {
    const url = new URL(window.location.href);
    if (category === "all") {
      url.searchParams.delete("view");
    } else {
      url.searchParams.set("view", category);
    }
    window.history.replaceState(null, "", url);
  }, [category]);

  const visible = useMemo(() => {
    const rangeDef = PRICE_RANGES.find((r) => r.id === range)!;
    const filtered = products.filter(
      (p) =>
        (category === "all" || p.category === category) && rangeDef.test(p.price)
    );
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, range, sort]);

  const collection = collections.find((c) => c.slug === category);
  const isFiltered = category !== "all" || range !== "any" || sort !== "featured";

  return (
    <div>
      <header className="mb-10">
        <p className="eyebrow">Collections</p>
        <h1 className="display mt-3 text-5xl sm:text-6xl">
          {collection ? collection.name : "The full atelier"}
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          {collection
            ? collection.description
            : "Every piece is assembled, adjusted and signed in the Milan atelier — twelve instruments across two houses."}
        </p>

        {/* Category */}
        <div
          className="mt-8 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((c) => (
            <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              {c.label}
            </Chip>
          ))}
        </div>

        {/* Price + sort */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by price">
            <span className="mr-1 text-xs uppercase tracking-[0.2em] text-faint">Price</span>
            {PRICE_RANGES.map((r) => (
              <Chip key={r.id} active={range === r.id} onClick={() => setRange(r.id)}>
                {r.label}
              </Chip>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-xs uppercase tracking-[0.2em] text-faint"
            >
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="rounded-full border border-line bg-soft px-4 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-faint" aria-live="polite">
          {visible.length} instrument{visible.length === 1 ? "" : "s"}
          {isFiltered && (
            <>
              {" · "}
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setRange("any");
                  setSort("featured");
                }}
                className="text-gold underline-offset-4 transition-colors hover:text-goldbright hover:underline"
              >
                Clear filters
              </button>
            </>
          )}
        </p>
      </header>

      {visible.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-md border border-dashed border-line py-24 text-center">
          <p className="display text-3xl">Nothing in this light.</p>
          <p className="max-w-sm text-sm text-muted">
            No instruments match that combination — try widening the price range.
          </p>
          <button
            type="button"
            onClick={() => {
              setRange("any");
              setCategory("all");
            }}
            className="btn-primary mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            Show everything
          </button>
        </div>
      )}

      <p className="mt-12 text-sm text-faint">
        Prices exclude duties and shipping
      </p>
    </div>
  );
}
