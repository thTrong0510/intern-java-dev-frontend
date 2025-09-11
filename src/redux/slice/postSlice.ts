import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchPost } from 'config/api';
import type { IPost, IModelPaginate } from 'types/backend';

interface PostState {
  isFetching: boolean;
  meta: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IPost[];
}

export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async ({ query }: { query: string }) => {
    const response = await callFetchPost(query);
    return response.data.data as IModelPaginate<IPost>;
  }
);

const initialState: PostState = {
  isFetching: false,
  meta: {
    page: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  },
  result: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isFetching = false;
      state.meta = action.payload.meta;
      state.result = action.payload.result;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export default postSlice.reducer;
