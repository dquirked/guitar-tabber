import React, { useState, useMemo } from "react";
import * as R from "ramda";
import "./bar.scss";

const Bar = () => {
  const [strings, setStrings] = useState(["e", "B", "G", "D", "A", "E"]);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [noteType, setNoteType] = useState("eigth");

  const beats = useMemo(() => {
    return R.range(0, beatsPerMeasure);
  }, [beatsPerMeasure]);

  return (
    <div className="bar">
      {strings.map((string, i) => (
        <div key={string} className="bar__string">
          {beats.map((beat, i) => (
            <div key={beat}>
              <input type="text" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Bar;
