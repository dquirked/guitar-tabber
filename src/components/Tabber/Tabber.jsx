import React, { useState, useEffect, useMemo } from "react";
import {} from "prop-types";
import { useQueryParam, DelimitedNumericArrayParam } from "use-query-params";
import TabString from "./TabString.jsx";
import TabRenderer from "../TabRenderer/TabRenderer.jsx";
import * as R from "ramda";
import { useClipboard } from "use-clipboard-copy";

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
  compressData,
  decompressData,
} from "../../common/stateFunctions.js";
import "./tabber.scss";

const propTypes = {};

const Tabber = (props) => {
  const [queryParam, setQueryParam] = useQueryParam(
    "data",
    DelimitedNumericArrayParam,
  );

  const defaultState = useMemo(() => {
    return {
      e: ["-", "-", "-", "-", "-", "-", "-", "-", "|"],
      B: ["-", "-", "-", "-", "-", "-", "-", "-", "|"],
      G: ["-", "-", "-", "-", "-", "-", "-", "-", "|"],
      D: ["-", "-", "-", "-", "-", "-", "-", "-", "|"],
      A: ["-", "-", "-", "-", "-", "-", "-", "-", "|"],
      E: ["-", "-", "-", "-", "-", "-", "-", "-", "|"],
    };
  }, []);

  const clipboard = useClipboard(
    { copiedTimeout: 1000 }, // timeout duration in milliseconds
  );

  const [stringValues, setStringValues] = useState(() => {
    let parsedData = undefined;

    if (queryParam) {
      try {
        parsedData = decompressData(queryParam);
      } catch (e) {
        console.warn(e);
      }
    }

    return parsedData ? parsedData : defaultState;
  });

  const longestPosition = useMemo(() => findLongestPosition(stringValues), [
    stringValues,
  ]);

  const tabString = useMemo(() => createTabString(stringValues), [
    stringValues,
  ]);

  useEffect(() => {
    R.equals(defaultState, stringValues)
      ? window.history.pushState({}, "", "/guitar-tabber")
      : setQueryParam(compressData(stringValues));
  }, [stringValues, setQueryParam, longestPosition, defaultState]);

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
      <button
        onClick={() => clipboard.copy(tabString)}
        className="tabber__copy-button"
        type="button"
      >
        {clipboard.copied ? "copied!" : "copy"}
      </button>
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
