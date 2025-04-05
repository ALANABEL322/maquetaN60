export const paths = {
  // Auth routes
  auth: {
    login: '/login',
    register: '/register',
  },
  // Admin routes
  admin: {
    root: '/admin',
    perfil: '/admin/perfil',
    metricas: '/admin/metricas',
    users: '/admin/users',
    support: '/admin/support',
  },
  // User routes
  user: {
    root: '/user',
    landingPage: '/user/landingPage',
    createProject: '/user/createProject',
    projects: '/user/projects',
    support: '/user/support',
  },
  // Root route
  root: '/',
} as const;
