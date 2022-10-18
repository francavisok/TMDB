import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMoviesByGenreRequest } from "../state/movies";
import { getTvsByGenreRequest } from "../state/tvs";

const List = ({ type }) => {
  const dispatch = useDispatch();

  const genres = useSelector((state) => type === 'movies' ? state.genresMovies : state.genresTv);

  const handleClickGenre = (e, genreId) => {
    const titulo = document.querySelector("#titulo-peliculas");
    titulo.innerText = e.target.innerText;
    type === 'movies' ? dispatch(getMoviesByGenreRequest(genreId)) : dispatch(getTvsByGenreRequest(genreId));
  };
  return (
    <ul>
      {genres.map((genre, i) => (
        <li key={i} onClick={(e) => handleClickGenre(e, genre.id)}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
