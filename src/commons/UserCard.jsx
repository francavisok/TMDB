import "../Styles/user.scss";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import UserCardItem from "./UserCardItem";
import { Link } from "react-router-dom";
import { getUserFavoritesRequest } from "../state/oneUserFavorites";

const UserCard = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

   useEffect(() => {
    dispatch(getUserFavoritesRequest(id));
  }, [dispatch, id]);  

  const user = useSelector((state) => state.userFavorites);
  return user.id ? (
    <div className="container-user">
      <div className="sidebar-user">
        <h1>{`${user.name} ${user.lastname}`}</h1>
        <a href="#movies-favs">
          <h3>Peliculas favoritas</h3>
        </a>
        <a href="#tvs-favs">
          <h3>Series favoritas</h3>
        </a>
      </div>

      <div className="container-grids">
        <h2 id="movies-favs">Peliculas Favoritas</h2>
        <ul className="grid-user">
          {user.favorites.length ? (
            user.favorites.map((movie, i) => (
              <Link
                to={`/collection/movies/${movie.itemId}`}
                className="anchor-user"
                key={i}
              >
                <UserCardItem item={movie} />
              </Link>
            ))
          ) : (
            <h5>Usuario no tiene peliculas favoritas</h5>
          )}
        </ul>

        <h2 id="tvs-favs">Series Favoritas</h2>
        <ul className="grid-user">
          {user.favoritestv.length ? (
            user.favoritestv.map((tv, i) => (
              <Link to={`/collection/tv/${tv.itemId}`} className="anchor-user" key={i}>
                <UserCardItem  item={tv} />
              </Link>
            ))
          ) : (
            <h5>Usuario no tiene series favoritas</h5>
          )}
        </ul>
      </div>
    </div>
  ) : (
    "loading"
  );
};

export default UserCard;
