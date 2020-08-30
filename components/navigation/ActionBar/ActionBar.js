/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";
import "./ActionBar.css";

export default function ActionBar({ children }) {
  return <div className="action-bar">{children}</div>;
}
