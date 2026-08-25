"use client";

import { useEffect, useState } from "react";
import { Package, Trash2 } from "lucide-react";
import {
  deleteOrder,
  formatOrderDate,
  getOrders,
  setOrderStatus,
  type Order,
  type OrderStatus,
  STORE_EVENT,
} from "@/lib/store";
import { formatPrice } from "@/lib/utils";

const STATUSES: OrderStatus[] = ["pending", "shipped", "delivered"];

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  shipped: "bg-sky-100 text-sky-800",
  delivered: "bg-emerald-100 text-emerald-800",
};

function marginOf(order: Order) {
  return order.items.reduce(
    (sum, i) => sum + (i.costPrice != null ? (i.price - i.costPrice) * i.quantity : 0),
    0
  );
}

function hasCosts(order: Order) {
  return order.items.every((i) => i.costPrice != null);
}

export function OrdersManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const refresh = () => setOrders(getOrders());
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

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 py-20 text-center">
        <Package className="mx-auto h-10 w-10 text-gray-300" />
        <p className="mt-4 font-semibold text-gray-900">No orders yet</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
          Every completed checkout is captured here automatically — customer
          details, items, totals and your estimated margin.
        </p>
      </div>
    );
  }

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const margin = orders.reduce((s, o) => s + marginOf(o), 0);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-500">Orders</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Revenue
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {formatPrice(revenue)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Est. margin
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">
            {formatPrice(margin)}
          </p>
        </div>
      </div>

      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{order.id}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {formatOrderDate(order.createdAt)} · {order.customer.name} ·{" "}
                  {order.customer.email} · {order.customer.phone}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[order.status]}`}
                >
                  {order.status}
                </span>
                <select
                  value={order.status}
                  onChange={(e) =>
                    setOrderStatus(order.id, e.target.value as OrderStatus)
                  }
                  aria-label={`Update status for ${order.id}`}
                  className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-700 focus:border-gold focus:outline-none"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      Mark {s}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete ${order.id}? This cannot be undone.`)) {
                      deleteOrder(order.id);
                    }
                  }}
                  aria-label={`Delete ${order.id}`}
                  className="text-gray-400 transition-colors hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <table className="mt-4 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase text-gray-500">
                  <th className="py-2 font-medium">Item</th>
                  <th className="py-2 font-medium">Qty</th>
                  <th className="py-2 font-medium">Sold at</th>
                  <th className="py-2 font-medium">Line total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.slug} className="border-b border-gray-50">
                    <td className="py-2 text-gray-800">{item.name}</td>
                    <td className="py-2 text-gray-600">{item.quantity}</td>
                    <td className="py-2 text-gray-600">
                      {formatPrice(item.price)}
                      {item.costPrice != null && (
                        <span className="ml-2 text-xs text-gray-400">
                          cost {formatPrice(item.costPrice)}
                        </span>
                      )}
                    </td>
                    <td className="py-2 font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex flex-wrap justify-end gap-x-8 gap-y-1 border-t border-gray-100 pt-3 text-sm">
              <span className="text-gray-500">
                Shipping{" "}
                <span className="font-medium text-gray-800">
                  {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                </span>
              </span>
              <span className="text-gray-500">
                Total{" "}
                <span className="font-bold text-gray-900">
                  {formatPrice(order.total)}
                </span>
              </span>
              {hasCosts(order) && (
                <span className="text-gray-500">
                  Margin{" "}
                  <span className="font-semibold text-emerald-600">
                    {formatPrice(marginOf(order))}
                  </span>
                </span>
              )}
            </div>

            <details className="mt-3 text-sm text-gray-500">
              <summary className="cursor-pointer select-none hover:text-gray-700">
                Delivery address
              </summary>
              <p className="mt-2 leading-relaxed">
                {order.customer.address}, {order.customer.city}{" "}
                {order.customer.zip}, {order.customer.country}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
