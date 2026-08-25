import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { UsersManagementPage } from "@/components/admin/users-management";

export const metadata: Metadata = { title: "Users — Speedersmania Admin" };

export default function Page() {
  return (
    <AdminShell title="Users">
      <UsersManagementPage />
    </AdminShell>
  );
}
