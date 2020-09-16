/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React, { useContext } from "react";
import "./Header.css";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

export default function Header({ views, children }) {
  const authContext = useContext(AuthContext);

  return (
    <header>
      <div className="appicon headerappicon" />
      <Switch>
        {views.map((element, index) => {
          return (
            <Route
              key={index}
              exact={element.exact === "true"}
              path={element.path}
            >
              <h1>{element.title}</h1>
            </Route>
          );
        })}
      </Switch>
      {children}
    </header>
  );
}
