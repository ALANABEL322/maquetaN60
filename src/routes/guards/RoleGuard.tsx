import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { paths } from '../paths';

interface RoleGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function RoleGuard({ children, requireAdmin = true }: RoleGuardProps) {
  const isAdmin = useAuthStore(state => state.isAdmin());

  if (requireAdmin && !isAdmin) {
    return <Navigate to={paths.user.root} replace />;
  }

  if (!requireAdmin && isAdmin) {
    return <Navigate to={paths.admin.root} replace />;
  }

  return <>{children}</>;
}
