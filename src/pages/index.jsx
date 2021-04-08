import * as React from "react";

import MainLayout from "../components/MainLayout/MainLayout.jsx";
import Seo from "../components/Seo/Seo.jsx";
import Tabber from "../components/Tabber/Tabber.jsx";

const IndexPage = () => (
  <MainLayout>
    <Seo title="Home" />
    <Tabber />
  </MainLayout>
);

export default IndexPage;
