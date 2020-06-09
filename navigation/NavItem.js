import React from "react";
import { useRouteMatch } from "react-router-dom";

export function NavItem({
  view = { path: null },
  icon,
  label,
  onClick,
  className = ""
}) {
  const onClickFunction = event => onClick(event);
  const buttonClass = useRouteMatch({
    path: view.path,
    exact: true,
    strict: false
  })
    ? "selected"
    : "";
  return (
    <button
      className={
        "navitem" +
        (className === "" ? "" : " " + className) +
        (buttonClass ? " " + buttonClass : "")
      }
      onClick={event => {
        onClickFunction(event);
      }}
      title={label}
    >
      <i className="fas">{icon}</i>
      <div>{label}</div>
    </button>
  );
}
