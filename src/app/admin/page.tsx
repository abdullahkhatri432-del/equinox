import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminDashboard } from "./dashboard";

export const metadata: Metadata = {
  title: "SPEEDERSMANIA Admin",
  description: "Admin dashboard for the SPEEDERSMANIA atelier",
};

export default function Page() {
  return (
    <AdminShell title="Dashboard">
      <AdminDashboard />
    </AdminShell>
  );
}
