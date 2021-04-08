import React from "react";
import { string } from "prop-types";

const propTypes = { stringName: string.isRequired };

import "./tab-string.scss";

const TabString = (props) => {
  const { stringName } = props;

  return (
    <div className="tab-string">
      <div className="tab-string__string-name">
        <div>{stringName}</div>
      </div>
      <button type="button">Add note</button>
    </div>
  );
};

TabString.propTypes = propTypes;
export default TabString;
