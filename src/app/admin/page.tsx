import { LayoutDashboard, Clock, Heart, Shield, Users as Users2, TrendingUp, Folder, Settings, LogOut } from "lucide-react";

export function AdminDashboard() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Card 1: Overview */}
      <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <LayoutDashboard className="w-6 h-6 text-primary-600 group-hover:text-primary-500 transition-colors" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">Overview</h3>
            <p className="mt-1 text-2xl font-bold text-gray-900">$0K MRR</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">Monthly Recurring Revenue</p>
      </div>

      {/* Card 2: Orders */}
      <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-success-600 group-hover:text-success-500 transition-colors" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">Orders</h3>
            <p className="mt-1 text-2xl font-bold text-gray-900">1,247</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">Total orders this month</p>
      </div>

      {/* Card 3: Users */}
      <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Users2 className="w-6 h-6 text-info-600 group-hover:text-info-500 transition-colors" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">Users</h3>
            <p className="mt-1 text-2xl font-bold text-gray-900">4,523</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">Active customers</p>
      </div>

      {/* Card 4: Revenue */}
      <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Heart className="w-6 h-6 text-warning-600 group-hover:text-warning-500 transition-colors" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">Revenue</h3>
            <p className="mt-1 text-2xl font-bold text-gray-900">$34,567</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">Monthly revenue</p>
      </div>

      {/* Card 5: New Products */}
      <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Folder className="w-6 h-6 text-primary-600 group-hover:text-primary-500 transition-colors" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">New Products</h3>
            <p className="mt-1 text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">Products added this month</p>
      </div>

      {/* Card 6: Recent Activity */}
      <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Clock className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">Recent Activity</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">2 hours ago</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">Last order placed</p>
      </div>
    </section>
  );
}