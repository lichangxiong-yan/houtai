import React, { Component } from "react";
import Login from "../views/Login";
import DashBoard from "../views/DashBoard";

import { HashRouter, Route, Redirect, Switch } from "react-router-dom";

export default class Rouer extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() =>
              localStorage.getItem("token") ? (
                <DashBoard />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          {/* <Redirect to="/dashBoard" />
          <Redirect from="/" to="/home" exact /> */}
        </Switch>
      </HashRouter>
    );
  }
}
