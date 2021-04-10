/**
 * MainLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import {} from "prop-types";

import "./main-layout.scss";

import { useStaticQuery, graphql } from "gatsby";

import GlobalHeader from "../GlobalHeader/GlobalHeader.jsx";

const propTypes = {};

const MainLayout = (props) => {
  const { children } = props;

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <GlobalHeader siteTitle={data.site.siteMetadata?.title || "Title"} />
      <main>{children}</main>
    </>
  );
};

MainLayout.propTypes = propTypes;
export default MainLayout;
