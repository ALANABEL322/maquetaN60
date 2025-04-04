// src/routes/guards/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { paths } from './paths';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  userOnly?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  adminOnly = false, 
  userOnly = false 
}: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    isAdmin: state.isAdmin()
  }));

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to={paths.auth.login} state={{ from: location }} replace />;
  }

  // Verificación de roles
  if (adminOnly && !isAdmin) {
    return <Navigate to={paths.user.landingPage} replace />;
  }

  if (userOnly && isAdmin) {
    return <Navigate to={paths.admin.dashboard} replace />;
  }

  return <>{children}</>;
}