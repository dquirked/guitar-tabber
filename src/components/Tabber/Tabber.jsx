import React, { useState } from "react";
import {} from "prop-types";

import TabString from "./TabString.jsx";
import TabRenderer from "../TabRenderer/TabRenderer.jsx";

import {
  removeValueFromString,
  addValueToString,
} from "../../common/stateFunctions.js";
import "./tabber.scss";

const propTypes = {};

const Tabber = (props) => {
  const [stringValues, setStringValues] = useState({
    e: [],
    b: [],
    G: [],
    D: [],
    A: [],
    E: [],
  });

  const removeValue = (string, value) => {
    setStringValues((prevState) => {
      return removeValueFromString(string, value, prevState);
    });
  };

  const addValue = (string, value) => {
    setStringValues((prevState) => {
      return addValueToString(string, value, prevState);
    });
  };

  return (
    <div className="tabber">
      {Object.keys(stringValues).map((key, i) => (
        <TabString
          key={key}
          stringName={key}
          values={stringValues[key]}
          removeValue={removeValue}
          addValue={addValue}
        />
      ))}
      <TabRenderer stringValues={stringValues} />
    </div>
  );
};

Tabber.propTypes = propTypes;
export default Tabber;
