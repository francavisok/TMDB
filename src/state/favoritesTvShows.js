import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const createTvFavoriteRequest = createAsyncThunk(
  "FAVORITE_TV",
  (objTv, thunkAPI) => {
    console.log(objTv)
    const { user } = thunkAPI.getState();
    if (!user.id) throw new Error("You need to be logged in");
    return axios
      .post(`/api/favoritesTv?userId=${user.id}`, objTv)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
);

export const deleteTvFavoriteRequest = createAsyncThunk(
  "FAVORITE_TV_DELETE",
  (tvId, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (!user.id) throw new Error("You need to be logged in");
    return axios
      .delete(`/api/favoritesTv?userId=${user.id}&tvShowId=${tvId}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
  }
);

export const getAllFavoritesTvFromUser = createAsyncThunk(
  "GET_FAVORITES_TV_FROM_USER",
  (userId, thunkAPI) => {
    return axios
      .get(`/api/favoritesTv?userId=${userId}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
);

const favoriteTvReducer = createReducer([], {
  [createTvFavoriteRequest.fulfilled]: (state, action) => {
    state.favoritestv.push(action.payload);
  },
  [deleteTvFavoriteRequest.fulfilled]: (state, action) => {
    state.favoritestv = state.favoritestv.filter((tv) => {
      return tv.id !== action.payload.id;
    });
  },
  [getAllFavoritesTvFromUser.fulfilled]: (state, action) => action.payload,
});

export default favoriteTvReducer;