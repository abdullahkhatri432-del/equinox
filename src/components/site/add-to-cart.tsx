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
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors",
        variant === "primary"
          ? "text-background"
          : "border border-line text-foreground hover:border-gold hover:text-gold",
        className
      )}
      style={variant === "primary" ? { background: "var(--primary)" } : undefined}
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
