import { LogOut } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import logo from "../../assets/LeadtyLogo.png";

export default function Navbar() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <img
              src={logo}
              className="h-6 mr-3 sm:h-9"
              alt="Leadty Logo"
            />
          </div>
        </div>

        <div className="pr-4">
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{user.username}</span>
                <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
                  {user.role}
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-[#DB6A00] hover:text-[#DB6A00]"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
