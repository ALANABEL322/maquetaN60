import { BellIcon, UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

interface HeaderUserProps {
  children?: React.ReactNode
}

export default function HeaderUser({ children }: HeaderUserProps) {
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">User Dashboard</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-700">User</span>
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
