import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  error: false,
  user: "",
  token: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,

  
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.user.username
      state.token = payload.token
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.user = ""
      state.token = ""
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.data.username
      state.token = payload.token
      
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const {
  fetchStart,
  fetchFail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} = authSlice.actions
export default authSlice.reducer