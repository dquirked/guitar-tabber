import React, { useEffect, useState } from "react";

import Layout from "../components/Layout/Layout.jsx";
import Sheet from "../components/Sheet/Sheet.jsx";
import { SheetContextProvider } from "../common/sheetContext.jsx";
import SheetControls from "../components/SheetControls/SheetControls.jsx";

const IndexPage = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, [setHasMounted]);

  return (
    <Layout>
      <SheetContextProvider>
        <SheetControls />
        {hasMounted && <Sheet />}
      </SheetContextProvider>
    </Layout>
  );
};

export default IndexPage;
