import React from "react";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "utils/storage";

import Home from "./components/Home";
import {
  CreatePost,
  ShowPost,
  EditPost,
  MyPosts,
  PreviewPost,
} from "./components/Post";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={PreviewPost} path="/posts/preview" />
        <Route exact component={ShowPost} path="/posts/:slug/show" />
        <Route exact component={CreatePost} path="/posts/create" />
        <Route exact component={EditPost} path="/posts/:slug/edit" />
        <Route exact component={MyPosts} path="/user_posts" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Home}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
