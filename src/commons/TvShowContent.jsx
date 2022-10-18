import '../Styles/itemCard.scss'
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactTooltip from "react-tooltip";

import { getTvRequest } from "../state/tv";
import { createTvFavoriteRequest } from "../state/favoritesTvShows";

import { FaHeart } from "react-icons/fa";

const TvShowContent = () => {
  const favoriteTv = useSelector((state) => state.favoriteTv);
  const user = useSelector((state) => state.user);


  const isAlreadyAdded = (id) => {
    let arrIds=[];
    if (favoriteTv.id) {
      arrIds = favoriteTv.favoritestv.map((tv) => tv.itemId);
    }
    return arrIds.includes(parseInt(id));
  };

  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTvRequest(id));
  }, [dispatch, id]);

  const item = useSelector((state) => state.tvShow);

  function handleClick(e) {
    e.preventDefault();

    if (isAlreadyAdded(id)) return;

    dispatch(
      createTvFavoriteRequest({
        name: item.name,
        poster: item.poster_path,
        overview: item.overview,
        itemId: item.id,
      })
    );
  }

  return (
    <div className="container-item-card">
      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
      <div>
        <h1>{item.name}</h1>
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

export default TvShowContent;
