import '../Styles/sidebar.scss'
import React from "react";
import { useDispatch } from "react-redux";
import List from "../commons/List";
import useInput from "../hooks/useInput";

import { getMoviesBySearchRequest } from "../state/movies";
import { getTvsBySearchRequest } from "../state/tvs";

import { useParams } from "react-router";

const Sidebar = () => {
  const search = useInput();
  const dispatch = useDispatch();
  const params = useParams();
  let type = "";

  params.type === "movies" ? (type = "Peliculas") : (type = "Series de TV");

  const handleSubmit = (e) => {
    e.preventDefault();

    const valueEncoded = encodeURIComponent(search.value);

    const titulo = document.querySelector("#titulo-peliculas");
    titulo.innerText = "Resultados de tu busqueda";

    params.type === "movies"
      ? dispatch(getMoviesBySearchRequest(valueEncoded))
      : dispatch(getTvsBySearchRequest(valueEncoded));

  };

  return (
    <div className='container-sidebar'>
      <h3>{type}</h3>
      <form onSubmit={handleSubmit}>
        <input
          {...search}
          type="text"
          placeholder={`Buscar ${type}`}
          id="input-peliculas"
        />
      </form>
      <h4>Genero</h4>
      <section>
        <List type={params.type} />
      </section>
    </div>
  );
};

export default Sidebar;
