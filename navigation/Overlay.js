/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React, { useState, useEffect } from "react";

import "./Overlay.css";

export default function Overlay({
  isVisible = false,
  onClose = (clickEvent) => {},
  className = "",
  fade = false,
  children,
}) {
  const [state, setState] = useState(isVisible ? 1 : 0); // 0 - hidden, 1 - visible, 2 - on hiding
  useEffect(() => {
    if (!isVisible && state === 1) {
      if (fade) {
        setState(2);
        window.setTimeout(() => {
          setState(0);
        }, 500);
      } else {
        setState(0);
      }
    } else if (isVisible) {
      setState(1);
    }
  }, [isVisible, fade, state]);

  return (
    <div
      className={
        "overlay " +
        (state === 0 ? "hidden " : "") +
        (state !== 0 ? "visible " : "") +
        (state === 2 ? "on-closing " : "") +
        (fade ? "fade " : "") +
        className
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
