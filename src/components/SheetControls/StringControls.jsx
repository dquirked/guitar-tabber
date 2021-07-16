import React from "react";
import { array, func } from "prop-types";

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
          <input type="text" value={string} />
        </div>
      ))}
    </div>
  );
};

StringControls.propTypes = propTypes;
export default StringControls;
