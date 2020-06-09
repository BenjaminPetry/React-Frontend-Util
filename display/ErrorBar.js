import React, { useState, useEffect } from "react";

import "./ErrorBar.css";

export default function ErrorBar({ message = "" }) {
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    setCollapsed(message === "");
    return function cleanup() {};
  }, [message]);
  return (
    <div
      className={"error-bar" + (collapsed ? " collapsed" : "")}
      onClick={() => setCollapsed(true)}
    >
      <div className="error-content">{message}</div>
    </div>
  );
}
