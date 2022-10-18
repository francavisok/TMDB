import '../Styles/card.scss';
import React from "react";

const UserCardItem = ({item}) => {
  return (
    <div className="container-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster}`}
        alt="poster"
      />
      <div className="container-card-flex">
        <h3>{item.name}</h3>
        <p>{item.overview}</p>
      </div>
    </div>
  );
};

export default UserCardItem;
