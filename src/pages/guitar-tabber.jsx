import * as React from "react";

import MainLayout from "../components/MainLayout/MainLayout.jsx";
import Seo from "../components/Seo/Seo.jsx";
import Tabber from "../components/Tabber/Tabber.jsx";
import TabRenderer from "../components/TabRenderer/TabRenderer.jsx";
import { TabStringContextProvider } from "../common/TabStringContext.jsx";

const GuitarTabberPage = () => (
  <TabStringContextProvider>
    <MainLayout>
      <Seo title="Guitar Tabber" />
      <p>Welcome to guitar tabber. I'm testing if this is useful.</p>
      <Tabber id="tab1" />
    </MainLayout>
  </TabStringContextProvider>
);

export default GuitarTabberPage;
