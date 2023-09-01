import { create } from "zustand";

interface DataState {
  firstColMaxWidth: number;
  setFirstColMaxWidth: (firstColMaxWidth: number) => void;
  colMaxWidth: number;
  setColMaxWidth: (colMaxWidth: number) => void;
  gridColDefs: any;
  setGridColDefs: (gridColDefs: any) => void;
  gridRowData: any;
  setGridRowData: (gridRowData: any) => void;
  correlationTableArray: any;
  setCorrelationTableArray: (correlationTableArray: any) => void;
  correlation5Calcs: any;
  setCorrelation5Calcs: (correlation5Calcs: any) => void;
  showCorrelationMatrix: boolean;
  setShowCorrelationMatrix: (showCorrelationMatrix: boolean) => void;
  activeStartAnalysisButton: boolean;
  setActiveStartAnalysisButton: (activeStartAnalysisButton: boolean) => void;
  isLoadingBeginAnalysis: boolean;
  setIsLoadingBeginAnalysis: (isLoadingBeginAnalysis: boolean) => void;
  showUnforcedWarningModal: boolean;
  setShowUnforcedWarningModal: (showUnforcedWarningModal: boolean) => void;
  unforcedQsorts: any;
  setUnforcedQsorts: (unforcedQsorts: any) => void;
  showSection2: boolean;
  setShowSection2: (showSection2: boolean) => void;
}

const useStore = create<DataState>()((set) => ({
  gridColDefs: {},
  setGridColDefs: (gridColDefs) =>
    set((state) => ({
      ...state,
      gridColDefs,
    })),
  gridRowData: {},
  setGridRowData: (gridRowData) =>
    set((state) => ({
      ...state,
      gridRowData,
    })),
  correlationTableArray: [],
  setCorrelationTableArray: (correlationTableArray) =>
    set((state) => ({
      ...state,
      correlationTableArray,
    })),
  correlation5Calcs: {},
  setCorrelation5Calcs: (correlation5Calcs) =>
    set((state) => ({
      ...state,
      correlation5Calcs,
    })),
  showCorrelationMatrix: false,
  setShowCorrelationMatrix: (showCorrelationMatrix) =>
    set((state) => ({
      ...state,
      showCorrelationMatrix,
    })),
  activeStartAnalysisButton: false,
  setActiveStartAnalysisButton: (activeStartAnalysisButton) =>
    set((state) => ({
      ...state,
      activeStartAnalysisButton,
    })),
  isLoadingBeginAnalysis: true,
  setIsLoadingBeginAnalysis: (isLoadingBeginAnalysis) =>
    set((state) => ({
      ...state,
      isLoadingBeginAnalysis,
    })),
  showUnforcedWarningModal: false,
  setShowUnforcedWarningModal: (showUnforcedWarningModal) =>
    set((state) => ({
      ...state,
      showUnforcedWarningModal,
    })),
  unforcedQsorts: [],
  setUnforcedQsorts: (unforcedQsorts) =>
    set((state) => ({
      ...state,
      unforcedQsorts,
    })),
  firstColMaxWidth: 90,
  setFirstColMaxWidth: (firstColMaxWidth) =>
    set((state) => ({
      ...state,
      firstColMaxWidth,
    })),
  colMaxWidth: 90,
  setColMaxWidth: (colMaxWidth) =>
    set((state) => ({
      ...state,
      colMaxWidth,
    })),
  showSection2: false,
  setShowSection2: (showSection2) =>
    set((state) => ({
      ...state,
      showSection2,
    })),
}));

export default useStore;
