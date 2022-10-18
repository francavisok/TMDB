import '../Styles/grid.scss';
import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { Link, useParams } from "react-router-dom";

const Grid = () => {
  const type = useParams().type
  const collection = useSelector((state) => state[type]) || [];
  return (
    <div className="container-grid" >
      {collection.map((item, i) => (
        <Link to={`${item.id}`} key={i} className='anchor'>
          <Card item={item} type={type} />
        </Link>
      ))}
    </div>
  );
};

export default Grid;
