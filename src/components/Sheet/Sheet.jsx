import React, { useState } from "react";
import Bar from "../Bar/Bar.jsx";
import * as R from "ramda";
import "./sheet.scss";

const Sheet = () => {
  //start with one bar
  const [bars, setBars] = useState(1);

  const handleAddBar = () => {
    setBars(bars + 1);
  };

  const numBars = R.range(0, bars);

  return (
    <div className="sheet">
      {numBars.map((bar, i) => (
        <Bar key={i} />
      ))}
      <button type="button" onClick={handleAddBar}>
        Add bar
      </button>
    </div>
  );
};

export default Sheet;
