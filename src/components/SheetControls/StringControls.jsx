import React from "react";
import { array, func } from "prop-types";

import "./string-controls.scss";

const propTypes = {
  strings: array.isRequired,
  setStrings: func.isRequired,
};

const StringControls = (props) => {
  const { strings, setStrings } = props;
  return (
    <div className="string-controls">
      {strings?.map((string, i) => (
        <div key={string}>
          <input
            className="string-controls__input"
            type="text"
            value={string}
          />
        </div>
      ))}
      <button type="button">Add string</button>
    </div>
  );
};

StringControls.propTypes = propTypes;
export default StringControls;
