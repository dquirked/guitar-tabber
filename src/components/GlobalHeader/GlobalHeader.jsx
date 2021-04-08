import * as React from "react";
import PropTypes from "prop-types";

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <h1>Guitar Tabber</h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: "",
};

export default Header;
