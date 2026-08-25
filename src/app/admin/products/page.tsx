import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductManagementPage } from "@/components/admin/product-management";

export const metadata: Metadata = { title: "Products — Speedersmania Admin" };

export default function Page() {
  return (
    <AdminShell title="Products">
      <ProductManagementPage />
    </AdminShell>
  );
}
