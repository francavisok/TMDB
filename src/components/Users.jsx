import "../Styles/globals.scss";
import '../Styles/users.scss';

import React, { useEffect, useState } from "react";
import UsersGrid from "./UsersGrid";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersRequest } from "../state/allUsers";

const Users = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const searchUser = useInput();
  const allUsers = useSelector((state) => state.allUsers);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function excludeMe(usersList) {
    return usersList.filter((userArr) => userArr.id !== user.id);
  }
  
  useEffect(() => {
    dispatch(getAllUsersRequest());
  }, [dispatch]);

  useEffect(() => {
    const allUsersButMe = excludeMe(allUsers);
    setFilteredUsers(allUsersButMe);
  }, [allUsers]);

  function changeUsersList() {
    setFilteredUsers(
      searchUser.value
        ? excludeMe(allUsers).filter((user) =>
            `${user.name} ${user.lastname}`.includes(searchUser.value)
          )
        : excludeMe(allUsers)
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    changeUsersList();
  };

  return (
    <div className="partitioned-container">
      <form onSubmit={handleSubmit} className='sidebar-users'>
        <input type="text" placeholder="Buscar Usuarios" {...searchUser} />
      </form>
      <UsersGrid users={filteredUsers} />
    </div>
  );
};

export default Users;
