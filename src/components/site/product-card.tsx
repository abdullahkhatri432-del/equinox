import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { AddToCart } from "@/components/site/add-to-cart";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-soft transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-surface"
        aria-label={`${product.name} — view details`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="eyebrow absolute left-4 top-4 rounded-full border border-line bg-background/85 px-3 py-1.5 backdrop-blur-sm">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-faint">
          {product.category}
        </p>

        <h3 className="mt-2 text-lg font-semibold tracking-wide text-foreground transition-colors group-hover:text-gold">
          <Link href={`/products/${product.slug}`} className="hover:text-gold">
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 text-sm leading-relaxed text-muted">{product.tagline}</p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
            <span className="text-lg font-semibold tracking-wide text-foreground">
              {formatPrice(product.price)}
            </span>
            <AddToCart product={product} variant="outline" className="px-4 py-2 text-sm" />
          </div>
        </div>
      </div>
    </article>
  );
}
