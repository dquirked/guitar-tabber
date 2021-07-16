import React, { useMemo, useCallback } from "react";
import { useSheetContext } from "../../common/sheetContext.jsx";
import Bar from "../Bar/Bar.jsx";
import * as R from "ramda";
import "./sheet.scss";

const Sheet = () => {
  const {
    strings: [strings, setStrings],
    beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
    noteType: [noteType, setNoteType],
    numBars: [numBars, setNumBars],
  } = useSheetContext();

  const handleAddBar = useCallback(() => setNumBars(numBars + 1), [
    numBars,
    setNumBars,
  ]);

  const bars = useMemo(() => R.range(0, numBars), [numBars]);

  return (
    <div className="sheet">
      {bars.map((bar, i) => (
        <Bar index={i} key={bar} />
      ))}
      <button type="button" onClick={handleAddBar}>
        Add bar
      </button>
    </div>
  );
};

export default Sheet;
