import React, { useMemo } from "react";
import { useSheetContext } from "../../common/sheetContext.jsx";
import * as R from "ramda";
import "./bar.scss";

const Bar = () => {
  const {
    strings: [strings, setStrings],
    beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
    noteType: [noteType, setNoteType],
  } = useSheetContext();

  const beats = useMemo(() => {
    return R.range(0, beatsPerMeasure);
  }, [beatsPerMeasure]);

  return (
    <div className="bar">
      {strings.map((string, i) => (
        <div key={string} className="bar__string">
          {beats.map((beat, i) => (
            <div key={beat}>
              <input className="bar__input" type="text" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Bar;
