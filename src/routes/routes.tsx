import { routeGenarator } from '@/utils/routeGenerator';
import { createBrowserRouter } from 'react-router-dom';
import { frontendPageRoutes } from './frontend.routes';
import MainLayout from '@/components/layout/MainLayout';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import BackendLayout from '@/components/layout/BackendLayout';
import ErrorPage from '@/components/shared/ErrorPage';
import { adminPaths } from './admin.routes';
import { userPaths } from './user.routes';
import ProtectRoute from './ProtectRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: routeGenarator(frontendPageRoutes),
  },
  {
    path: '/admin',
    element: (
      <ProtectRoute role="admin">
        <BackendLayout />
      </ProtectRoute>
    ),
    errorElement: <ErrorPage />,
    children: routeGenarator(adminPaths),
  },
  {
    path: '/user',
    element: (
      <ProtectRoute role="user">
        <BackendLayout />
      </ProtectRoute>
    ),
    errorElement: <ErrorPage />,
    children: routeGenarator(userPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default router;
