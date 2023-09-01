import S3DataSlice from "../../State/S3DataSlice";
import transposeMatrix from "../../Utils/transposeMatrix";
import calculateCommunalities from "../../S4-rotation/varimaxLogic/2calculateCommunalities";
import cloneDeep from "lodash/cloneDeep";
import calculateSigCriterionValues from "../../S4-rotation/varimaxLogic/2calculateSigCriterionValues";

const doNewAutoflagging = (rowNodeData) => {
  // const fSigCriterionArray = cloneDeep(S4DataSlice.getState().fSigCriterion);

  const factorMatrix1 = cloneDeep(S3DataSlice.getState().factorMatrix);
  const transposedMatrix = transposeMatrix(factorMatrix1);
  calculateCommunalities(transposedMatrix);

  // get boolean array of flags
  let sigVals = calculateSigCriterionValues("flag");

  // assign the flags
  rowNodeData.forEach((obj) => {
    let resNum = obj.resNum;
    let index = resNum - 1;
    let critRowArray = sigVals[index];
    critRowArray.forEach((crit, i) => {
      obj[`check${i + 1}`] = crit;
    });
  });
  return rowNodeData;
};

export default doNewAutoflagging;
