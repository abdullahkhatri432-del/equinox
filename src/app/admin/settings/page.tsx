import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminSettingsPage } from "@/components/admin/settings";

export const metadata: Metadata = { title: "Settings — Speedersmania Admin" };

export default function Page() {
  return (
    <AdminShell title="Settings">
      <AdminSettingsPage />
    </AdminShell>
  );
}
