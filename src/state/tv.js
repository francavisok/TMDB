import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getTvRequest = createAsyncThunk("TV", (id, thunkAPI) => {
    return axios.get(`/api/tv/search/${id}`)
  .then((res) => res.data);
});

const tvReducer = createReducer([], {
  [getTvRequest.fulfilled]: (state, action) => action.payload,
});

export default tvReducer;