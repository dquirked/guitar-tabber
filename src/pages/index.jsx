import * as React from "react";

import MainLayout from "../components/MainLayout/MainLayout.jsx";
import Seo from "../components/Seo/Seo.jsx";
import { Link } from "gatsby";

const IndexPage = () => (
  <MainLayout>
    <Seo title="Devin's Website" />
    <Link to="/guitar-tabber">Check out what I'm working on.</Link>
  </MainLayout>
);

export default IndexPage;
