import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IGroup } from '../../interfaces/interfaceGroup';
import { OrdersService } from '../../services';
import { AxiosError } from 'axios';

interface IState {
  groups: IGroup[];
  newGroup: IGroup;
}
const initialState: IState = {
  groups: [],
  newGroup: null,
};

const getGroups = createAsyncThunk<IGroup[], void>(
  'groupsSlice/getGroups',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await OrdersService.getGroups();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const createGroup = createAsyncThunk<IGroup, string>(
  'groupsSlice/createGroup',
  async (name, thunkAPI) => {
    try {
      const { data } = await OrdersService.createGroup(name);
      thunkAPI.dispatch(getGroups());
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

const groupsSlice = createSlice({
  name: 'groupsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
      })

      .addCase(createGroup.fulfilled, (state, action) => {
        state.newGroup = action.payload;
      }),
});

const { reducer: groupsReducer, actions } = groupsSlice;

const ActionsGroups = {
  ...actions,
  createGroup,
  getGroups,
};
export { ActionsGroups, groupsReducer };
