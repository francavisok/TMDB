import '../Styles/content.scss';
import React from "react";
import Grid from "../commons/Grid";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getMoviesRequest } from "../state/movies";
import { getTvsRequest } from "../state/tvs";

const Content = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesRequest());
    dispatch(getTvsRequest());
    const titulo = document.querySelector("#titulo-peliculas");
    titulo.innerText = 'Mas populares'
  }, [dispatch]);
  return (
    <div className='container-content' >
      <h2 id="titulo-peliculas">Mas populares</h2>
      <Grid />
    </div>
  );
};

export default Content;
