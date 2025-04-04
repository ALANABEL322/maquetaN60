// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '@/store/authStore';
// import { paths } from '../paths';

// interface AuthGuardProps {
//   children: React.ReactNode;
//   requireAuth?: boolean;
// }

// export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
//   const location = useLocation();
//   const { isAuthenticated, isAdmin } = useAuthStore(state => ({
//     isAuthenticated: state.isAuthenticated,
//     isAdmin: state.isAdmin()
//   }));

//   // Usuario no autenticado intentando acceder a ruta protegida
//   if (!isAuthenticated && requireAuth) {
//     return <Navigate to={paths.auth.login} state={{ from: location }} replace />;
//   }

//   // Usuario autenticado intentando acceder a ruta pública (como login/register)
//   if (isAuthenticated && !requireAuth) {
//     const redirectPath = isAdmin 
//       ? `${paths.admin.root}${paths.admin.dashboard}`
//       : `${paths.user.root}${paths.user.landingPage}`;
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <>{children}</>;
// }