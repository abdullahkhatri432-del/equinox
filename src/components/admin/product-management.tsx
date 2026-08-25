"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function ProductManagementPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | "watches" | "sunglasses">(
    "all"
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return `${p.name} ${p.tagline} ${p.materials.join(" ")}`
        .toLowerCase()
        .includes(q);
    });
  }, [query, category]);

  const marginPct = (price: number, cost?: number) =>
    cost == null ? null : Math.round(((price - cost) / price) * 100);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search catalogue…"
          aria-label="Search products"
          className="w-full max-w-xs rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gold focus:outline-none sm:w-auto"
        />
        <div className="flex gap-1 rounded-full border border-gray-200 bg-white p-1">
          {(["all", "watches", "sunglasses"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm capitalize transition-colors ${
                category === c
                  ? "bg-gold font-semibold text-background"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-gray-500" aria-live="polite">
          {visible.length} of {products.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-500">
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Sell price</th>
              <th className="px-6 py-3 font-medium">Wholesale cost</th>
              <th className="px-6 py-3 font-medium">Margin</th>
              <th className="px-6 py-3 font-medium">Badge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visible.map((p) => (
              <tr key={p.slug} className="hover:bg-gray-50">
                <td className="px-6 py-3.5 font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-3.5 capitalize text-gray-600">
                  {p.category}
                </td>
                <td className="px-6 py-3.5 text-gray-800">
                  {formatPrice(p.price)}
                </td>
                <td className="px-6 py-3.5 text-gray-600">
                  {p.costPrice != null ? formatPrice(p.costPrice) : "—"}
                </td>
                <td className="px-6 py-3.5">
                  {p.costPrice != null ? (
                    <span className="font-semibold text-emerald-600">
                      {formatPrice(p.price - p.costPrice)}{" "}
                      <span className="text-xs font-normal text-gray-400">
                        ({marginPct(p.price, p.costPrice)}%)
                      </span>
                    </span>
                  ) : (
                    <span className="text-gray-400">set cost</span>
                  )}
                </td>
                <td className="px-6 py-3.5 text-gray-500">{p.badge ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500">
        Costs are placeholders — update them to your real supplier rates in{" "}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
          src/lib/products.ts
        </code>{" "}
        until the Firebase backend takes over.
      </p>
    </section>
  );
}
