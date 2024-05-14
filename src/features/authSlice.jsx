import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: "",
  token: "",
  loading: false,
  error: false,
}

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    fetchStart: (state)=> {
      state.loading = true
    },
    loginSuccess: (state, {payload})=> {
      state.loading = false
      state.user = payload.user.username
      state.token = payload.token
      state.error = false
      
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
    registerSuccess: (state, {payload}) => {
      state.loading = false
      state.user = payload.data.username
      state.token = payload.token
      state.error = false
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.user = ""
      state.token = ""
      state.error = false
    }
  },
})

export const {fetchStart, loginSuccess, fetchFail, registerSuccess, logoutSuccess} = authSlice.actions
export default authSlice.reducer
