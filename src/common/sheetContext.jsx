import * as R from "ramda";

import {
  DelimitedArrayParam,
  JsonParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { removeBar, updateBarNotes, updateNoteType } from "./stateFunctions.js";

const SheetContext = React.createContext();

export function useSheetContext() {
  return useContext(SheetContext);
}

export const SheetContextProvider = (props) => {
  const [queryParams, setQueryParams] = useQueryParams({
    q_strings: DelimitedArrayParam,
    q_bars: JsonParam,
  });

  const { q_strings, q_bars } = queryParams;

  //initalize strings from query params, otherwise return
  //standard guitar tuning
  const [strings, setStrings] = useState(() => {
    if (q_strings) {
      return q_strings;
    }

    return ["e", "B", "G", "D", "A", "E"];
  });

  useEffect(() => {
    JSON.stringify(strings) === JSON.stringify(["e", "B", "G", "D", "A", "E"])
      ? setQueryParams({ q_strings: undefined })
      : setQueryParams({ q_strings: strings });
  }, [strings, setQueryParams, q_strings]);

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

  //initialize the bars to the querystring if it exists
  //otherwise return a dummy bar
  const [bars, setBars] = useState(() => {
    if (q_bars) {
      return q_bars;
    }
    return [dummyBar];
  });

  useEffect(() => {
    bars.length > 1
      ? setQueryParams({ q_bars: bars })
      : setQueryParams({ q_bars: undefined });
  }, [bars, setQueryParams]);

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
