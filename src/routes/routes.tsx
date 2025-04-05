import { Outlet, RouteObject } from 'react-router-dom';
import { paths } from './paths';

// Layouts
import Layout from '@/components/layout/Layout';
import AuthLayout from '@/screens/authScreens/authLayout';

// Auth pages
import LoginForm from '@/screens/authScreens/loginForm';
import RegisterForm from '@/screens/authScreens/registerForm';
import Home from '@/screens/home';

// Admin pages
import AdminSupportPage from '@/screens/(admin)/support';
import Perfil from '@/screens/(admin)/perfil';
import Metricas from '@/screens/(admin)/metricas';
import UsersPage from '@/screens/(admin)/users';

// User pages
import CreateProject from '@/screens/(user)/createProject';
import Projects from '@/screens/(user)/projects';
import UserSupportPage from '@/screens/(user)/support';
import LandingPage from '@/screens/(user)/landingPage';
import ProtectedRoute from './ProtectedRoute';

export const publicRoutes: RouteObject[] = [
  {
    path: paths.root,
    element: <Home />
  },
  {
    path: paths.auth.login,
    element: (
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    )
  },
  {
    path: paths.auth.register,
    element: (
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    )
  }
];

export const adminRoutes: RouteObject[] = [
  {
    path: paths.admin.root,
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: paths.admin.perfil,
        element: <Perfil />
      },
      {
        path: paths.admin.metricas,
        element: <Metricas />
      },
      {
        path: paths.admin.users,
        element: <UsersPage />
      },
      {
        path: paths.admin.support,
        element: <AdminSupportPage />
      }
    ]
  }
];

export const userRoutes: RouteObject[] = [
  {
    path: paths.user.root,
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: paths.user.landingPage,
        element: <LandingPage />
      },
      {
        path: paths.user.createProject,
        element: <CreateProject />
      },
      {
        path: paths.user.projects,
        element: <Projects />
      },
      {
        path: paths.user.support,
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
