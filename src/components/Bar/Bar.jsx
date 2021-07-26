import "./bar.scss";

import * as R from "ramda";

import { array, number } from "prop-types";

import Note from "../Note/Note.jsx";
import React from "react";
import { useSheetContext } from "../../common/sheetContext.jsx";

const propTypes = { index: number, values: array };

const Bar = (props) => {
  const { index, values } = props;

  const { handleRemoveBar, handleNoteUpdate } = useSheetContext();

  const handleNoteChange = R.curry(
    (barIndex, stringIndex, noteIndex, newNote) =>
      handleNoteUpdate(barIndex, stringIndex, noteIndex, newNote),
  );

  return (
    <div className="bar">
      <div className="bar__content">
        <div className="bar__strings">
          {values.map((string, i) => {
            return (
              <div key={"string-" + i} className="bar__string">
                {string.map((note, j) => {
                  return (
                    <div className="bar__beat" key={"note-" + i + "-" + j}>
                      <Note
                        value={note}
                        handleChange={handleNoteChange(index, i, j)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <hr />
      </div>
      <div className="bar__remove-container">
        <button onClick={() => handleRemoveBar(index)} type="button">
          X
        </button>
      </div>
    </div>
  );
};

Bar.propTypes = propTypes;
export default Bar;

// {i === array.length - 1 && renderBeat(j + 1)}
