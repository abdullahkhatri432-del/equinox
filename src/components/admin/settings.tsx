import { Shield, Settings, LogOut, Image as ImageIcon, Mail, Calendar, CheckCircle, XCircle, Loader2, Grid, List, Zap } from "lucide-react";

export function AdminSettingsPage() {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:border-gold"
                placeholder="Equinox Store"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:border-gold"
                placeholder="store@equinox.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:border-gold">
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
                <option>CAD - Canadian Dollar</option>
              </select>
            </div>

            <button
              className="w-full px-4 py-2 bg-gold text-white rounded-lg hover:bg-goldbright transition-colors text-sm font-medium"
              type="button">
              Save Changes
            </button>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="theme"
                    className="rounded w-4 h-4 border-gray-400 focus-visible:ring-primary-500"
                    checked
                  />
                  Light
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="theme"
                    className="rounded w-4 h-4 border-gray-400 focus-visible:ring-primary-500"
                  />
                  Dark
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <p className="text-sm text-gray-500">#4f46e5</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <ImageIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">equinox-logo.svg</span>
                <button className="text-xs text-gold hover:text-goldbright">Change</button>
              </div>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">API Settings</h3>
          <p className="text-sm text-gray-500 mb-4">
            Manage API keys for third-party integrations and developer access.
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 mb-2">API Key Status</p>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Last API Usage</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>

            <button
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              Regenerate Key
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}