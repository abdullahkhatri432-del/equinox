import { Users, Shield, Settings, LogOut, Image as ImageIcon, Mail, Calendar, CheckCircle, XCircle, Loader2, Grid, List, Zap } from "lucide-react";

export function UsersManagementPage() {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase bg-gray-50">
                  <th className="py-3 px-6 font-medium text-gray-500">User ID</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Name</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Email</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Role</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Status</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Last Activity</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">USR-001</td>
                  <td className="py-4 px-6">Alex Johnson</td>
                  <td className="py-4 px-6">
                    <a href="mailto:alex@equinox.com" className="text-primary-600 hover:text-primary-500 text-sm">alex@equinox.com</a>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">Admin</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-500 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-500 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50 last:border-0">
                  <td className="py-4 px-6 font-medium text-gray-900">USR-002</td>
                  <td className="py-4 px-6">Maria Rodriguez</td>
                  <td className="py-4 px-6">
                    <a href="mailto:maria@equinox.com" className="text-primary-600 hover:text-primary-500 text-sm">maria@equinox.com</a>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">Editor</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-500 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-500 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">USR-003</td>
                  <td className="py-4 px-6">Chris Wang</td>
                  <td className="py-4 px-6">
                    <a href="mailto:chris@equinox.com" className="text-primary-600 hover:text-primary-500 text-sm">chris@equinox.com</a>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">Viewer</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Suspended</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs text-gray-500">3 days ago</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-500 text-sm">Activate</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* User Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-primary-600">4,523</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success-600">3,891</p>
              <p className="text-sm text-gray-500">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning-600">632</p>
              <p className="text-sm text-gray-500">Suspended Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}