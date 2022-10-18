import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Routes, Route } from "react-router";

import "../Styles/app.scss";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import MovieContent from "../commons/MovieContent";
import TvShowContent from "../commons/TvShowContent";
import Register from "./Register";
import Login from "./Login";
import User from "./User";
import Users from "./Users";
import UserCard from "../commons/UserCard";
import Footer from "./Footer";
import Home from "./Home";

import { getGenresMoviesRequest } from "../state/genresMovies";
import { getGenresTvRequest } from "../state/genresTv";
import { getUserRequest } from "../state/user";
import { getAllFavoritesFromUser } from "../state/favoritesMovies";
import { getAllFavoritesTvFromUser } from "../state/favoritesTvShows";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getGenresMoviesRequest());
    dispatch(getGenresTvRequest());
    dispatch(getUserRequest());
  }, [dispatch]);

  useEffect(() => {
    if (user.id) {
      dispatch(getAllFavoritesFromUser(user.id));
      dispatch(getAllFavoritesTvFromUser(user.id));
    }
  }, [user.id, dispatch]);

  return (
    <div className="main-container">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {user.id ? (
            <>
              <Route path="/user" element={<User />} />
              <Route path="/collection/users" element={<Users />} />
              <Route path="/collection/users/:id" element={<UserCard />} />
            </>
          ) : (
            "loading"
          )}
          <Route path="/collection/movies/:id" element={<MovieContent />} />
          <Route path="/collection/tv/:id" element={<TvShowContent />} />
          <Route
            path="/collection/:type"
            element={
              <div className="partitioned-container">
                <Sidebar />
                <Content />
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
