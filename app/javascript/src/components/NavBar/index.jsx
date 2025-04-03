import React from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/images/blogger";

const NavBar = () => (
  <div className="flex h-screen w-20 flex-col items-center border-r py-6">
    <img alt="logo" className="h-8 w-8" src={logo} />
    <Link className="mt-3" to="/">
      <i className="ri-home-3-line text-3xl" />
    </Link>
    <Link className="mt-3" to="/posts/create">
      <i className="ri-add-fill text-3xl" />
    </Link>
  </div>
);

export default NavBar;
