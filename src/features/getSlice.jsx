import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firms: [],
    brands: [],
    categories:[],
    products:[],
    purchases: [],
    sales : [],
    loading: false,
    error: false
}

const getSlice = createSlice({
  name: "getData",
  initialState,
  reducers: {
      fetchStart: (state) => {
        state.loading = true
      },
      getDataSuccess: (state,{ payload }) => {
        state.loading = false
        state[payload.key] = payload.data.data
        state.error = false
      },
      fetchFail: (state) => {
        state.loading = false
        state.error = true
      },
  }
});

export const {fetchStart,getDataSuccess,fetchFail} = getSlice.actions

export default getSlice.reducer