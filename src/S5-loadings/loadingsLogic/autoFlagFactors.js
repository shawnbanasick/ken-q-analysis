import transposeMatrix from "../../Utils/transposeMatrix";
import loadingsTableDataPrep from "../LoadingsTable/loadingsTableDataPrep";
import calculateCommunalities from "../../S4-rotation/varimaxLogic/2calculateCommunalities";
import calculateSigCriterionValues from "../../S4-rotation/varimaxLogic/2calculateSigCriterionValues";
import S3DataSlice from "../../State/S3DataSlice";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import S6DataSlice from "../../State/S6DataSlice";

const autoFlagFactors = () => {
  S5DataSlice.setState({
    isLoadingAutoflag: true,
    autoflagButtonColor: "#dbdbe0",
  });

  // should produce for Lipset calc style matrix - 9 cols by 7 rows

  // give button time to display loading spinner
  setTimeout(() => {
    // get data for current user selected significance level
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

    const numFactorsKeptForRot = S4DataSlice.getState().numFactorsKeptForRot;

    // reset communalities
    const factorMatrix1 = S3DataSlice.getState().factorMatrix;
    const transposedMatrix = transposeMatrix(factorMatrix1);
    calculateCommunalities(transposedMatrix);

    let sigValues = calculateSigCriterionValues("flag");
    loadingsTableDataPrep(numFactorsKeptForRot);

    // reset manual rotation

    S4DataSlice.setState({
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
    });

    // hide section 6
    S5DataSlice.setState({
      autoFlagHistory: autoFlagHistory,
      sendDataToOutputButtonColor: "bg-orange-300",
    });

    S6DataSlice.setState({
      showOutputFactorSelection: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      shouldDisplayFactorVizOptions: false,
      displayFactorVisualizations: false,
    });

    return null;
  }, 10);
};

export default autoFlagFactors;
