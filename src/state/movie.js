import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getMovieRequest = createAsyncThunk("MOVIE", (id, thunkAPI) => {
  return axios.get(`/api/movies/search/${id}`)
  .then((res) => res.data);
});


const movieReducer = createReducer([], {
  [getMovieRequest.fulfilled]: (state, action) => action.payload,
});

export default movieReducer;