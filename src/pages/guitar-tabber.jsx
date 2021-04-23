import * as React from "react";

import MainLayout from "../components/MainLayout/MainLayout.jsx";
import Seo from "../components/Seo/Seo.jsx";
import Tabber from "../components/Tabber/Tabber.jsx";

const GuitarTabberPage = () => (
  <MainLayout>
    <Seo title="Guitar Tabber" />
    <p>Welcome to guitar tabber. I'm testing if this is useful.</p>
    <Tabber />
  </MainLayout>
);

export default GuitarTabberPage;
