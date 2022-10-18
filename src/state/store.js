import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import genresMoviesReducer from "./genresMovies";
import genresTvReducer from "./genresTv";
import moviesReducer from "./movies";
import tvsReducer from "./tvs";
import tvReducer from "./tv";
import movieReducer from "./movie";
import userReducer from "./user";
import favoriteMovieReducer from "./favoritesMovies";
import favoriteTvReducer from "./favoritesTvShows";
import allUsersReducer from "./allUsers";
import oneUserFavoritesReducer from "./oneUserFavorites";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    genresMovies: genresMoviesReducer,
    genresTv: genresTvReducer,
    movies: moviesReducer,
    movie: movieReducer,
    favoriteMovie: favoriteMovieReducer,
    tv: tvsReducer,
    tvShow: tvReducer,
    favoriteTv: favoriteTvReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userFavorites: oneUserFavoritesReducer,
  },
});

export default store;
