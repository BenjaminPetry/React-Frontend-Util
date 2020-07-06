/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
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
