import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",

  initialState: {
    error: false,
    loading: false,
    token: null,
    currentUser: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = false
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.currentUser = payload?.user
      state.isAdmin = payload?.user?.is_superuser
      state.token = payload?.key
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.currentUser = null
      state.token = null
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false
      state.currentUser = payload?.username
      state.token = payload?.token
      state.error = false
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} = authSlice.actions
export default authSlice.reducer