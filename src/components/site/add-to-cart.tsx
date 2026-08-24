"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function AddToCart({
  product,
  variant = "primary",
  className,
}: {
  product: Product;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(product);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className={cn(
        "btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[background-color,transform] duration-200",
        variant === "primary"
          ? ""
          : "border border-line bg-transparent text-foreground hover:border-gold hover:text-gold",
        className
      )}
    >
      {added ? (
        <>
          <Check size={16} /> Added
        </>
      ) : (
        <>
          <ShoppingBag size={16} /> Add to selection
        </>
      )}
    </button>
  );
}
