import store from "../../store";
import loadingsTableDataPrep from "../LoadingsTable/loadingsTableDataPrep";

const invertFactor = () => {
  let factorToInvert = store.getState("factorToInvert");

  // only if a factor is selected
  if (factorToInvert !== undefined) {
    let projectHistoryArray = store.getState("projectHistoryArray");
    let numFactorsKeptForRot = store.getState("numFactorsKeptForRot");

    // get data
    let currentLoadings = store.getState("factorMatrix");

    // archive current data for undo function in loadings table
    let archiveCounter = store.getState("archiveCounter");
    archiveCounter = archiveCounter + 1;
    let archiveName = "facMatrixArc" + archiveCounter;

    // send archive to local storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify([...currentLoadings]));

    // isolate the factor to invert
    let invertArray = currentLoadings[factorToInvert - 1];

    // do factor inversion
    for (let i = 0; i < invertArray.length; i++) {
      invertArray[i] = -invertArray[i];
    }

    // update project history
    let projectHistoryArrayText = "Factor " + factorToInvert + " was inverted";
    projectHistoryArray.push(projectHistoryArrayText);

    store.setState({
      factorMatrix: currentLoadings,
      factorToInvert: undefined, // reset for modal
      archiveCounter: archiveCounter,
      projectHistoryArray: projectHistoryArray,
      // reset manual rotation
      shouldShowJudgeRotDiv: false,
      judgeButtonActive: false,
      showScatterPlotTableDiv: false,
      abFactors: [],
      highlightRotfactor1: false,
      highlightRotfactor2: false,
      highlightRotfactor3: false,
      highlightRotfactor4: false,
      highlightRotfactor5: false,
      highlightRotfactor6: false,
      highlightRotfactor7: false,
      highlightRotfactor8: false,
      userSelectedRotFactors: [],
      // hide section 6
      showOutputFactorSelection: false,
      userSelectedFactors: [],
      shouldDisplayFactorVizOptions: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      displayFactorVisualizations: false,
      isActiveNewDownloadButton: false,
      isActiveExcelDownloadButton: false,
      isActiveCsvDownloadButton: false
    });

    // call table update with new inverted factor
    loadingsTableDataPrep(numFactorsKeptForRot);
  }
};

export default invertFactor;
