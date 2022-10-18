import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const createMovieFavoriteRequest = createAsyncThunk(
  "FAVORITE_MOVIE",
  (objMovie, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (!user.id) throw new Error("You need to be logged in");
    return axios
      .post(`/api/favoritesMovies?userId=${user.id}`, objMovie)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
);

export const deleteMovieFavoriteRequest = createAsyncThunk(
  "FAVORITE_MOVIE_DELETE",
  (movieId, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (!user.id) throw new Error("You need to be logged in");
    return axios
      .delete(`/api/favoritesMovies?userId=${user.id}&movieId=${movieId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }
);

export const getAllFavoritesFromUser = createAsyncThunk(
  "GET_FAVORITES_FROM_USER",
  (userId, thunkAPI) => {
    return axios
      .get(`/api/favoritesMovies?userId=${userId}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
);

const favoriteMovieReducer = createReducer([], {
  [createMovieFavoriteRequest.fulfilled]: (state, action) => {
    state.favorites.push(action.payload);
  },
  [deleteMovieFavoriteRequest.fulfilled]: (state, action) => {
    state.favorites = state.favorites.filter((movie) => {
      return movie.id !== action.payload.id;
    });
  },
  [getAllFavoritesFromUser.fulfilled]: (state, action) => action.payload,
});

export default favoriteMovieReducer;
