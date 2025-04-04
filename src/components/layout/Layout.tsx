import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/header/Navbar';
import SidebarAdmin from '../header/sidebarAdmin';
import SidebarAdminMobile from '../header/sidebarAdminMobile';
import SidebarUser from '../header/sidebarUser';
import SidebarUserMobile from '../header/sidebarUserMobile';
import Footer from '../footer';


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, isAuthenticated } = useAuthStore();
  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated && (
        <>
          <Navbar />
          <div className="flex-1 flex">
            {user?.role === 'admin' && (
              <>
                {isMobile ? (
                  <SidebarAdminMobile />
                ) : (
                  <SidebarAdmin />
                )}
              </>
            )}
            {user?.role === 'user' && (
              <>
                {isMobile ? (
                  <SidebarUserMobile />
                ) : (
                  <SidebarUser />
                )}
              </>
            )}
            <main className="flex-1 p-4">
              {children}
            </main>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
