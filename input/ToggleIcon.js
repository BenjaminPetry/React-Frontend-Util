/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
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
      onClick={(event) => {
        onClick(event, state, !state);
      }}
      {...rest}
    >
      {icon}
    </i>
  );
}
