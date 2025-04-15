import React, { useState } from "react";

import classNames from "classnames";
import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/blogger.png";
import Category from "../Category";

const Sidebar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="flex">
      <div className="flex h-screen min-w-16 flex-col items-center space-y-6 border-r bg-white py-4">
        <Link
          className="mt-6 flex h-8 w-8 cursor-pointer items-center justify-center"
          to="/"
        >
          <img alt="logo" src={logo} />
        </Link>
        <div className="flex flex-col items-center gap-2">
          <NavLink
            exact
            activeClassName="bg-gray-200"
            className="rounded-lg px-2 py-1"
            to="/"
          >
            <i className="ri-archive-drawer-line text-xl" />
          </NavLink>
          <NavLink
            activeClassName="bg-gray-200"
            className="rounded-lg px-2 py-1"
            to="/posts/create"
          >
            <i className="ri-edit-line text-xl" />
          </NavLink>
          <button
            className={classNames(
              "cursor-pointer rounded-lg border-none bg-white px-2 py-1",
              {
                "bg-gray-100": isCategoryOpen,
              }
            )}
            onClick={() => setIsCategoryOpen(prev => !prev)}
          >
            <i className="ri-list-check-2 text-xl" />
          </button>
        </div>
      </div>
      {isCategoryOpen && <Category />}
    </div>
  );
};

export default Sidebar;
