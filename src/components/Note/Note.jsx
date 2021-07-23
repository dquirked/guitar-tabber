/* eslint-disable jsx-a11y/no-autofocus */

import "./note.scss";

import React, { useState } from "react";
import { func, string } from "prop-types";

const propTypes = {
  value: string.isRequired,
  handleChange: func.isRequired,
};

const Note = (props) => {
  const { value, handleChange } = props;

  const [isActive, setIsActive] = useState(false);

  return isActive ? (
    <input
      autoFocus
      className="note__input"
      onChange={(e) => handleChange(e.target.value)}
      maxLength="2"
      type="text"
      onBlur={() => setIsActive(false)}
    />
  ) : (
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
