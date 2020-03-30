import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useUser } from "contexts/UserContext";
import { routes } from "config/routes";

export function NotLoggedInRoute({ children, ...rest }) {
  const user = useUser();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: routes.lobby(),
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}