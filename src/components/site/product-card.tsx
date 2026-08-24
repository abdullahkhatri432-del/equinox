import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { AddToCart } from "@/components/site/add-to-cart";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-soft transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden"
        aria-label={product.name}
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

      <div className="flex flex-1 flex-col gap-1 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base tracking-wide text-foreground transition-colors group-hover:text-gold">
            <Link href={`/products/${product.slug}`} className="hover:text-gold">
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-base font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-sm text-faint">{product.tagline}</p>

        <div className="mt-5 flex items-center justify-between gap-3 pt-1">
          <span className="text-xs text-faint">{product.category}</span>
          <AddToCart product={product} variant="outline" className="px-5 py-2.5" />
        </div>
      </div>
    </div>
  );
}
