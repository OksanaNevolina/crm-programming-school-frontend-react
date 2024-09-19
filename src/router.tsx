import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthLayout, MainLayout } from './components';
import { AuthPage, OrdersPage } from './pages';

const router = createBrowserRouter([
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={'login'} />,
      },
      {
        path: 'login',
        element: <AuthPage />,
      },
    ],
  },
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: 'orders',
        element: <OrdersPage />,
      },
    ],
  },
]);
export { router };
