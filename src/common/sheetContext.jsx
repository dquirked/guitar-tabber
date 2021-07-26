import {
  DelimitedArrayParam,
  JsonParam,
  useQueryParams,
} from "use-query-params";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { removeBar, updateBarNotes, updateNoteType } from "./stateFunctions.js";

import { string } from "prop-types";

const propTypes = { id: string.isRequired };

const SheetContext = React.createContext();

export function useSheetContext() {
  return useContext(SheetContext);
}

export const SheetContextProvider = (props) => {
  const { id } = props;

  const qStrings = `${id}_strings`;
  const qBars = `${id}_bars`;

  const [queryParams, setQueryParams] = useQueryParams({
    [qStrings]: DelimitedArrayParam,
    [qBars]: JsonParam,
  });

  //initalize strings from query params, otherwise return
  //standard guitar tuning
  const [strings, setStrings] = useState(() => {
    if (queryParams[qStrings]) {
      return queryParams[qStrings];
    }

    return ["e", "B", "G", "D", "A", "E"];
  });

  useEffect(() => {
    JSON.stringify(strings) === JSON.stringify(["e", "B", "G", "D", "A", "E"])
      ? setQueryParams({ [qStrings]: undefined })
      : setQueryParams({ [qStrings]: strings });
  }, [strings, setQueryParams, qStrings]);

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
    if (queryParams[qBars]) {
      return queryParams[qBars];
    }
    return [];
  });

  useEffect(() => {
    bars.length > 1
      ? setQueryParams({ [qBars]: bars })
      : setQueryParams({ [qBars]: undefined });
  }, [bars, setQueryParams, qBars]);

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

SheetContextProvider.propTypes = propTypes;
