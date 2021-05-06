import React, { useState, useEffect, useMemo } from "react";
import {} from "prop-types";
import {
  useQueryParam,
  DelimitedNumericArrayParam,
  withDefault,
} from "use-query-params";
import pako from "pako";
import TabString from "./TabString.jsx";
import TabRenderer from "../TabRenderer/TabRenderer.jsx";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  removeValueFromString,
  addValueToString,
  changeValueOfString,
  createTabString,
  clearStringValues,
  clearAllStringValues,
  bringStringValuesForward,
  findLongestPosition,
  addSingleValueToAllStrings,
} from "../../common/stateFunctions.js";
import "./tabber.scss";

const propTypes = {};

const Tabber = (props) => {
  const [queryParam, setQueryParam] = useQueryParam(
    "data",
    DelimitedNumericArrayParam,
  );

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
    queryParam
      ? JSON.parse(pako.inflate(Uint8Array.from(queryParam), { to: "string" }))
      : defaultState,
  );

  const longestPosition = useMemo(() => findLongestPosition(stringValues), [
    stringValues,
  ]);

  const tabString = useMemo(() => createTabString(stringValues), [
    stringValues,
  ]);

  useEffect(() => {
    //if the stringData is not empty
    if (longestPosition !== -1) {
      setQueryParam(pako.deflate(JSON.stringify(stringValues)));
    }
  }, [stringValues, setQueryParam, longestPosition]);

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

  const clearValues = (string) => {
    setStringValues((prevState) => {
      return clearStringValues(string, prevState);
    });
  };

  const clearAll = () => {
    setStringValues((prevState) => {
      return clearAllStringValues(prevState);
    });
  };

  const bringStringForward = (string) => {
    setStringValues((prevState) => {
      return bringStringValuesForward(string, longestPosition, prevState);
    });
  };

  const addSingleValueToStrings = () => {
    setStringValues((prevState) => {
      return addSingleValueToAllStrings(prevState);
    });
  };

  return (
    <div className="tabber">
      <div className="tabber__controls">
        <div className="tabber__string-wrapper">
          {Object.keys(stringValues).map((key, i) => (
            <TabString
              key={key}
              stringName={key}
              values={stringValues[key]}
              removeValue={removeValue}
              addValue={addValue}
              changeValue={changeValue}
              clearValues={clearValues}
              bringStringForward={bringStringForward}
            />
          ))}
        </div>
        <button
          onClick={() => addSingleValueToStrings()}
          className="tabber__new-column-btn"
          type="button"
        >
          +
        </button>
      </div>
      <CopyToClipboard text={tabString} onCopy={() => setCopyValue(true)}>
        <button className="tabber__copy-button" type="button">
          copy
        </button>
      </CopyToClipboard>
      <button
        className="tabber__clear-all-btn"
        onClick={() => clearAll()}
        type="button"
      >
        clear all
      </button>
      <TabRenderer tabString={tabString} />
    </div>
  );
};

Tabber.propTypes = propTypes;
export default Tabber;
