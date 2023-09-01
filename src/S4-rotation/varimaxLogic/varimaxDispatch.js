import calcSumSquares from "./2calcSumSquares";
import doVarimaxRotations from "./2doVarimaxRotations";
import transposeMatrix from "../../Utils/transposeMatrix";
import calculateCommunalities from "./2calculateCommunalities";
import calcuateSigCriterionValues from "./2calculateSigCriterionValues";
import calcStandardizedFactorMatrix from "./2calcStandardizedFactorMatrix";
import loadingsTableDataPrep from "../../S5-loadings/LoadingsTable/loadingsTableDataPrep";
import cloneDeep from "lodash/cloneDeep";
import S3DataSlice from "../../State/S3DataSlice";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import S6DataSlice from "../../State/S6DataSlice";
import S1DataSlice from "../../State/S1DataSlice";
import doVarimaxHeywoodCheck from "./doVarimaxHeywoodCheck";
import doAdjustValuePqmethod from "../VarimaxHeywoodAdjust/doAdjustValuePqmethod";

const varimaxDispatch = function () {
  // archive loadings for use with undo functionality
  // archiveFactorScoreStateMatrixAndDatatable();

  // getState - retrieve and cloneDeep factor data
  const factorsForRotation = cloneDeep(S3DataSlice.getState().factorMatrix);
  const numFactorsKeptForRot = S4DataSlice.getState().numFactorsKeptForRot;

  factorsForRotation.length = numFactorsKeptForRot;

  const projectHistoryArray = cloneDeep(
    S1DataSlice.getState().projectHistoryArray
  );

  // do varimax prep work
  const sumSquares = calcSumSquares(factorsForRotation); // ok, same
  const standardizedFactorMatrix = calcStandardizedFactorMatrix(
    sumSquares,
    factorsForRotation
  ); // ok, same

  // calculate rotations
  const rotatedResults = doVarimaxRotations(
    standardizedFactorMatrix,
    sumSquares
  );

  const numFactors = S4DataSlice.getState().numFactorsKeptForRot;

  // transposedRotatedResults in Lipset is now each factor = row, 9 cols, 7 rows
  const transposedRotatedResults = transposeMatrix(rotatedResults);
  const transposedRotatedResults2 = cloneDeep(transposedRotatedResults);

  // newRotatedResults in Lipset is now each factor as rows => 9 cols (participants), 7-8 rows

  const newRotatedResults = cloneDeep(rotatedResults);

  // Varimax Heywood Adjustments (when factor loading > 1.0 after varimax rot)
  const respondentNames = cloneDeep(S1DataSlice.getState().respondentNames);
  const needsVarimaxHeywoodAdjustment = false;
  const adjValArray = [];
  const adjValPqmArray = [];
  const over1ParticipantsArray = [];
  const varimaxHeywoodCheck = doVarimaxHeywoodCheck(
    transposedRotatedResults2,
    respondentNames,
    needsVarimaxHeywoodAdjustment,
    adjValArray,
    adjValPqmArray,
    over1ParticipantsArray
  );

  S4DataSlice.setState({
    adjValArray: varimaxHeywoodCheck.adjValArray,
    adjValPqmArray: varimaxHeywoodCheck.adjValPqmArray,
  });

  // branch on varimax heywood check
  if (varimaxHeywoodCheck.needsVarimaxHeywoodAdjustment) {
    let partArray1 = over1ParticipantsArray.join(", ");

    S4DataSlice.setState({
      varimaxHeywoodWarningParticipants: partArray1,
      showVarimaxHeywoodWarning: false,
      tempVarHeyTransposedRotatedResults2: transposedRotatedResults2,
      tempVarHeyProjectHistoryArray: projectHistoryArray,
      tempVarHeyNewRotatedResults: newRotatedResults,
      tempVarHeyNumFactors: numFactors,
    });
    doAdjustValuePqmethod();
  } else {
    /*
    const logMessageObj = {
      logMessage: i18n.t("Varimax rotation applied"),
      logType: "Varimax",
    };*/

    projectHistoryArray.push("Varimax rotation applied");

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

    S5DataSlice.setState({ sendDataToOutputButtonColor: "bg-gray-100" });

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
  }
};

export default varimaxDispatch;
