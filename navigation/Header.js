/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";
import "./Header.css";
import { Switch, Route } from "react-router-dom";

import { useHistory } from "react-router-dom";
export const LoginRoute = {
  path: "/login",
  icon: "\uf2f6",
  title: "Login",
  menuItem: "false",
};

export default function Header({ views, children, appContext }) {
  let history = useHistory();
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
      {appContext.user ? (
        <div
          className="user icon"
          onClick={() => {
            history.push(LoginRoute.path);
          }}
        >
          {"\uf007"}
        </div>
      ) : (
        <div />
      )}
    </header>
  );
}
