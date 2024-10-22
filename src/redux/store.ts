import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { ordersReducer } from './slices/ordersSlice';
import { groupsReducer } from './slices/groupsSlice';

const store = configureStore({
  reducer: {
    authReducer,
    ordersReducer,
    groupsReducer,
  },
});
export { store };
