import React from "react";

import "./ProgressButton.css";

export default function ProgressButton({
  isFirst = false,
  isLast = false,
  onClick = event => {},
  children
}) {
  return (
    <div
      className={
        "progressButton" + (isFirst ? " first" : "") + (isLast ? " last" : "")
      }
      onClick={event => onClick(event)}
    >
      <div className={"arrowRightInverse"} />
      <button>{children}</button>
      <div className={"arrowRight"} />
    </div>
  );
}
