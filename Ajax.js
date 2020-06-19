import Axios from "axios";
import { CustomError } from "./util";

export const AjaxInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  method: "post",
  timeout: process.env.REACT_APP_AJAX_TIMEOUT,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  withCredentials: false,
  responseType: "json",
});
AjaxInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return handleResponse(response);
  },
  (error) => {
    return handleResponse(error.response);
  }
);

AjaxInstance.interceptors.request.use(
  (config) => {
    if (
      config.hasOwnProperty("noAuth") &&
      config.headers.hasOwnProperty("Authorization")
    ) {
      console.log(config.headers);
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

AjaxInstance.init = function () {
  // AjaxInstance.get("authorize/meta", { noAuth: true }).then((data) => {
  //   console.log(data);
  // });
  // AjaxInstance.get("users/list")
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

AjaxInstance.setToken = function (token) {
  if (
    token === null &&
    AjaxInstance.defaults.headers.common.hasOwnProperty("Authorization")
  ) {
    delete AjaxInstance.defaults.headers.common["Authorization"];
  } else if (token !== null) {
    AjaxInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
};

// returned data is usually in the form {status:[code], message:"", data/error: data}
export class InvalidReplyError extends CustomError {} // An error that occurs when the result is not in the form described above
export class ApplicationError extends CustomError {} // An error that occurs when the API returns and error
export class AuthenticationError extends CustomError {} // An error that occurs when the server returns 401
export class ServerError extends CustomError {} // An error that occurs when the server returns an error code other than 401

const handleResponse = function (response) {
  if (response.status === 204) {
    // 204-response does not have any content
    return Promise.resolve();
  }
  let rData = response.data;
  if (
    !rData.hasOwnProperty("status") ||
    !rData.hasOwnProperty("message") ||
    !(rData.hasOwnProperty("data") || rData.hasOwnProperty("error"))
  ) {
    return Promise.reject(
      new InvalidReplyError(
        "Expect result in the form {status:[code], message:[statusMessage], data: [data]}."
      )
    );
  }

  let status = rData.status;
  let message = rData.message;
  let data = rData.data;
  if (status >= 200 && status <= 204) {
    return Promise.resolve(response.data);
  }
  if (status === 401 || status === 403) {
    return Promise.reject(
      new AuthenticationError("Access denied", status, data)
    );
  }
  if (status === 500) {
    return Promise.reject(new ServerError(data.message, status, data));
  }
  return Promise.reject(new ApplicationError(message, status, data));
};
