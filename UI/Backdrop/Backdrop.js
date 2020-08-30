/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";

import "./Backdrop.scss";

function Backdrop({
  show = false,
  onClose = (clickEvent) => {},
  fade = true,
  children,
}) {
  return (
    <div
      className={
        "backdrop backdrop--" +
        (show ? "visible " : "hidden ") +
        (fade ? "backdrop--fade " : "")
      }
      onClick={(event) => {
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

export default Backdrop;
