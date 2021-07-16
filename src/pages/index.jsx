import React from "react";

import { SheetContextProvider } from "../common/sheetContext.jsx";
import Layout from "../components/Layout/Layout.jsx";
import Sheet from "../components/Sheet/Sheet.jsx";
import SheetControls from "../components/SheetControls/SheetControls.jsx";

const IndexPage = () => (
  <Layout>
    <SheetContextProvider>
      <SheetControls />
      <Sheet />
    </SheetContextProvider>
  </Layout>
);

export default IndexPage;
