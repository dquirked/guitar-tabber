import React, { useState, useRef, useEffect } from "react";
import { string } from "prop-types";

const propTypes = { stringName: string.isRequired };

import "./tab-string.scss";

const TabString = (props) => {
  const { stringName, values, removeValue, addValue } = props;

  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [values, inputRef, setInputValue]);

  return (
    <div className="tab-string">
      <div className="tab-string__string-name">
        <div>{stringName}</div>
      </div>
      {values && values.length > 0 && (
        <div className="tab-string__string-values">
          <div>-</div>
          {values.map((value, i) => (
            <div key={i}>
              <div>{value.value}-</div>
              <div>
                <button
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
        ref={inputRef}
        className="tab-string__input"
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button
        onClick={() =>
          addValue(stringName, {
            value: inputValue,
            key: `${stringName}-${values.length + 1}`,
          })
        }
        type="button"
      >
        add
      </button>
    </div>
  );
};

TabString.propTypes = propTypes;
export default TabString;
