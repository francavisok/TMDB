import "../Styles/card.scss";
import React from "react";

const Card = ({ item, type }) => {
  return (
    <div className="container-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt="poster"
      />
      <div className="container-card-flex">
        <h3>{type === "movies" ? item.title : item.name}</h3>
        <p>{item.overview}</p>
      </div>
    </div>
  );
};

export default Card;
