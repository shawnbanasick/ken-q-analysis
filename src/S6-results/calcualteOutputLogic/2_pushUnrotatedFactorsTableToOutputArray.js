import S3DataSlice from "../../State/S3DataSlice";
import cloneDeep from "lodash/cloneDeep";
import evenRound from "../../Utils/evenRound";

const pushUnrotatedFactorsTableToOutputArray = function (
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  // getState
  const unrotFactorMatrix = cloneDeep(
    S3DataSlice.getState().unrotatedFactorMatrixOutput
  );

  const eigenvals = cloneDeep(S3DataSlice.getState().eigenvalues); // "eigenValuesSorted");
  const expVar = cloneDeep(S3DataSlice.getState().eigensPercentExpVar);

  sheetNamesXlsx.push("Unrotated Factor Matrix");

  // set excel column widths
  const columns = [
    {
      wch: 8,
    },
    {
      wch: 20,
    },
  ];
  const iiiLen = unrotFactorMatrix[0].length - 2;
  for (let iii = 0; iii < iiiLen; iii++) {
    columns.push({
      wch: 8,
    });
  }
  colSizes.push(columns);

  const shortEigens = eigenvals.map((eigenval, index) => {
    if (isNaN(eigenval) === false) {
      return evenRound(eigenval, 4);
    } else {
      return eigenval;
    }
  });

  shortEigens.unshift("");

  expVar.unshift("");

  unrotFactorMatrix.push(["", ""], shortEigens, expVar);
  unrotFactorMatrix.unshift(
    ["unrotated", ""],
    ["", ""],
    ["Unrotated Factor Matrix"],
    ["", ""]
  );

  outputData.push(unrotFactorMatrix);

  console.log("dispatch - 5 - pushUnrotatedFactorsTable complete");
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushUnrotatedFactorsTableToOutputArray;
