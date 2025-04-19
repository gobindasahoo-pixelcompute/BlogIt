import React from "react";

import Signup from "components/Authentication/Signup";
import CreatePost from "components/Post/Create";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "./components/Home";
import ShowPost from "./components/Post/Show";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={ShowPost} path="/posts/:slug/show" />
      <Route exact component={CreatePost} path="/posts/create" />
      <Route exact component={Home} path="/" />
      <Route exact component={Signup} path="/signup" />
    </Switch>
  </Router>
);

export default App;
