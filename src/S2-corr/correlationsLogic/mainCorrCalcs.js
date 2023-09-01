import calculateCorrelations from "./calcCorrelations";
import S1DataSlice from "../../State/S1DataSlice";
import S2DataSlice from "../../State/S2DataSlice";

const mainCorrCalcs = (respondentNames, rawSortsArray) => {
  if (respondentNames.length > 0) {
    // do data error checks
    /*
    MOVED TO S1-data/ErrorChecking/ErrorChecking/doInputErrorCheck.js
    */

    // do the calcuations
    calculateCorrelations(rawSortsArray, respondentNames);

    S2DataSlice.setState({
      showCorrelationMatrix: true,
      activeStartAnalysisButton: true,
      isLoadingBeginAnalysis: false,
    });
    S1DataSlice.setState({ isDataAlreadyLoaded: true });
  }
};

export default mainCorrCalcs;
