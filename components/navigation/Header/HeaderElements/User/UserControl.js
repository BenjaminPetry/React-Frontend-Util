/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */

import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext/AuthContext";
import Login from "../../../../../contexts/AuthContext/Login";
import "./UserControl.scss";

function UserControl() {
  const authContext = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const isUser = authContext.user !== null;

  const userIcon = (
    <div
      className="UserControl__icon"
      onClick={() => {
        setShowMenu((prevState) => {
          return !prevState;
        });
      }}
    >
      {isUser ? "\uf007" : "\uf2bd"}
    </div>
  );

  return (
    <React.Fragment>
      <div
        className={"UserControl " + (isUser ? "UserControl--logged-in" : "")}
      >
        <div className="UserControl__icon-wrapper">{userIcon}</div>
        <nav
          className={
            "UserControl__menu UserControl__menu--" +
            (showMenu ? "visible" : "hidden")
          }
        >
          <ul>
            {!isUser ? (
              <li onClick={() => authContext.login()}>Login</li>
            ) : null}
            {isUser ? <li onClick={() => alert("todo")}>Account</li> : null}
            {isUser ? (
              <li onClick={() => authContext.logout()}>Logout</li>
            ) : null}
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default UserControl;
