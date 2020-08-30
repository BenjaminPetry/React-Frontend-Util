import React, { useContext } from "react";
import { AuthContext } from "../../util/contexts/AuthContext/AuthContext";
import Spinner from "../../util/base/Spinner";
import Tile from "../../util/display/Tile";

export const userDetailsRoute = {
  path: "/account",
  exact: "true",
  private: "false",
  icon: "\uf2bd",
  title: "Account",
};

function UserDetails() {
  const authContext = useContext(AuthContext);
  const isLoading = authContext.isLoading;
  const user = authContext.user;
  const isUser = user !== null;
  const rights = authContext.scope;

  const spinner = isLoading ? <Spinner></Spinner> : null;
  const details = isLoading ? null : isUser ? (
    <div>
      <p>Name: {user.username}</p>
      <p>E-Mail: {user.email}</p>
      <p>Rights: {rights !== null ? rights.join(", ") : "-"}</p>
      <button className="primary" onClick={() => authContext.logout()}>
        Logout.
      </button>
    </div>
  ) : (
    <div>
      No user is logged in.{" "}
      <button className="primary" onClick={() => authContext.login()}>
        Log in now.
      </button>
    </div>
  );

  return (
    <Tile title="User Details">
      {spinner}
      {details}
    </Tile>
  );
}

export default UserDetails;
