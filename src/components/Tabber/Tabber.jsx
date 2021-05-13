import React, { useState, useEffect, useMemo } from "react";
import { string } from "prop-types";
import { useQueryParam, DelimitedNumericArrayParam } from "use-query-params";
import TabString from "./TabString.jsx";
import * as R from "ramda";
import { useClipboard } from "use-clipboard-copy";
import { useTabStringContext } from "../../common/TabStringContext.jsx";
import defaultStateObj from "./defaultState.js";
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
  updateTabStringContext,
} from "../../common/stateFunctions.js";
import "./tabber.scss";

const propTypes = { id: string.isRequired };

const Tabber = (props) => {
  const { id } = props;

  const [tabStringContext, setTabStringContext] = useTabStringContext();

  const [queryParam, setQueryParam] = useQueryParam(
    id,
    DelimitedNumericArrayParam,
  );

  const defaultState = useMemo(() => {
    return defaultStateObj;
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
    setTabStringContext((prevState) => {
      return updateTabStringContext(id, tabString, prevState);
    });
  }, [tabString, setTabStringContext, id]);

  useEffect(() => {
    R.equals(defaultState, stringValues)
      ? window.history.replaceState({}, "", "/guitar-tabber")
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

  const renderBottomControls = () => {
    return (
      <>
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
      </>
    );
  };

  const renderAddValue = () => {
    return (
      <button
        onClick={() => addSingleValueToStrings()}
        className="tabber__new-column-btn"
        type="button"
      >
        +
      </button>
    );
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
      </div>
    </div>
  );
};

Tabber.propTypes = propTypes;
export default Tabber;
