import "../Styles/itemCard.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactTooltip from "react-tooltip";

import { getMovieRequest } from "../state/movie";
import { createMovieFavoriteRequest } from "../state/favoritesMovies";

import { FaHeart } from "react-icons/fa";

const MovieContent = () => {
  const favoriteMovie = useSelector((state) => state.favoriteMovie);
  const user = useSelector((state) => state.user);

  const isAlreadyAdded = (id) => {
    let arrIds=[];
    if (favoriteMovie.id) {
      arrIds = favoriteMovie.favorites.map((movie) => movie.itemId);
    }
    return arrIds.includes(parseInt(id));
  };

  const id = useParams().id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieRequest(id));
  }, [dispatch, id]);

  const item = useSelector((state) => state.movie);

  function handleClick(e) {
    e.preventDefault();

    if (isAlreadyAdded(id)) return;

    dispatch(
      createMovieFavoriteRequest({
        name: item.title,
        poster: item.poster_path,
        overview: item.overview,
        itemId: item.id,
      })
    );
  }

  return (
    <div className="container-item-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt="poster pelicula"
      />
      <div>
        <h1>{item.title}</h1>
        {user.id && (
          <>
            <ReactTooltip
              id="favorite-heart"
              data-event="click"
              data-place="right"
            />
            <FaHeart
              onClick={handleClick}
              className="icon-heart"
              data-for="favorite-heart"
              data-tip={
                isAlreadyAdded(id)
                  ? "item ya existe en tu lista de favoritos"
                  : "agregar a favoritos"
              }
            />
          </>
        )}

        <h4>Genero</h4>
        <ul>
          {item.genres?.map((genre, i) => (
            <li key={i}>{genre.name}</li>
          ))}
        </ul>
        <h4>Descripcion</h4>
        <p>{item.overview}</p>
      </div>
    </div>
  );
};

export default MovieContent;
