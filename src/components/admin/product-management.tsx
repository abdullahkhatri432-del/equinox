import { Folder, TrendingUp, Users, Shield, Settings, LogOut, Image as ImageIcon, Mail, Calendar, CheckCircle, XCircle, Loader2, Grid, List, Zap } from "lucide-react";

export function ProductManagementPage() {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
        <button className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-goldbright transition-colors">
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grid View */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="h-64 bg-gray-100 rounded-md overflow-hidden mb-4">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto my-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Grid View Products</h3>
          <p className="text-sm text-gray-500">15 products displayed</p>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">View</button>
            <button className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">Edit</button>
          </div>
        </div>

        {/* List View */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase bg-gray-50">
                  <th className="py-3 px-6 font-medium text-gray-500">SKU</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Name</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Price</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Status</th>
                  <th className="py-3 px-6 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">SKU12345</td>
                  <td className="py-4 px-6">Premium Hoodie</td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gold">$89.99</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-gold hover:text-goldbright text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-500 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">SKU67890</td>
                  <td className="py-4 px-6">Performance Tee</td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gold">$45.00</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-gold hover:text-goldbright text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-500 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}