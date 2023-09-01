import { create } from "zustand";

// ROTATION SCREEN

interface DataState {
  shouldClearRotButHigh: boolean;
  setShouldClearRotButHigh: (shouldClearRotButHigh: boolean) => void;
  numFactorsKeptForRot: number;
  setNumFactorsKeptForRot: (numFactorsKeptForRot: number) => void;
  isLoadingsFactorsKept: boolean;
  setIsLoadingsFactorsKept: (isLoadingsFactorsKept: boolean) => void;
  isFacSelectDisabled: boolean;
  setIsFacSelectDisabled: (isFacSelectDisabled: boolean) => void;
  shouldDisplayFacKept: boolean;
  setShouldDisplayFacKept: (shouldDisplayFacKept: boolean) => void;
  shouldShowJudgeRotDiv: boolean;
  setShouldShowJudgeRotDiv: (shouldShowJudgeRotDiv: boolean) => void;
  judgeButtonActive: boolean;
  setJudgeButtonActive: (judgeButtonActive: boolean) => void;
  showScatterPlotTableDiv: boolean;
  setShowScatterPlotTableDiv: (showScatterPlotTableDiv: boolean) => void;
  abFactors: any[];
  setAbFactors: (abFactors: any[]) => void;
  userSelectedRotFactors: number[];
  setUserSelectedRotFactors: (userSelectedRotFactors: number[]) => void;
  varimaxButtonDisabled: boolean;
  setVarimaxButtonDisabled: (varimaxButtonDisabled: boolean) => void;
  varimaxButtonText: string;
  setVarimaxButtonText: (varimaxButtonText: string) => void;
  varimaxButtonActive: boolean;
  setVarimaxButtonActive: (varimaxButtonActive: boolean) => void;
  rotationDegrees: number;
  setRotationDegrees: (rotationDegrees: number) => void;
  isCalculatingVarimax: boolean;
  setIsCalculatingVarimax: (isCalculatingVarimax: boolean) => void;
  d3RotChartData: any[];
  setD3RotChartData: (d3RotChartData: any[]) => void;
  tempRotFacStateArray: any[];
  setTempRotFacStateArray: (tempRotFacStateArray: any[]) => void;
  highlightDegreeButton1: boolean;
  setHighlightDegreeButton1: (highlightDegreeButton1: boolean) => void;
  highlightDegreeButton2: boolean;
  setHighlightDegreeButton2: (highlightDegreeButton2: boolean) => void;
  highlightDegreeButton3: boolean;
  setHighlightDegreeButton3: (highlightDegreeButton3: boolean) => void;
  highlightDegreeButton4: boolean;
  setHighlightDegreeButton4: (highlightDegreeButton4: boolean) => void;
  highlightDegreeButton5: boolean;
  setHighlightDegreeButton5: (highlightDegreeButton5: boolean) => void;
  rotateByDegrees: number;
  setRotateByDegrees: (degrees: number) => void;
  participantDataObject: {};
  setParticipantDataObject: (participantDataObject: {}) => void;
  calculateRotationsArray: any[];
  setCalculateRotationsArray: (calculateRotationsArray: any[]) => void;
  rotColDefsFactorTable: any[];
  setRotColDefsFactorTable: (rotColDefsFactorTable: any[]) => void;
  rotRowDataFactorTable: any[];
  setRotRowDataFactorTable: (rotRowDataFactorTable: any[]) => void;
  showRotFactorSelectWarning: boolean;
  setShowRotFactorSelectWarning: (showRotFactorSelectWarning: boolean) => void;
  shouldDisplayDegreeButtonButtons: boolean;
  setShouldDisplayDegreeButtonButtons: (
    shouldDisplayDegreeButtonButtons: boolean
  ) => void;
  highlightDegreeInputButton: boolean;
  setHighlightDegreeInputButton: (highlightDegreeInputButton: boolean) => void;
  rotationDegreeInput: number;
  setRotationDegreeInput: (rotationDegreeInput: number) => void;
  notifyForSavedRotations: boolean;
  setNotifyForSavedRotations: (notifyForSavedRotations: boolean) => void;
  shouldDisplayRotFactorButtons: boolean;
  setShouldDisplayRotFactorButtons: (
    shouldDisplayRotFactorButtons: boolean
  ) => void;
}

const useStore = create<DataState>()((set) => ({
  numFactorsKeptForRot: 0,
  setNumFactorsKeptForRot: (numFactorsKeptForRot) =>
    set((state) => ({
      ...state,
      numFactorsKeptForRot,
    })),
  isLoadingsFactorsKept: false,
  setIsLoadingsFactorsKept: (isLoadingsFactorsKept) =>
    set((state) => ({
      ...state,
      isLoadingsFactorsKept,
    })),
  isFacSelectDisabled: false,
  setIsFacSelectDisabled: (isFacSelectDisabled) =>
    set((state) => ({
      ...state,
      isFacSelectDisabled,
    })),
  shouldDisplayFacKept: false,
  setShouldDisplayFacKept: (shouldDisplayFacKept) =>
    set((state) => ({
      ...state,
      shouldDisplayFacKept,
    })),
  shouldShowJudgeRotDiv: false,
  setShouldShowJudgeRotDiv: (shouldShowJudgeRotDiv) =>
    set((state) => ({
      ...state,
      shouldShowJudgeRotDiv,
    })),
  judgeButtonActive: false,
  setJudgeButtonActive: (judgeButtonActive) =>
    set((state) => ({
      ...state,
      judgeButtonActive,
    })),
  showScatterPlotTableDiv: false,
  setShowScatterPlotTableDiv: (showScatterPlotTableDiv) =>
    set((state) => ({
      ...state,
      showScatterPlotTableDiv,
    })),
  abFactors: [],
  setAbFactors: (abFactors) =>
    set((state) => ({
      ...state,
      abFactors,
    })),
  userSelectedRotFactors: [],
  setUserSelectedRotFactors: (userSelectedRotFactors) =>
    set((state) => ({
      ...state,
      userSelectedRotFactors,
    })),
  varimaxButtonDisabled: false,
  setVarimaxButtonDisabled: (varimaxButtonDisabled) =>
    set((state) => ({
      ...state,
      varimaxButtonDisabled,
    })),
  varimaxButtonText: "Varimax Rotation",
  setVarimaxButtonText: (varimaxButtonText) =>
    set((state) => ({
      ...state,
      varimaxButtonText,
    })),
  varimaxButtonActive: false,
  setVarimaxButtonActive: (varimaxButtonActive) =>
    set((state) => ({
      ...state,
      varimaxButtonActive,
    })),
  rotationDegrees: 0,
  setRotationDegrees: (rotationDegrees) =>
    set((state) => ({
      ...state,
      rotationDegrees,
    })),
  isCalculatingVarimax: false,
  setIsCalculatingVarimax: (isCalculatingVarimax) =>
    set((state) => ({
      ...state,
      isCalculatingVarimax,
    })),
  d3RotChartData: [],
  setD3RotChartData: (d3RotChartData) =>
    set((state) => ({
      ...state,
      d3RotChartData,
    })),
  tempRotFacStateArray: [],
  setTempRotFacStateArray: (tempRotFacStateArray) =>
    set((state) => ({
      ...state,
      tempRotFacStateArray,
    })),
  highlightDegreeButton1: false,
  setHighlightDegreeButton1: (highlightDegreeButton1) =>
    set((state) => ({
      ...state,
      highlightDegreeButton1,
    })),
  highlightDegreeButton2: false,
  setHighlightDegreeButton2: (highlightDegreeButton2) =>
    set((state) => ({
      ...state,
      highlightDegreeButton2,
    })),
  highlightDegreeButton3: false,
  setHighlightDegreeButton3: (highlightDegreeButton3) =>
    set((state) => ({
      ...state,
      highlightDegreeButton3,
    })),
  highlightDegreeButton4: false,
  setHighlightDegreeButton4: (highlightDegreeButton4) =>
    set((state) => ({
      ...state,
      highlightDegreeButton4,
    })),
  highlightDegreeButton5: false,
  setHighlightDegreeButton5: (highlightDegreeButton5) =>
    set((state) => ({
      ...state,
      highlightDegreeButton5,
    })),
  rotateByDegrees: 0,
  setRotateByDegrees: (rotateByDegrees) =>
    set((state) => ({
      ...state,
      rotateByDegrees,
    })),
  participantDataObject: { respondent: "doNotDisplay" },
  setParticipantDataObject: (participantDataObject) =>
    set((state) => ({
      ...state,
      participantDataObject,
    })),
  calculateRotationsArray: [],
  setCalculateRotationsArray: (calculateRotationsArray) =>
    set((state) => ({
      ...state,
      calculateRotationsArray,
    })),

  rotColDefsFactorTable: [],
  setRotColDefsFactorTable: (rotColDefsFactorTable) =>
    set((state) => ({
      ...state,
      rotColDefsFactorTable,
    })),
  rotRowDataFactorTable: [],
  setRotRowDataFactorTable: (rotRowDataFactorTable) =>
    set((state) => ({
      ...state,
      rotRowDataFactorTable,
    })),
  showRotFactorSelectWarning: false,
  setShowRotFactorSelectWarning: (showRotFactorSelectWarning) =>
    set((state) => ({
      ...state,
      showRotFactorSelectWarning,
    })),
  shouldDisplayDegreeButtonButtons: false,
  setShouldDisplayDegreeButtonButtons: (shouldDisplayDegreeButtonButtons) =>
    set((state) => ({
      ...state,
      shouldDisplayDegreeButtonButtons,
    })),
  highlightDegreeInputButton: false,
  setHighlightDegreeInputButton: (highlightDegreeInputButton) =>
    set((state) => ({
      ...state,
      highlightDegreeInputButton,
    })),
  rotationDegreeInput: 0,
  setRotationDegreeInput: (rotationDegreeInput) =>
    set((state) => ({
      ...state,
      rotationDegreeInput,
    })),
  notifyForSavedRotations: false,
  setNotifyForSavedRotations: (notifyForSavedRotations) =>
    set((state) => ({
      ...state,
      notifyForSavedRotations,
    })),
  shouldDisplayRotFactorButtons: false,
  setShouldDisplayRotFactorButtons: (shouldDisplayRotFactorButtons) =>
    set((state) => ({
      ...state,
      shouldDisplayRotFactorButtons,
    })),
  shouldClearRotButHigh: false,
  setShouldClearRotButHigh: (shouldClearRotButHigh) =>
    set((state) => ({
      ...state,
      shouldClearRotButHigh,
    })),
}));
export default useStore;
