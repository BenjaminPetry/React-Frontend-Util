/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */

import React, { createContext, useContext, useReducer, useState } from "react";

import "./BaseApp.css";
import Nav from "../../components/navigation/Nav.js";
import Header from "../../components/navigation/Header/Header";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

export const LoginRoute = {
  path: "/login",
  icon: "\uf2f6",
  title: "Login",
  menuItem: "false",
};

export default function BaseApp({ children }) {
  const authContext = useContext(AuthContext);

  const childrenArray = Array.isArray(children) ? children : [children];
  const childrenWithPath = childrenArray.filter((element) => {
    return element.props.hasOwnProperty("path");
  });
  const currentViews = childrenWithPath.map((element) => {
    return element.props;
  });

  return (
    <div className="BaseApp">
      <Router basename={process.env.REACT_APP_ROUTER_BASENAME}>
        <Header views={currentViews} onSearchSubmit={(query) => {}}>
          {childrenArray.filter((view, index) => {
            return view.props.type === "header-element";
          })}
        </Header>
        <Nav views={currentViews} />
        <main>
          <Switch>
            {childrenWithPath.map((element, index) => {
              return (
                <Route
                  key={index}
                  exact={element.props.exact === "true"}
                  path={element.props.path}
                  render={({ location }) => element}
                ></Route>
              );
            })}
          </Switch>
        </main>
      </Router>
    </div>
  );
}
