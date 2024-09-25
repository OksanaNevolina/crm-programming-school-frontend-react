import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IOrder, IPaginationResponse } from '../../interfaces';
import { OrdersService } from '../../services';

interface IState {
  orders: IOrder[];
  page: number;
  errors: boolean;
  itemsFound: number;
  limit: number;
}
const initialState: IState = {
  orders: [],
  page: 0,
  errors: null,
  itemsFound: 0,
  limit: 0,
};

const getOrders = createAsyncThunk<
  IPaginationResponse,
  { page: string; order: string; sortOrder: string } // Додаємо order і sortOrder
>(
  'ordersSlice/getOrders',
  async ({ page, order, sortOrder }, { rejectWithValue }) => {
    try {
      const { data } = await OrdersService.getAll(page, order, sortOrder); // Передаємо ці параметри в сервіс
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getOrders.fulfilled, (state, action) => {
      const { page, data, limit, itemsFound } = action.payload;
      state.page = page;
      state.orders = data;
      state.itemsFound = itemsFound;
      state.limit = limit;
    }),
});
const { reducer: ordersReducer, actions } = ordersSlice;
const ordersActions = {
  ...actions,
  getOrders,
};
export { ordersActions, ordersReducer };
