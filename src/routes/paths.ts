export const paths = {
  // Auth routes
  auth: {
    login: '/login',
    register: '/register',
  },
  // Admin routes
  admin: {
    root: '/admin',
    users: '/admin/users',
    reports: '/admin/reports',
    support: '/admin/support',
  },
  // User routes
  user: {
    root: '/dashboard',
    createProject: '/dashboard/createProject',
    projects: '/dashboard/projects',
    support: '/dashboard/support',
  },
} as const;
