import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import LoginPage from "../LoginPage/LoginPage";
import RegistrPage from "../RegistrPage/RegistrPage";

const Main = ({ auth }) => {
  const history = useHistory();

  return (
    <div>
      <Switch>
        <Route path="/login">
          <LoginPage history={history} />
        </Route>
        <Route path="/registr">
          <RegistrPage history={history} />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
};
export default Main;
