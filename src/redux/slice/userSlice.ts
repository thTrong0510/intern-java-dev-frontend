import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IUser, IModelPaginate } from 'types/backend';
import { callFetchUser } from 'config/api';

interface UserState {
  isFetching: boolean;
  meta: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IUser[];
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ query }: { query: string }) => {
    const response = await callFetchUser(query);
    return response.data.data as IModelPaginate<IUser>;
  }
);

const initialState: UserState = {
  isFetching: false,
  meta: {
    page: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  },
  result: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.meta = action.payload.meta;
      state.result = action.payload.result;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export default userSlice.reducer;
