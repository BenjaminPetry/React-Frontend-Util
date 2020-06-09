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
