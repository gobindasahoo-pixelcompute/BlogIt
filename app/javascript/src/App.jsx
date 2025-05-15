import React from "react";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import queryClient from "utils/queryClient";
import { getFromLocalStorage } from "utils/storage";

import Home from "./components/Home";
import {
  CreatePost,
  ShowPost,
  EditPost,
  MyPosts,
  PreviewPost,
} from "./components/Post";
import routes from "./routes";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={PreviewPost} path={routes.post.Preview} />
          <Route exact component={ShowPost} path={routes.post.Show} />
          <Route exact component={CreatePost} path={routes.post.Create} />
          <Route exact component={EditPost} path={routes.post.Edit} />
          <Route exact component={MyPosts} path={routes.userPosts} />
          <Route exact component={Signup} path={routes.signup} />
          <Route exact component={Login} path={routes.login} />
          <PrivateRoute
            component={Home}
            condition={isLoggedIn}
            path={routes.root}
            redirectRoute={routes.login}
          />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
