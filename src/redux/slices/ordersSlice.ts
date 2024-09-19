import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const ordersSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder,
});
const { reducer: ordersReducer, actions } = ordersSlice;
const ordersActions = {
  ...actions,
};
export { ordersReducer, ordersActions };
