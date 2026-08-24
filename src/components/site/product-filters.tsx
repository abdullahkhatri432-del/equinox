"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { collections, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All instruments" },
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

function FilterOption({
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
      className="group flex items-center gap-2 py-1.5 text-left text-sm tracking-wide"
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-3 shrink-0 transition-colors",
          active ? "bg-gold" : "bg-transparent group-hover:bg-faint"
        )}
      />
      <span
        className={cn(
          "transition-colors",
          active
            ? "font-semibold text-gold"
            : "text-muted group-hover:text-foreground"
        )}
      >
        {children}
      </span>
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
  const [query, setQuery] = useState("");

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
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!rangeDef.test(p.price)) return false;
      if (q) {
        const haystack =
          `${p.name} ${p.tagline} ${p.category} ${p.badge ?? ""} ${p.materials.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, range, sort, query]);

  const collection = collections.find((c) => c.slug === category);
  const isFiltered =
    category !== "all" || range !== "any" || sort !== "featured" || query.trim() !== "";

  const clearAll = () => {
    setCategory("all");
    setRange("any");
    setSort("featured");
    setQuery("");
  };

  return (
    <div>
      <header className="mb-8">
        <p className="eyebrow">Collections</p>
        <h1 className="display mt-3 text-5xl sm:text-6xl">
          {collection ? collection.name : "The full atelier"}
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          {collection
            ? collection.description
            : "Every piece is assembled, adjusted and signed in the Milan atelier — twelve instruments across two houses."}
        </p>
      </header>

      {/* Search */}
      <div className="relative max-w-xl">
        <label htmlFor="product-search" className="sr-only">
          Search instruments
        </label>
        <Search
          size={16}
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
        />
        <input
          id="product-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, material or trait…"
          className="w-full rounded-full border border-line bg-soft py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-faint transition-colors hover:text-foreground"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[210px_1fr]">
        {/* Sidebar */}
        <aside className="self-start lg:sticky lg:top-24">
          <nav aria-label="Filters">
            <div>
              <p className="eyebrow">Category</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 lg:flex-col">
                {CATEGORIES.map((c) => (
                  <FilterOption
                    key={c.id}
                    active={category === c.id}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.label}
                  </FilterOption>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="eyebrow">Price</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 lg:flex-col">
                {PRICE_RANGES.map((r) => (
                  <FilterOption
                    key={r.id}
                    active={range === r.id}
                    onClick={() => setRange(r.id)}
                  >
                    {r.label}
                  </FilterOption>
                ))}
              </div>
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={clearAll}
                className="mt-7 text-xs uppercase tracking-[0.2em] text-faint underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                Clear all filters
              </button>
            )}
          </nav>
        </aside>

        {/* Results */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-faint" aria-live="polite">
              {visible.length} instrument{visible.length === 1 ? "" : "s"}
              {query.trim() && <> matching &ldquo;{query.trim()}&rdquo;</>}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs uppercase tracking-[0.2em] text-faint">
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

          {visible.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-md border border-dashed border-line py-24 text-center">
              <p className="display text-3xl">Nothing in this light.</p>
              <p className="max-w-sm text-sm text-muted">
                No instruments match that combination — try another word or widen
                the filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="btn-primary mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                Show everything
              </button>
            </div>
          )}

          <p className="mt-12 text-sm text-faint">Prices exclude duties and shipping</p>
        </section>
      </div>
    </div>
  );
}
