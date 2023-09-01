import { create } from "zustand";

interface DataState {
  showWarningBox: boolean;
  setShowWarningBox: (showWarningBox: boolean) => void;
  continueAnalysis: boolean;
  setContinueAnalysis: (continueAnalysis: boolean) => void;
  unforcedSorts: any[];
  setUnforcedSorts: (unforcedSorts: any[]) => void;
  isDataLoaded: boolean;
  setIsDataLoaded: (isDataLoaded: boolean) => void;
  showInputErrorModal: {};
  setShowInputErrorModal: (showInputErrorModal: any) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
  showErrorMessageBar: boolean;
  setShowErrorMessageBar: (showErrorMessageBar: boolean) => void;
  browser: string;
  setBrowser: (browser: string) => void;
  numQsorts: number;
  setNumQsorts: (numQsorts: number) => void;
  qSortPattern: number[];
  setQSortPattern: (qSortPattern: number[]) => void;
  numStatements: number;
  setNumStatements: (numStatements: number) => void;
  respondentNames: string[];
  setRespondentNames: (respondentNames: string[]) => void;
  mainDataObject: [] | any[] | undefined;
  setMainDataObject: (mainDataObject: any[]) => void;
  sortsDisplayText: string[];
  setSortsDisplayText: (sortsDisplayText: string[]) => void;
  multiplierArray: number[];
  setMultiplierArray: (multiplierArray: number[]) => void;
  dataOrigin: string;
  setDataOrigin: (dataOrigin: string) => void;
  statements: string[];
  setStatements: (statements: string[]) => void;
  projectName: string;
  setProjectName: (projectName: string) => void;
  showForcedInput: boolean;
  setShowForcedInput: (showForcedInput: boolean) => void;
  isForcedQsortPattern: boolean;
  setIsForcedQsortPattern: (isForcedQsortPattern: boolean) => void;
  requireQsortPatternInput: boolean;
  setRequireQsortPatternInput: (requireQsortPatternInput: boolean) => void;
  oldQsortPattern: number[];
  setOldQsortPattern: (oldQsortPattern: number[]) => void;
  showCsvErrorModal: boolean;
  setShowCsvErrorModal: (showCsvErrorModal: boolean) => void;
  csvErrorMessage1: string;
  setCsvErrorMessage1: (csvErrorMessage1: string) => void;
  statementNumArray: number[];
  setStatementNumArray: (statementNumArray: number[]) => void;
  projectHistoryArray: any[];
  setProjectHistoryArray: (projectHistoryArray: any[]) => void;
  sortsAreLoaded: boolean;
  setSortsAreLoaded: (sortsAreLoaded: boolean) => void;
  statementsAreLoaded: boolean;
  setStatementsAreLoaded: (statementsAreLoaded: boolean) => void;
  excelType1NonsymmetricArrayText: string;
  setExcelType1NonsymmetricArrayText: (
    excelType1NonsymmetricArrayText: string
  ) => void;
  jsonParticipantId: any[];
  setJsonParticipantId: (jsonParticipantId: any[]) => void;
  csvData: any[];
  setCsvData: (csvData: any[]) => void;
  jsonObj: any[];
  setJsonObj: (jsonObj: any[]) => void;
  showJsonFileLoadedMessage: boolean;
  setShowJsonFileLoadedMessage: (showJsonFileLoadedMessage: boolean) => void;
  showJsonParticipantIdDropdown: boolean;
  setShowJsonParticipantIdDropdown: (
    showJsonParticipantIdDropdown: boolean
  ) => void;
  hasImportedSorts: boolean;
  setHasImportedSorts: (hasImportedSorts: boolean) => void;
  hasImportedStatements: boolean;
  setHasImportedStatements: (hasImportedStatements: boolean) => void;
  version: string;
  setVersion: (version: string) => void;
}

const useStore = create<DataState>()((set) => ({
  // initial state
  hasImportedStatements: false,
  setHasImportedStatements: (hasImportedStatements) =>
    set((state) => ({
      ...state,
      hasImportedStatements,
    })),
  hasImportedSorts: false,
  setHasImportedSorts: (hasImportedSorts) =>
    set((state) => ({
      ...state,
      hasImportedSorts,
    })),
  showJsonParticipantIdDropdown: false,
  setShowJsonParticipantIdDropdown: (showJsonParticipantIdDropdown) =>
    set((state) => ({
      ...state,
      showJsonParticipantIdDropdown,
    })),
  showJsonFileLoadedMessage: false,
  setShowJsonFileLoadedMessage: (showJsonFileLoadedMessage) =>
    set((state) => ({
      ...state,
      showJsonFileLoadedMessage,
    })),
  jsonObj: [],
  setJsonObj: (jsonObj) =>
    set((state) => ({
      ...state,
      jsonObj,
    })),
  csvData: [],
  setCsvData: (csvData) =>
    set((state) => ({
      ...state,
      csvData,
    })),
  jsonParticipantId: [],
  setJsonParticipantId: (jsonParticipantId) =>
    set((state) => ({
      ...state,
      jsonParticipantId,
    })),
  excelType1NonsymmetricArrayText: "",
  setExcelType1NonsymmetricArrayText: (excelType1NonsymmetricArrayText) =>
    set((state) => ({
      ...state,
      excelType1NonsymmetricArrayText,
    })),
  sortsAreLoaded: false,
  setSortsAreLoaded: (sortsAreLoaded) =>
    set((state) => ({
      ...state,
      sortsAreLoaded,
    })),
  statementsAreLoaded: false,
  setStatementsAreLoaded: (statementsAreLoaded) =>
    set((state) => ({
      ...state,
      statementsAreLoaded,
    })),
  projectHistoryArray: [],
  setProjectHistoryArray: (projectHistoryArray) =>
    set((state) => ({
      ...state,
      projectHistoryArray,
    })),
  statementNumArray: [],
  setStatementNumArray: (statementNumArray) =>
    set((state) => ({
      ...state,
      statementNumArray,
    })),
  csvErrorMessage1: "",
  setCsvErrorMessage1: (csvErrorMessage1) =>
    set((state) => ({
      ...state,
      csvErrorMessage1,
    })),
  showCsvErrorModal: false,
  setShowCsvErrorModal: (showCsvErrorModal) =>
    set((state) => ({
      ...state,
      showCsvErrorModal,
    })),
  oldQsortPattern: [],
  setOldQsortPattern: (oldQsortPattern) =>
    set((state) => ({
      ...state,
      oldQsortPattern,
    })),
  requireQsortPatternInput: false,
  setRequireQsortPatternInput: (requireQsortPatternInput) =>
    set((state) => ({
      ...state,
      requireQsortPatternInput,
    })),
  isForcedQsortPattern: true,
  setIsForcedQsortPattern: (isForcedQsortPattern) =>
    set((state) => ({
      ...state,
      isForcedQsortPattern,
    })),
  showForcedInput: false,
  setShowForcedInput: (showForcedInput) =>
    set((state) => ({
      ...state,
      showForcedInput,
    })),
  numQsorts: 0,
  setNumQsorts: (numQsorts) =>
    set((state) => ({
      ...state,
      numQsorts,
    })),
  qSortPattern: [],
  setQSortPattern: (qSortPattern) =>
    set((state) => ({
      ...state,
      qSortPattern,
    })),
  numStatements: 0,
  setNumStatements: (numStatements) =>
    set((state) => ({
      ...state,
      numStatements,
    })),
  respondentNames: [],
  setRespondentNames: (respondentNames) =>
    set((state) => ({
      ...state,
      respondentNames,
    })),
  mainDataObject: [],
  setMainDataObject: (mainDataObject) =>
    set((state) => ({
      ...state,
      mainDataObject,
    })),
  sortsDisplayText: [],
  setSortsDisplayText: (sortsDisplayText) =>
    set((state) => ({
      ...state,
      sortsDisplayText,
    })),
  multiplierArray: [],
  setMultiplierArray: (multiplierArray) =>
    set((state) => ({
      ...state,
      multiplierArray,
    })),
  dataOrigin: "",
  setDataOrigin: (dataOrigin) =>
    set((state) => ({
      ...state,
      dataOrigin,
    })),
  statements: ["", ""],
  setStatements: (statements) =>
    set((state) => ({
      ...state,
      statements,
    })),
  projectName: "my Project",
  setProjectName: (projectName) =>
    set((state) => ({
      ...state,
      projectName,
    })),
  version: "2 .0.0",
  setVersion: (version) =>
    set((state) => ({
      ...state,
      version,
    })),
  browser: "",
  setBrowser: (browser) =>
    set((state) => ({
      ...state,
      browser,
    })),
  showErrorMessageBar: false,
  setShowErrorMessageBar: (showErrorMessageBar) =>
    set((state) => ({
      ...state,
      showErrorMessageBar,
    })),
  errorMessage: "",
  setErrorMessage: (errorMessage) =>
    set((state) => ({
      ...state,
      errorMessage,
    })),
  showInputErrorModal: { showModal: false, titleText: "Error" },
  setShowInputErrorModal: (showInputErrorModal) =>
    set((state) => ({
      ...state,
      showInputErrorModal,
    })),
  isDataLoaded: false,
  setIsDataLoaded: (isDataLoaded) =>
    set((state) => ({
      ...state,
      isDataLoaded,
    })),
  unforcedSorts: [],
  setUnforcedSorts: (unforcedSorts) =>
    set((state) => ({
      ...state,
      unforcedSorts,
    })),
  continueAnalysis: false,
  setContinueAnalysis: (continueAnalysis) =>
    set((state) => ({
      ...state,
      continueAnalysis,
    })),
  showWarningBox: false,
  setShowWarningBox: (showWarningBox) =>
    set((state) => ({
      ...state,
      showWarningBox,
    })),
}));

export default useStore;
