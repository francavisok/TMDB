import "../Styles/card.scss";

import React from "react";
import { useDispatch } from "react-redux";

import { deleteMovieFavoriteRequest } from "../state/favoritesMovies";

import { FaTrashAlt } from "react-icons/fa";

const FavoriteMovieCard = ({ item }) => {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(deleteMovieFavoriteRequest(item.itemId));
  }
  return (
    <div className="container-card">
      <img src={`https://image.tmdb.org/t/p/w500${item.poster}`} alt="poster" />
      <div className="container-card-flex">
        <h3>{item.name}</h3>
        <FaTrashAlt onClick={handleClick} className='trashcan' />
        <p>{item.overview}</p>
      </div>
    </div>
  );
};

export default FavoriteMovieCard;
