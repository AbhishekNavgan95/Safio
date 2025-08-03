import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { ProfilePage } from './components/dashboard/ProfilePage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthProvider } from './contexts/AuthContext';
import { ModulePage } from './components/dashboard/ModulePage';
// Dashboard Pages
function DashboardHome() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! This is your dashboard. Use the sidebar to navigate.</p>
      </div>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfilePage />} />
          <Route path="modules" element={<ModulePage />} />
        </Route>

        {/* Default Routes */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* 404 - Keep as last route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
