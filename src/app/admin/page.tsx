import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminDashboard } from "./dashboard";

export const metadata: Metadata = {
  title: "Equinox Admin",
  description: "Admin dashboard for the Equinox atelier",
};

export default function Page() {
  return (
    <AdminShell title="Dashboard">
      <AdminDashboard />
    </AdminShell>
  );
}
