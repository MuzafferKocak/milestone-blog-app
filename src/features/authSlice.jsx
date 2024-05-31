import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  error: false,
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,

  
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error= false
      
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.user.username
      state.token = payload.token
    },
    logoutSuccess: (state) => {
      console.log("Logout success called");
      state.loading = false
      state.user = null
      state.token = null
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