import React, { useState } from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import classNames from "classnames";
import { NavLink, Link, useHistory } from "react-router-dom";
import { getFromLocalStorage, resetLocalStorage } from "utils/storage";

import { logo, avatar } from "../../assets";
import Category from "../Category";

const Sidebar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      resetLocalStorage();
      resetAuthTokens();
      history.push("/login");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex">
      <div className="flex h-screen min-w-16 flex-col items-center justify-between border-r bg-white py-4">
        <div className="space-y-4">
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
                { "bg-gray-100": isCategoryOpen }
              )}
              onClick={() => setIsCategoryOpen(prev => !prev)}
            >
              <i className="ri-list-check-2 text-xl" />
            </button>
            <NavLink
              activeClassName="bg-gray-200"
              className="rounded-lg px-2 py-1"
              to="/user_posts"
            >
              <i className="ri-folder-line text-xl" />
            </NavLink>
          </div>
        </div>
        {userName && (
          <button onClick={() => setIsAvatarOpen(prev => !prev)}>
            <img alt="Avatar" className="h-8 w-8" src={avatar} />
          </button>
        )}
      </div>
      {isAvatarOpen && (
        <div className="absolute bottom-8 left-20 flex flex-col gap-2 rounded border bg-white px-4 py-2 shadow-xl">
          <div className="flex gap-2">
            <img alt="Avatar" className="h-12 w-12" src={avatar} />
            <div>
              <p className="font-bold">{userName}</p>
              <p className="text-xs">{userEmail}</p>
            </div>
          </div>
          <hr />
          <button className="flex gap-2" onClick={handleLogout}>
            <i className="ri-arrow-left-line" />
            <p className="text-xs font-semibold">Logout</p>
          </button>
        </div>
      )}
      {isCategoryOpen && <Category />}
    </div>
  );
};

export default Sidebar;
