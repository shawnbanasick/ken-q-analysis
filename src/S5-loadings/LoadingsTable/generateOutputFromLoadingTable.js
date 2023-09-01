import S6DataSlice from "../../State/S6DataSlice";
import S5DataSlice from "../../State/S5DataSlice";

const generateOutputFromLoadingTable = (currentLoadingsTable) => {
  // getState - initialize output select buttons highlighting to false
  const btnId = S6DataSlice.getState().outputButtonsArray;
  for (let i = 0; i < btnId.length; i += 1) {
    S6DataSlice.setState({ [`highlightfactor${btnId[i]}`]: false });
  }

  S6DataSlice.setState({
    userSelectedFactors: [],
    showOutputFactorSelection: true,
    showStandardErrorsDifferences: false,
    showFactorCharacteristicsTable: false,
    showDownloadOutputButtons: false,
    showFactorCorrelationsTable: false,
    displayFactorVisualizations: false,
    shouldDisplayFactorVizOptions: false,
    outputFactorSelectButtonsDisabled: false,
    showTableDataNotSentWarning: false,
    outputForDataViz2: [],
  });

  S5DataSlice.setState({
    currentLoadingsTable: currentLoadingsTable,
    notifyDataSentToOutputSuccess: true,
    sendDataToOutputButtonColor: getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-theme-color"),
    gridRowDataLoadingsTable: currentLoadingsTable,
  });

  return;
};

export default generateOutputFromLoadingTable;
