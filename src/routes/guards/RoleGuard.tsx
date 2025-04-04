// import { Navigate } from 'react-router-dom';
// import { useAuthStore } from '@/store/authStore';
// import { paths } from '../paths';

// interface RoleGuardProps {
//   children: React.ReactNode;
//   allowedRoles?: ('admin' | 'user')[]; // Más flexible que solo requireAdmin
// }

// export function RoleGuard({ children, allowedRoles = ['admin'] }: RoleGuardProps) {
//   const { isAdmin, isAuthenticated } = useAuthStore(state => ({
//     isAdmin: state.isAdmin(),
//     isAuthenticated: state.isAuthenticated
//   }));

//   // Primero verificar autenticación (podría combinarse con AuthGuard)
//   if (!isAuthenticated) {
//     return <Navigate to={paths.auth.login} replace />;
//   }

//   // Verificar roles permitidos
//   const hasAccess = allowedRoles.includes(isAdmin ? 'admin' : 'user');
  
//   if (!hasAccess) {
//     return <Navigate to={isAdmin ? paths.admin.dashboard : paths.user.landingPage} replace />;
//   }

//   return <>{children}</>;
// }