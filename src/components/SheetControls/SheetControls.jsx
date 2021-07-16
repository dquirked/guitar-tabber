import React, { useMemo } from "react";
import { useSheetContext } from "../../common/sheetContext.jsx";
import StringControls from "./StringControls.jsx";

import "./sheet-controls.scss";

const SheetControls = () => {
  const {
    strings: [strings, setStrings],
    beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
    noteType: [noteType, setNoteType],
  } = useSheetContext();

  return (
    <div className="sheet-controls">
      <div className="sheet-controls__strings">
        <div>Strings</div>
        <StringControls strings={strings} setStrings={setStrings} />
      </div>
    </div>
  );
};

export default SheetControls;
