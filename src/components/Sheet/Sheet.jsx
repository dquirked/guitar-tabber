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
      <div className="sheet__bar-wrapper">
        {bars.map((barValues, i) => {
          return <Bar key={i} index={i} values={barValues} />;
        })}
      </div>
      <button type="button" onClick={handleAddBar}>
        Add bar
      </button>
    </div>
  );
};

export default Sheet;
