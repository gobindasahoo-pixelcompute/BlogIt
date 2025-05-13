import React from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import Sidebar from "./Sidebar";

const Container = ({ children, className = "", goback = false }) => {
  const history = useHistory();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className={classnames("w-full", [className])}>
        {goback && (
          <Button
            className="mb-8 shadow-md hover:bg-gray-200"
            icon={LeftArrow}
            style="tertiary"
            onClick={() => history.goBack()}
          />
        )}
        {children}
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
