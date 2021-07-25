import React, { useContext, useMemo, useState } from "react";
import { removeBar, updateBarNotes, updateNoteType } from "./stateFunctions.js";

const SheetContext = React.createContext();

export function useSheetContext() {
  return useContext(SheetContext);
}

export const SheetContextProvider = (props) => {
  //inital string names
  const [strings, setStrings] = useState(["e", "B", "G", "D", "A", "E"]);

  //intialize at 4 beats per measure
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

  //1 = whole note, 2 = half note, 4 = quarter note, 8 = eigth note, 16 = sixteenth note
  const [noteType, setNoteType] = useState(4);

  //subdivide beats
  const processedBeats = useMemo(() => {
    return updateNoteType(beatsPerMeasure, noteType);
  }, [beatsPerMeasure, noteType]);

  //bar filled with dummy notes
  const dummyBar = useMemo(
    () =>
      strings.reduce((acc, curr) => {
        return [...acc, processedBeats.map((_, i) => "-")];
      }, []),
    [processedBeats, strings],
  );

  //initialize one bar with filler notes on all strings
  const [bars, setBars] = useState([dummyBar]);

  const handleAddBar = () => setBars((prevState) => [...prevState, dummyBar]);

  const handleRemoveBar = (index) =>
    setBars((prevState) => removeBar(index, prevState));

  const handleNoteUpdate = (barIndex, stringIndex, noteIndex, newNoteValue) => {
    return setBars((prevState) =>
      updateBarNotes(barIndex, stringIndex, noteIndex, newNoteValue, prevState),
    );
  };

  return (
    <SheetContext.Provider
      value={{
        strings: [strings, setStrings],
        beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
        noteType: [noteType, setNoteType],
        bars,
        handleAddBar,
        handleRemoveBar,
        handleNoteUpdate,
      }}
      {...props}
    />
  );
};
