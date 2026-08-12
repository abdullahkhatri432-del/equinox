import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { AddToCart } from "@/components/site/add-to-cart";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col rounded-md border border-line bg-soft p-5 transition-colors duration-300 hover:border-gold">
      <Link
        href={`/products/${product.slug}`}
        className="relative mb-5 block h-44 overflow-hidden rounded-sm sm:h-52"
        aria-label={product.name}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col border-t border-line pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base tracking-wide text-foreground transition-colors group-hover:text-gold">
            <Link href={`/products/${product.slug}`} className="hover:text-gold">
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-sm text-muted">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="mt-1 text-sm text-faint">{product.tagline}</p>

        <div className="mt-4 flex items-center justify-between gap-3 pt-1">
          {product.badge ? (
            <span className="eyebrow">{product.badge}</span>
          ) : (
            <span className="text-xs text-faint">{product.category}</span>
          )}
          <AddToCart product={product} variant="outline" className="px-5 py-2.5" />
        </div>
      </div>
    </div>
  );
}
