import {} from "prop-types";
import "./note.scss";

import React, { useState } from "react";

const propTypes = {};

const Note = (props) => {
  const [value, setValue] = useState("—");
  return (
    <input
      maxLength="2"
      className="note"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
    />
  );
};

Note.propTypes = propTypes;
export default Note;
