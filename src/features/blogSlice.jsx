import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  likes: [],
  categories: [],
  cardDetail: [],
  comments: [],
  totalPages: 0,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      
    },
    getSuccess: (state, { payload: { path, data } }) => {
      state.loading = false;
      state[path] = data;
    },
    getLikeSuccess: (state, { payload}) => {
      state.loading = false;
      state.likes = payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, getLikeSuccess, fetchFail } = blogSlice.actions;
export default blogSlice.reducer;
