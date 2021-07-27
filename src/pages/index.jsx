import React, { useEffect, useState } from "react";
import * as R from "ramda";

import Layout from "../components/Layout/Layout.jsx";
import Sheet from "../components/Sheet/Sheet.jsx";
import { SheetContextProvider } from "../common/sheetContext.jsx";
import SheetControls from "../components/SheetControls/SheetControls.jsx";

import { NumberParam, useQueryParams } from "use-query-params";

const IndexPage = () => {
  const [hasMounted, setHasMounted] = useState(false);

  const [queryParams, setQueryParams] = useQueryParams({
    s: NumberParam,
  });

  const [sheets, setSheets] = useState(() => {
    if (queryParams.s) {
      return R.range(0, queryParams.s);
    }
    return [];
  });

  useEffect(() => {
    sheets.length !== 0 && sheets.length > 0
      ? setQueryParams({ s: sheets.length })
      : setQueryParams({ s: undefined });
  }, [sheets, setQueryParams]);

  useEffect(() => {
    setHasMounted(true);
  }, [setHasMounted]);

  return (
    <Layout>
      <h1>Guitar Tabber</h1>
      <p>Welcome to guitar tabber. To get started create a new sheet below.</p>
      {sheets?.map((_, i) => {
        return (
          <SheetContextProvider key={i} id={"s" + (i + 1)}>
            {hasMounted && (
              <>
                <SheetControls />
                <Sheet />
              </>
            )}
          </SheetContextProvider>
        );
      })}
      <button
        onClick={() => setSheets((prevState) => [...prevState, 0])}
        type="button"
      >
        New Sheet
      </button>
    </Layout>
  );
};

export default IndexPage;
