import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <h1 className="text-4xl font-bold text-red-600">401</h1>
        <h2 className="text-2xl font-semibold text-gray-900">Unauthorized Access</h2>
        <p className="text-gray-600">
          You don't have permission to access this page.
        </p>
        <div className="mt-4">
          <Link
            to="/dashboard"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
