/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";
import "./LiveLoader.css";

export default function LiveLoader({
  visible = true,
  text = "Loading...",
  className = "",
  ...rest
}) {
  return (
    <div className={"live-loader-wrapper " + className}>
      <div
        className={
          "live-loader center-box " + (visible ? "visible " : "hidden ")
        }
        {...rest}
      >
        {text}
      </div>
    </div>
  );
}
