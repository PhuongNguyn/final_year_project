import React, { Suspense } from "react";
import "@fullcalendar/react/dist/vdom";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
