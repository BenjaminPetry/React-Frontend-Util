import React from "react";
import "./LiveLoader.css";

export default function LiveLoader({
  visible = true,
  text = "Loading...",
  className = "",
  ...rest
}) {
  return (
    <div
      className={
        "live-loader " + (visible ? "visible " : "hidden ") + className
      }
      {...rest}
    >
      {text}
    </div>
  );
}
