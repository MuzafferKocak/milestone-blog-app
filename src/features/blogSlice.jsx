import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  likes: [],
  categories: [],
  cardDetail: [],
  comments: [],
  totalPages: 0,
  loading: false,
  error: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { path, data } }) => {
      state.loading = false;
      state[path] = data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail } = blogSlice.actions;
export default blogSlice.reducer;
