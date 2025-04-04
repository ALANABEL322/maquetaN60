import { useNavigate } from 'react-router-dom'
import {
  Folder,
  Package,
  LifeBuoy,
  Users,
} from 'lucide-react'

export default function SidebarUser() {
  const navigate = useNavigate()

  const menuItems = [
    {
      icon: Package,
      label: 'Create Project',
      path: '/dashboard/createProject'
    },
    {
      icon: Folder,
      label: 'My Projects',
      path: '/dashboard/projects'
    },
    {
      icon: LifeBuoy,
      label: 'Support',
      path: '/dashboard/support'
    }
  ]

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-[#F6EEEE] border-r border-gray-200 flex flex-col">
      <div className="flex-1 flex flex-col mt-12">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#DB6B02] rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <item.icon className="h-5 w-5 text-gray-400 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}