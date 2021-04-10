import React, { useState, useEffect } from "react";
import {} from "prop-types";
import { equals } from 'ramda';
import { useQueryParam, StringParam } from "use-query-params";

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
	const [queryParam, setQueryParam] = useQueryParam("strings", StringParam);
	let parsedQueryParams = {};
	try {
	  parsedQueryParams = JSON.parse(queryParam)
	} catch (e) {}

	const defaultState = {
		e: [],
		b: [],
		G: [],
		D: [],
		A: [],
		E: [],
	};
  const [stringValues, setStringValues] = useState(queryParam ? parsedQueryParams : defaultState);

  useEffect(() => {
	if (!equals(parsedQueryParams, stringValues)) {
		setQueryParam(JSON.stringify(stringValues))
	}
  }, [stringValues]);

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
