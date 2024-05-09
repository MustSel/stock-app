import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import getReducer from "../features/getSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    getData: getReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
