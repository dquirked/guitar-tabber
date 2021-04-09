import React, { useState, useEffect } from "react";
import { shape, objectOf, arrayOf, string } from "prop-types";
import { Controlled as CodeMirror } from "react-codemirror2";

import "./tab-renderer.scss";
import "codemirror/lib/codemirror.css";

const propTypes = {
  stringValues: objectOf(
    arrayOf(shape({ value: string.isRequired, key: string.isRequired })),
  ).isRequired,
};

const TabRenderer = (props) => {
  const { stringValues } = props;

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    //prevent hydration problems
    setHasMounted(true);
  }, []);

  const formattedStrings = Object.keys(stringValues).map((key, i) => {
    return stringValues[key].reduce((acc, curr) => acc + curr.value, "");
  });

  const singleString = formattedStrings.reduce((acc, curr) => acc + curr, "");

  const formatLineNumber = (num) => {
    switch (num) {
      case 1:
        return "e";
      case 2:
        return "B";
      case 3:
        return "G";
      case 4:
        return "D";
      case 5:
        return "A";
      case 6:
        return "E";
      default:
        return "error";
    }
  };

  return !hasMounted ? null : (
    <div className="tab-renderer">
      {hasMounted && (
        <CodeMirror
          options={{ lineNumbers: true, lineNumberFormatter: formatLineNumber }}
          value={singleString}
        />
      )}
    </div>
  );
};

TabRenderer.propTypes = propTypes;
export default TabRenderer;
