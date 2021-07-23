import "./bar.scss";

import * as R from "ramda";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { updateBarNotes, updateNoteType } from "../../common/stateFunctions.js";

import Note from "../Note/Note.jsx";
import { string } from "prop-types";
import uniqueId from "lodash.uniqueid";
import { useSheetContext } from "../../common/sheetContext.jsx";

const propTypes = { guid: string.isRequired };

const Bar = (props) => {
  const {
    strings: [strings, setStrings],
    beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
    noteType: [noteType, setNoteType],
  } = useSheetContext();

  const { guid } = props;

  const processedBeats = useMemo(() => {
    return updateNoteType(beatsPerMeasure, noteType);
  }, [beatsPerMeasure, noteType]);

  const handleNoteChange = R.curry((string, index, newNote) => {
    setNotes((prevState) => {
      return updateBarNotes(string, index, newNote, prevState);
    });
  });

  const [notes, setNotes] = useState(
    strings.reduce((acc, curr, i) => {
      const noteKey = `${guid}-${uniqueId()}`;
      const noteGuid = `${guid}-${uniqueId()}`;
      return [
        ...acc,
        [
          curr,
          processedBeats.map((beat, i) => (
            <Note
              key={noteKey}
              guid={noteGuid}
              value="-"
              handleChange={handleNoteChange(curr, i)}
            />
          )),
        ],
      ];
    }, []),
  );

  useEffect(() => {
    setNotes(
      strings.reduce((acc, curr, i) => {
        const noteKey = `${guid}-${uniqueId()}`;
        const noteGuid = `${guid}-${uniqueId()}`;
        return [
          ...acc,
          [
            curr,
            processedBeats.map((beat, i) => (
              <Note
                key={noteKey}
                guid={noteGuid}
                value="-"
                handleChange={handleNoteChange(curr, i)}
              />
            )),
          ],
        ];
      }, []),
    );
  }, [processedBeats, setNotes, guid, strings]);

  return (
    <div className="bar">
      {notes.map((string, i) => {
        const [name, notes] = string;
        return (
          <div key={string + i} className="bar__string">
            {notes.map((note, j) => (
              <div className="bar__beat" key={name + i + j}>
                {note}
              </div>
            ))}
          </div>
        );
      })}
      {/* <button onClick={} type="button">X</button> */}
    </div>
  );
};

Bar.propTypes = propTypes;
export default Bar;

// {i === array.length - 1 && renderBeat(j + 1)}
