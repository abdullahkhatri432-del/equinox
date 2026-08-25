"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import type { ProductCategory } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import {
  isFirebaseConfigured,
} from "@/lib/firebase";
import {
  listRemoteProducts,
  saveRemoteProduct,
  removeRemoteProduct,
  type RemoteProduct,
} from "@/lib/catalogue";

const FIELD =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none";
const LABEL = "mb-1.5 block text-xs font-medium text-gray-600";

export function ProductManagementPage() {
  const configured = isFirebaseConfigured();
  const [remote, setRemote] = useState<RemoteProduct[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const refresh = useCallback(() => {
    if (configured) {
      listRemoteProducts().then(setRemote).catch(() => setRemote([]));
    }
  }, [configured]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    const fd = new FormData(e.currentTarget);
    try {
      const name = String(fd.get("name") || "").trim();
      const slug =
        String(fd.get("slug") || "")
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ||
        name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      await saveRemoteProduct({
        slug,
        name,
        category: String(fd.get("category") || "watches") as ProductCategory,
        price: Number(fd.get("price")) || 0,
        costPrice: fd.get("costPrice") ? Number(fd.get("costPrice")) : undefined,
        image: String(fd.get("image") || "/file.svg"),
        tagline: String(fd.get("tagline") || ""),
        description: String(fd.get("description") || ""),
        badge: String(fd.get("badge") || "") || undefined,
        featured: fd.get("featured") === "on",
      });
      e.currentTarget.reset();
      setMessage("✓ Product live ho gaya — storefront pe dikh raha hoga.");
      refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return remote.filter((p) =>
      q ? `${p.name} ${p.category} ${p.tagline}`.toLowerCase().includes(q) : true
    );
  }, [remote, query]);

  return (
    <section className="space-y-8">
      {!configured && (
        <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-6 text-sm text-amber-800">
          <p className="font-semibold">Firebase abhi connect nahi hai.</p>
          <p className="mt-1">
            Form kaam karega jab tak NEXT_PUBLIC_FIREBASE_* env vars add nahi
            hote — uske baad yahan se add kiye products seedha storefront pe
            dikhenge.
          </p>
        </div>
      )}

      {/* Add product */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <h2 className="text-lg font-semibold text-gray-900 sm:col-span-2">
          Add product
        </h2>
        <div>
          <label htmlFor="np-name" className={LABEL}>
            Name *
          </label>
          <input id="np-name" name="name" required className={FIELD} placeholder="Gold Chain Classic" />
        </div>
        <div>
          <label htmlFor="np-category" className={LABEL}>
            Category *
          </label>
          <select id="np-category" name="category" className={FIELD} defaultValue="watches">
            <option value="watches">Watches</option>
            <option value="sunglasses">Sunglasses</option>
          </select>
        </div>
        <div>
          <label htmlFor="np-price" className={LABEL}>
            Sell price (€) *
          </label>
          <input id="np-price" name="price" type="number" min={0} required className={FIELD} placeholder="850" />
        </div>
        <div>
          <label htmlFor="np-cost" className={LABEL}>
            Wholesale cost (€)
          </label>
          <input id="np-cost" name="costPrice" type="number" min={0} className={FIELD} placeholder="480" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="np-image" className={LABEL}>
            Image URL ya path *
          </label>
          <input id="np-image" name="image" required className={FIELD} placeholder="/images/products/my-product.jpg" />
          <p className="mt-1 text-xs text-gray-400">
            Photo pehle{" "}
            <code className="rounded bg-gray-100 px-1">public/images/products/</code>{" "}
            mein daalo, phir wahi path likho — ya koi bhi direct URL.
          </p>
        </div>
        <div>
          <label htmlFor="np-tagline" className={LABEL}>
            Short line
          </label>
          <input id="np-tagline" name="tagline" className={FIELD} placeholder="Everyday elegance" />
        </div>
        <div>
          <label htmlFor="np-badge" className={LABEL}>
            Badge (optional)
          </label>
          <input id="np-badge" name="badge" className={FIELD} placeholder="New / Bestseller" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="np-desc" className={LABEL}>
            Description
          </label>
          <textarea id="np-desc" name="description" rows={3} className={`${FIELD} resize-none`} />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" name="featured" className="h-4 w-4" />
          Featured (homepage pe dikhega)
        </label>
        <div className="flex items-center justify-end gap-4 sm:col-span-2">
          {message && <span className="text-sm text-gray-600">{message}</span>}
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-background transition-colors hover:bg-goldbright disabled:opacity-60"
          >
            {busy ? "Saving…" : "Add to store"}
          </button>
        </div>
      </form>

      {/* Live products */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Live catalogue ({remote.length})
          </h2>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            aria-label="Search live products"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gold focus:outline-none"
          />
        </div>

        {configured && remote.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
            Firestore mein abhi koi product nahi — upar se add karo.
          </p>
        ) : (
          <ul className="space-y-2">
            {rows.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-medium text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {p.category} · sell {formatPrice(p.price)}
                    {p.costPrice != null &&
                      ` · cost ${formatPrice(p.costPrice)} · margin ${formatPrice(p.price - p.costPrice)}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete "${p.name}" from the store?`)) {
                      removeRemoteProduct(p.id).then(refresh);
                    }
                  }}
                  aria-label={`Delete ${p.name}`}
                  className="text-gray-400 transition-colors hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
