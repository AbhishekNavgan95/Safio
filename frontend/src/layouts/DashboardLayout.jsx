import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Home, Menu, X, Settings } from 'lucide-react';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items based on user role
  const navigation = [
    { name: 'Profile', href: '/dashboard', icon: Home, current: true },
  ];

  // Add admin-specific routes if user is admin
  if (user?.role === 'admin') {
    navigation.push({ name: 'Modules', href: '/dashboard/modules', icon: Settings, current: false });
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 bg-white shadow-lg`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between md:justify-center h-16 px-4 border-b border-gray-200">
            <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-indigo-600">Safio</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md lg:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium ${window.location.pathname === item.href
                    ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User info at bottom */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={user?.avatar}
                alt={user?.name}
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs font-medium text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 mr-2 text-gray-500 rounded-md lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">
                {navigation.find(item => window.location.pathname === item.href)?.name || 'Profile'}
              </h1>
            </div>

            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                title="Sign out"
              >
                <LogOut className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto focus:outline-none bg-gray-50">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
