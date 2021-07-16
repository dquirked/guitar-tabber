import React from "react";

import { SheetContextProvider } from "../common/sheetContext.jsx";
import Sheet from "../components/Sheet/Sheet.jsx";
import SheetControls from "../components/SheetControls/SheetControls.jsx";

const IndexPage = () => (
  <div>
    <SheetContextProvider>
      <SheetControls />
      <Sheet />
    </SheetContextProvider>
  </div>
);

export default IndexPage;
