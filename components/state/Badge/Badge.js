/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";

import "./Badge.css";

export const BadgeState = {
  ok: "ok",
  warning: "warning",
  caution: "caution",
  neutral: "neutral",
};

export default function Badge({ content = "", state = BadgeState.ok }) {
  return <div className={"badge " + state}>{content}</div>;
}
