import { create } from "zustand";

// LOADINGS TABLE

interface DataState {
  showSection6: boolean;
  setShowSection6: (showSection6: boolean) => void;
  showLoadingsTable: boolean;
  setShowLoadingsTable: (showLoadingsTable: boolean) => void;
  bipolarDisabled: boolean;
  setBipolarDisabled: (bipolarDisabled: boolean) => void;
  bipolarSplitCount: number;
  setBipolarSplitCount: (bipolarSplitCount: number) => void;
  showAutoFlags: boolean;
  setShowAutoFlags: (showAutoFlags: boolean) => void;
  highlighting: string;
  setHighlighting: (highlighting: string) => void;
  fSigCriterion: any[];
  setFSigCriterion: (fSigCriterion: any[]) => void;
  requireMajorityCommonVariance: boolean;
  setRequireMajorityCommonVariance: (
    requireMajorityCommonVariance: boolean
  ) => void;
  fSigCriterionResults: any[];
  setFSigCriterionResults: (fSigCriterionResults: any[]) => void;
  gridColDefsLoadingsTable: any[];
  setGridColDefsLoadingsTable: (gridColDefsLoadingsTable: any[]) => void;
  gridRowDataLoadingsTable: any[];
  setGridRowDataLoadingsTable: (gridRowDataLoadingsTable: any[]) => void;
  isLoadingAutoflag: boolean;
  setIsLoadingAutoflag: (isLoadingAutoflag: boolean) => void;
  isLoadingGrayHighlighting: boolean;
  setIsLoadingGrayHighlighting: (isLoadingGrayHighlighting: boolean) => void;
  isLoadingColorsHighlighting: boolean;
  setIsLoadingColorsHighlighting: (
    isLoadingColorsHighlighting: boolean
  ) => void;
  isLoadingNoHighlighting: boolean;
  setIsLoadingNoHighlighting: (isLoadingNoHighlighting: boolean) => void;
  currentLoadingsTable: any[];
  setCurrentLoadingsTable: (currentLoadingsTable: any[]) => void;
  showSplitFactorModal: boolean;
  setShowSplitFactorModal: (showSplitFactorModal: boolean) => void;
  userSelectedSigLevel: number;
  setUserSelectedSigLevel: (userSelectedSigLevel: number) => void;
  autoflagHistory: any[];
  setAutoflagHistory: (autoflagHistory: any[]) => void;
  showNoLoadingsFlaggedWarningModal: boolean;
  setShowNoLoadingsFlaggedWarningModal: (
    showNoLoadingsFlaggedWarningModal: boolean
  ) => void;
  rowH2: any[];
  setRowH2: (rowH2: any[]) => void;
  autoflagButtonColor: string;
  setAutoflagButtonColor: (autoflagButtonColor: string) => void;
  numFacsForTableWidth: number;
  setNumFacsForTableWidth: (numFacsForTableWidth: number) => void;
  sendDataToOutputButtonColor: string;
  setSendDataToOutputButtonColor: (sendDataToOutputButtonColor: string) => void;
  temp_gridRowDataLoadingsTable: any[];
  setTemp_gridRowDataLoadingsTable: (
    temp_gridRowDataLoadingsTable: any[]
  ) => void;
  temp_gridColDefsLoadingsTable: any[];
  setTemp_gridColDefsLoadingsTable: (
    temp_gridColDefsLoadingsTable: any[]
  ) => void;
  showInvertFactorModal: boolean;
  setShowInvertFactorModal: (showInvertFactorModal: boolean) => void;
  isLoadingsTableLoading: boolean;
  setIsLoadingsTableLoading: (isLoadingsTableLoading: boolean) => void;
  isLoadingsTableInitialRender: boolean;
  setIsLoadingsTableInitialRender: (
    isLoadingsTableInitialRender: boolean
  ) => void;
  rowClassRulesLoadingsTable: any;
  setRowClassRulesLoadingsTable: (rowClassRulesLoadingsTable: any) => void;
  factorToSplit: number;
  setFactorToSplit: (factorToSplit: number) => void;
  bipolarIndexArray: number[];
  setBipolarIndexArray: (bipolarIndexArray: number[]) => void;
}

const useStore = create<DataState>()((set) => ({
  showLoadingsTable: false,
  setShowLoadingsTable: (showLoadingsTable) =>
    set((state) => ({
      ...state,
      showLoadingsTable,
    })),
  bipolarDisabled: false,
  setBipolarDisabled: (bipolarDisabled) =>
    set((state) => ({
      ...state,
      bipolarDisabled,
    })),
  bipolarSplitCount: 0,
  setBipolarSplitCount: (bipolarSplitCount) =>
    set((state) => ({
      ...state,
      bipolarSplitCount,
    })),
  showAutoFlags: false,
  setShowAutoFlags: (showAutoFlags) =>
    set((state) => ({
      ...state,
      showAutoFlags,
    })),
  highlighting: "grays",
  setHighlighting: (highlighting) =>
    set((state) => ({
      ...state,
      highlighting,
    })),
  fSigCriterion: [],
  setFSigCriterion: (fSigCriterion) =>
    set((state) => ({
      ...state,
      fSigCriterion,
    })),
  requireMajorityCommonVariance: true,
  setRequireMajorityCommonVariance: (requireMajorityCommonVariance) =>
    set((state) => ({
      ...state,
      requireMajorityCommonVariance,
    })),
  fSigCriterionResults: [],
  setFSigCriterionResults: (fSigCriterionResults) =>
    set((state) => ({
      ...state,
      fSigCriterionResults,
    })),
  gridColDefsLoadingsTable: [],
  setGridColDefsLoadingsTable: (gridColDefsLoadingsTable) =>
    set((state) => ({
      ...state,
      gridColDefsLoadingsTable,
    })),
  gridRowDataLoadingsTable: [],
  setGridRowDataLoadingsTable: (gridRowDataLoadingsTable) =>
    set((state) => ({
      ...state,
      gridRowDataLoadingsTable,
    })),
  isLoadingAutoflag: false,
  setIsLoadingAutoflag: (isLoadingAutoflag) =>
    set((state) => ({
      ...state,
      isLoadingAutoflag,
    })),
  isLoadingGrayHighlighting: false,
  setIsLoadingGrayHighlighting: (isLoadingGrayHighlighting) =>
    set((state) => ({
      ...state,
      isLoadingGrayHighlighting,
    })),
  isLoadingColorsHighlighting: false,
  setIsLoadingColorsHighlighting: (isLoadingColorsHighlighting) =>
    set((state) => ({
      ...state,
      isLoadingColorsHighlighting,
    })),
  isLoadingNoHighlighting: false,
  setIsLoadingNoHighlighting: (isLoadingNoHighlighting) =>
    set((state) => ({
      ...state,
      isLoadingNoHighlighting,
    })),
  currentLoadingsTable: [],
  setCurrentLoadingsTable: (currentLoadingsTable) =>
    set((state) => ({
      ...state,
      currentLoadingsTable,
    })),
  showSplitFactorModal: false,
  setShowSplitFactorModal: (showSplitFactorModal) =>
    set((state) => ({
      ...state,
      showSplitFactorModal,
    })),
  userSelectedSigLevel: 1.96,
  setUserSelectedSigLevel: (userSelectedSigLevel) =>
    set((state) => ({
      ...state,
      userSelectedSigLevel,
    })),
  autoflagHistory: [],
  setAutoflagHistory: (autoflagHistory) =>
    set((state) => ({
      ...state,
      autoflagHistory,
    })),
  showNoLoadingsFlaggedWarningModal: false,
  setShowNoLoadingsFlaggedWarningModal: (showNoLoadingsFlaggedWarningModal) =>
    set((state) => ({
      ...state,
      showNoLoadingsFlaggedWarningModal,
    })),
  rowH2: [],
  setRowH2: (rowH2) =>
    set((state) => ({
      ...state,
      rowH2,
    })),
  autoflagButtonColor: "#d6dbe0",
  setAutoflagButtonColor: (autoflagButtonColor) =>
    set((state) => ({
      ...state,
      autoflagButtonColor,
    })),
  numFacsForTableWidth: 0,
  setNumFacsForTableWidth: (numFacsForTableWidth) =>
    set((state) => ({
      ...state,
      numFacsForTableWidth,
    })),
  sendDataToOutputButtonColor: "bg-gray-100",
  setSendDataToOutputButtonColor: (sendDataToOutputButtonColor) =>
    set((state) => ({
      ...state,
      sendDataToOutputButtonColor,
    })),
  temp_gridRowDataLoadingsTable: [],
  setTemp_gridRowDataLoadingsTable: (temp_gridRowDataLoadingsTable) =>
    set((state) => ({
      ...state,
      temp_gridRowDataLoadingsTable,
    })),
  showInvertFactorModal: false,
  setShowInvertFactorModal: (showInvertFactorModal) =>
    set((state) => ({
      ...state,
      showInvertFactorModal,
    })),
  isLoadingsTableLoading: false,
  setIsLoadingsTableLoading: (isLoadingsTableLoading) =>
    set((state) => ({
      ...state,
      isLoadingsTableLoading,
    })),
  isLoadingsTableInitialRender: true,
  setIsLoadingsTableInitialRender: (isLoadingsTableInitialRender) =>
    set((state) => ({
      ...state,
      isLoadingsTableInitialRender,
    })),
  temp_gridColDefsLoadingsTable: [],
  setTemp_gridColDefsLoadingsTable: (temp_gridColDefsLoadingsTable) =>
    set((state) => ({
      ...state,
      temp_gridColDefsLoadingsTable,
    })),
  rowClassRulesLoadingsTable: {},
  setRowClassRulesLoadingsTable: (rowClassRulesLoadingsTable) =>
    set((state) => ({
      ...state,
      rowClassRulesLoadingsTable,
    })),
  factorToSplit: 0,
  setFactorToSplit: (factorToSplit) =>
    set((state) => ({
      ...state,
      factorToSplit,
    })),
  bipolarIndexArray: [],
  setBipolarIndexArray: (bipolarIndexArray) =>
    set((state) => ({
      ...state,
      bipolarIndexArray,
    })),
  showSection6: false,
  setShowSection6: (showSection6) =>
    set((state) => ({
      ...state,
      showSection6,
    })),
}));
export default useStore;
