import Image from "next/image";
import Link from "next/link";
import { Bell, Folder, Users, Settings, LogOut, Shield, ChartArea, TrendingUp, Users as UsersIcon } from "lucide-react";

export function AdminLayout({
  children,
  title = "Equinox Admin",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 h-screen text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <Image
                src="/equinox-logo.svg"
                alt="Equinox"
                width={40}
                height={40}
                className="object-contain"
              />
              <h2 className="ml-4 text-xl font-bold">Equinox Admin</h2>
            </div>

            <nav className="flex-1 p-2 space-y-1">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-white font-medium transition-colors"
                style={{ color: "currentColor" }}
              >
                <ChartArea className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/admin/products"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-white font-medium transition-colors"
                style={{ color: "currentColor" }}
              >
                <Folder className="w-5 h-5" />
                <span>Products</span>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-white font-medium transition-colors"
                style={{ color: "currentColor" }}
              >
                <TrendingUp className="w-5 h-5" />
                <span>Orders</span>
              </Link>

              <Link
                href="/admin/users"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-white font-medium transition-colors"
                style={{ color: "currentColor" }}
              >
                <Users className="w-5 h-5" />
                <span>Users</span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-white font-medium transition-colors"
                style={{ color: "currentColor" }}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </nav>

            <div className="p-4 border-t border-gray-700">
              <button
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
                onClick={() => window.location.href = "/"}
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <nav className="flex items-center gap-4 mb-6">
              <Image
                src="/equinox-logo.svg"
                alt="Equinox"
                width={32}
                height={32}
                className="object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </nav>

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}