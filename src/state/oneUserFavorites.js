import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getUserFavoritesRequest = createAsyncThunk("ONE_USER_FAVORITES", (userId) => {
  return axios.get(`/api/users/search/${userId}`)
  .then((res) => res.data)
  .catch(err=> console.log(err))
});

const oneUserFavoritesReducer = createReducer([{favorites: [], favoritestv:[]}], {
  [getUserFavoritesRequest.fulfilled]: (state, action) => action.payload,
});

export default oneUserFavoritesReducer;