"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getUsers, formatOrderDate, STORE_EVENT } from "@/lib/store";

export function UsersManagementPage() {
  const [users, setUsers] = useState<
    Array<{ name: string; email: string; createdAt: number }>
  >([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const refresh = () => setUsers(getUsers());
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

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 py-20 text-center">
        <Users className="mx-auto h-10 w-10 text-gray-300" />
        <p className="mt-4 font-semibold text-gray-900">No accounts yet</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
          Customers who create an account at /signup appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
        <thead>
          <tr className="bg-gray-50 text-xs uppercase text-gray-500">
            <th className="px-6 py-3 font-medium">Customer</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((u) => (
            <tr key={u.email} className="hover:bg-gray-50">
              <td className="px-6 py-3.5">
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-sm font-semibold text-gold">
                    {u.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium text-gray-900">{u.name}</span>
                </span>
              </td>
              <td className="px-6 py-3.5 text-gray-600">{u.email}</td>
              <td className="px-6 py-3.5 text-gray-500">
                {formatOrderDate(u.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
