// @flow
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const AppRouter: React.FC<any> = () => {
  useEffect(() => {}, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" render={(props) => <Home {...props} />}></Route>
        <Route
          exact
          path="/dashboard"
          render={(props) => <Dashboard {...props} />}
        ></Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
