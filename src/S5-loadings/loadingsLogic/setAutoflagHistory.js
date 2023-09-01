import S5DataSlice from "../../State/S5DataSlice";

const setAutoflagHistory = () => {
  const userSelectedSigLevel = S5DataSlice.getState().userSelectedSigLevel;
  const lookupTable = {
    3.891: "P < 0.0001",
    3.481: "P < 0.0005",
    3.291: "P < 0.001",
    2.807: "P < 0.005",
    2.575: "P < 0.01",
    1.96: "P < 0.05",
    1.645: "P < 0.1",
    1.44: "P < 0.15",
    1.28: "P < 0.2",
    majority: "Majority of Common Variance",
  };
  const criticalLevelText = lookupTable[userSelectedSigLevel];
  const requireMajorityCommonVariance =
    S5DataSlice.getState().requireMajorityCommonVariance;
  // setup Project History Array text
  let comVarText = ` and a majority of common variance was not required`;
  if (requireMajorityCommonVariance === true) {
    comVarText = ` and a majority of common variance was required`;
  }
  const autoFlagHistory = [`Auto-Flag `, `${criticalLevelText}${comVarText}`];

  S5DataSlice.setState({
    autoFlagHistory: autoFlagHistory,
    sendDataToOutputButtonColor: "bg-orange-300",
  });
};

export default setAutoflagHistory;
