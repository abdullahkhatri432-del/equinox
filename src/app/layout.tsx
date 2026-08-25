import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { CartDrawer } from "@/components/site/cart-drawer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

const SpeedersmaniaDisplay = Playfair_Display({
  variable: "--font-Speedersmania-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const SpeedersmaniaSans = Manrope({
  variable: "--font-Speedersmania-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speedersmania — Time & Light",
  description:
    "Precision timepieces and sun-crafted eyewear. Watches engineered to the second, sunglasses tuned to the light.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${SpeedersmaniaDisplay.variable} ${SpeedersmaniaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <WhatsAppFloat />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
