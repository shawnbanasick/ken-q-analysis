import getInstances from "./getInstances";
import prepareDataForFactorViz from "./prepareDataForFactorViz";
import S6DataSlice from "../../State/S6DataSlice";

// helper function
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

// exported function
const createFactorVizDataObjectForProps = (factorVizOptions) => {
  //const displayFactorVisualizations =
  // S6DataSlice.getState().displayFactorVisualizations;

  // early return if no display
  // if (displayFactorVisualizations === false) {
  // return {};
  // }

  // create data object for render mapping
  let customFactorNamesArray;
  // getState
  const userSelectedFactors = S6DataSlice.getState().userSelectedFactors;

  const positionData = getInstances();
  const numberOfFactors = userSelectedFactors.length;
  const data = prepareDataForFactorViz();
  const factorData = [];
  const useCustomNames = factorVizOptions.willAddCustomNames;
  if (useCustomNames) {
    const customFactorNamesArray1 = factorVizOptions.customFactorNames;
    if (customFactorNamesArray1.length !== 0) {
      customFactorNamesArray = customFactorNamesArray1.split(",");
    } else {
      customFactorNamesArray = [];
    }
  }

  // loop thru factors to set up config object
  for (let i = 0; i < numberOfFactors; i += 1) {
    let name;
    const factorName = capitalizeFirstLetter(userSelectedFactors[i]);
    const factorNum2 = factorName.slice(-2);
    const factorNum = factorNum2.trim();
    const id = factorName.replace(/\s+/g, "");

    if (useCustomNames) {
      name = customFactorNamesArray[i];
      if (name === undefined || name === "") {
        name = `${"Composite Q Sort for Factor"} ${factorNum}`;
      }
    } else {
      name = `${"Composite Q Sort for Factor"} ${factorNum}`;
    }
    const tempObj = {};
    tempObj.name = name;
    tempObj.id = id;
    tempObj.data = data[i];
    tempObj.positionData = positionData;
    tempObj.factorVizOptions = factorVizOptions;
    tempObj.shouldUseUnicode = factorVizOptions.shouldUseUnicode;
    tempObj.willDisplayDistingCompareSymbols =
      factorVizOptions.willDisplayDistingCompareSymbols;
    tempObj.willAdjustIndicatorSizeBy =
      factorVizOptions.willAdjustIndicatorSizeBy;
    factorData.push(tempObj);
  }
  return factorData;
};

export default createFactorVizDataObjectForProps;
