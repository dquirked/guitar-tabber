import React, { useMemo } from "react";
import { number } from "prop-types";
import { useSheetContext } from "../../common/sheetContext.jsx";
import * as R from "ramda";
import "./bar.scss";

const propTypes = { index: number.isRequired };

const Bar = (props) => {
  const { index } = props;

  const {
    strings: [strings, setStrings],
    beatsPerMeasure: [beatsPerMeasure, setBeatsPerMeasure],
    noteType: [noteType, setNoteType],
  } = useSheetContext();

  const beats = useMemo(() => {
    return R.range(0, beatsPerMeasure);
  }, [beatsPerMeasure]);

  return (
    <div className="bar">
      {strings.map((string, i, array) => (
        <div key={string + i} className="bar__string">
          {beats.map((beat, j) => (
            <div key={beat}>
              {index === 0 && j === 0 && <span>{strings[i]}</span>}
              <input className="bar__input" type="text" />
              {i === array.length - 1 && (
                <div className="bar__beat">{j + 1}</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Bar.propTypes = propTypes;
export default Bar;
