/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import { AjaxInstance } from "../Ajax";

export const UserService = {
  login,
  logout,
  currentUser,
};

async function login(username, password) {
  return AjaxInstance.post("/sessions", {
    username: username,
    password: password,
    request_id: Math.floor(Math.random() * 100000),
  }).then((response) => {
    console.log(response);
    AjaxInstance.setToken(response.data.accessToken);
    // if (user) {
    //   localStorage.setItem("user", JSON.stringify(user));
    // }
    return Promise.resolve(response);
  });
}

async function logout() {
  return AjaxInstance.delete("/sessions/current")
    .catch((err) => {
      console.log(err.status);
      if (err.status === 404) {
        return Promise.resolve(err);
      }
    })
    .then((result) => {
      localStorage.removeItem("user");
      AjaxInstance.setToken(null);
      return Promise.resolve(result);
    });
}

async function currentUser() {
  return AjaxInstance.post("?action=user-current");
}
