import "./sheet.scss";

import React from "react";
import StringControls from "../StringControls/StringControls.jsx";
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
      <StringControls />
      {bars.map((bar, i) => React.cloneElement(bar, { index: i }))}
      <button type="button" onClick={handleAddBar}>
        Add bar
      </button>
    </div>
  );
};

export default Sheet;
