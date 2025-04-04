import { User, Users, BarChart3, FileText, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SidebarAdmin() {
  const navigate = useNavigate()

  const menuItems = [
    {
      icon: Users,
      label: 'Users',
      path: '/admin/users'
    },
    {
      icon: BarChart3,
      label: 'Web Metrics',
      path: '/admin'
    },
    {
      icon: FileText,
      label: 'Reports',
      path: '/admin/reports'
    },
    {
      icon: MessageSquare,
      label: 'Support Panel',
      path: '/admin/support'
    }
  ]

  return (
    <div className="fixed inset-y-0 left-0 w-52 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 flex flex-col mt-16">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#DB6B02] rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
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