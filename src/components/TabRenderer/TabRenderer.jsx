import React, { useState, useEffect, useMemo } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useTabStringContext } from "../../common/TabStringContext.jsx";
import { concatTabStrings } from "../../common/stateFunctions.js";
import * as R from "ramda";

import "./tab-renderer.scss";
import "codemirror/lib/codemirror.css";

const TabRenderer = (props) => {
  const [tabStringContext, setTabStringContext] = useTabStringContext();

  const [hasMounted, setHasMounted] = useState(false);

  const concatedTabStrings = useMemo(() => concatTabStrings(tabStringContext), [
    tabStringContext,
  ]);

  useEffect(() => {
    //prevent hydration problems
    setHasMounted(true);
  }, []);

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
        return "";
    }
  };

  const onCodeMirrorMount = (editorContext, event) => {
    console.log(editorContext, event);
  };

  return !hasMounted ? null : (
    <div className="tab-renderer">
      <CodeMirror
        editorDidMount={onCodeMirrorMount}
        options={{
          lineNumbers: true,
          // lineNumberFormatter: formatLineNumber,
        }}
        value={concatedTabStrings}
      />
    </div>
  );
};

export default TabRenderer;
