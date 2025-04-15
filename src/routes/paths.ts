export const paths = {

  auth: {
    login: "/login",
    register: "/register",
  },

  admin: {
    root: "/admin",
    perfil: "/admin/perfil",
    metricas: "/admin/metricas",
    users: "/admin/users",
    support: "/admin/support",
  },

  user: {
    root: "/user",
    landingPage: "/user",
    createProject: "/user/createProject",
    projects: "/user/projects",
    tareas: "/user/tareas/:projectId",
    capacitacion: "/user/capacitacion",
    tutoriales: "/user/tutoriales",
    monitoreo: "/user/monitoreo/:projectId",
    monitoreoIA: "/user/monitoreoIA/:projectId",
    support: "/user/support",
  },

  root: "/",
} as const;
