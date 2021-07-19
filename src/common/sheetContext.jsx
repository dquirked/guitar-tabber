import React, { useContext, useState } from "react";

import Bar from "../components/Bar/Bar.jsx";
import createGuid from "lodash.uniqueid";

const SheetContext = React.createContext();

export function useSheetContext() {
  return useContext(SheetContext);
}

export const SheetContextProvider = (props) => {
  const [strings, setStrings] = useState(["e", "B", "G", "D", "A", "E"]);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  //1 = whole note, 2 = half note, 4 = quarter note, 8 = eigth note, 16 = sixteenth note
  const [noteType, setNoteType] = useState(4);
  const [bars, setBars] = useState(
    [0].map(() => (
      <Bar guid={`bar-${createGuid()}`} key={`key-${createGuid()}`} />
    )),
  );

  const handleAddBar = () =>
    setBars((prevState) => [
      ...prevState,
      <Bar guid={`bar-${createGuid()}`} key={`key-${createGuid()}`} />,
    ]);

  return (
    <SheetContext.Provider
      value={{
        strings: [strings, setStrings],
        beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
        noteType: [noteType, setNoteType],
        bars: [bars, setBars],
        handleAddBar: handleAddBar,
      }}
      {...props}
    />
  );
};
