import React from "react";

import "./Badge.css";

export const BadgeState = {
  ok: "ok",
  warning: "warning",
  caution: "caution",
  neutral: "neutral"
};

export default function Badge({ content = "", state = BadgeState.ok }) {
  return <div className={"badge " + state}>{content}</div>;
}
