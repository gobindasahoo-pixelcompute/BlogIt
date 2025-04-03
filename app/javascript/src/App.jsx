import React from "react";

import CreatePost from "components/Posts/Create";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "./components/Home";
import ShowPost from "./components/Posts/Show";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={ShowPost} path="/posts/:slug/show" />
      <Route exact component={CreatePost} path="/posts/create" />
      <Route exact component={Home} path="/" />
    </Switch>
  </Router>
);

export default App;
