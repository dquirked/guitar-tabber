/* eslint-disable  jsx-a11y/no-onchange */

import "./sheet-controls.scss";

import React from "react";
import { useSheetContext } from "../../common/sheetContext.jsx";

const SheetControls = () => {
  const {
    strings: [strings, setStrings],
    beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
    noteType: [noteType, setNoteType],
  } = useSheetContext();

  return (
    <div className="sheet-controls">
      <div className="sheet-controls__beats">
        <div>Beats per measure</div>
        <input
          className="sheet-controls__beat-input"
          onChange={(e) => setBeatsPerMeasure(parseInt(e.target.value))}
          value={beatsPerMeasure}
          type="text"
          maxLength="2"
        />
      </div>
      <div className="sheet-controls__note-type">
        <div>Note Type</div>
        <span>1 / </span>
        <select
          onChange={(e) => setNoteType(parseInt(e.target.value))}
          className="sheet-controls__note-selector"
          name="note selector"
          defaultValue="4"
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </select>
      </div>
    </div>
  );
};

export default SheetControls;
