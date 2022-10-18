import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getMoviesRequest = createAsyncThunk("MOVIES", () => {
  return axios.get("/api/movies/search/popular")
  .then((res) => res.data);
});

export const getMoviesByGenreRequest = createAsyncThunk("MOVIES_BY_GENRE", (genreId, thunkAPI) => {
    return axios.get(`/api/movies/search/genres/${genreId}`)
    .then((res) => res.data);
  });

  export const getMoviesBySearchRequest = createAsyncThunk("MOVIES_BY_SEARCH", (name, thunkAPI) => {
    return axios.get(`/api/movies/search?name=${name}`)
    .then((res) => res.data);
  });

const moviesReducer = createReducer([], {
  [getMoviesRequest.fulfilled]: (state, action) => action.payload,
  [getMoviesByGenreRequest.fulfilled]: (state, action) => action.payload,
  [getMoviesBySearchRequest.fulfilled]: (state, action) => action.payload,

});

export default moviesReducer;