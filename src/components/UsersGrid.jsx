import "../Styles/users.scss";

import React from "react";
import { Link } from "react-router-dom";

const UsersGrid = ({ users }) => {
  return (
    <div className="container-users-grid">
      {users.map((user, i) => (
        <Link to={`${user.id}`} key={i} className="anchor-item">
          <div className="user-card">
            <h2>{`${user.name} ${user.lastname}`}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UsersGrid;
