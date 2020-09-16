/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";

import "./MenuItem.scss";

function MenuItem({ icon = null, children, onClick = (event) => {} }) {
  return (
    <li className={"menu-item"} onClick={onClick}>
      {icon === null ? null : <div className="menu-item__icon">{icon}</div>}
      <div className="menu-item__text">{children}</div>
    </li>
  );
}

export default MenuItem;
