import cloneDeep from "lodash/cloneDeep";
import { easyStore } from "react-easy-state";

export default easyStore({
  setState: function(update) {
    for (let property in update) {
      if (update.hasOwnProperty(property)) {
        this[property] = update[property];
      }
    }
  },
  getState(value) {
    let returnValue = this[value];
    let newReturnValue = cloneDeep(returnValue);
    return newReturnValue;
  },
  version: "1.0.3",
  mainDataObject: {},
  gridColDefs: [],
  gridRowData: [],
  numQsorts: 0,
  numCentroidFactors: 7,
  gridColDefsFactorTable: [],
  gridRowDataFactorTable: [],
  eigenvalues: [],
  screePlotData: [],
  gridColDefsFacTableEigen: [],
  gridRowDataFacTableEigen: [],
  shouldDisplayFacKept: false,
  gridColDefsLoadingsTable: [],
  gridRowDataLoadingsTable: [],
  fSigCriterionResults: [],
  numFactorsKeptForRot: undefined,
  isLoadingFactorsKept: false,
  isLoadingAutoflag: false,
  isLoadingBeginAnalysis: false,
  isCentroidLoading: false,
  userSelectedSigLevel: 1.96,
  requireMajorityCommonVariance: true,
  rowClassRulesLoadingsTable: {},
  highlighting: "grays",
  varimaxButtonActive: false,
  userSelectedFactors: [],
  userSelectedRotFactors: [],
  factorCorrelationsTableData: [],
  userSelectedDegreeButtons: [],
  factorCharacteristicsArray: [],
  numbersHaveBeenAppended: false,
  rotationDegrees: 0,
  rotateByDegrees: 10,
  bipolarIndexArray: [],
  highlightDegreeButton1: false,
  highlightDegreeButton2: false,
  highlightDegreeButton3: false,
  highlightDegreeButton4: true,
  highlightDegreeButton5: false,
  shouldShowJudgeRotDiv: false,
  showScatterPlotTableDiv: false,
  showCorrelationMatrix: false,
  showOutputFactorSelection: false,
  showDownloadOutputButtons: false,
  showFactorExtractionButtons: false,
  showUnrotatedFactorTable: false,
  showEigenvaluesTable: false,
  showScreePlot: false,
  showLoadingsTable: false,
  showKeepFacForRotButton: false,
  showForcedInput: false,
  showJsonFileLoadedMessage: false,
  showExcelErrorModal: false,
  showFactorCorrelationsTable: false,
  showStandardErrorsDifferences: false,
  showFactorCharacteristicsTable: false,
  showExcelDownloadAnchor: false,
  showAutoFlags: false,
  bipolarSplitCount: 0,
  excelType1NonsymmetricArrayText: "",
  activeStartAnalysisButton: false,
  isActiveNewDownloadButton: false,
  isActiveExcelDownloadButton: false,
  isActiveCsvDownloadButton: false,
  activeCentroidFactorsButton: false,
  activePcaButton: false,
  calculatingPca: false,
  isFacSelectDisabled: false,
  jsonParticipantId: [],
  outputButtonsArray: ["1", "2", "3", "4", "5", "6", "7", "8"],
  pcaButtonText: "Extract Principal Components",
  varimaxButtonText: "Varimax Rotation",
  isCalculatingVarimax: false,
  disabledPcaButton: false,
  disabledCentroidFactorButton: false,
  shouldIncludeTimestamp: true,
  titleHeight: 30,
  willAddCustomNames: false,
  willAdjustCardFontSize: false,
  willAdjustCardFontSizeBy: 14,
  willAdjustCardHeight: false,
  willAdjustCardHeightBy: 120,
  willAdjustCardWidth: false,
  willAdjustCardWidthBy: 120,
  willAdjustIndicatorSize: false,
  willAdjustIndicatorSizeBy: 18,
  willAdjustLineSpacing: false,
  willAdjustLineSpacingBy: 12,
  willAdjustStatementWidth: false,
  willAdjustStatementWidthBy: 15,
  willAdjustWidthAsian: false,
  willAdjustWidthAsianBy: 12,
  willDisplayConsensusStates: false,
  willDisplayDistingCompareSymbols: true,
  willDisplayOnlyStateNums: false,
  willIncludeLegend: true,
  willIndicateDistinguishing: true,
  willPrependStateNums: false,
  willTrimStatement: false,
  willTrimStatementBy: 5,
  willUseDistingUnicode: true,
  outputFactorSelectButtonsDisabled: false,
  csvData: false,
  consensusIndicator: {
    r: "232",
    g: "229",
    b: "229",
    a: ".5"
  },
  customFactorNames: [],
  archiveCounter: 0,
  varimaxButtonDisabled: false,
  abFactors: [],
  projectHistoryArray: ["Project loaded"],
  newRotationVectors: [],
  rotColDefsFactorTable: [],
  rotRowDataFactorTable: [],
  customFileNameLocation: "append",
  displayFactorVisualizations: false,
  shouldDisplayFactorVizOptions: false,
  projectName: "unnamed project",
  participantDataObject: false,
  factorVizOptions: {
    willAddCustomNames: false,
    willAdjustCardFontSize: false,
    willAdjustCardFontSizeBy: 14,
    willAdjustCardHeight: false,
    willAdjustCardHeightBy: 120,
    willAdjustCardWidth: false,
    willAdjustCardWidthBy: 120,
    willAdjustIndicatorSize: false,
    willAdjustIndicatorSizeBy: 18,
    willAdjustFontSize: false,
    willAdjustFontSizeBy: 14,
    willAdjustLineSpacing: false,
    willAdjustLineSpacingBy: 12,
    willAdjustStatementWidth: false,
    willAdjustStatementWidthBy: 15,
    willAdjustWidthAsian: false,
    willAdjustWidthAsianBy: 12,
    willDisplayConsensusStates: false,
    willDisplayDistingCompareSymbols: true,
    willDisplayOnlyStateNums: false,
    willIncludeLegend: true,
    willIndicateDistinguishing: true,
    willPrependStateNums: false,
    willTrimStatement: false,
    willTrimStatementBy: 5,
    willUseDistingUnicode: true,
    consensusIndicator: {
      r: "232",
      g: "229",
      b: "229",
      a: ".5"
    },
    customFactorNames: [],
    customFileNameLocation: "append",
    qSortPattern: []
  }
});

/*
Semantic Sizes: mini, tiny, small, medium, large, big, huge, massive

### INITIAL DATA VALUES REQUIRED FROM UPLOAD

statements
stortsDisplayText (respondent names and sorts text)
mainDataObject (name, posShiftSort, rawSort, displaySort )
numQSorts (number of respondents)
projectName
numStatements  // aka qavOriginal in beta
multiplierArray (based on PQMethod format)
respondentNames
qSortPattern (all possible statement sort values sorted low => high) aka qavSortTriangleShape
statementNumberArray (list of statement numbers in order)
posShiftSortArray (pulled from mainDataArray in output function)

### CALCULATED VALUES

gridColDefs
gridRowData
numCentroidFactors // user selected number of Centroid Factors for analysis
correlationTableArray
correlation5Calcs // for centroid / PCA calcs
factorMatrix // centroid factors or PCs
gridColDefsFactorTable // for unrotated facs table
gridRowDataFactorTable  // for unrotated facs table
eigenvalues  
explainedVariance
gridColDefsFacTableEigen
gridRowDataFactTableEigen
screeData
numFactorsKeptForRot
shouldDisplayFacKept
gridColDefsLoadingsTable
gridRowDataLoadingsTable
rotFacStateArray  // results of varimax rotated factors - loadings
fSigCriterion // matrix of values
fSigCriterionResults // boolean matrix of flagged
rowClassRulesLoadingsTable

*/

//     /^((?!Fallback font).)*$/
