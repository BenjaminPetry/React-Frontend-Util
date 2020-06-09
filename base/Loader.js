import React from "react";
import "./Loader.css";

export default function Loader({ visible = true, className = "", ...rest }) {
  return (
    <div
      className={className + " loader" + (visible ? " visible" : "hidden")}
      {...rest}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
