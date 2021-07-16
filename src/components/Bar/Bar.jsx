import React, { useMemo, useCallback } from "react";
import { number } from "prop-types";
import { useSheetContext } from "../../common/sheetContext.jsx";
import { processBeatSubdivisions } from "../../common/noteTypeControls.js";
import "./bar.scss";

const propTypes = { index: number.isRequired };

const Bar = (props) => {
  const { index } = props;

  const {
    strings: [strings, setStrings],
    beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
    noteType: [noteType, setNoteType],
  } = useSheetContext();

  const processedBeats = useMemo(() => {
    return processBeatSubdivisions(beatsPerMeasure, noteType);
  }, [beatsPerMeasure, noteType]);

  const formattedBeats = (beats) => {
    let currBeat = 1;
    let array = [];

    switch (noteType) {
      case 4:
        return beats.map((_, i) => i + 1);
      case 8:
        {
          beats.forEach((_, i) => {
            if ((i + 1) % 2 === 0) {
              array.push("&");
            } else {
              array.push(currBeat);
              currBeat += 1;
            }
          });
        }
        return array;

      case 16:
        {
          beats.forEach((_, i) => {
            if ((i + 1) % 4 === 1) {
              array.push(currBeat);
              currBeat += 1;
            } else if ((i + 1) % 2 === 0) {
              array.push("&");
            } else {
              array.push("ee");
            }
          });
        }
        return array;
    }
  };

  console.log(formattedBeats(processedBeats));

  return (
    <div className="bar">
      {strings.map((string, i, array) => (
        <div key={string + i} className="bar__string">
          {processedBeats.map((beat, j) => (
            <div key={beat}>
              {index === 0 && j === 0 && <span>{strings[i]}</span>}
              <input className="bar__input" type="text" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Bar.propTypes = propTypes;
export default Bar;

// {i === array.length - 1 && renderBeat(j + 1)}
