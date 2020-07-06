/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";

import "./Breadcrumb.css";
import ProgressButton from "../input/ProgressButton";

export default function Breadcrumb({
  currentElement = null,
  elementHierarchy = new Set(),
  onElementChange = (element) => {},
}) {
  var hierarchy = [];
  if (currentElement != null) {
    var element = currentElement;
    hierarchy.push(element);
    while (elementHierarchy.has(element)) {
      element = elementHierarchy.get(element);
      hierarchy.push(element);
    }
    hierarchy.reverse();
  }

  return (
    <ul className={"breadcrumb" + (hierarchy.length > 0 ? "" : " empty")}>
      {hierarchy.length !== 0 &&
        hierarchy.map((view, index) => {
          return (
            <li key={index}>
              {
                <ProgressButton
                  isFirst={index === 0}
                  isLast={index === hierarchy.length - 1}
                  onClick={(event) => onElementChange(view)}
                >
                  {view.title}
                </ProgressButton>
              }
            </li>
          );
        })}
    </ul>
  );
}
