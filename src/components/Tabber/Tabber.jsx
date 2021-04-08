import React from "react";
import {} from "prop-types";

import TabString from "./TabString.jsx";
import "./tabber.scss";

const propTypes = {};

const Tabber = (props) => {
  return (
    <div className="tabber">
      <TabString stringName="e" />
      <TabString stringName="B" />
      <TabString stringName="G" />
      <TabString stringName="D" />
      <TabString stringName="A" />
      <TabString stringName="E" />
    </div>
  );
};

Tabber.propTypes = propTypes;
export default Tabber;
