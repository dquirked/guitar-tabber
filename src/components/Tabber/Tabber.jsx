import React, { useState, useEffect } from "react";
import {} from "prop-types";
import { useQueryParams, ArrayParam, withDefault } from "use-query-params";

import TabString from "./TabString.jsx";
import TabRenderer from "../TabRenderer/TabRenderer.jsx";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  removeValueFromString,
  addValueToString,
  changeValueOfString,
  createTabString,
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

  const [copyValue, setCopyValue] = useState("");

  const [stringValues, setStringValues] = useState(
    queryParams ? queryParams : defaultState,
  );

  const tabString = createTabString(stringValues);

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
      <CopyToClipboard text={tabString} onCopy={() => setCopyValue(true)}>
        <button className="tabber__copy-button" type="button">
          Copy
        </button>
      </CopyToClipboard>
      <TabRenderer tabString={tabString} />
    </div>
  );
};

Tabber.propTypes = propTypes;
export default Tabber;
