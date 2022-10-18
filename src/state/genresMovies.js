import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getGenresMoviesRequest = createAsyncThunk("GENEROS_MOVIES", () => {
  return axios.get(`/api/movies/search/genres`)
  .then((res) => res.data);
});

const genresMoviesReducer = createReducer([], {
  [getGenresMoviesRequest.fulfilled]: (state, action) => action.payload,
});

export default genresMoviesReducer;