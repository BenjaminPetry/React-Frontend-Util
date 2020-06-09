import React from "react";

import "./Tile.css";
import ActionBar from "../navigation/ActionBar";
// GRIP-icon for movable: \uf58e

export default function Tile({
  title = "",
  isPrimaryTitle = false,
  className = "",
  children
}) {
  const childrenArray = Array.isArray(children) ? children : [children];
  const actionBar = childrenArray.filter((child, index) => {
    return child && child.type === ActionBar;
  });
  const realChildren = childrenArray.filter((child, index) => {
    return !child || child.type !== ActionBar;
  });
  return (
    <div className={"tile " + className + (isPrimaryTitle ? " primary" : "")}>
      {title === "" ? null : <div className={"header"}>{title}</div>}
      <div className="content">{realChildren}</div>
      {actionBar}
    </div>
  );
}
