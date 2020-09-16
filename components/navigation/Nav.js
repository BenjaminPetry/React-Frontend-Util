/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React, { useState } from "react";
import "./Nav.css";
import { NavItem } from "./NavItem";
import { useHistory } from "react-router-dom";

export default function Nav({ onViewSelection = (view) => {}, views = [] }) {
  const [navOpen, setNavOpen] = useState(false);
  const history = useHistory();

  return (
    <nav
      className={"nav " + (navOpen ? "expanded" : "")}
      onClick={() => setNavOpen(!navOpen)}
    >
      <div className="menu">
        {views
          .filter((view) => {
            return view.menuItem !== "false";
          })
          .map((view, index) => {
            return (
              <NavItem
                key={index.toString()}
                view={view}
                icon={view.icon}
                onClick={(event) => {
                  history.push(view.path);
                  onViewSelection(view);
                  event.stopPropagation();
                }}
                label={view.title}
              />
            );
          })}
      </div>
      <NavItem
        className="collapse"
        icon={navOpen ? "\uf104" : "\uf105"}
        onClick={() => setNavOpen(!navOpen)}
        label={navOpen ? "Collapse" : "Expand"}
      />
    </nav>
  );
}
