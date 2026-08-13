import { Calendar, Users, Shield, TrendingUp, Folder, Settings, LogOut, Image as ImageIcon, Mail, CheckCircle, XCircle, Loader2, Grid, List, Zap } from "lucide-react";

export function OrdersManagementPage() {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase bg-gray-50">
                  <th className="py-3 px-6 font-medium text-gray-500">Order #</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Customer</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Date</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Amount</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Status</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">#EQ-2024-001</td>
                  <td className="py-4 px-6">John D.</td>
                  <td className="py-4 px-6">
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-primary-600">$129.99</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Processing</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-500 text-sm view">View</button>
                      <button className="text-blue-600 hover:text-blue-500 text-sm ship">Ship</button>
                      <button className="text-red-600 hover:text-red-500 text-sm cancel">Cancel</button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50 last:border-0">
                  <td className="py-4 px-6 font-medium text-gray-900">#EQ-2024-002</td>
                  <td className="py-4 px-6">Sarah K.</td>
                  <td className="py-4 px-6">
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-primary-600">$85.50</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Delivered</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-500 text-sm view">View</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-bold text-primary-600">2,438</p>
              <p className="text-sm text-gray-500">Total Orders</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-success-600">$45,230</p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-info-600">1,247</p>
              <p className="text-sm text-gray-500">Pending Orders</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-warning-600">89</p>
              <p className="text-sm text-gray-500">Shipped Today</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}