// @flow
import React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";

const AppRouter: React.FC<any> = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to={`${path}/login`} />
      </Route>
      <Route
        exact
        path={`${path}/login`}
        render={(props) => <Login {...props} />}
      />
      <Route
        exact
        path={`${path}/sign-up`}
        render={(props) => <SignUp {...props} />}
      />
    </Switch>
  );
};

export default AppRouter;
