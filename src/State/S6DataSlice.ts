import { create } from "zustand";

// OUTPUT SCREEN

interface DataState {
  shouldDisplayFactorViz: boolean;
  setShouldDisplayFactorViz: (shouldDisplayFactorViz: boolean) => void;
  userSelectedDistStateSigLevel1: number;
  setUserSelectedDistStateSigLevel1: (
    userSelectedDistStateSigLevel1: number
  ) => void;
  userSelectedDistStateSigLevel2: number;
  setUserSelectedDistStateSigLevel2: (
    userSelectedDistStateSigLevel2: number
  ) => void;
  outputForDataViz2: any[];
  setOutputForDataViz2: (outputForDataViz2: any[]) => void;
  showDistinguishingAs: string;
  setShowDistinguishingAs: (showDistinguishingAs: string) => void;
  updateFactorVisualizationsButtonColor: string;
  setUpdateFactorVisualizationsButtonColor: (
    updateFactorVisualizationsButtonColor: string
  ) => void;
  factorVizOptionsHolder: {};
  setFactorVizOptionsHolder: (factorVizOptionsHolder: {}) => void;
  distStateUpperValueText: string;
  setDistStateUpperValueText: (distStateUpperValueText: string) => void;
  distStateLowerValueText: string;
  setDistStateLowerValueText: (distStateLowerValueText: string) => void;
  matchCount: number;
  setMatchCount: (matchCount: number) => void;
  factorsWithoutLoading: any[];
  setFactorsWithoutLoading: (factorsWithoutLoading: any[]) => void;
  showNoLoadingsFlaggedModal: boolean;
  setShowNoLoadingsFlaggedModal: (showNoLoadingsFlaggedModal: boolean) => void;
  factorVizOptions: {};
  setFactorVizOptions: (factorVizOptions: {}) => void;

  isDownloadTypeSelected: boolean;
  setIsDownloadTypeSelected: (isDownloadTypeSelected: boolean) => void;

  outputFactorSelectButtonsDisabled: boolean;
  setOutputFactorSelectButtonsDisabled: (
    outputFactorSelectButtonsDisabled: boolean
  ) => void;
  selectAllClicked: boolean;
  setSelectAllClicked: (selectAllClicked: boolean) => void;
  highlightFactor1: boolean;
  setHighlightFactor1: (highlightFactor1: boolean) => void;
  highlightFactor2: boolean;
  setHighlightFactor2: (highlightFactor2: boolean) => void;
  highlightFactor3: boolean;
  setHighlightFactor3: (highlightFactor3: boolean) => void;
  highlightFactor4: boolean;
  setHighlightFactor4: (highlightFactor4: boolean) => void;
  highlightFactor5: boolean;
  setHighlightFactor5: (highlightFactor5: boolean) => void;
  highlightFactor6: boolean;
  setHighlightFactor6: (highlightFactor6: boolean) => void;
  highlightFactor7: boolean;
  setHighlightFactor7: (highlightFactor7: boolean) => void;
  highlightFactor8: boolean;
  setHighlightFactor8: (highlightFactor8: boolean) => void;
  willAddCustomNameToDownload: boolean;
  setWillAddCustomNameToDownload: (
    willAddCustomNameToDownload: boolean
  ) => void;
  customDownloadFileNames: string[];
  setCustomDownloadFileNames: (customDownloadFileNames: string[]) => void;

  titleHeight: number;
  setTitleHeight: (titleHeight: number) => void;

  willAddCustomNames: boolean;
  setWillAddCustomNames: (willAddCustomNames: boolean) => void;
  willAdjustCardFontSize: boolean;
  setWillAdjustCardFontSize: (willAdjustCardFontSize: boolean) => void;
  willAdjustCardFontSizeBy: number;
  setWillAdjustCardFontSizeBy: (willAdjustCardFontSizeBy: number) => void;
  willAdjustCardHeight: boolean;
  setWillAdjustCardHeight: (willAdjustCardHeight: boolean) => void;
  willAdjustCardHeightBy: number;
  setWillAdjustCardHeightBy: (willAdjustCardHeightBy: number) => void;
  willAdjustCardWidth: boolean;
  setWillAdjustCardWidth: (willAdjustCardWidth: boolean) => void;
  willAdjustCardWidthBy: number;
  setWillAdjustCardWidthBy: (willAdjustCardWidthBy: number) => void;
  willAdjustDistIndicatorSize: boolean;
  setWillAdjustDistIndicatorSize: (
    willAdjustDistIndicatorSize: boolean
  ) => void;
  willAdjustDistIndicatorSizeBy: number;
  setWillAdjustDistIndicatorSizeBy: (
    willAdjustDistIndicatorSizeBy: number
  ) => void;

  willDisplayOnlyStateNums: boolean;
  setWillDisplayOnlyStateNums: (willDisplayOnlyStateNums: boolean) => void;
  willIncludeLegend: boolean;
  setWillIncludeLegend: (willIncludeLegend: boolean) => void;
  willIndicateDistinguishing: boolean;
  setWillIndicateDistinguishing: (willIndicateDistinguishing: boolean) => void;
  willPrependStateNums: boolean;
  setWillPrependStateNums: (willPrependStateNums: boolean) => void;
  willTrimStatements: boolean;
  setWillTrimStatements: (willTrimStatements: boolean) => void;
  willTrimStatementsBy: number;
  setWillTrimStatementsBy: (willTrimStatementsBy: number) => void;
  willUseDistingUnicode: boolean;
  setWillUseDistingUnicode: (willUseDistingUnicode: boolean) => void;
  customFactorNames: string[];
  setCustomFactorNames: (customFactorNames: string[]) => void;

  willAdjustFontSize: boolean;
  setWillAdjustFontSize: (willAdjustFontSize: boolean) => void;
  willAdjustLineSpacing: boolean;
  setWillAdjustLineSpacing: (willAdjustLineSpacing: boolean) => void;
  willAdjustLineSpacingBy: number;
  setWillAdjustLineSpacingBy: (willAdjustLineSpacingBy: number) => void;
  willAdjustStatementWidth: boolean;
  setWillAdjustStatementWidth: (willAdjustStatementWidth: boolean) => void;
  willAdjustStatementWidthBy: number;
  setWillAdjustStatementWidthBy: (willAdjustStatementWidthBy: number) => void;
  willAdjustWidthAsian: boolean;
  setWillAdjustWidthAsian: (willAdjustWidthAsian: boolean) => void;
  willAdjustWidthAsianBy: number;
  setWillAdjustWidthAsianBy: (willAdjustWidthAsianBy: number) => void;
  willDisplayConsensusStates: boolean;
  setWillDisplayConsensusStates: (willDisplayConsensusStates: boolean) => void;
  willDisplayDistingCompareSymbols: boolean;
  setWillDisplayDistingCompareSymbols: (
    willDisplayDistingCompareSymbols: boolean
  ) => void;

  positionData: {};
  setPositionData: (positionData: any) => void;
  showOutputFactorSelection: boolean;
  setShowOutputFactorSelection: (showOutputFactorSelection: boolean) => void;
  shouldDisplayFactorVizOptions: boolean;
  setShouldDisplayFactorVizOptions: (
    shouldDisplayFactorVizOptions: boolean
  ) => void;
  showFactorCorrelationsTable: boolean;
  setShowFactorCorrelationsTable: (
    showFactorCorrelationsTable: boolean
  ) => void;
  showStandardErrorsDifferences: boolean;
  setShowStandardErrorsDifferences: (
    showStandardErrorsDifferences: boolean
  ) => void;
  showFactorCharacteristicsTable: boolean;
  setShowFactorCharacteristicsTable: (
    showFactorCharacteristicsTable: boolean
  ) => void;
  showDownloadOutputButtons: boolean;
  setShowDownloadOutputButtons: (showDownloadOutputButtons: boolean) => void;
  displayFactorVisualizations: boolean;
  setDisplayFactorVisualizations: (
    displayFactorVisualizations: boolean
  ) => void;
  userSelectedFactors: number[];
  setUserSelectedFactors: (userSelectedFactors: number[]) => void;
  isActiveNewDownloadButton: boolean;
  setIsActiveNewDownloadButton: (isActiveNewDownloadButton: boolean) => void;
  isActiveExcelDownloadButton: boolean;
  setIsActiveExcelDownloadButton: (
    isActiveExcelDownloadButton: boolean
  ) => void;
  isActiveCsvDownloadButton: boolean;
  setIsActiveCsvDownloadButton: (isActiveCsvDownloadButton: boolean) => void;
  outputButtonsArray: any[];
  setOutputButtonsArray: (outputButtonsArray: any[]) => void;
  shouldIncludeTimestamp: boolean;
  setShouldIncludeTimestamp: (shouldIncludeTimestamp: boolean) => void;
  sheetNamesXlsx: string[];
  setSheetNamesXlsx: (sheetNamesXlsx: string[]) => void;
  outputData: any[];
  setOutputData: (outputData: any[]) => void;
  colSizes: any[];
  setColSizes: (colSizes: any[]) => void;
  sigFactorNumbersArray: number[];
  setSigFactorNumbersArray: (sigFactorNumbersArray: number[]) => void;
  sortWeights: any[];
  setSortWeights: (sortWeights: any[]) => void;
  sigSortsArray: any[];
  setSigSortsArray: (sigSortsArray: any[]) => void;
  masterDistingStatementNumbersArray01: number[];
  setMasterDistingStatementNumbersArray01: (
    masterDistingStatementNumbersArray01: number[]
  ) => void;
  masterDistingStatementNumbersArray05: number[];
  setMasterDistingStatementNumbersArray05: (
    masterDistingStatementNumbersArray05: number[]
  ) => void;
  consensus05Statements: any[];
  setConsensus05Statements: (consensus05Statements: any[]) => void;
  consensus01Statements: any[];
  setConsensus01Statements: (consensus01Statements: any[]) => void;
  analysisOutput: any[];
  setAnalysisOutput: (analysisOutput: any[]) => void;
  maxStatementLength: number;
  setMaxStatementLength: (maxStatementLength: number) => void;
  standardErrorDiffSheetArray: any[];
  setStandardErrorDiffSheetArray: (standardErrorDiffSheetArray: any[]) => void;
  posShiftSortArray: any[];
  setPosShiftSortArray: (posShiftSortArray: any[]) => void;
  sortsAsNumbers: any[];
  setSortsAsNumbers: (sortsAsNumbers: any[]) => void;
  freeDistributionArray: any[];
  setFreeDistributionArray: (freeDistributionArray: any[]) => void;
  sortsFlaggedOnTwoFactors: any[];
  setSortsFlaggedOnTwoFactors: (sortsFlaggedOnTwoFactors: any[]) => void;
  showMultipleFactorsFlaggedWarningModal: boolean;
  setShowMultipleFactorsFlaggedWarningModal: (
    showMultipleFactorsFlaggedWarningModal: boolean
  ) => void;
  correlationTableArrayHolder: any[];
  setCorrelationTableArrayHolder: (correlationTableArrayHolder: any[]) => void;
  factorCorrelationsTableData: any[];
  setFactorCorrelationsTableData: (factorCorrelationsTableData: any[]) => void;
  synFactorArray1Holder: any[];
  setSynFactorArray1Holder: (synFactorArray1Holder: any[]) => void;
  statementRankingArray: any[];
  setStatementRankingArray: (statementRankingArray: any[]) => void;
  compositeFactorMasterArray: any[];
  setCompositeFactorMasterArray: (compositeFactorMasterArray: any[]) => void;
  factorCharacteristicsArray: any[];
  setFactorCharacteristicsArray: (factorCharacteristicsArray: any[]) => void;
  formattedConsensusStatements: any[];
  setFormattedConsensusStatements: (
    formattedConsensusStatements: any[]
  ) => void;
  distStatementDataVizArray: any[];
  setDistStatementDataVizArray: (distStatementDataVizArray: any[]) => void;
  outputForDataViz: any[];
  setOutputForDataViz: (outputForDataViz: any[]) => void;
  sheetNamesHolder1: string[];
  setSheetNamesHolder1: (sheetNamesHolder1: string[]) => void;
  sheetNamesHolder2: string[];
  setSheetNamesHolder2: (sheetNamesHolder2: string[]) => void;
  sheetNamesHolder3: string[];
  setSheetNamesHolder3: (sheetNamesHolder3: string[]) => void;
  factorWeightFactorArrayHolder: any[];
  setFactorWeightFactorArrayHolder: (
    factorWeightFactorArrayHolder: any[]
  ) => void;
  miniCorrelationArrayHolder: any[];
  setMiniCorrelationArrayHolder: (miniCorrelationArrayHolder: any[]) => void;
  output: any[];
  setOutput: (output: any[]) => void;
  customFileNameLocation: string;
  setCustomFileNameLocation: (customFileNameLocation: string) => void;
  consensusIndicator: string;
  setConsensusIndicator: (consensusIndicator: string) => void;
  maxColumnHeight: number;
  setMaxColumnHeight: (maxColumnHeight: number) => void;
}

const useStore = create<DataState>()((set) => ({
  showOutputFactorSelection: false,
  setShowOutputFactorSelection: (showOutputFactorSelection) =>
    set((state) => ({
      ...state,
      showOutputFactorSelection,
    })),
  shouldDisplayFactorVizOptions: false,
  setShouldDisplayFactorVizOptions: (shouldDisplayFactorVizOptions) =>
    set((state) => ({
      ...state,
      shouldDisplayFactorVizOptions,
    })),
  showFactorCorrelationsTable: false,
  setShowFactorCorrelationsTable: (showFactorCorrelationsTable) =>
    set((state) => ({
      ...state,
      showFactorCorrelationsTable,
    })),
  showStandardErrorsDifferences: false,
  setShowStandardErrorsDifferences: (showStandardErrorsDifferences) =>
    set((state) => ({
      ...state,
      showStandardErrorsDifferences,
    })),
  showFactorCharacteristicsTable: false,
  setShowFactorCharacteristicsTable: (showFactorCharacteristicsTable) =>
    set((state) => ({
      ...state,
      showFactorCharacteristicsTable,
    })),
  showDownloadOutputButtons: false,
  setShowDownloadOutputButtons: (showDownloadOutputButtons) =>
    set((state) => ({
      ...state,
      showDownloadOutputButtons,
    })),
  displayFactorVisualizations: false,
  setDisplayFactorVisualizations: (displayFactorVisualizations) =>
    set((state) => ({
      ...state,
      displayFactorVisualizations,
    })),
  userSelectedFactors: [],
  setUserSelectedFactors: (userSelectedFactors) =>
    set((state) => ({
      ...state,
      userSelectedFactors,
    })),
  isActiveNewDownloadButton: false,
  setIsActiveNewDownloadButton: (isActiveNewDownloadButton) =>
    set((state) => ({
      ...state,
      isActiveNewDownloadButton,
    })),
  isActiveExcelDownloadButton: false,
  setIsActiveExcelDownloadButton: (isActiveExcelDownloadButton) =>
    set((state) => ({
      ...state,
      isActiveExcelDownloadButton,
    })),
  isActiveCsvDownloadButton: false,
  setIsActiveCsvDownloadButton: (isActiveCsvDownloadButton) =>
    set((state) => ({
      ...state,
      isActiveCsvDownloadButton,
    })),
  outputButtonsArray: [],
  setOutputButtonsArray: (outputButtonsArray) =>
    set((state) => ({
      ...state,
      outputButtonsArray,
    })),
  shouldIncludeTimestamp: false,
  setShouldIncludeTimestamp: (shouldIncludeTimestamp) =>
    set((state) => ({
      ...state,
      shouldIncludeTimestamp,
    })),
  sheetNamesXlsx: [],
  setSheetNamesXlsx: (sheetNamesXlsx) =>
    set((state) => ({
      ...state,
      sheetNamesXlsx,
    })),
  outputData: [],
  setOutputData: (outputData) =>
    set((state) => ({
      ...state,
      outputData,
    })),
  colSizes: [],
  setColSizes: (colSizes) =>
    set((state) => ({
      ...state,
      colSizes,
    })),
  sigFactorNumbersArray: [],
  setSigFactorNumbersArray: (sigFactorNumbersArray) =>
    set((state) => ({
      ...state,
      sigFactorNumbersArray,
    })),
  sortWeights: [],
  setSortWeights: (sortWeights) =>
    set((state) => ({
      ...state,
      sortWeights,
    })),
  sigSortsArray: [],
  setSigSortsArray: (sigSortsArray) =>
    set((state) => ({
      ...state,
      sigSortsArray,
    })),
  masterDistingStatementNumbersArray01: [],
  setMasterDistingStatementNumbersArray01: (
    masterDistingStatementNumbersArray01
  ) =>
    set((state) => ({
      ...state,
      masterDistingStatementNumbersArray01,
    })),
  masterDistingStatementNumbersArray05: [],
  setMasterDistingStatementNumbersArray05: (
    masterDistingStatementNumbersArray05
  ) =>
    set((state) => ({
      ...state,
      masterDistingStatementNumbersArray05,
    })),
  consensus05Statements: [],
  setConsensus05Statements: (consensus05Statements) =>
    set((state) => ({
      ...state,
      consensus05Statements,
    })),
  consensus01Statements: [],
  setConsensus01Statements: (consensus01Statements) =>
    set((state) => ({
      ...state,
      consensus01Statements,
    })),
  analysisOutput: [],
  setAnalysisOutput: (analysisOutput) =>
    set((state) => ({
      ...state,
      analysisOutput,
    })),
  maxStatementLength: 0,
  setMaxStatementLength: (maxStatementLength) =>
    set((state) => ({
      ...state,
      maxStatementLength,
    })),
  standardErrorDiffSheetArray: [],
  setStandardErrorDiffSheetArray: (standardErrorDiffSheetArray) =>
    set((state) => ({
      ...state,
      standardErrorDiffSheetArray,
    })),
  posShiftSortArray: [],
  setPosShiftSortArray: (posShiftSortArray) =>
    set((state) => ({
      ...state,
      posShiftSortArray,
    })),
  sortsAsNumbers: [],
  setSortsAsNumbers: (sortsAsNumbers) =>
    set((state) => ({
      ...state,
      sortsAsNumbers,
    })),
  freeDistributionArray: [],
  setFreeDistributionArray: (freeDistributionArray) =>
    set((state) => ({
      ...state,
      freeDistributionArray,
    })),
  sortsFlaggedOnTwoFactors: [],
  setSortsFlaggedOnTwoFactors: (sortsFlaggedOnTwoFactors) =>
    set((state) => ({
      ...state,
      sortsFlaggedOnTwoFactors,
    })),
  showMultipleFactorsFlaggedWarningModal: false,
  setShowMultipleFactorsFlaggedWarningModal: (
    showMultipleFactorsFlaggedWarningModal
  ) =>
    set((state) => ({
      ...state,
      showMultipleFactorsFlaggedWarningModal,
    })),
  correlationTableArrayHolder: [],
  setCorrelationTableArrayHolder: (correlationTableArrayHolder) =>
    set((state) => ({
      ...state,
      correlationTableArrayHolder,
    })),
  factorCorrelationsTableData: [],
  setFactorCorrelationsTableData: (factorCorrelationsTableData) =>
    set((state) => ({
      ...state,
      factorCorrelationsTableData,
    })),
  synFactorArray1Holder: [],
  setSynFactorArray1Holder: (synFactorArray1Holder) =>
    set((state) => ({
      ...state,
      synFactorArray1Holder,
    })),
  statementRankingArray: [],
  setStatementRankingArray: (statementRankingArray) =>
    set((state) => ({
      ...state,
      statementRankingArray,
    })),
  compositeFactorMasterArray: [],
  setCompositeFactorMasterArray: (compositeFactorMasterArray) =>
    set((state) => ({
      ...state,
      compositeFactorMasterArray,
    })),
  factorCharacteristicsArray: [],
  setFactorCharacteristicsArray: (factorCharacteristicsArray) =>
    set((state) => ({
      ...state,
      factorCharacteristicsArray,
    })),
  formattedConsensusStatements: [],
  setFormattedConsensusStatements: (formattedConsensusStatements) =>
    set((state) => ({
      ...state,
      formattedConsensusStatements,
    })),
  distStatementDataVizArray: [],
  setDistStatementDataVizArray: (distStatementDataVizArray) =>
    set((state) => ({
      ...state,
      distStatementDataVizArray,
    })),
  outputForDataViz: [],
  setOutputForDataViz: (outputForDataViz) =>
    set((state) => ({
      ...state,
      outputForDataViz,
    })),
  sheetNamesHolder1: [],
  setSheetNamesHolder1: (sheetNamesHolder1) =>
    set((state) => ({
      ...state,
      sheetNamesHolder1,
    })),
  sheetNamesHolder2: [],
  setSheetNamesHolder2: (sheetNamesHolder2) =>
    set((state) => ({
      ...state,
      sheetNamesHolder2,
    })),
  sheetNamesHolder3: [],
  setSheetNamesHolder3: (sheetNamesHolder3) =>
    set((state) => ({
      ...state,
      sheetNamesHolder3,
    })),
  factorWeightFactorArrayHolder: [],
  setFactorWeightFactorArrayHolder: (factorWeightFactorArrayHolder) =>
    set((state) => ({
      ...state,
      factorWeightFactorArrayHolder,
    })),
  miniCorrelationArrayHolder: [],
  setMiniCorrelationArrayHolder: (miniCorrelationArrayHolder) =>
    set((state) => ({
      ...state,
      miniCorrelationArrayHolder,
    })),
  output: [],
  setOutput: (output) =>
    set((state) => ({
      ...state,
      output,
    })),
  customFileNameLocation: "",
  setCustomFileNameLocation: (customFileNameLocation) =>
    set((state) => ({
      ...state,
      customFileNameLocation,
    })),
  consensusIndicator: "",
  setConsensusIndicator: (consensusIndicator) =>
    set((state) => ({
      ...state,
      consensusIndicator,
    })),
  maxColumnHeight: 0,
  setMaxColumnHeight: (maxColumnHeight) =>
    set((state) => ({
      ...state,
      maxColumnHeight,
    })),
  positionData: {},
  setPositionData: (positionData) =>
    set((state) => ({
      ...state,
      positionData,
    })),
  willAddCustomNames: false,
  setWillAddCustomNames: (willAddCustomNames) =>
    set((state) => ({
      ...state,
      willAddCustomNames,
    })),
  willAdjustCardFontSize: false,
  setWillAdjustCardFontSize: (willAdjustCardFontSize) =>
    set((state) => ({
      ...state,
      willAdjustCardFontSize,
    })),
  willAdjustCardHeight: false,
  setWillAdjustCardHeight: (willAdjustCardHeight) =>
    set((state) => ({
      ...state,
      willAdjustCardHeight,
    })),
  willAdjustCardHeightBy: 0,
  setWillAdjustCardHeightBy: (willAdjustCardHeightBy) =>
    set((state) => ({
      ...state,
      willAdjustCardHeightBy,
    })),
  willAdjustCardWidth: false,
  setWillAdjustCardWidth: (willAdjustCardWidth) =>
    set((state) => ({
      ...state,
      willAdjustCardWidth,
    })),
  willAdjustCardWidthBy: 0,
  setWillAdjustCardWidthBy: (willAdjustCardWidthBy) =>
    set((state) => ({
      ...state,
      willAdjustCardWidthBy,
    })),
  willAdjustDistIndicatorSize: false,
  setWillAdjustDistIndicatorSize: (willAdjustDistIndicatorSize) =>
    set((state) => ({
      ...state,
      willAdjustDistIndicatorSize,
    })),
  willAdjustDistIndicatorSizeBy: 0,
  setWillAdjustDistIndicatorSizeBy: (willAdjustDistIndicatorSizeBy) =>
    set((state) => ({
      ...state,
      willAdjustDistIndicatorSizeBy,
    })),
  willAdjustStatementWidth: false,
  setWillAdjustStatementWidth: (willAdjustStatementWidth) =>
    set((state) => ({
      ...state,
      willAdjustStatementWidth,
    })),
  willAdjustStatementWidthBy: 0,
  setWillAdjustStatementWidthBy: (willAdjustStatementWidthBy) =>
    set((state) => ({
      ...state,
      willAdjustStatementWidthBy,
    })),
  willAdjustCardFontSizeBy: 0,
  setWillAdjustCardFontSizeBy: (willAdjustCardFontSizeBy) =>
    set((state) => ({
      ...state,
      willAdjustCardFontSizeBy,
    })),
  willAdjustFontSize: false,
  setWillAdjustFontSize: (willAdjustFontSize) =>
    set((state) => ({
      ...state,
      willAdjustFontSize,
    })),
  willAdjustLineSpacing: false,
  setWillAdjustLineSpacing: (willAdjustLineSpacing) =>
    set((state) => ({
      ...state,
      willAdjustLineSpacing,
    })),
  willAdjustLineSpacingBy: 0,
  setWillAdjustLineSpacingBy: (willAdjustLineSpacingBy) =>
    set((state) => ({
      ...state,
      willAdjustLineSpacingBy,
    })),
  willAdjustWidthAsian: false,
  setWillAdjustWidthAsian: (willAdjustWidthAsian) =>
    set((state) => ({
      ...state,
      willAdjustWidthAsian,
    })),
  willAdjustWidthAsianBy: 0,
  setWillAdjustWidthAsianBy: (willAdjustWidthAsianBy) =>
    set((state) => ({
      ...state,
      willAdjustWidthAsianBy,
    })),
  willDisplayConsensusStates: false,
  setWillDisplayConsensusStates: (willDisplayConsensusStates) =>
    set((state) => ({
      ...state,
      willDisplayConsensusStates,
    })),
  willDisplayDistingCompareSymbols: false,
  setWillDisplayDistingCompareSymbols: (willDisplayDistingCompareSymbols) =>
    set((state) => ({
      ...state,
      willDisplayDistingCompareSymbols,
    })),
  willDisplayOnlyStateNums: false,
  setWillDisplayOnlyStateNums: (willDisplayOnlyStateNums) =>
    set((state) => ({
      ...state,
      willDisplayOnlyStateNums,
    })),
  willIncludeLegend: false,
  setWillIncludeLegend: (willIncludeLegend) =>
    set((state) => ({
      ...state,
      willIncludeLegend,
    })),
  willIndicateDistinguishing: false,
  setWillIndicateDistinguishing: (willIndicateDistinguishing) =>
    set((state) => ({
      ...state,
      willIndicateDistinguishing,
    })),
  willPrependStateNums: false,
  setWillPrependStateNums: (willPrependStateNums) =>
    set((state) => ({
      ...state,
      willPrependStateNums,
    })),
  willTrimStatements: false,
  setWillTrimStatements: (willTrimStatements) =>
    set((state) => ({
      ...state,
      willTrimStatements,
    })),
  willTrimStatementsBy: 0,
  setWillTrimStatementsBy: (willTrimStatementsBy) =>
    set((state) => ({
      ...state,
      willTrimStatementsBy,
    })),
  willUseDistingUnicode: false,
  setWillUseDistingUnicode: (willUseDistingUnicode) =>
    set((state) => ({
      ...state,
      willUseDistingUnicode,
    })),
  customFactorNames: [],
  setCustomFactorNames: (customFactorNames) =>
    set((state) => ({
      ...state,
      customFactorNames,
    })),
  titleHeight: 50,
  setTitleHeight: (titleHeight) =>
    set((state) => ({
      ...state,
      titleHeight,
    })),
  willAddCustomNameToDownload: false,
  setWillAddCustomNameToDownload: (willAddCustomNameToDownload) =>
    set((state) => ({
      ...state,
      willAddCustomNameToDownload,
    })),
  customDownloadFileNames: [],
  setCustomDownloadFileNames: (customDownloadFileNames) =>
    set((state) => ({
      ...state,
      customDownloadFileNames,
    })),
  highlightFactor1: false,
  setHighlightFactor1: (highlightFactor1) =>
    set((state) => ({
      ...state,
      highlightFactor1,
    })),
  highlightFactor2: false,
  setHighlightFactor2: (highlightFactor2) =>
    set((state) => ({
      ...state,
      highlightFactor2,
    })),
  highlightFactor3: false,
  setHighlightFactor3: (highlightFactor3) =>
    set((state) => ({
      ...state,
      highlightFactor3,
    })),
  highlightFactor4: false,
  setHighlightFactor4: (highlightFactor4) =>
    set((state) => ({
      ...state,
      highlightFactor4,
    })),
  highlightFactor5: false,
  setHighlightFactor5: (highlightFactor5) =>
    set((state) => ({
      ...state,
      highlightFactor5,
    })),
  highlightFactor6: false,
  setHighlightFactor6: (highlightFactor6) =>
    set((state) => ({
      ...state,
      highlightFactor6,
    })),
  highlightFactor7: false,
  setHighlightFactor7: (highlightFactor7) =>
    set((state) => ({
      ...state,
      highlightFactor7,
    })),
  highlightFactor8: false,
  setHighlightFactor8: (highlightFactor8) =>
    set((state) => ({
      ...state,
      highlightFactor8,
    })),
  selectAllClicked: false,
  setSelectAllClicked: (selectAllClicked) =>
    set((state) => ({
      ...state,
      selectAllClicked,
    })),
  outputFactorSelectButtonsDisabled: false,
  setOutputFactorSelectButtonsDisabled: (outputFactorSelectButtonsDisabled) =>
    set((state) => ({
      ...state,
      outputFactorSelectButtonsDisabled,
    })),
  isDownloadTypeSelected: false,
  setIsDownloadTypeSelected: (isDownloadTypeSelected) =>
    set((state) => ({
      ...state,
      isDownloadTypeSelected,
    })),
  factorVizOptions: {
    willAddCustomNames: false,
    willAddCustomNameToDownload: false,
    willAdjustCardFontSize: false,
    willAdjustCardFontSizeBy: 13,
    willAdjustCardHeight: false,
    willAdjustCardHeightBy: 110,
    willAdjustCardWidth: false,
    willAdjustCardWidthBy: 110,
    willAdjustDistIndicatorSize: false,
    willAdjustDistIndicatorSizeBy: 12,
    willAdjustIndicatorSize: false,
    willAdjustIndicatorSizeBy: 12,
    willAdjustFontSize: false,
    willAdjustFontSizeBy: 14,
    willAdjustLineSpacing: false,
    willAdjustLineSpacingBy: 1.4,
    willAdjustStatementWidth: false,
    willAdjustStatementWidthBy: 15,
    willAdjustWidthAsian: false,
    willAdjustWidthAsianBy: 12,
    willAdjustTopMargin: false,
    willAdjustTopMarginBy: 5,
    willDisplayConsensusStates: false,
    willDisplayDistingCompareSymbols: true,
    willDisplayOnlyStateNums: false,
    willIncludeLegend: true,
    willIndicateDistinguishing: true,
    willPrependStateNums: false,
    willTrimStatement: true,
    willTrimStatementBy: 5,
    willUseDistingUnicode: true,
    showDistinguishingAs: "symbol",
    consensusIndicator: "#d9effe",
    distinguishingIndicator05: "#d1d5db",
    distinguishingIndicator01: "#9ca3af",
    customFactorNames: [],
    customFileNameLocation: "append",
  },
  setFactorVizOptions: (factorVizOptions) =>
    set((state) => ({
      ...state,
      factorVizOptions,
    })),
  showNoLoadingsFlaggedModal: false,
  setShowNoLoadingsFlaggedModal: (showNoLoadingsFlaggedModal) =>
    set((state) => ({
      ...state,
      showNoLoadingsFlaggedModal,
    })),
  factorsWithoutLoading: [],
  setFactorsWithoutLoading: (factorsWithoutLoading) =>
    set((state) => ({
      ...state,
      factorsWithoutLoading,
    })),
  matchCount: 0,
  setMatchCount: (matchCount) =>
    set((state) => ({
      ...state,
      matchCount,
    })),
  distStateUpperValueText: "P < 0.01",
  setDistStateUpperValueText: (distStateUpperValueText) =>
    set((state) => ({
      ...state,
      distStateUpperValueText,
    })),
  distStateLowerValueText: "P < 0.05",
  setDistStateLowerValueText: (distStateLowerValueText) =>
    set((state) => ({
      ...state,
      distStateLowerValueText,
    })),
  factorVizOptionsHolder: {},
  setFactorVizOptionsHolder: (factorVizOptionsHolder) =>
    set((state) => ({
      ...state,
      factorVizOptionsHolder,
    })),
  updateFactorVisualizationsButtonColor: "",
  setUpdateFactorVisualizationsButtonColor: (
    updateFactorVisualizationsButtonColor
  ) =>
    set((state) => ({
      ...state,
      updateFactorVisualizationsButtonColor,
    })),
  showDistinguishingAs: "symbol",
  setShowDistinguishingAs: (showDistinguishingAs) =>
    set((state) => ({
      ...state,
      showDistinguishingAs,
    })),
  outputForDataViz2: [],
  setOutputForDataViz2: (outputForDataViz2) =>
    set((state) => ({
      ...state,
      outputForDataViz2,
    })),
  userSelectedDistStateSigLevel1: 2.575,
  setUserSelectedDistStateSigLevel1: (userSelectedDistStateSigLevel1) =>
    set((state) => ({
      ...state,
      userSelectedDistStateSigLevel1,
    })),
  userSelectedDistStateSigLevel2: 1.96,
  setUserSelectedDistStateSigLevel2: (userSelectedDistStateSigLevel2) =>
    set((state) => ({
      ...state,
      userSelectedDistStateSigLevel2,
    })),
  shouldDisplayFactorViz: false,
  setShouldDisplayFactorViz: (shouldDisplayFactorViz) =>
    set((state) => ({
      ...state,
      shouldDisplayFactorViz,
    })),
}));

export default useStore;
