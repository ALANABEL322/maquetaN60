import { useRoutes, Navigate } from 'react-router-dom'
import { publicRoutes, adminRoutes, userRoutes } from './routes'
import { paths } from './paths'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={paths.auth.login} replace />,
    },
    ...publicRoutes,
    ...adminRoutes,
    ...userRoutes,
    {
      path: '*',
      element: <Navigate to={paths.auth.login} replace />,
    },
  ])
}