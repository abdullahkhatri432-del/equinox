import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { OrdersManagementPage } from "@/components/admin/orders-management";

export const metadata: Metadata = { title: "Orders — Equinox Admin" };

export default function Page() {
  return (
    <AdminShell title="Orders">
      <OrdersManagementPage />
    </AdminShell>
  );
}
