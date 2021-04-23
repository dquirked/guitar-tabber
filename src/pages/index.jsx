import * as React from "react";

import MainLayout from "../components/MainLayout/MainLayout.jsx";
import Seo from "../components/Seo/Seo.jsx";

const IndexPage = () => (
  <MainLayout>
    <Seo title="Guitar Tabber" />
    <p>Welcome to my website. More to come soon.</p>
  </MainLayout>
);

export default IndexPage;
