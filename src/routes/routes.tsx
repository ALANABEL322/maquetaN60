import { RouteObject } from 'react-router-dom';
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

// Guards
import { AuthGuard } from './guards/AuthGuard';

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
    element: <AdminLayout><DashboardAdmin /></AdminLayout>,
    children: [
      {
        path: paths.admin.users.replace(paths.admin.root, ''),
        element: <AuthGuard><UsersPage /></AuthGuard>
      },
      {
        path: paths.admin.reports.replace(paths.admin.root, ''),
        element: <AuthGuard><ReportsPage /></AuthGuard>
      },
      {
        path: paths.admin.support.replace(paths.admin.root, ''),
        element: <AuthGuard><AdminSupportPage /></AuthGuard>
      }
    ]
  }
];

export const userRoutes: RouteObject[] = [
  {
    path: paths.user.root,
    element: <UserLayout><LandingPage /></UserLayout>,
    children: [
      {
        path: paths.user.createProject.replace(paths.user.root, ''),
        element: <AuthGuard><CreateProject /></AuthGuard>
      },
      {
        path: paths.user.projects.replace(paths.user.root, ''),
        element: <AuthGuard><Projects /></AuthGuard>
      },
      {
        path: paths.user.support.replace(paths.user.root, ''),
        element: <AuthGuard><UserSupportPage /></AuthGuard>
      }
    ]
  }
];

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...adminRoutes,
  ...userRoutes
];
