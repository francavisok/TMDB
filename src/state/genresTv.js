import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getGenresTvRequest = createAsyncThunk("GENEROS_TV", () => {
  return axios.get(`/api/tv/search/genres`)
  .then((res) => res.data);
});

const genresTvReducer = createReducer([], {
  [getGenresTvRequest.fulfilled]: (state, action) => action.payload,
});

export default genresTvReducer;