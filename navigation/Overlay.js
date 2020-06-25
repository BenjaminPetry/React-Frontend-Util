import React from "react";

import "./Overlay.css";

export default function Overlay({
  isVisible = "",
  onClose = clickEvent => {},
  className = "",
  children
}) {
  return (
    <div
      className={"overlay " + (isVisible ? "visible " : "hidden ") + className}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}
