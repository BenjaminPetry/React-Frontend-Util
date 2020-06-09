import React from "react";
import "./ToggleIcon.css";

export default function ToggleIcon({
  state, // true or false
  icon = "\uf164",
  onClick = (oldState, newState) => {},
  ...rest
}) {
  return (
    <i
      className={"icon toggleIcon " + (state ? "selected" : "unselected")}
      onClick={event => {
        onClick(event, state, !state);
      }}
      {...rest}
    >
      {icon}
    </i>
  );
}
