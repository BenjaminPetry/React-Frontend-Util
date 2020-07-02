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
