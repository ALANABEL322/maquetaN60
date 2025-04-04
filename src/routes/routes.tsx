import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { paths } from './paths';

// Layouts
import AdminLayout from '@/layouts/AdminLayout';
import UserLayout from '@/layouts/UserLayout';

// Auth pages
import LoginForm from '@/screens/authScreens/loginForm';
import RegisterForm from '@/screens/authScreens/registerForm';

// Admin pages
import UsersPage from '@/screens/(admin)/users';
import ReportsPage from '@/screens/(admin)/reports';
import AdminSupportPage from '@/screens/(admin)/support';
import DashboardAdmin from '@/screens/(admin)/dashboard';

// User pages
import CreateProject from '@/screens/(user)/createProject';
import Projects from '@/screens/(user)/projects';
import UserSupportPage from '@/screens/(user)/support';
import LandingPage from '@/screens/(user)/landingPage';
import ProtectedRoute from './ProtectedRoute';

// Guards
// import { AuthGuard } from './guards/AuthGuard';

export const publicRoutes: RouteObject[] = [
  {
    path: paths.auth.login,
    element: <LoginForm />
  },
  {
    path: paths.auth.register,
    element: <RegisterForm />
  }
];

export const adminRoutes: RouteObject[] = [
  {
    path: paths.admin.root,
    element: (
      <ProtectedRoute adminOnly>
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={paths.admin.dashboard} replace />
      },
      {
        path: 'dashboard',
        element: <DashboardAdmin />
      },
      {
        path: 'users',
        element: <UsersPage />
      },
      {
        path: 'reports',
        element: <ReportsPage />
      },
      {
        path: 'support',
        element: <AdminSupportPage />
      }
    ]
  }
];


export const userRoutes: RouteObject[] = [
  {
    path: paths.user.root,
    element: (
      <ProtectedRoute userOnly>
        <UserLayout>
          <Outlet />
        </UserLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={paths.user.landingPage} replace />
      },
      {
        path: 'landingPage',
        element: <LandingPage />
      },
      {
        path: 'createProject',
        element: <CreateProject />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'support',
        element: <UserSupportPage />
      }
    ]
  }
];

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...adminRoutes,
  ...userRoutes
];
