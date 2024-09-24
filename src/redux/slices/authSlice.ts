import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAuth, IUser } from '../../interfaces';
import { AuthService } from '../../services';

interface IState {
  errors: {
    username?: string[];
    detail?: string;
  };
  me: IUser;
}

const initialState: IState = {
  errors: null,
  me: null,
};

const getMe = createAsyncThunk<IUser, void>(
  'authSlice/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.getMe();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const login = createAsyncThunk<IUser, { user: IAuth }>(
  'authSlice/login',
  async ({ user }, { rejectWithValue }) => {
    try {
      return await AuthService.login(user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addMatcher(isRejected(), (state, action) => {
        state.errors = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.errors = null;
      }),
});

const { reducer: authReducer, actions } = authSlice;

const authActions = {
  ...actions,
  login,
  getMe,
};

export { authActions, authReducer };
