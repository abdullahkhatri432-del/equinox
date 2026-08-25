"use client";

import type { ProductCategory } from "@/lib/products";

export interface OrderItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  costPrice?: number;
}

export type OrderStatus = "pending" | "shipped" | "delivered";

export interface Order {
  id: string;
  createdAt: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
}

export interface StoredUser {
  name: string;
  email: string;
  createdAt: number;
}

export interface StoreSettings {
  storeName: string;
  contactEmail: string;
  freeShippingThreshold: number;
  flatShippingRate: number;
}

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "SPEEDERSMANIA",
  contactEmail: "atelier@SPEEDERSMANIA.shop",
  freeShippingThreshold: 1500,
  flatShippingRate: 45,
};

const ORDERS_KEY = "SPEEDERSMANIA-orders-v1";
const USERS_KEY = "SPEEDERSMANIA-users-v1";
const SETTINGS_KEY = "SPEEDERSMANIA-settings-v1";
export const STORE_EVENT = "SPEEDERSMANIA-store-changed";

function emit() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORE_EVENT));
  }
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable
  }
  emit();
}

/* ------------------------------------------------------------- Orders */

export function getOrders(): Order[] {
  return read<Order[]>(ORDERS_KEY, []).sort((a, b) => b.createdAt - a.createdAt);
}

export function saveOrder(input: Omit<Order, "id" | "createdAt" | "status">): Order {
  const order: Order = {
    ...input,
    id: `SM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: Date.now(),
    status: "pending",
  };
  write(ORDERS_KEY, [order, ...getOrders()]);
  return order;
}

export function setOrderStatus(id: string, status: OrderStatus) {
  write(
    ORDERS_KEY,
    getOrders().map((o) => (o.id === id ? { ...o, status } : o))
  );
}

export function deleteOrder(id: string) {
  write(
    ORDERS_KEY,
    getOrders().filter((o) => o.id !== id)
  );
}

/* -------------------------------------------------------------- Users */

export function getUsers(): StoredUser[] {
  return read<StoredUser[]>(USERS_KEY, []);
}

export function registerUser(user: { name: string; email: string }) {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    return;
  }
  write(USERS_KEY, [{ ...user, createdAt: Date.now() }, ...users]);
}

/* ----------------------------------------------------------- Settings */

export function getSettings(): StoreSettings {
  return { ...DEFAULT_SETTINGS, ...read<Partial<StoreSettings>>(SETTINGS_KEY, {}) };
}

export function saveSettings(settings: StoreSettings) {
  write(SETTINGS_KEY, settings);
}

export function formatOrderDate(ts: number) {
  return new Date(ts).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export type { ProductCategory };
