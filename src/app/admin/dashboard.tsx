import {
  Clock,
  Folder,
  LayoutDashboard,
  TrendingUp,
  Users as Users2,
} from "lucide-react";
import { products } from "@/lib/products";

const watches = products.filter((p) => p.category === "watches").length;
const sunglasses = products.filter((p) => p.category === "sunglasses").length;
const avgPrice = Math.round(
  products.reduce((sum, p) => sum + p.price, 0) / products.length
);

const CARDS = [
  {
    icon: Folder,
    title: "Catalogue",
    value: `${products.length}`,
    note: "Instruments in the store",
    tone: "text-gold",
  },
  {
    icon: LayoutDashboard,
    title: "The Hour",
    value: `${watches}`,
    note: "Watches in the catalogue",
    tone: "text-sky-600",
  },
  {
    icon: Users2,
    title: "The Light",
    value: `${sunglasses}`,
    note: "Sunglasses in the catalogue",
    tone: "text-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Average price",
    value: `€${avgPrice.toLocaleString("en-US")}`,
    note: "Across all instruments",
    tone: "text-amber-600",
  },
  {
    icon: Clock,
    title: "Last catalogue change",
    value: "This build",
    note: "Products live in src/lib/products.ts",
    tone: "text-gray-500",
  },
];

export function AdminDashboard() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CARDS.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <card.icon className={`mt-0.5 h-6 w-6 shrink-0 ${card.tone}`} />
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500">
                {card.title}
              </h3>
              <p className="mt-1 text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="mt-1 text-sm text-gray-500">{card.note}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-dashed border-gray-300 p-6 sm:col-span-2 lg:col-span-3">
        <h3 className="text-sm font-semibold text-gray-900">Coming with Firebase</h3>
        <p className="mt-1 text-sm text-gray-500">
          Orders, customers and revenue figures will populate here once the store
          is connected to a backend. Today this console reflects the live
          catalogue.
        </p>
      </div>
    </section>
  );
}
