import type { Product } from "@/lib/products";
import type { CartItem } from "@/lib/cart-context";

export const WHATSAPP_NUMBER = "918160587811";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generalInquiryLink() {
  return whatsappLink("Hello SPEEDERSMANIA! I have a question.");
}

export function productInquiryLink(product: Product) {
  return whatsappLink(
    [
      "Hello SPEEDERSMANIA! 👋",
      "",
      `I'm interested in: ${product.name} — ${formatEur(product.price)}`,
      "",
      "Is it available?",
    ].join("\n")
  );
}

export function cartOrderLink(
  items: CartItem[],
  total: number,
  customer?: Record<string, string>
) {
  const lines = [
    "Hello SPEEDERSMANIA! 🛍️",
    "",
    "I would like to order:",
    "",
    ...items.map((i) => `• ${i.name} × ${i.quantity} — ${formatEur(i.price * i.quantity)}`),
    "",
    `Total: ${formatEur(total)}`,
  ];

  if (customer) {
    lines.push(
      "",
      "My details:",
      `Name: ${customer.name ?? ""}`,
      `Phone: ${customer.phone ?? ""}`,
      `Address: ${customer.address ?? ""}, ${customer.city ?? ""} ${customer.zip ?? ""}, ${customer.country ?? ""}`,
      `Email: ${customer.email ?? ""}`
    );
  }

  return whatsappLink(lines.join("\n"));
}

function formatEur(amount: number) {
  return `€${amount.toLocaleString("en-US")}`;
}
