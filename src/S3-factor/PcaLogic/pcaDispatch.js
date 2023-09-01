import getSvd from "./svd";
import sortEigenValues from "./sortEigenValues";
import calcEigenVectors from "./calcEigenVectors";
import determineNumberPCs from "./determineNumberPCs";
import transposeMatrix from "../../Utils/transposeMatrix";
import factorTableDataPrep from "../FactorTable/factorTableDataPrep";
import calcEigenCumulPercentArray from "./calcEigenCumulPercentArray";
import inflectPrincipalComponents from "./inflectPrincipalComponents";
import factorTableEigenDataPrep from "../FactorTableEigen/FactorTableEigenDataPrep";
import calculateCommunalities from "../../S4-rotation/varimaxLogic/2calculateCommunalities";
import S1DataSlice from "../../State/S1DataSlice";
import S2DataSlice from "../../State/S2DataSlice";
import S3DataSlice from "../../State/S3DataSlice";
import cloneDeep from "lodash/cloneDeep";
/*
import projectHistoryState from "../../GlobalState/projectHistoryState";
import factorState from "../../GlobalState/factorState";
import getCorrelationState from "../../GlobalState/getCorrelationState";
import getProjectHistoryState from "../../GlobalState/getProjectHistoryState";
import getCoreState from "../../GlobalState/getCoreState";
*/

const pcaDispatch = () => {
  // getState
  const projectHistoryArray = S1DataSlice.getState().projectHistoryArray;
  const numQsorts = S1DataSlice.getState().numQsorts;
  const respondentNames = S1DataSlice.getState().respondentNames;
  const X = S2DataSlice.getState().correlation5Calcs;

  const m = X.length;
  const numberOfSorts = m;
  const numberofPrincipalComps = determineNumberPCs();

  // calcualte svd from correlations
  const svdResults = getSvd(X);
  const eigens = svdResults.S;
  const svd = svdResults.U;
  const eigenValuesSorted = sortEigenValues(eigens);

  const getEigenCumulPercentArray = calcEigenCumulPercentArray(
    eigenValuesSorted,
    m
  );

  const eigenValuesAsPercents = getEigenCumulPercentArray[0];
  const eigenValuesCumulPercentArray = getEigenCumulPercentArray[1];

  const doEigenVecsCalcs = calcEigenVectors(
    numberOfSorts,
    numberofPrincipalComps,
    eigenValuesSorted,
    svd
  );

  let eigenVecs = doEigenVecsCalcs[0];
  const inflectionArray = doEigenVecsCalcs[1];
  eigenVecs = inflectPrincipalComponents(eigenVecs, inflectionArray);

  calculateCommunalities([...eigenVecs]);

  // transpose
  const eigenVecsTransposed = transposeMatrix(eigenVecs);

  // truncate arrays
  let limit = 8;
  if (numQsorts < limit) {
    limit = numQsorts;
  }
  eigenValuesSorted.length = limit;
  eigenValuesAsPercents.length = limit;
  eigenValuesCumulPercentArray.length = limit;

  // formatted for output file
  const formattedEigenCum = cloneDeep(eigenValuesCumulPercentArray);
  formattedEigenCum.unshift("Cumulative Explained Variance");
  const formattedEigenPer = cloneDeep(eigenValuesAsPercents);
  formattedEigenPer.unshift("percent explained variance");

  // create data for scree plot
  const eigenData = cloneDeep(eigenValuesSorted);

  const screeData = [];
  eigenData.forEach((element, index) => {
    const tempArray = [];
    tempArray.push(index + 1, eigenData[index]);
    screeData.push(tempArray);
  }, this);

  const logMessageObj = {
    logMessage: "Extracted 8 Principal Components",
    logType: "pca",
  };

  projectHistoryArray.push(logMessageObj.logMessage);

  S3DataSlice.setState({
    factorMatrix: eigenVecsTransposed,
    unrotatedFactorMatrix: eigenVecsTransposed,
    eigenvalues: eigenValuesSorted,
    screePlotData: screeData,
    eigensPercentExpVar: formattedEigenPer,
    cumulEigenPerVar: formattedEigenCum,
    numFacsExtracted: 8,
    numCentroidFactors: 8,
  });

  S1DataSlice.setState({ projectHistoryArray: projectHistoryArray });

  const eigenvaluesArray = [
    eigenValuesSorted,
    eigenValuesAsPercents,
    eigenValuesCumulPercentArray,
  ];
  // draw extracted factors table
  const participantTrans = "Participant";
  const factorTrans = "Factor";
  const nmTrans = "Nm";
  const translationsText = { participantTrans, factorTrans, nmTrans };
  const factorTableData = factorTableDataPrep(
    numberofPrincipalComps,
    eigenVecsTransposed,
    respondentNames,
    translationsText
  );
  S3DataSlice.setState({
    gridColDefsFactorTable: factorTableData.gridColDefsFactorTable,
    gridRowDataFactorTable: factorTableData.gridRowDataFactorTable,
    unrotatedFactorMatrixOutput: factorTableData.unrotatedFactorArray,
  });

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
    numberofPrincipalComps,
    eigenvaluesArray,
    eigensTranslations
  );

  S3DataSlice.setState({
    gridColDefsFacTableEigen: factorTableEigenData.gridColDefsFacTableEigen,
    gridRowDataFacTableEigen: factorTableEigenData.gridRowDataFacTableEigen,
    showUnrotatedFactorTable: true,
    showEigenvaluesTable: true,
    showScreePlot: true,
    pcaButtonText: "Principal Components",
    calculatingPca: false,
  });

  /*
  const returnObj = {
    gridColDefsFacTableEigen: factorTableEigenData.gridColDefsFacTableEigen,
    gridRowDataFacTableEigen: factorTableEigenData.gridRowDataFacTableEigen,
    eigenvalues: eigenValuesSorted,
    screePlotData: screeData,
    eigensPercentExpVar: formattedEigenPer,
    cumulEigenPerVar: formattedEigenCum,
    numFacsForTableWidth: 8,
  }
*/
  // to use with the undo function in Project History
  // sessionStorage.setItem("facMatrixArc0", JSON.stringify(eigenVecsTransposed));
};

export default pcaDispatch;
