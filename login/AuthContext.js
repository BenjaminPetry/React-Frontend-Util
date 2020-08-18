import React, { useEffect, useState } from "react";
import Login, { LOGIN_ACTIONS, RESPONSE_TYPE } from "./Login";
import { AjaxInstance } from "../Ajax";
import AccessTokenService from "./AccessTokenService";
import useQueue from "../hooks/useQueue";

export const AuthContext = React.createContext();

const createAction = (action, cb = () => {}, params = {}) => {
  return { action: action, cb: cb, params: params };
};

export default function AuthProvider({ children }) {
  const [current_action, , add, next, setCurrent] = useQueue([
    createAction(LOGIN_ACTIONS.LOGIN_SILENT, () => {}, {
      email: "",
      startup: true,
    }),
  ]);

  const [user, setUser] = useState(null);
  const [scope, setScope] = useState(null);

  useEffect(() => {
    AjaxInstance.setAuthorizationErrorHandler(() => {
      AjaxInstance.setToken(null); // otherwise it is not possible to get new token!
      return new Promise((resolve, reject) => {
        const callback = (success) => {
          if (success) {
            resolve();
          } else {
            reject();
          }
        };
        add(createAction(LOGIN_ACTIONS.LOGIN_SILENT, callback));
      });
    });
    return () => AjaxInstance.setAuthorizationErrorHandler(null);
  }, [add]);

  const value = {
    isLoading: current_action !== null,
    user: user,
    scope: scope,
    login: (callback, email = "") => {
      console.log("AuthContext: Login initiated");
      add(createAction(LOGIN_ACTIONS.LOGIN_NORMAL, callback, { email: email }));
    },
    logout: (callback) => {
      console.log("AuthContext: Logout initiated");
      add(createAction(LOGIN_ACTIONS.LOGOUT, callback));
    },
  };

  const on_action_done = (result, response_type, cUrl) => {
    if (result) {
      switch (response_type) {
        case RESPONSE_TYPE.LOGIN_REQUIRED:
          // the initial startup check does not need to display a login screen
          if (
            current_action.params.hasOwnProperty("startup") &&
            current_action.params.startup
          ) {
            next();
            break;
          }
          const duplicate = { ...current_action };
          duplicate.action = LOGIN_ACTIONS.LOGIN_NORMAL;
          setCurrent(duplicate);
          break;
        case RESPONSE_TYPE.ACCESS_CODE:
          const access_token = AccessTokenService.extract(cUrl);

          // AccessTokenService.request checks for access_token === null
          AccessTokenService.request(
            process.env.REACT_APP_AUTH_SERVER,
            access_token
          )
            .then((user_info) => {
              console.log("AuthContext: New Access Token");
              AjaxInstance.setToken(user_info.token);
              setUser(user_info.user);
              setScope(user_info.scope);

              current_action.cb(true);
              next();
            })
            .catch((err) => {
              current_action.cb(false);
              next();
            });
          break;
        case RESPONSE_TYPE.LOGOUT_SUCCESSFUL:
          console.log("AuthContext: Logout successful");
          AjaxInstance.setToken(null);
          setUser(null);
          setScope(null);
          current_action.cb(true);
          next();
          break;
        case RESPONSE_TYPE.LOGOUT_FAILED:
          console.log("AuthContext: Logout failed");
          current_action.cb(false);
          next();
          break;
        default:
          break;
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {current_action === null ||
      window.location.href
        .split("?")[0]
        .endsWith(process.env.REACT_APP_AUTH_SELF) ? null : (
        <Login
          url={process.env.REACT_APP_AUTH_SERVER}
          request_url={process.env.REACT_APP_AUTH_REQUEST_URL}
          email={
            current_action.params.hasOwnProperty("email")
              ? current_action.params.email
              : ""
          }
          action={current_action.action}
          on_action_done={on_action_done}
        ></Login>
      )}
      {window.location.href
        .split("?")[0]
        .endsWith(process.env.REACT_APP_AUTH_SELF)
        ? null
        : children}
    </AuthContext.Provider>
  );
}
