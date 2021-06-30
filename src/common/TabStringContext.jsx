import React, { useState, useContext } from "react";

const TabStringContext = React.createContext();

export function useTabStringContext() {
  return useContext(TabStringContext);
}

export const TabStringContextProvider = (props) => {
  const [tabStrings, setTabStrings] = useState({});
  return (
    <TabStringContext.Provider value={[tabStrings, setTabStrings]} {...props} />
  );
};
