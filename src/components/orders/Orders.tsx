import { Pagination } from '@mui/material';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { ordersActions } from '../../redux';
import { Order } from './order';

const Orders = () => {
  const { orders, itemsFound } = useAppSelector((state) => state.ordersReducer);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams({
    page: '1',
    order: 'id',
    sortOrder: 'DESC',
  });
  const page = query.get('page');
  const order = query.get('order');
  const sortOrder = query.get('sortOrder');

  useEffect(() => {
    dispatch(ordersActions.getOrders({ page, order, sortOrder }));
  }, [dispatch, page, order, sortOrder]);

  const handleSort = (column: string) => {
    const newSortOrder =
      order === column && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setQuery({ page: page.toString(), order: column, sortOrder: newSortOrder });
  };

  return (
    <div>
      <div>
        <Order
          orders={orders}
          onSort={handleSort}
          currentOrder={order}
          currentSortOrder={sortOrder}
        />
      </div>
      <Pagination
        count={itemsFound}
        defaultPage={+query.get('page')}
        size="large"
        variant="outlined"
        color="standard"
        onChange={(event, page) =>
          setQuery({ page: page.toString(), order, sortOrder })
        }
      />
    </div>
  );
};

export { Orders };
