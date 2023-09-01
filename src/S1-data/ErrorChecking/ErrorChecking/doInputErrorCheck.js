import S1DataSlice from "../../../State/S1DataSlice";

const doInputErrorCheck = function () {
  const mainDataObject = S1DataSlice.getState().mainDataObject;
  const respondentNames = S1DataSlice.getState().respondentNames;
  const statements = S1DataSlice.getState().statements;
  const numQsorts = S1DataSlice.getState().numQsorts;
  const qSortPattern = S1DataSlice.getState().qSortPattern;

  // get the q sort patterns and values to check against
  let errorMessageObj = {};
  let hasError = false;
  // let nonSymmetricSortsArray = [];
  // let qSortPatternValueCheck2 = [...qSortPattern];
  // let qSortPatternValueCheck = qSortPatternValueCheck2.sort().join(",");
  let testMax = Math.max(...qSortPattern);
  let testMin = Math.min(...qSortPattern);
  let testLen = qSortPattern.length;

  // *** check #1 - have statements loaded?
  if (statements.length <= 2) {
    hasError = true;
    errorMessageObj = {
      showModal: true,
      titleText: "Data Error",
      bodyText: "No statements loaded.",
      bodyText2: "Check your input file for statements.",
    };
    return [hasError, errorMessageObj];
  }

  // *** check #2 have Q-sorts loaded?
  if (numQsorts === 0) {
    hasError = true;
    errorMessageObj = {
      showModal: true,
      titleText: "Data Error",
      bodyText: "No Q sorts loaded.",
      bodyText2: "Check your input file for Q sorts.",
    };
    return [hasError, errorMessageObj];
  }

  // *** check #3 any weird Q sorts? (all Q sort values the same)
  let rawSortsArray = [];
  let problemSorts = [];
  mainDataObject.forEach((element, i) => {
    let rawSort = [...element.rawSort];
    // returns true or false
    let sortHasNoVariance = rawSort.every((val, i, arr) => val === arr[0]);
    if (sortHasNoVariance) {
      problemSorts.push(i + 1);
    }
    rawSortsArray.push(rawSort);
  });

  if (problemSorts.length > 0) {
    let problemSortsString = problemSorts.join(", ");
    hasError = true;
    errorMessageObj = {
      showModal: true,
      titleText: "Data Error",
      bodyText: `Q sorts #${problemSortsString} have no variance - Correlations cannot be calculated`,
      bodyText2: "Check your Q sorts input file.",
    };
    return [hasError, errorMessageObj];
  }

  // *** check #4 - do the Q sorts length match the Q sort pattern length?
  if (testLen !== statements.length) {
    hasError = true;
    errorMessageObj = {
      showModal: true,
      titleText: "Data Error",
      bodyText: `The number of Q sort values in the Q sort pattern does not match the number of statements in your project`,
      bodyText2: "Check your Q sorts input file.",
    };
    return [hasError, errorMessageObj];
  }

  // *** check #5 - are there Q sorts with values outside Q sort pattern range?
  let overRangeSortsArray = [];
  let underRangeSortsArray = [];
  let missingSortValuesArray = [];
  rawSortsArray.forEach((element, i) => {
    let thisMax = Math.max(...element);
    let thisMin = Math.min(...element);
    let thisLength = element.length;

    if (thisMax > testMax) {
      overRangeSortsArray.push(respondentNames[i]);
    }

    if (thisMin < testMin) {
      underRangeSortsArray.push(respondentNames[i]);
    }

    if (thisLength !== testLen) {
      missingSortValuesArray.push(respondentNames[i]);
    }
  });

  if (overRangeSortsArray.length > 0) {
    hasError = true;
    errorMessageObj = {
      showModal: true,
      titleText: "Data Error",
      bodyText: `There are Q sorts with values higher the Q sort pattern range - [${overRangeSortsArray.join(
        ", "
      )}]`,
      bodyText2: "Check your Q sorts input file.",
    };
    return [hasError, errorMessageObj];
  }

  if (underRangeSortsArray.length > 0) {
    hasError = true;
    errorMessageObj = {
      showModal: true,
      titleText: "Data Error",
      bodyText: `There are Q sorts with values lower the Q sort pattern range - [${underRangeSortsArray.join(
        ", "
      )}]`,
      bodyText2: "Check your Q sorts input file.",
    };
    return [hasError, errorMessageObj];
  }

  if (missingSortValuesArray.length > 0) {
    hasError = true;
    errorMessageObj = {
      showModal: true,
      titleText: "Data Error",
      bodyText: `There are Q sorts with missing values - [${missingSortValuesArray.join(
        ", "
      )}]`,
      bodyText2: "Check your Q sorts input file.",
    };
    return [hasError, errorMessageObj];
  }

  return [hasError, errorMessageObj];
};

export default doInputErrorCheck;
