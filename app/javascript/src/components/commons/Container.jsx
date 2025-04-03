import React from "react";

import classnames from "classnames";
import NavBar from "components/NavBar";
import PropTypes from "prop-types";

const Container = ({ children, className = "" }) => (
  <div className="flex">
    <NavBar />
    <div className={classnames("w-full p-6", [className])}>{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
