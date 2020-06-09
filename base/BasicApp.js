import React, { createContext, useContext, useReducer, useState } from "react";

import "./BasicApp.css";
import Nav from "../navigation/Nav.js";
import Header from "../navigation/Header.js";
import { LoginRoute } from "../login/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export default function BasicApp({ children = [], enableSearch = true }) {
  const initialAppContext = {
    search: "",
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  };
  const reduceAppContext = function(state, action) {
    switch (action.type) {
      case "search":
        return {
          ...state,
          search: action.search
        };
      case "user":
        return {
          ...state,
          user: action.user
        };
      default:
        throw new Error();
    }
  };

  const [appContext, dispatch] = useReducer(
    reduceAppContext,
    initialAppContext
  );

  const [appSearch, setAppSearch] = useState(enableSearch ? "" : null);
  const childrenArray = Array.isArray(children) ? children : [children];
  const childrenWithPath = childrenArray.filter(element => {
    return element.props.hasOwnProperty("path");
  });
  const currentViews = childrenWithPath.map(element => {
    return element.props;
  });

  return (
    <div className="BasicApp">
      <Router basename={process.env.REACT_APP_ROUTER_BASENAME}>
        <Header
          views={currentViews}
          appContext={appContext}
          searchQuery={appSearch}
          onSearchChanged={query => setAppSearch(query)}
          onSearchSubmit={query => {}}
        >
          {childrenArray.filter((view, index) => {
            return view.props.type === "header-element";
          })}
        </Header>
        <Nav views={currentViews} />
        <main>
          <AppContext.Provider value={[appContext, dispatch]}>
            <Switch>
              {childrenWithPath.map((element, index) => {
                return (
                  <Route
                    key={index}
                    exact={element.props.exact === "true"}
                    path={element.props.path}
                    render={({ location }) =>
                      location.pathname === LoginRoute.path ||
                      appContext.user ||
                      element.props.private === "false" ? (
                        element
                      ) : (
                        <Redirect
                          to={{
                            pathname: LoginRoute.path,
                            state: { from: location }
                          }}
                        />
                      )
                    }
                  ></Route>
                );
              })}
            </Switch>
          </AppContext.Provider>
        </main>
      </Router>
    </div>
  );
}
