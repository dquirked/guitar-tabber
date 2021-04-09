import React, { useState, useEffect } from "react";
import { string } from "prop-types";

const propTypes = { stringName: string.isRequired };

import "./tab-string.scss";

const TabString = (props) => {
  const { stringName, values, removeValue, addValue } = props;

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [values]);

  return (
    <div className="tab-string">
      <div className="tab-string__string-name">
        <div>{stringName}</div>
      </div>
      {values && values.length > 0 && (
        <div className="tab-string__string-values">
          {values.map((value, i) => (
            <div className="tab-string__string-value-wrapper" key={i}>
              <div>---------{value.value}--------</div>
              <div>
                <button
                  className="tab-string__remove"
                  type="button"
                  onClick={() => removeValue(stringName, value)}
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <input
        className="tab-string__input"
        type="text"
        onChange={(e) => {
          addValue(stringName, {
            value: e.target.value,
            key: `${stringName}-${values.length + 1}`,
          });
        }}
        maxLength="1"
        value={inputValue}
      />
    </div>
  );
};

TabString.propTypes = propTypes;
export default TabString;
