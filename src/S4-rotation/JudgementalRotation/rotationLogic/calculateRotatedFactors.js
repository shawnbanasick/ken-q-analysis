import data from "../plot/data";
import doD3ChartDataPrep from "./doD3ChartDataPrep";
import clockwiseRotation from "./clockwiseRotation";
import counterClockwiseRotation from "./counterClockwiseRotation";
import rotationTablePrep from "../rotationTable/rotationTablePrep";
import calculateCommunalities from "../../varimaxLogic/2calculateCommunalities";
import calculatefSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import cloneDeep from "lodash/cloneDeep";
import S4DataSlice from "../../../State/S4DataSlice";

const calculateRotatedFactors = (direction, rotateByDegrees, baselineData) => {
  let {
    abFactors,
    tempRotFacStateArray,
    setD3RotChartData,
    setCalculateRotationsArray,
    setTempRotFacStateArray,
  } = S4DataSlice.getState();

  // getState
  abFactors = cloneDeep(abFactors);
  const rotationFactorA = Math.min(...abFactors) - 1;
  const rotationFactorB = Math.max(...abFactors) - 1;
  let tempRotFacStateArray1 = cloneDeep(tempRotFacStateArray);

  // select the factors to rotate
  const calculateRotationsArray = [];
  for (let i = 0; i < tempRotFacStateArray1.length; i += 1) {
    const tempA = tempRotFacStateArray1[i][rotationFactorA];
    const tempB = tempRotFacStateArray1[i][rotationFactorB];
    calculateRotationsArray.push([tempA, tempB]);
  }

  const looplen = calculateRotationsArray.length;
  let rotatedFactors;

  if (direction === "clockwise") {
    rotatedFactors = clockwiseRotation(
      calculateRotationsArray,
      rotateByDegrees
    );
  }

  if (direction === "counterClockwise") {
    rotatedFactors = counterClockwiseRotation(
      calculateRotationsArray,
      rotateByDegrees
    );
  }

  // insert rotated factors into temp rotational state array
  for (let i = 0; i < looplen; i += 1) {
    tempRotFacStateArray1[i][rotationFactorA] = rotatedFactors[i][0];
    tempRotFacStateArray1[i][rotationFactorB] = rotatedFactors[i][1];
  }

  // re-calc sig levels with rotated factors now included
  // expects bare full array - required to calc significance level for circles
  const arrayWithCommunalities = calculateCommunalities(tempRotFacStateArray1);

  // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
  calculatefSigCriterionValues("flag");

  // returns dataValuesArray for D3 chart
  const d3Prep = doD3ChartDataPrep(arrayWithCommunalities);
  setD3RotChartData(d3Prep);

  rotationTablePrep(d3Prep, cloneDeep(baselineData));

  setCalculateRotationsArray(rotatedFactors);
  setTempRotFacStateArray(tempRotFacStateArray1);

  // call to update D3 plot data
  data();
};

export default calculateRotatedFactors;
