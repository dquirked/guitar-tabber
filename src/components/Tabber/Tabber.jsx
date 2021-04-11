import React, { useState, useEffect } from "react";
import {} from "prop-types";
import { useQueryParams, ArrayParam, withDefault } from "use-query-params";

import TabString from "./TabString.jsx";
import TabRenderer from "../TabRenderer/TabRenderer.jsx";

import {
  removeValueFromString,
  addValueToString,
  changeValueOfString,
} from "../../common/stateFunctions.js";
import "./tabber.scss";

const propTypes = {};

const Tabber = (props) => {
  const [queryParams, setQueryParams] = useQueryParams({
    e: withDefault(ArrayParam, []),
    B: withDefault(ArrayParam, []),
    G: withDefault(ArrayParam, []),
    D: withDefault(ArrayParam, []),
    A: withDefault(ArrayParam, []),
    E: withDefault(ArrayParam, []),
  });

  const defaultState = {
    e: [],
    B: [],
    G: [],
    D: [],
    A: [],
    E: [],
  };
  const [stringValues, setStringValues] = useState(
    queryParams ? queryParams : defaultState,
  );

  useEffect(() => {
    setQueryParams(stringValues);
  }, [stringValues, setQueryParams]);

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

  const changeValue = (string, index, value) => {
    setStringValues((prevState) => {
      return changeValueOfString(string, index, value, prevState);
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
          changeValue={changeValue}
        />
      ))}
      <TabRenderer stringValues={stringValues} />
    </div>
  );
};

Tabber.propTypes = propTypes;
export default Tabber;
