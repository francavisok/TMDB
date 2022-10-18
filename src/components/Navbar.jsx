import React from "react";
import "../Styles/navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postLogoutUserRequest } from "../state/user";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function handleClick(e) {
    e.preventDefault();
    dispatch(postLogoutUserRequest());
    navigate("/");
  }
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt=""
          />
        </Link>
        <div>
          <Link to="/collection/movies">
            <button>Peliculas</button>
          </Link>
          <Link to="/collection/tv">
            <button>Series</button>
          </Link>
        </div>
        {user.email ? (
          <div>
            <Link to="/collection/users">
              <button>Usuarios</button>
            </Link>
            <Link to="/user">
              <button id="user-btn">{`${user.name[0]} ${user.lastname[0]}`}</button>
            </Link>
            <button onClick={handleClick}>Log out</button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button>Log in</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
