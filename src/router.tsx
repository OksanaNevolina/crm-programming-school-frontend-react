import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthLayout, MainLayout, OrderDetails } from './components';
import { AuthPage, ErrorPage, OrdersPage } from './pages';

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
        children: [
          {
            path: ':orderId',
            element: <OrderDetails />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
export { router };
