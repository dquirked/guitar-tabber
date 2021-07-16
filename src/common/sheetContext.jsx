import React, { useState, useContext } from "react";

const SheetContext = React.createContext();

export function useSheetContext() {
  return useContext(SheetContext);
}

export const SheetContextProvider = (props) => {
  const [strings, setStrings] = useState(["e", "B", "G", "D", "A", "E"]);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  //1 = whole note, 2 = half note, 4 = quarter note, 8 = eigth note, 16 = sixteenth note
  const [noteType, setNoteType] = useState(4);
  const [numBars, setNumBars] = useState(1);

  console.log(noteType);

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
