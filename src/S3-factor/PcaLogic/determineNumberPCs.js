import S1DataSlice from "../../State/S1DataSlice";

const determineNumberPCs = () => {
  // getState
  const totalNumberSorts1 = S1DataSlice.getState().respondentNames;
  const totalNumberSorts = totalNumberSorts1.length;
  const numStatements = S1DataSlice.getState().numStatements;

  const numFactorsCalcArray = [8, totalNumberSorts, numStatements];

  const numberPCsToExtract = Math.min(...numFactorsCalcArray);

  return numberPCsToExtract;
};

export default determineNumberPCs;
