/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React, { useState, useEffect } from "react";

import { UserService } from "../services/UserService";
import Textfield from "../input/Textfield";
import Tile from "../display/Tile";
import ActionBar from "../navigation/ActionBar";
import ErrorBar from "../display/ErrorBar";
import { validateEmail as isEmailValid } from "../util";
import { useHistory, useLocation } from "react-router-dom";
import { useAppContext } from "../base/BasicApp";

import "./Login.css";

export const LoginRoute = {
  path: "/login",
  icon: "\uf2f6",
  title: "Login",
  menuItem: "false",
};

export default function Login() {
  let history = useHistory();
  let location = useLocation();
  let sourceLocation = location.state || { from: { pathname: "/" } };

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("lastEmail") || "");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [, dispatch] = useAppContext();

  useEffect(() => {
    setIsLoading(true);
    UserService.logout()
      .then((response) => {
        dispatch({ type: "user", user: null });
      })
      .finally((response) => {
        setIsLoading(false);
      });
    return function cleanup() {};
  }, [dispatch]);

  const validateEmail = function (emailToValidate) {
    setEmailError("");
    if (emailToValidate === "") {
      setEmailError("Please enter your e-mail address.");
      return false;
    }
    if (!isEmailValid(emailToValidate)) {
      setEmailError("Please enter a valid e-mail address.");
      return false;
    }
    return true;
  };

  const validatePassword = function (passwordToValidate) {
    setPasswordError("");
    if (passwordToValidate.trim() === "") {
      setPasswordError("Please enter your password.");
      return false;
    }
    return true;
  };

  const login = function (event) {
    event.preventDefault();
    setError("");
    //const emailValid = validateEmail(email.trim());
    const passwordValid = validatePassword(password);
    // if (!emailValid || !passwordValid) {
    //   return;
    // }
    localStorage.setItem("lastEmail", email.trim());
    setIsLoading(true);
    UserService.login(email.trim(), password)
      .then((user) => {
        dispatch({ type: "user", user: user });
        setIsLoading(false);
        history.replace(sourceLocation.from);
      })
      .catch((err) => {
        if (err.name === "ApplicationError") {
          setError(err.message);
        } else {
          setError("Cannot connect to the server. Please try again later.");
        }
        setIsLoading(false);
      });
  };

  return (
    <div className={"LoginContainer"}>
      <form onSubmit={login}>
        <Tile>
          <ErrorBar message={error}></ErrorBar>
          <Textfield
            label="E-Mail"
            name="email"
            type="email"
            value={email}
            disabled={isLoading}
            placeholder="Enter your e-mail"
            explanation={emailError}
            valid={emailError === ""}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
          ></Textfield>
          <Textfield
            label="Password"
            name="password"
            type="password"
            value={password}
            disabled={isLoading}
            placeholder="Enter your password"
            explanation={passwordError}
            valid={passwordError === ""}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          ></Textfield>
          <ActionBar>
            <button
              className="primary"
              onClick={(event) => login(event)}
              disabled={isLoading}
            >
              Login
            </button>
          </ActionBar>
        </Tile>
      </form>
    </div>
  );
}
