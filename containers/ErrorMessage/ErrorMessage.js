import React from "react";
/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import "./ErrorMessage.css";

export default function ErrorMessage({
  message,
  actionText = "Close",
  onAction = () => {},
}) {
  return (
    <div
      className={
        "error-window center-box-100 " +
        (message === "" || message === null ? "hidden" : "visible")
      }
    >
      <div className="error-title">
        <div className="icon center-box">{"\uf057"}</div>
      </div>
      <div className="error-content">
        <div className="error-intro">Something went wrong</div>
        <div className="error-message">{message}</div>
        <button onClick={() => onAction()}>{actionText}</button>
      </div>
    </div>
  );
}
