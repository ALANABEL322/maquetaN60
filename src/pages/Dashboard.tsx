import { useAuthStore } from '@/store/authStore'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => logout()}
                className="text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h2>
            <p className="text-gray-600">
              This is your dashboard. You are logged in as a {user?.role}.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
