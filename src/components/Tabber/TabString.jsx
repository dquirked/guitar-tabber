/* eslint-disable jsx-a11y/no-autofocus*/

import React, { useState, useEffect } from "react";
import { string, func, arrayOf } from "prop-types";
import useClickAway from "../../common/useClickAway.jsx";

const propTypes = {
  stringName: string.isRequired,
  values: arrayOf(string.isRequired).isRequired,
  removeValue: func.isRequired,
  addValue: func.isRequired,
  changeValue: func.isRequired,
};

import "./tab-string.scss";

const TabString = (props) => {
  const { stringName, values, removeValue, addValue, changeValue } = props;

  const [hasMounted, setHasMounted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(undefined);

  const valueRef = useClickAway({
    isOpen: inputValue !== undefined,
    setOpen: () => setEditingIndex(undefined),
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setInputValue("");
  }, [values]);

  return !hasMounted ? null : (
    <div className="tab-string">
      <div className="tab-string__string-name">
        <div>{stringName}</div>
      </div>
      {values && values.length > 0 && (
        <div className="tab-string__string-values">
          {values.map((value, i) => (
            <div
              ref={valueRef}
              className="tab-string__string-value-wrapper"
              key={i}
            >
              {editingIndex === i ? (
                <div>
                  <input
                    autoFocus
                    className="tab-string__input"
                    type="text"
                    onBlur={(e) => {
                      changeValue(stringName, i, e.target.value);
                      setEditingIndex(undefined);
                    }}
                  />
                </div>
              ) : (
                <button
                  className="tab-string__change-btn"
                  type="button"
                  onClick={() => setEditingIndex(i)}
                >
                  {value}
                </button>
              )}
              <div>
                <button
                  className="tab-string__remove"
                  type="button"
                  onClick={() => removeValue(stringName, i)}
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
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={(e) => {
          addValue(stringName, e.target.value);
        }}
        value={inputValue}
      />
    </div>
  );
};

TabString.propTypes = propTypes;
export default TabString;
