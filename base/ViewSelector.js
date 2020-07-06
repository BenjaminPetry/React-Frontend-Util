/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */

import React from "react";

import "./ViewSelector.css";

export default function ViewSelector({ currentView, children }) {
  children =
    children === undefined
      ? []
      : children instanceof Array
      ? children
      : [children];
  return (
    <div className="viewSelector">
      {children.filter((view, index) => {
        return view.key === currentView.id;
      })}
    </div>
  );
}
