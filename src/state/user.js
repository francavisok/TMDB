import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getUserRequest = createAsyncThunk("USER", () => {
  return axios.get("/api/users/me")
  .then((res) => res.data)
  .catch(err=> console.log(err))
});


export const postUserRequest = createAsyncThunk("NEW_USER", (userObj, thunkAPI) => {
  return axios.post("/api/users/register", userObj)
  .then((res) => res.data);

});

export const postLoginUserRequest = createAsyncThunk("LOGIN_USER", (userObj, thunkAPI) => {
  return axios.post("/api/users/login", userObj)
  .then((res) => res.data)
  .catch(err=> console.log(err))
});

export const postLogoutUserRequest = createAsyncThunk("LOGOUT_USER", (userObj, thunkAPI) => {
  return axios.post("/api/users/logout", userObj)
  .then((res) => res.data)
  .catch(err=> console.log(err))
});

const userReducer = createReducer([], {
  [getUserRequest.fulfilled]: (state, action) => action.payload,
  [postUserRequest.fulfilled]: (state, action) => action.payload,
  [postLoginUserRequest.fulfilled]: (state, action) => action.payload,
  [postLogoutUserRequest.fulfilled]: (state, action) => action.payload,
});

export default userReducer;