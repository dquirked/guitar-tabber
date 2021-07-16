import React from "react";

import { SheetContextProvider } from "../common/sheetContext.jsx";
import Sheet from "../components/Sheet/Sheet.jsx";

const IndexPage = () => (
  <div>
    <SheetContextProvider>
      <Sheet />
    </SheetContextProvider>
  </div>
);

export default IndexPage;
