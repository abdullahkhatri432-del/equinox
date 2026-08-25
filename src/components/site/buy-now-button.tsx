"use client";

import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { productInquiryLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function BuyNowButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <a
      href={productInquiryLink(product)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "btn-whatsapp inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide",
        className
      )}
    >
      Order on WhatsApp <ArrowRight size={16} />
    </a>
  );
}
