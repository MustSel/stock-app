import { createSlice } from "@reduxjs/toolkit"

const loadStateFromStorage = () => {
  try {
    const serializedState = sessionStorage.getItem("user");
    if (serializedState === null) {
      return {
        user: "",
        token: "",
        loading: false,
        error: false
      };
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return {
      user: "",
      token: "",
      loading: false,
      error: false
    };
  }
};


const initialState = loadStateFromStorage();

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
      sessionStorage.setItem("user", JSON.stringify({
        user:payload.user.username,
        token:payload.token,
        loading:false,
        error:false,
      }))
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
      sessionStorage.removeItem("user")
    }
  },
})

export const {fetchStart, loginSuccess, fetchFail, registerSuccess, logoutSuccess} = authSlice.actions
export default authSlice.reducer
