"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_SETTINGS,
  getSettings,
  saveSettings,
  type StoreSettings,
} from "@/lib/store";

const LABEL = "mb-2 block text-sm font-medium text-gray-700";
const FIELD =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none";

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const update =
    (key: keyof StoreSettings) =>
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value =
        key === "freeShippingThreshold" || key === "flatShippingRate"
          ? Number(e.target.value) || 0
          : e.target.value;
      setSettings((s) => ({ ...s, [key]: value }));
      setSaved(false);
    };

  return (
    <section className="max-w-xl space-y-6">
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900">Store</h3>
        <div>
          <label htmlFor="set-name" className={LABEL}>
            Store name
          </label>
          <input
            id="set-name"
            className={FIELD}
            value={settings.storeName}
            onChange={update("storeName")}
          />
        </div>
        <div>
          <label htmlFor="set-email" className={LABEL}>
            Contact email
          </label>
          <input
            id="set-email"
            type="email"
            className={FIELD}
            value={settings.contactEmail}
            onChange={update("contactEmail")}
          />
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900">Shipping</h3>
        <p className="text-sm text-gray-500">
          These mirror the storefront thresholds — keep them in sync with{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
            src/lib/utils.ts
          </code>{" "}
          until the backend drives both.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="set-threshold" className={LABEL}>
              Free shipping over (€)
            </label>
            <input
              id="set-threshold"
              type="number"
              min={0}
              className={FIELD}
              value={settings.freeShippingThreshold}
              onChange={update("freeShippingThreshold")}
            />
          </div>
          <div>
            <label htmlFor="set-rate" className={LABEL}>
              Flat rate (€)
            </label>
            <input
              id="set-rate"
              type="number"
              min={0}
              className={FIELD}
              value={settings.flatShippingRate}
              onChange={update("flatShippingRate")}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          saveSettings(settings);
          setSaved(true);
        }}
        className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-background transition-colors hover:bg-goldbright"
      >
        {saved ? "Saved ✓" : "Save settings"}
      </button>
    </section>
  );
}
