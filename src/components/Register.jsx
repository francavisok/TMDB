import '../Styles/form.scss';

import React from "react";

import { postUserRequest } from "../state/user";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import useInput from '../hooks/useInput';


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useInput()
  const lastname = useInput()
  const email = useInput()
  const password = useInput()

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postUserRequest({name: name.value, lastname: lastname.value, email: email.value, password: password.value}))
    
    navigate('/login')
  }

  return (
    <div className='container-form'>
      <h2>Formulario de registro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input {...name} type="text" />
        </label>
        <label>
          Apellido
          <input {...lastname} type="text" />
        </label>
        <label>
          Email
          <input {...email} type="email" />
        </label>
        <label>
          Contraseña
          <input {...password} type="password" />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default Register;
