import "./string-controls.scss";
import {} from "prop-types";

import React from "react";
import { updateStringName } from "../../common/stringControls.js";
import { useSheetContext } from "../../common/sheetContext.jsx";

const propTypes = {};

const StringControls = (props) => {
  const {
    strings: [strings, setStrings],
  } = useSheetContext();

  const handleStringNameChange = (index, newName) => {
    setStrings((prevState) => {
      return updateStringName(index, newName, prevState);
    });
  };

  return (
    <div className="string-controls">
      {strings?.map((string, i) => (
        <div className="string-controls__name-container" key={string + i}>
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
