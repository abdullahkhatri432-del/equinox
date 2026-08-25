"use client";

import { useEffect, useState } from "react";
import { Clock, Folder, LayoutDashboard, TrendingUp, Users as Users2 } from "lucide-react";
import { products } from "@/lib/products";
import { getOrders, getUsers, STORE_EVENT } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function AdminDashboard() {
  const [orders, setOrders] = useState<ReturnType<typeof getOrders>>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setOrders(getOrders());
      setUsersCount(getUsers().length);
    };
    refresh();
    setLoaded(true);
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (!loaded) return null;

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const margin = orders.reduce(
    (s, o) =>
      s +
      o.items.reduce(
        (sum, i) =>
          sum + (i.costPrice != null ? (i.price - i.costPrice) * i.quantity : 0),
        0
      ),
    0
  );
  const pending = orders.filter((o) => o.status === "pending").length;
  const watches = products.filter((p) => p.category === "watches").length;

  const cards = [
    {
      icon: TrendingUp,
      title: "Orders",
      value: `${orders.length}`,
      note: pending > 0 ? `${pending} pending` : "All handled",
      tone: "text-sky-600",
    },
    {
      icon: LayoutDashboard,
      title: "Revenue",
      value: formatPrice(revenue),
      note: "Across all orders",
      tone: "text-emerald-600",
    },
    {
      icon: Users2,
      title: "Accounts",
      value: `${usersCount}`,
      note: "Registered customers",
      tone: "text-gold",
    },
    {
      icon: Folder,
      title: "Catalogue",
      value: `${products.length}`,
      note: `${watches} watches · ${products.length - watches} sunglasses`,
      tone: "text-gray-500",
    },
    {
      icon: TrendingUp,
      title: "Est. margin",
      value: formatPrice(margin),
      note: "Sell price minus wholesale cost",
      tone: "text-emerald-600",
    },
    {
      icon: Clock,
      title: "Avg. order",
      value: orders.length ? formatPrice(revenue / orders.length) : "—",
      note: "By order total",
      tone: "text-amber-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
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
    </section>
  );
}
