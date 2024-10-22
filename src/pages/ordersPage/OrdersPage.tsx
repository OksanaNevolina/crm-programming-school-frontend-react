import React from 'react';
import { Outlet } from 'react-router-dom';

import { Orders } from '../../components';

const OrdersPage = () => {
  return (
    <div>
      <Orders />
      <Outlet />
    </div>
  );
};

export { OrdersPage };
