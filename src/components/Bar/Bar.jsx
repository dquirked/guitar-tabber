import "./bar.scss";

import React, { useMemo } from "react";

import Note from "../Note/Note.jsx";
import { processBeatSubdivisions } from "../../common/noteTypeControls.js";
import { string } from "prop-types";
import { useSheetContext } from "../../common/sheetContext.jsx";

const propTypes = { guid: string.isRequired };

const Bar = (props) => {
  const {
    strings: [strings, setStrings],
    beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
    noteType: [noteType, setNoteType],
  } = useSheetContext();

  const { index, guid } = props;

  const processedBeats = useMemo(() => {
    return processBeatSubdivisions(beatsPerMeasure, noteType);
  }, [beatsPerMeasure, noteType]);

  return (
    <div className="bar">
      {strings.map((string, i, array) => (
        <div key={string + i} className="bar__string">
          {processedBeats.map((beat, j) => (
            <div className="bar__beat" key={beat}>
              <Note />
            </div>
          ))}
        </div>
      ))}
      {/* <button onClick={} type="button">X</button> */}
    </div>
  );
};

Bar.propTypes = propTypes;
export default Bar;

// {i === array.length - 1 && renderBeat(j + 1)}
