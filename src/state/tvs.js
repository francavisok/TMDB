import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getTvsRequest = createAsyncThunk("TVS", () => {
  return axios.get("/api/tv/search/popular")
  .then((res) => res.data);
});

export const getTvsByGenreRequest = createAsyncThunk("TVS_BY_GENRE", (genreId, thunkAPI) => {
    return axios.get(`/api/tv/search/genres/${genreId}`)
    .then((res) => res.data);
  });

  export const getTvsBySearchRequest = createAsyncThunk("TVS_BY_SEARCH", (name, thunkAPI) => {
    return axios.get(`/api/tv/search?name=${name}`)
    .then((res) => res.data);
  });

const tvsReducer = createReducer([], {
  [getTvsRequest.fulfilled]: (state, action) => action.payload,
  [getTvsByGenreRequest.fulfilled]: (state, action) => action.payload,
  [getTvsBySearchRequest.fulfilled]: (state, action) => action.payload,

});

export default tvsReducer;