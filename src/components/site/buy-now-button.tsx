"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function BuyNowButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { add } = useCart();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        add(product);
        router.push("/checkout");
      }}
      className={cn(
        "btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide",
        className
      )}
    >
      Buy now <ArrowRight size={16} />
    </button>
  );
}
