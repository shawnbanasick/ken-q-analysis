import React from "react";
import CardSettingsPanel from "./CardSettingsPanel";
import DistinguishingPanel from "./DistinguishingPanel";
import GeneralOptionsPanel from "./GeneralOptionsPanel";
import StatementsSettingsPanel from "./StatementsSettingsPanel";
import S6DataSlice from "../../State/S6DataSlice";

const FactorVizOptions = () => {
  const styles = {
    width: "90%",
    maxWidth: 920,
    height: 970,
    border: "2px solid #666",
    padding: 20,
    marginLeft: 20,
    marginBottom: 50,
  };

  const { shouldDisplayFactorVizOptions } = S6DataSlice();

  if (shouldDisplayFactorVizOptions) {
    return (
      <div style={styles} className="FactorVizDiv">
        <GeneralOptionsPanel />
        <CardSettingsPanel />
        <StatementsSettingsPanel />
        <DistinguishingPanel />
      </div>
    );
  } else {
    return null;
  }
};

export default FactorVizOptions;

/*
<DownloadsPanel />


*/
