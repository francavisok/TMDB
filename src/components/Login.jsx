import '../Styles/form.scss';
import React from "react";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { postLoginUserRequest } from "../state/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      postLoginUserRequest({ email: email.value, password: password.value})
    )
    navigate("/");
  }

  return (
    <div className='container-form'>
      <h2>Ingresa a tu cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input {...email} type="email" />
        </label>
        <label>
          Contraseña
          <input {...password} type="password" />
        </label>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
