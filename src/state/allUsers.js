import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getAllUsersRequest = createAsyncThunk("ALL_USERS", () => {
  return axios.get("/api/users/all")
  .then((res) => res.data)
  .catch(err=> console.log(err))
});

const allUsersReducer = createReducer([], {
  [getAllUsersRequest.fulfilled]: (state, action) => action.payload,
});

export default allUsersReducer;