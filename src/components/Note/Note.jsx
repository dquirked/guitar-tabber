/* eslint-disable jsx-a11y/no-autofocus */

import "./note.scss";

import React, { useState } from "react";
import { func, string } from "prop-types";

const propTypes = {
  value: string.isRequired,
  handleChange: func.isRequired,
  guid: string.isRequired,
};

const Note = (props) => {
  const { value, handleChange, guid } = props;

  const [isActive, setIsActive] = useState(false);
  console.log(isActive);

  if (isActive) {
    return (
      <input
        autoFocus
        className="note__input"
        onChange={(e) => handleChange(e.target.value)}
        maxLength="2"
        type="text"
        onBlur={() => setIsActive(false)}
      />
    );
  }
  return (
    <button
      type="button"
      className="note__btn"
      onClick={() => setIsActive(true)}
    >
      {value}
    </button>
  );
};

Note.propTypes = propTypes;
export default Note;
