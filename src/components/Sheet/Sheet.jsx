import "./sheet.scss";

import Bar from "../Bar/Bar.jsx";
import React from "react";
import StringNames from "../StringNames/StringNames.jsx";
import { useSheetContext } from "../../common/sheetContext.jsx";

const Sheet = () => {
  const { bars, handleAddBar } = useSheetContext();

  return (
    <div className="sheet">
      <StringNames />
      {bars.map((barValues, i) => {
        return (
          <React.Fragment key={i}>
            <Bar index={i} values={barValues} />
            <hr className="sheet__bar-seperator" />
          </React.Fragment>
        );
      })}
      <button type="button" onClick={handleAddBar}>
        Add bar
      </button>
    </div>
  );
};

export default Sheet;
