export const paths = {
  // Auth routes
  auth: {
    login: '/login',
    register: '/register',
  },
  // Admin routes
  admin: {
    root: '/admin',
    dashboard: '/dashboard',
    users: '/users',
    reports: '/reports',
    support: '/support',
  },
  // User routes
  user: {
    root: '/user',
    landingPage: '/landingPage',
    createProject: '/createProject',
    projects: '/projects',
    support: '/support',
  },
  // Root route
  root: '/',
} as const;
