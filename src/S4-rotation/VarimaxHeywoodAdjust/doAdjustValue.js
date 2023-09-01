import S1DataSlice from "../../State/S1DataSlice";
import S3DataSlice from "../../State/S3DataSlice";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import S6DataSlice from "../../State/S6DataSlice";
import cloneDeep from "lodash/cloneDeep";
import calculateCommunalities from "../varimaxLogic/2calculateCommunalities";
import calcuateSigCriterionValues from "../varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../S5-loadings/LoadingsTable/loadingsTableDataPrep";
import transposeMatrix from "../../Utils/transposeMatrix";

const doAdjustValue = () => {
  const transposedRotatedResults2 = cloneDeep(
    S4DataSlice.getState().adjValArray
  );
  const projectHistoryArray = cloneDeep(
    S4DataSlice.getState().tempVarHeyProjectHistoryArray
  );
  const newRotatedResults = cloneDeep(
    transposeMatrix(transposedRotatedResults2)
  );
  const numFactors = cloneDeep(S4DataSlice.getState().tempVarHeyNumFactors);

  const varimaxApplied = "Varimax Applied";
  const valueOver1AdjustedToPQM =
    "factor loading greater than 1 adjusted to 099";

  const projectHistoryText = `${varimaxApplied} - ${valueOver1AdjustedToPQM}`;
  /*
  const logMessageObj = {
    logMessage: projectHistoryText,
    logType: "Varimax",
  };
  */

  projectHistoryArray.push(projectHistoryText);

  S1DataSlice.setState({ projectHistoryArray: projectHistoryArray });

  S3DataSlice.setState({
    factorMatrix: transposedRotatedResults2,
    isCalculatingVarimax: false,
    varimaxButtonDisabled: true,
    varimaxButtonText: "Varimax Applied",
  });
  // hide section 6
  S6DataSlice.setState({
    showOutputFactorSelection: false,
    shouldDisplayFactorVizOptions: false,
    userSelectedFactors: [],
    showFactorCorrelationsTable: false,
    showStandardErrorsDifferences: false,
    showFactorCharacteristicsTable: false,
    showDownloadOutputButtons: false,
    displayFactorVisualizations: false,
  });

  S5DataSlice.setState({ sendDataToOutputButtonColor: "#d6dbe0" });

  // remember - calc commun must be a matrix in table format
  calculateCommunalities(newRotatedResults);

  // get new signficance values
  calcuateSigCriterionValues("noFlag");

  // re-draw table
  loadingsTableDataPrep(numFactors);

  /*
  // archive values for undo function (ProjectHistory component)
  let archiveCounter = rotationState.archiveCounter;
  archiveCounter += 1;
  const archiveName = `facMatrixArc${archiveCounter}`;
  rotationState.archiveCounter = archiveCounter;

  sessionStorage.setItem(
    archiveName,
    JSON.stringify(transposedRotatedResults2)
  );
  */
};

export default doAdjustValue;
