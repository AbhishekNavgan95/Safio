import { Loader2, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function LoginPage() {
  const { login, loading } = useAuth();

  return (
    <div className="min-h-screen flex">
      {/* Gradient Sidebar */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-indigo-700 p-12 text-white w-1/2">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <Lock className="h-8 w-8 mr-3" />
            <span className="text-2xl font-bold">Safio</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-indigo-100 text-lg">
            Sign in to access your dashboard and manage your account.
          </p>
        </div>
        <div className="text-indigo-100 text-sm">
          <p>© {new Date().getFullYear()} Safio. All rights reserved.</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="lg:hidden mx-auto h-20 w-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-md">
              <Lock className="h-9 w-9 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 font-sans">Welcome Back</h1>
            <p className="text-gray-500 text-lg">Sign in to continue to your Safio dashboard</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg   p-10 border border-gray-100">
            <div className="space-y-1 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 text-center">Sign In</h2>
              <p className="text-center text-gray-500 text-sm">Access your account with Google</p>
            </div>
            
            <div className="space-y-6">
              <button
                onClick={login}
                disabled={loading}
                className="w-full flex justify-center items-center gap-3 px-6 py-3.5 rounded-xl text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transform"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 text-indigo-600" />
                    <span className="text-gray-700">Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path className="fill-gray-600 hover:fill-indigo-600 transition-all duration-200" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    <span className="font-medium">Continue with Google</span>
                  </>
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-400 text-xs font-medium">SECURE AUTHENTICATION</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-blue-700 text-center">
                  By continuing, you agree to our{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
