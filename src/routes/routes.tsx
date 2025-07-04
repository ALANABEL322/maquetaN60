import { Outlet, RouteObject } from "react-router-dom";
import { paths } from "./paths";

// Layouts
import Layout from "@/components/layout/Layout";
import AuthLayout from "@/screens/authScreens/authLayout";

// Auth pages
import LoginForm from "@/screens/authScreens/loginForm";
import RegisterForm from "@/screens/authScreens/registerForm";
import Home from "@/screens/home";

// Admin pages
import AdminSupportPage from "@/screens/(admin)/support";
import Perfil from "@/screens/(admin)/perfil";
import Metricas from "@/screens/(admin)/metricas";
import UsersPage from "@/screens/(admin)/users";

// User pages
import CreateProject from "@/screens/(user)/createProject";
import Projects from "@/screens/(user)/projects";
import UserSupportPage from "@/screens/(user)/support";
import LandingPage from "@/screens/(user)/landingPage";
import Tareas from "@/screens/(user)/tareas";
import Monitoreo from "@/screens/(user)/monitoreo";
import Tutoriales from "@/screens/(user)/tutoriales";
import Capacitacion from "@/screens/(user)/capacitacion";
import MonitoreoIA from "@/screens/(user)/monitoreoIA";

import ProtectedRoute from "./ProtectedRoute";

export const publicRoutes: RouteObject[] = [
  {
    path: paths.root,
    element: <Home />,
  },
  {
    path: paths.auth.login,
    element: (
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    ),
  },
  {
    path: paths.auth.register,
    element: (
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    ),
  },
];

export const adminRoutes: RouteObject[] = [
  {
    path: paths.admin.root,
    element: (
      <ProtectedRoute adminOnly>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: paths.admin.perfil,
        element: <Perfil />,
      },
      {
        path: paths.admin.metricas,
        element: <Metricas />,
      },
      {
        path: paths.admin.users,
        element: <UsersPage />,
      },
      {
        path: paths.admin.support,
        element: <AdminSupportPage />,
      },
    ],
  },
];

export const userRoutes: RouteObject[] = [
  {
    path: paths.user.root,
    element: (
      <ProtectedRoute userOnly>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: paths.user.landingPage,
        element: <LandingPage />,
      },
      {
        path: paths.user.createProject,
        element: <CreateProject />,
      },
      {
        path: paths.user.projects,
        element: <Projects />,
      },
      {
        path: paths.user.tareas,
        element: <Tareas />,
      },
      {
        path: paths.user.capacitacion,
        element: <Capacitacion />,
      },
      {
        path: paths.user.tutoriales,
        element: <Tutoriales />,
      },
      {
        path: paths.user.monitoreo,
        element: <Monitoreo />,
      },
      {
        path: paths.user.monitoreoIA,
        element: <MonitoreoIA />,
      },
      {
        path: paths.user.support,
        element: <UserSupportPage />,
      },
    ],
  },
];

// export const routes: RouteObject[] = [
//   ...publicRoutes,
//   ...adminRoutes,
//   ...userRoutes,
// ];
