import { AjaxInstance } from "../../Ajax";

const regex_access_code = /access_code=(\w*)/;

const extract_access_code = function (url) {
  let result = url.match(regex_access_code);
  return result && result.length > 1 ? result[1] : null;
};

const validate_access_token = function (token, nonce) {
  // remove white spaces
  let tmp = token.replace(/\s+/, "");

  // split token
  let result = tmp.match(/^(.*)\.(.*)\.(.*)$/);

  if (!result || result.length !== 4) {
    return null;
  }
  try {
    let header = JSON.parse(atob(result[1]));
    let payload = JSON.parse(atob(result[2]));

    // check if the header and algorithm is correct
    if (
      header === null ||
      payload === null ||
      header.alg !== "HS256" ||
      header.typ !== "JWT"
    ) {
      return null;
    }

    // check if the payload contains the nonce that we send to the server
    if (parseInt(payload.nonce) !== nonce) {
      return null;
    }

    // check if the necessary fields (azp for user and scope for user rights) are in the payload
    if (!payload.hasOwnProperty("azp") || !payload.hasOwnProperty("scope")) {
      return null;
    }

    return { user: payload.azp, scope: payload.scope }; // the user and his/her rights
  } catch (e) {}
  return null;
};

const request_access_token = function (auth_url, access_code) {
  if (access_code !== null) {
    let nonce = Math.round(Math.random() * 10000);
    return AjaxInstance.get(
      auth_url + "/" + access_code + "/use?nonce=" + nonce,
      { timeout: 2000 }
    ).then((result) => {
      const token = result.data.access_token;
      const user_info = validate_access_token(token, nonce);
      if (user_info !== null) {
        user_info["token"] = token;
        return Promise.resolve(user_info);
      }
      return Promise.reject("Could not retrieve valid token.");
    });
  }
  return Promise.reject("No access code present!");
};

const AccessTokenService = {
  extract: extract_access_code,
  request: request_access_token,
};

export default AccessTokenService;
