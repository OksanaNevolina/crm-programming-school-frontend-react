import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IOrder, IPaginationResponse } from '../../interfaces';
import { IComment } from '../../interfaces/InterfaceComment';
import { OrdersService } from '../../services';

interface IState {
  orders: IOrder[];
  page: number;
  error: string;
  itemsFound: number;
  limit: number;
  order: IOrder;
  comments: IComment[];
  status: string;
}
const initialState: IState = {
  orders: [],
  page: 0,
  error: null,
  itemsFound: 0,
  limit: 0,
  order: null,
  comments: [],
  status: 'idle',
};

const getOrders = createAsyncThunk<
  IPaginationResponse,
  { page: string; order: string; sortOrder: string }
>(
  'ordersSlice/getOrders',
  async ({ page, order, sortOrder }, { rejectWithValue }) => {
    try {
      const { data } = await OrdersService.getAll(page, order, sortOrder);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

export const getOrderById = createAsyncThunk<IOrder, { orderId: number }>(
  'orderSlice/getOrderById',
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await OrdersService.getById(orderId);
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  },
);

const addComment = createAsyncThunk<
  IComment,
  {
    orderId: number;
    comment: string;
  }
>('orderSlice/addComment', async ({ orderId, comment }, thunkAPI) => {
  console.log(orderId, comment);
  try {
    const response = await OrdersService.addComments(orderId, comment);
    thunkAPI.dispatch(getOrderById({ orderId }));
    return response.data;
  } catch (e) {
    const err = e as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        const { page, data, limit, itemsFound } = action.payload;
        state.page = page;
        state.orders = data;
        state.itemsFound = itemsFound;
        state.limit = limit;
      })
      .addCase(getOrderById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
        state.comments = action.payload.comments;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (!state.comments) {
          state.comments = [];
        }
        state.comments.push(action.payload);
      }),
});
const { reducer: ordersReducer, actions } = ordersSlice;
const ordersActions = {
  ...actions,
  getOrders,
  addComment,
  getOrderById,
};
export { ordersActions, ordersReducer };
