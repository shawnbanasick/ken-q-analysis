import cloneDeep from "lodash/cloneDeep";
import S1DataSlice from "../../State/S1DataSlice";
import S4DataSlice from "../../State/S4DataSlice";
import S3DataSlice from "../../State/S3DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import S6DataSlice from "../../State/S6DataSlice";
import calculateCommunalities from "../varimaxLogic/2calculateCommunalities";
import calcuateSigCriterionValues from "../varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../S5-loadings/LoadingsTable/loadingsTableDataPrep";

const doAdjustValue = () => {
  const transposedRotatedResults2 = cloneDeep(
    S4DataSlice.getState().adjValPqmArray
  );
  const projectHistoryArray = cloneDeep(
    S4DataSlice.getState().tempVarHeyProjectHistoryArray
  );

  const varimaxApplied = "Varimax Applied";
  const valueOver1AdjustedToPQM =
    "factor loading greater than 1 adjusted to PQMethod value";
  const varimaxLogMessage = `${varimaxApplied} - ${valueOver1AdjustedToPQM}`;

  /*
  const logMessageObj = {
    logMessage: varimaxLogMessage,
    logType: "Varimax"
  };
  */

  projectHistoryArray.push(varimaxLogMessage);

  // use original newRotatedResults like PQMethod
  const newRotatedResults = cloneDeep(
    S4DataSlice.getState().tempVarHeyNewRotatedResults
  );

  const numFactors = cloneDeep(S4DataSlice.getState().tempVarHeyNumFactors);

  S3DataSlice.setState({ factorMatrix: transposedRotatedResults2 });

  S1DataSlice.setState({ projectHistoryArray: projectHistoryArray });

  S4DataSlice.setState({
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
