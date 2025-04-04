import { useAuthRole } from '@/hooks/use-auth-role';
import { useMobile } from '@/hooks/use-mobile';
import NavBar from '../header/navBar';
import SidebarAdmin from '../header/sidebarAdmin';
import SidebarAdminMobile from '../header/sidebarAdminMobile';
import SidebarUser from '../header/sidebarUser';
import SidebarUserMobile from '../header/sidebarUserMobile';
import Footer from '../footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAdmin, isUser, isAuthenticated } = useAuthRole();
  const isMobile = useMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="flex-1 flex">
        {isAuthenticated && (
          <>
            {isAdmin && (
              <>
                {isMobile ? <SidebarAdminMobile /> : <SidebarAdmin />}
              </>
            )}
            {isUser && (
              <>
                {isMobile ? <SidebarUserMobile /> : <SidebarUser />}
              </>
            )}
          </>
        )}

        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
