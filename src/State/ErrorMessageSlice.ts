import { create } from "zustand";

interface ErrorMessageState {
  excelErrorMessage1: string;
  setExcelErrorMessage1: (excelErrorMessage1: string) => void;
  showExcelErrorModal: boolean;
  setShowExcelErrorModal: (showExcelErrorModal: boolean) => void;
  csvErrorMessage: string;
  setCsvErrorMessage: (csvErrorMessage: string) => void;
  showCsvErrorModal: boolean;
  setShowCsvErrorModal: (showCsvErrorModal: boolean) => void;
}

const ErrorMessageSlice = create<ErrorMessageState>((set) => ({
  excelErrorMessage1: "",
  setExcelErrorMessage1: (excelErrorMessage1) =>
    set((state) => ({
      ...state,
      excelErrorMessage1,
    })),
  showExcelErrorModal: false,
  setShowExcelErrorModal: (showExcelErrorModal) =>
    set((state) => ({
      ...state,
      showExcelErrorModal,
    })),
  csvErrorMessage: "",
  setCsvErrorMessage: (csvErrorMessage) =>
    set((state) => ({
      ...state,
      csvErrorMessage,
    })),
  showCsvErrorModal: false,
  setShowCsvErrorModal: (showCsvErrorModal) =>
    set((state) => ({
      ...state,
      showCsvErrorModal,
    })),
}));

export default ErrorMessageSlice;
