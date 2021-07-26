import "./string-names.scss";
import {} from "prop-types";

import * as R from "ramda";

import Note from "../Note/Note.jsx";
import React from "react";
import { updateStringName } from "../../common/stateFunctions.js";
import { useSheetContext } from "../../common/sheetContext.jsx";

const propTypes = {};

const StringNames = (props) => {
  const {
    strings: [strings, setStrings],
  } = useSheetContext();

  const handleStringNameChange = R.curry((index, newName) => {
    setStrings((prevState) => {
      return updateStringName(index, newName, prevState);
    });
  });

  return (
    <div className="string-names">
      {strings?.map((string, i) => (
        <div className="string-names__name-container" key={string + i}>
          <Note
            value={string}
            guid={string + i}
            handleChange={handleStringNameChange(i)}
          />
        </div>
      ))}
    </div>
  );
};

StringNames.propTypes = propTypes;
export default StringNames;
