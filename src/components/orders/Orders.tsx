import { Pagination } from '@mui/material';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { ordersActions } from '../../redux';
import { Order } from './order';

const Orders = () => {
  const { orders, itemsFound } = useAppSelector((state) => state.ordersReducer);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams({ page: '1' });
  const page = query.get('page');
  useEffect(() => {
    dispatch(ordersActions.getOrders({ page }));
  }, [dispatch, page]);
  return (
    <div>
      <div>
        <Order orders={orders} />
      </div>
      <Pagination
        count={itemsFound}
        defaultPage={+query.get('page')}
        size="large"
        variant="outlined"
        color="standard"
        onChange={(event, page) => setQuery({ page: page.toString() })}
      />
    </div>
  );
};

export { Orders };
