import "./sheet.scss";

import React from "react";
import StringNames from "../StringNames/StringNames.jsx";
import { useSheetContext } from "../../common/sheetContext.jsx";

const Sheet = () => {
  const {
    strings: [strings, setStrings],
    beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
    noteType: [noteType, setNoteType],
    bars: [bars, setBars],
    handleAddBar,
  } = useSheetContext();

  return (
    <div className="sheet">
      <StringNames />
      {bars.map((bar, i) => (
        <React.Fragment key={i}>
          {React.cloneElement(bar, { index: i })}
          <hr className="sheet__bar-seperator" />
        </React.Fragment>
      ))}
      <button type="button" onClick={handleAddBar}>
        Add bar
      </button>
    </div>
  );
};

export default Sheet;
