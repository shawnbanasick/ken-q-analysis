import { create } from "zustand";

// FACTOR EXTRACTION
interface DataState {
  showSections45: boolean;
  setShowSections45: (showSections45: boolean) => void;
  numCentroidFactors: number;
  setNumCentroidFactors: (numCentroidFactors: number) => void;
  activeCentroidFactorsButton: boolean;
  setActiveCentroidFactorsButton: (
    activeCentroidFactorsButton: boolean
  ) => void;
  factorMatrix: any[];
  setFactorMatrix: (factorMatrix: any[]) => void;
  eigenvalues: any[];
  setEigenvalues: (eigenvalues: any[]) => void;
  unrotatedFactorMatrix: any[];
  setUnrotatedFactorMatrix: (unrotatedFactorMatrix: any[]) => void;
  eigensPercentExpVar: any[];
  setEigensPercentExpVar: (eigensPercentExpVar: any[]) => void;
  cumulEigenPerVar: any[];
  setCumulEigenPerVar: (cumulEigenPerVar: any[]) => void;
  screePlotData: any[];
  setScreePlotData: (screePlotData: any[]) => void;
  isCentroidLoading: boolean;
  setIsCentroidLoading: (isCentroidLoading: boolean) => void;
  gridColDefsFacTableEigen: any[];
  setGridColDefsFacTableEigen: (gridColDefsFacTableEigen: any[]) => void;
  gridRowDataFacTableEigen: any[];
  setGridRowDataFacTableEigen: (gridRowDataFacTableEigen: any[]) => void;
  calculateCommunalityArray: any[];
  setCalculateCommunalityArray: (calculateCommunalityArray: any[]) => void;
  rowH2: any[];
  setRowH2: (rowH2: any[]) => void;

  gridColDefsFactorTable: any[];
  setGridColDefsFactorTable: (gridColDefsFactorTable: any[]) => void;
  gridRowDataFactorTable: any[];
  setGridRowDataFactorTable: (gridRowDataFactorTable: any[]) => void;
  unrotatedFactorMatrixOutput: any[];
  setUnrotatedFactorMatrixOutput: (unrotatedFactorMatrixOutput: any[]) => void;
  explainedVariance: any[];
  setExplainedVariance: (explainVariance: any[]) => void;
  showUnrotatedFactorTable: boolean;
  setShowUnrotatedFactorTable: (showUnrotatedFactorTable: boolean) => void;
  showEigenvaluesTable: boolean;
  setShowEigenvaluesTable: (showEigenvaluesTable: boolean) => void;
  showScreePlot: boolean;
  setShowScreePlot: (showScreePlot: boolean) => void;
  disabledPcaButton: boolean;
  setDisabledPcaButton: (disabledPcaButton: boolean) => void;
  disabledCentroidButton: boolean;
  setDisabledCentroidButton: (disabledCentroidButton: boolean) => void;
  showKeepFacForRotButton: boolean;
  setShowKeepFacForRotButton: (showKeepFacForRotButton: boolean) => void;
  activePcaButton: boolean;
  setActivePcaButton: (activePcaButton: boolean) => void;
  calculatingPca: boolean;
  setCalculatingPca: (calculatingPca: boolean) => void;
  pcaButtonText: string;
  setPcaButtonText: (pcaButtonText: string) => void;
  centroidButtonText: string;
  setCentroidButtonText: (centroidButtonText: string) => void;
  numberofPrincipalComps: number;
  setNumberofPrincipalComps: (numberofPrincipalComps: number) => void;
  numFacsExtracted: number;
  setNumFacsExtracted: (numFacsExtracted: number) => void;
}

const useStore = create<DataState>()((set) => ({
  factorMatrix: [],
  setFactorMatrix: (factorMatrix) =>
    set((state) => ({
      ...state,
      factorMatrix,
    })),
  eigenvalues: [],
  setEigenvalues: (eigenvalues) =>
    set((state) => ({
      ...state,
      eigenvalues,
    })),
  unrotatedFactorMatrix: [],
  setUnrotatedFactorMatrix: (unrotatedFactorMatrix) =>
    set((state) => ({
      ...state,
      unrotatedFactorMatrix,
    })),
  eigensPercentExpVar: [],
  setEigensPercentExpVar: (eigensPercentExpVar) =>
    set((state) => ({
      ...state,
      eigensPercentExpVar,
    })),
  cumulEigenPerVar: [],
  setCumulEigenPerVar: (cumulEigenPerVar) =>
    set((state) => ({
      ...state,
      cumulEigenPerVar,
    })),
  screePlotData: [],
  setScreePlotData: (screePlotData) =>
    set((state) => ({
      ...state,
      screePlotData,
    })),
  isCentroidLoading: false,
  setIsCentroidLoading: (isCentroidLoading) =>
    set((state) => ({
      ...state,
      isCentroidLoading,
    })),
  activeCentroidFactorsButton: false,
  setActiveCentroidFactorsButton: (activeCentroidFactorsButton) =>
    set((state) => ({
      ...state,
      activeCentroidFactorsButton,
    })),
  numCentroidFactors: 0,
  setNumCentroidFactors: (numCentroidFactors) =>
    set((state) => ({
      ...state,
      numCentroidFactors,
    })),
  gridColDefsFacTableEigen: [],
  setGridColDefsFacTableEigen: (gridColDefsFacTableEigen) =>
    set((state) => ({
      ...state,
      gridColDefsFacTableEigen,
    })),
  gridRowDataFacTableEigen: [],
  setGridRowDataFacTableEigen: (gridRowDataFacTableEigen) =>
    set((state) => ({
      ...state,
      gridRowDataFacTableEigen,
    })),
  calculateCommunalityArray: [],
  setCalculateCommunalityArray: (calculateCommunalityArray) =>
    set((state) => ({
      ...state,
      calculateCommunalityArray,
    })),
  rowH2: [],
  setRowH2: (rowH2) =>
    set((state) => ({
      ...state,
      rowH2,
    })),
  gridColDefsFactorTable: [],
  setGridColDefsFactorTable: (gridColDefsFactorTable) =>
    set((state) => ({
      ...state,
      gridColDefsFactorTable,
    })),
  gridRowDataFactorTable: [],
  setGridRowDataFactorTable: (gridRowDataFactorTable) =>
    set((state) => ({
      ...state,
      gridRowDataFactorTable,
    })),
  unrotatedFactorMatrixOutput: [],
  setUnrotatedFactorMatrixOutput: (unrotatedFactorMatrixOutput) =>
    set((state) => ({
      ...state,
      unrotatedFactorMatrixOutput,
    })),
  explainedVariance: [],
  setExplainedVariance: (explainedVariance) =>
    set((state) => ({
      ...state,
      explainedVariance,
    })),
  showUnrotatedFactorTable: false,
  setShowUnrotatedFactorTable: (showUnrotatedFactorTable) =>
    set((state) => ({
      ...state,
      showUnrotatedFactorTable,
    })),

  showEigenvaluesTable: false,
  setShowEigenvaluesTable: (showEigenvaluesTable) =>
    set((state) => ({
      ...state,
      showEigenvaluesTable,
    })),
  showScreePlot: false,
  setShowScreePlot: (showScreePlot) =>
    set((state) => ({
      ...state,
      showScreePlot,
    })),
  disabledPcaButton: false,
  setDisabledPcaButton: (disabledPcaButton) =>
    set((state) => ({
      ...state,
      disabledPcaButton,
    })),
  disabledCentroidButton: false,
  setDisabledCentroidButton: (disabledCentroidButton) =>
    set((state) => ({
      ...state,
      disabledCentroidButton,
    })),
  showKeepFacForRotButton: false,
  setShowKeepFacForRotButton: (showKeepFacForRotButton) =>
    set((state) => ({
      ...state,
      showKeepFacForRotButton,
    })),
  activePcaButton: false,
  setActivePcaButton: (activePcaButton) =>
    set((state) => ({
      ...state,
      activePcaButton,
    })),
  calculatingPca: false,
  setCalculatingPca: (calculatingPca) =>
    set((state) => ({
      ...state,
      calculatingPca,
    })),
  pcaButtonText: "Extract Principal Components",
  setPcaButtonText: (pcaButtonText) =>
    set((state) => ({
      ...state,
      pcaButtonText,
    })),
  numberofPrincipalComps: 8,
  setNumberofPrincipalComps: (numberofPrincipalComps) =>
    set((state) => ({
      ...state,
      numberofPrincipalComps,
    })),
  numFacsExtracted: 0,
  setNumFacsExtracted: (numFacsExtracted) =>
    set((state) => ({
      ...state,
      numFacsExtracted,
    })),
  centroidButtonText: "Calculate Centroid Factors",
  setCentroidButtonText: (centroidButtonText) =>
    set((state) => ({
      ...state,
      centroidButtonText,
    })),
  showSections45: false,
  setShowSections45: (showSections45) =>
    set((state) => ({
      ...state,
      showSections45,
    })),
}));
export default useStore;
