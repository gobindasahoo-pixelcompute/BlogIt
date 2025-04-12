import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";

const Container = ({ children, className = "" }) => (
  <div className="flex h-screen w-full overflow-hidden">
    <Sidebar />
    <div className={classnames("w-full", [className])}>{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
