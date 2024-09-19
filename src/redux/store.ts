import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { ordersReducer } from './slices/ordersSlice';

const store = configureStore({
  reducer: {
    authReducer,
    ordersReducer,
  },
});
export { store };
