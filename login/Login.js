/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React, { useEffect, useState } from "react";

import "./Login.scss";
import Spinner from "../base/Spinner";

export const LOGIN_ACTIONS = {
  LOGIN_SILENT: "LOGIN_SILENT",
  LOGIN_NORMAL: "LOGIN",
  LOGOUT: "LOGOUT",
};

const regex_response_property = /response_type=(\w*)/;
export const RESPONSE_TYPE = {
  ACCESS_CODE: "access_code",
  LOGIN_REQUIRED: "login_required",
  LOGOUT_SUCCESSFUL: "logout_successful",
  LOGOUT_FAILED: "logout_failed",
};

export default function Login({
  url,
  request_url,
  email,
  action,
  on_action_done = (result, response_type, cUrl) => {}, // result = true==success, false==failed
}) {
  const [usingUrl, setUsingUrl] = useState("");

  // create the url based on the given action
  useEffect(() => {
    var new_url = url + "/login?request_url=" + request_url;
    if (email !== "") {
      new_url += "&email=" + email;
    }
    if (action === LOGIN_ACTIONS.LOGIN_SILENT) {
      new_url += "&silent=true";
    } else if (action === LOGIN_ACTIONS.LOGOUT) {
      new_url = url + "/logout?request_url=" + request_url;
    }
    setUsingUrl(new_url);
  }, [url, request_url, action, email]);

  // watch for url changes in the iframe and if it is authorize url, get its response_type
  const onLocationChanged = function (event) {
    try {
      let cUrl = event.target.contentWindow.location.href;
      if (
        cUrl &&
        cUrl.split("?")[0].endsWith(process.env.REACT_APP_AUTH_SELF)
      ) {
        let result = cUrl.match(regex_response_property);
        if (result && result.length > 1) {
          let response_type = result[1];
          on_action_done(true, response_type, cUrl);
        }
      }
    } catch (err) {}
  };

  return (
    <div
      className={
        "login-wrapper login-wrapper--" +
        (action === LOGIN_ACTIONS.LOGIN_SILENT ? "hidden" : "visible")
      }
    >
      <Spinner className="login-wrapper__spinner"></Spinner>
      {/** Avoid circular loops */}
      {window.location.href
        .split("?")[0]
        .endsWith(process.env.REACT_APP_AUTH_SELF) ? null : (
        <iframe
          src={usingUrl}
          title="Login"
          onLoad={(event) => onLocationChanged(event)}
        ></iframe>
      )}
    </div>
  );
}
