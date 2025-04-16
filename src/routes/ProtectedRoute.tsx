import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { paths } from "./paths";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  userOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
  userOnly = false,
}: ProtectedRouteProps) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    return (
      <Navigate to={paths.auth.login} state={{ from: location }} replace />
    );
  }

  // Admin intentando acceder a ruta de usuario
  if (userOnly && isAdmin) {
    return <Navigate to={paths.admin.perfil} replace />;
  }

  // Usuario normal intentando acceder a ruta de admin
  if (adminOnly && !isAdmin) {
    return <Navigate to={paths.user.landingPage} replace />;
  }

  return <>{children}</>;
}
