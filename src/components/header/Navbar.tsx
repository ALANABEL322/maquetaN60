import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import logo from "../../assets/LeadtyLogo.png";
import { paths } from '@/routes/paths';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(paths.auth.login);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <img
              src={logo}
              className="h-6 w-8 mr-3 sm:h-14 sm:w-28"
              alt="Leadty Logo"
            />
          </div>
        </div>

        <div className="pr-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">{user.username}</span>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                  {user.role === 'admin' ? 'Admin' : 'Usuario'}
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-[#DB6A00] hover:text-[#DB6A00]"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate(paths.auth.login)}
                className="text-[#DB6A00] hover:text-[#DB6A00]"
              >
                Iniciar sesión
              </Button>
              <Button
                onClick={() => navigate(paths.auth.register)}
                className="bg-[#DB6A00] text-white hover:bg-[#c45a00]"
              >
                Registrarse
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
