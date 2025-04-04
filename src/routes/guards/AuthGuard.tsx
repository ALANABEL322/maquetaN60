import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { paths } from '../paths';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const location = useLocation();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated && requireAuth) {
    return <Navigate to={paths.auth.login} state={{ from: location }} replace />;
  }

  if (isAuthenticated && !requireAuth) {
    const isAdmin = useAuthStore.getState().isAdmin();
    return <Navigate to={isAdmin ? paths.admin.root : paths.user.root} replace />;
  }

  return <>{children}</>;
}
