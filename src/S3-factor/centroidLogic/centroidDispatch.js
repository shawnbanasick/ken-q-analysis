import calcEigenValues from "./calcEigenValues";
import transposeMatrix from "../../Utils/transposeMatrix";
import calculateFactorLoadings from "./calculateFactorLoadings";
import calcScreePlotData from "../centroidLogic/calcScreePlotData";
import factorTableDataPrep from "../FactorTable/factorTableDataPrep";
import calcEigenCumulPercentArray from "../PcaLogic/calcEigenCumulPercentArray";
import factorTableEigenDataPrep from "../FactorTableEigen/FactorTableEigenDataPrep";
import calculateCommunalities from "../../S4-rotation/varimaxLogic/2calculateCommunalities";
import S1DataSlice from "../../State/S1DataSlice";
import S2DataSlice from "../../State/S2DataSlice";
import S3DataSlice from "../../State/S3DataSlice";

import doHeywoodCheck from "../centroidLogic/horst55Logic/doHeywoodCheck";
import cloneDeep from "lodash/cloneDeep";

// todo - make the centroid dropdown list dynamic in case only few sorts - not
// enough for all 7 factors

const centroidDispatch = (numFactors) => {
  // ************************************
  // GET STATE
  // ************************************
  let projectHistoryArray = S1DataSlice.getState().projectHistoryArray;
  let numCentroidFactors = S3DataSlice.getState().numCentroidFactors;
  const numQsorts = S1DataSlice.getState().numQsorts;
  const respondentNames = S1DataSlice.getState().respondentNames;
  let dataArray = S2DataSlice.getState().correlation5Calcs;

  // ************************************
  // CALC LOADINGS
  // ************************************
  let factorMatrix = [];
  for (var i = 0; i < numFactors; i++) {
    let tempArray = calculateFactorLoadings(dataArray);
    factorMatrix.push(tempArray[0]);
    dataArray = tempArray[1];
  }
  let factorMatrix1 = cloneDeep(factorMatrix);

  // ************************************
  // CALC COMMUNALITIES
  // ************************************

  // display style matrix
  let rotFacStateArray1 = cloneDeep(factorMatrix);

  // calc style matrix
  let rotFacStateArray = transposeMatrix(rotFacStateArray1);

  // in case autoflag of unrotated factor matrix in loadings table
  // expects display style matrix (factor cols), not factor rows
  const communalityArray = calculateCommunalities(rotFacStateArray);

  // ************************************
  // DO HEYWOOD CHECK
  // ************************************
  let hasHeywoodCase = false;
  doHeywoodCheck(communalityArray, respondentNames, hasHeywoodCase);

  // ************************************
  // CALC EIGENS
  // ************************************
  let explainVarandEigens = calcEigenValues(factorMatrix1, numQsorts);

  // ************************************
  // FACTOR TABLE DATA PREP
  // ************************************
  const participantTrans = "Participant";
  const factorTrans = "Factor";
  const nmTrans = "Nm";
  const translationsText = { participantTrans, factorTrans, nmTrans };
  const factorTableData = factorTableDataPrep(
    numFactors,
    factorMatrix1,
    respondentNames,
    translationsText
  );
  S3DataSlice.setState({
    gridColDefsFactorTable: factorTableData.gridColDefsFactorTable,
    gridRowDataFactorTable: factorTableData.gridRowDataFactorTable,
    unrotatedFactorMatrixOutput: factorTableData.unrotatedFactorArray,
  });

  // ************************************
  // EIGEN TABLE DATA PREP
  // ************************************
  let percentEigenVal = calcEigenCumulPercentArray(
    explainVarandEigens[0],
    numQsorts
  );

  // draw eigenvalues sub table
  const eigenValuesTrans = "Eigenvalues";
  const explainedVarianceTrans = "Explained Variance";
  const cumuExplainedVarianceTrans = "Cumulative Explained Variance";
  const factorTrans2 = "Factor";
  const eigensTranslations = {
    eigenValuesTrans,
    explainedVarianceTrans,
    cumuExplainedVarianceTrans,
    factorTrans2,
  };

  const factorTableEigenData = factorTableEigenDataPrep(
    numFactors,
    [explainVarandEigens[0], ...percentEigenVal],
    eigensTranslations
  );

  S3DataSlice.setState({
    gridColDefsFacTableEigen: factorTableEigenData.gridColDefsFacTableEigen,
    gridRowDataFacTableEigen: factorTableEigenData.gridRowDataFacTableEigen,
  });

  // ************************************
  // SCREE PLOT DATA PREP
  // ************************************

  // set data for scree chart
  let screePlotData = calcScreePlotData(explainVarandEigens[0]);

  // ************************************
  // DO PROJECT LOG UPDATE
  // ************************************
  const logMessageObj = {
    logMessage: `Brown Centroid Factors Extracted: ${numCentroidFactors}`,
    logType: "centroid",
  };

  projectHistoryArray.push(logMessageObj.logMessage);

  const eigenvaluesArray = explainVarandEigens[0];
  eigenvaluesArray.unshift("Eigenvalues");

  // ************************************
  // UPDATE STATE
  // ************************************
  S3DataSlice.setState({
    factorMatrix: rotFacStateArray1, // pulled for first display on loadings table
    eigenvalues: eigenvaluesArray,
    explainedVariance: explainVarandEigens[1],
    unrotatedFactorMatrix: factorMatrix,
    eigensPercentExpVar: percentEigenVal[0],
    cumulEigenPerVar: percentEigenVal[1],
    screePlotData: screePlotData,
    isCentroidLoading: false,
  });

  S1DataSlice.setState({
    projectHistoryArray: projectHistoryArray,
  });

  // to use with the undo function in Project History
  sessionStorage.setItem("facMatrixArc0", JSON.stringify(rotFacStateArray1));
};

export default centroidDispatch;
