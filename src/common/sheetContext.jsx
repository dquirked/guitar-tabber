import React, { useState, useContext } from "react";

const SheetContext = React.createContext();

export function useSheetContext() {
  return useContext(SheetContext);
}

export const SheetContextProvider = (props) => {
  const [strings, setStrings] = useState(["e", "B", "G", "D", "A", "E"]);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [noteType, setNoteType] = useState("eigth");
  const [numBars, setNumBars] = useState(1);

  return (
    <SheetContext.Provider
      value={{
        strings: [strings, setStrings],
        beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
        noteType: [noteType, setNoteType],
        numBars: [numBars, setNumBars],
      }}
      {...props}
    />
  );
};
