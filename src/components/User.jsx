import "../Styles/user.scss";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteMovieCard from "../commons/FavoriteMovieCard";
import FavoriteTvCard from "../commons/favoriteTvCard";

const User = () => {
  //const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favoriteMovie = useSelector((state) => state.favoriteMovie);
  const favoriteTv = useSelector((state) => state.favoriteTv);

  return (
    <div className="container-user">
      <div className="sidebar-user">
        <h1>{`${user.name} ${user.lastname}`}</h1>
        <h4>{user.email}</h4>
        <a href="#movies-fav">
          <h3>Peliculas favoritas</h3>
        </a>
        <a href="#tvs-fav">
          <h3>Series favoritas</h3>
        </a>
      </div>

      <div className="container-grids">
        <h2 id="movies-fav">Peliculas Favoritas</h2>
        <ul className="grid-user">
          {favoriteMovie.favorites?.map((movie, i) => (
            <Link
              to={`/collection/movies/${movie.itemId}`}
              className="anchor-user"
              key={i}
            >
              <FavoriteMovieCard key={i} item={movie} />
            </Link>
          ))}
        </ul>
        <h2 id="tvs-fav">Series Favoritas</h2>
        <ul className="grid-user">
          {favoriteTv.favoritestv?.map((tv, i) => (
            <Link
              to={`/collection/tv/${tv.itemId}`}
              className="anchor-user"
              key={i}
            >
              <FavoriteTvCard key={i} item={tv} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
