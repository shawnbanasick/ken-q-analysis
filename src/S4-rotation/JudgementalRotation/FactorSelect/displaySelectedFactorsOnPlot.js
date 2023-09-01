import data from "../plot/data";
import doD3ChartDataPrep from "../rotationLogic/doD3ChartDataPrep";
import calculateCommunalities from "../../varimaxLogic/2calculateCommunalities";
import calculatefSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import S4DataSlice from "../../../State/S4DataSlice";
import cloneDeep from "lodash/cloneDeep";

const displaySelectedFactorsOnPlot = () => {
  const tempRotFacStateArray = cloneDeep(
    S4DataSlice.getState().tempRotFacStateArray
  );

  // expects bare full array - required to calc significance level for circles
  const arrayWithCommunalities = calculateCommunalities(tempRotFacStateArray);

  // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
  calculatefSigCriterionValues("flag");

  // returns dataValuesArray for D3 chart
  const d3Prep = doD3ChartDataPrep(arrayWithCommunalities);
  S4DataSlice.setState({ d3RotChartData: d3Prep });

  // call to update D3 plot data
  data();
};

export default displaySelectedFactorsOnPlot;
