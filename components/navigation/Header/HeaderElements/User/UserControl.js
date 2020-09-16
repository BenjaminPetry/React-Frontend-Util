/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */

import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext/AuthContext";
import Login from "../../../../../contexts/AuthContext/Login";
import "./UserControl.scss";
import Menu from "../../../../../containers/Menu/Menu";
import MenuItem from "../../../../../containers/Menu/MenuItem/MenuItem";
import useMenuController from "../../../../../containers/Menu/useMenuController/useMenuController";

function UserControl() {
  const authContext = useContext(AuthContext);
  const isUser = authContext.user !== null;
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState([0, 0]);

  const clickHandler = (event) => {
    setMenuPosition([event.clientX, event.clientY]);
    setShowMenu((prevState) => {
      return !prevState;
    });
  };

  const itemClickWrapper = (fun) => {
    return (event) => {
      fun(event);
      setShowMenu(false);
    };
  };

  const userIcon = (
    <div className="UserControl__icon" onClick={clickHandler}>
      {"\uf007"}
    </div>
  );

  return (
    <React.Fragment>
      <div
        className={"UserControl " + (isUser ? "UserControl--logged-in" : "")}
      >
        <div className="UserControl__icon-wrapper">{userIcon}</div>
        <Menu
          show={showMenu}
          onClose={() => setShowMenu(false)}
          position={menuPosition}
        >
          {!isUser ? (
            <MenuItem
              icon={"\uf2f6"}
              onClick={itemClickWrapper(() => authContext.login())}
            >
              Login
            </MenuItem>
          ) : null}
          {isUser ? (
            <MenuItem
              icon={"\uf4fe"}
              onClick={itemClickWrapper(() => alert("todo"))}
            >
              Account
            </MenuItem>
          ) : null}
          {isUser ? (
            <MenuItem
              icon={"\uf2f5"}
              onClick={itemClickWrapper(() => authContext.logout())}
            >
              Logout
            </MenuItem>
          ) : null}
        </Menu>
      </div>
    </React.Fragment>
  );
}

export default UserControl;
