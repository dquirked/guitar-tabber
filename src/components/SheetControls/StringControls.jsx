import React from "react";
import { array, func } from "prop-types";

import "./string-controls.scss";

import { updateStringName } from "../../common/stringControls.js";

const propTypes = {
  strings: array.isRequired,
  setStrings: func.isRequired,
};

const StringControls = (props) => {
  const { strings, setStrings } = props;

  const handleStringNameChange = (index, newName) => {
    setStrings((prevState) => {
      return updateStringName(index, newName, prevState);
    });
  };

  return (
    <div className="string-controls">
      {strings?.map((string, i) => (
        <div key={string + i}>
          <input
            className="string-controls__input"
            type="text"
            value={string}
            onChange={(e) => handleStringNameChange(i, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

StringControls.propTypes = propTypes;
export default StringControls;
