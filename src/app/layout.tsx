import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/site/cart-drawer";

const equinoxDisplay = Playfair_Display({
  variable: "--font-equinox-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const equinoxSans = Manrope({
  variable: "--font-equinox-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EQUINOX — Time & Light",
  description:
    "Precision timepieces and sun-crafted eyewear. Watches engineered to the second, sunglasses tuned to the light.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${equinoxDisplay.variable} ${equinoxSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
