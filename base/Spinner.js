/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";
import "./Spinner.scss";

export default function Spinner({
  visible = true,
  size = "10rem",
  className = "",
  ...rest
}) {
  return (
    <div
      className={"spinner " + (visible ? "" : "hidden ") + className}
      {...rest}
      style={{ width: size, height: size }}
    >
      <div className="spinner__circle">
        <div className="spinner__circle-wrapper spinner__circle-wrapper--top">
          <div className="spinner__circle-inner"></div>
        </div>
        <div className="spinner__circle-wrapper spinner__circle-wrapper--bottom">
          <div className="spinner__circle-inner"></div>
        </div>
      </div>
    </div>
  );
}
