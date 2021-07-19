/* eslint-disable jsx-a11y/no-autofocus */

import "./note.scss";

import React, { useState } from "react";

import { string } from "prop-types";

const propTypes = { defaultValue: string.isRequired };

const Note = (props) => {
  const { defaultValue } = props;

  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(defaultValue);

  return !isActive ? (
    <button
      type="button"
      className="note__btn"
      onClick={() => setIsActive(true)}
    >
      {value}
    </button>
  ) : (
    <input
      autoFocus
      className="note__input"
      onChange={(e) => console.log("changed")}
      maxLength="2"
      type="text"
      onBlur={() => setIsActive(false)}
    />
  );
};

Note.propTypes = propTypes;
export default Note;
