import React, { useState, useEffect } from "react";
import { string } from "prop-types";

const propTypes = { stringName: string.isRequired };

import "./tab-string.scss";

const TabString = (props) => {
  const { stringName, values, removeValue, addValue, changeValue } = props;

  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(undefined);

  useEffect(() => {
    setInputValue("");
  }, [values]);

  const getKey = (index) => `${stringName}-${index}`

  return (
    <div className="tab-string">
      <div className="tab-string__string-name">
        <div>{stringName}</div>
      </div>
      {values && values.length > 0 && (
        <div className="tab-string__string-values">
          {values.map((value, i) => (
            <div className="tab-string__string-value-wrapper" key={i}>
				{editingIndex === i ? (
					<input
						className="tab-string__input"
						type="text"
						onChange={(e) => {
							changeValue(stringName, i, {
								value: e.target.value,
								key: getKey(i),
							});
							setEditingIndex(undefined)
						}}
						maxLength="1"
						value={inputValue}
					/>
				) : (
					<div onClick={() => setEditingIndex(i)}>---------{value.value}--------</div>
				)}
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
					key: getKey(values.length + 1),
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
