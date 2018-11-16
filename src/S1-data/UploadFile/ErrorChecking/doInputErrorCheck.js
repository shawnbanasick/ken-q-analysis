import store from "../../../store";
import getErrorMessage from "./getErrorMessage";

// refactor this so it can be unit tested
const doInputErrorCheck = function() {
  // todo - add check for unique names
  let mainDataObject = store.getState("mainDataObject");
  let respondentNames = store.getState("respondentNames");
  let isForcedQsortPattern = store.getState("isForcedQsortPattern");
  let isGoodQsortPattern = true;
  let statements = store.getState("statements");
  let sortsDisplayText = store.getState("sortsDisplayText");

  // check #1
  // check for statements input
  if (statements.length === 1) {
    let isError = true;
    let errorMessage = "No statements loaded";
    return [isError, [errorMessage, "", ""]];
  }

  // check #2
  // check for Q-sorts input
  if (sortsDisplayText[0] === "No Q sorts Loaded") {
    let isError = true;
    let errorMessage = "No Q sorts loaded";
    return [isError, [errorMessage, "", ""]];
  }

  // set the defaults (no error) values
  let qSortsWithProblemsArray = [];
  let nonSymmetricSortsArray = [];
  let isError = false;
  let errorMessage;

  // pull rawSorts from STATE mainDataObject
  let rawSortsArray = [];
  mainDataObject.forEach(function(element, i) {
    let rawSort = element.rawSort;
    // true or false
    let sortHasNoVariance = rawSort.every((val, i, arr) => val === arr[0]);

    if (sortHasNoVariance) {
      isError = true;
      errorMessage = [
        `Q sort #${i + 1} has no variance - Correlations cannot be calculated`,
        "",
        ""
      ];
    }
    rawSortsArray.push(rawSort);
  }, this);

  // get the q sort pattern to check against
  let qSortPattern = store.getState("qSortPattern");
  let qSortPatternValueCheck2 = [...qSortPattern];
  let qSortPatternValueCheck = qSortPatternValueCheck2.sort().join(",");

  // test for out of range values / consistent length
  // needed for error checking of unforced sorts
  let testMax = Math.max(...qSortPattern);
  let testMin = Math.min(...qSortPattern);
  let testLen = qSortPattern.length;

  // check #3
  // check the base Q-sort pattern for length problems
  if (testLen !== statements.length) {
    isError = true;
    let errorMessage =
      "The number of statements does not match the number of sort values listed in the Q-sort pattern";
    return [isError, [errorMessage, "", ""]];
  }

  // loop through data for EITHER forced OR unforced checks
  for (var k = 0, kLen = rawSortsArray.length; k < kLen; k++) {
    // test values for symmetry
    let testArray2 = [...rawSortsArray[k]];
    let testArrayString = testArray2.sort().join(",");

    // check #4
    // symmetry test for FORCED sorts
    if (testArrayString !== qSortPatternValueCheck) {
      nonSymmetricSortsArray.push(respondentNames[k]);
    }

    if (isForcedQsortPattern === true && nonSymmetricSortsArray.length > 0) {
      isError = true;
      qSortsWithProblemsArray = [...nonSymmetricSortsArray];
      errorMessage = getErrorMessage(isForcedQsortPattern, isGoodQsortPattern);
    }

    // check #4
    // error tests for UNFORCED sorts
    if (isForcedQsortPattern === false) {
      let thisMax = Math.max(...rawSortsArray[k]);
      let thisMin = Math.min(...rawSortsArray[k]);
      let thisLength = rawSortsArray[k].length;

      if (thisMax > testMax || thisMin < testMin || thisLength !== testLen) {
        isError = true;
        qSortsWithProblemsArray.push(respondentNames[k]);
        errorMessage = getErrorMessage(
          isForcedQsortPattern,
          isGoodQsortPattern
        );
      }
    }
  } // end testing loop

  // textify array values to show in modal
  let qSortsWithProblemsArrayText = qSortsWithProblemsArray.join(", ");
  let nonSymmetricSortsArrayText = nonSymmetricSortsArray.join(", ");

  // check if Excel Type #1 has errors
  let excelType1ErrorCheck = store.getState("excelType1NonsymmetricArrayText");

  if (excelType1ErrorCheck !== "") {
    isError = true;
    let message1 =
      "There are Q sorts with incorrect or duplicate statement numbers";
    let message2 = "Check your data, reload the page, and try again";
    let message3 = "Q sorts with errors:";
    errorMessage = [message1, message2, message3];
    qSortsWithProblemsArray = [excelType1ErrorCheck];
    qSortsWithProblemsArrayText = excelType1ErrorCheck;
  }

  // display unforced warning modal if unforced q-sorts present
  if (isForcedQsortPattern === false && nonSymmetricSortsArray.length > 0) {
    store.setState({
      showUnforcedWarningModal: true,
      unforcedQsorts: nonSymmetricSortsArrayText
    });
  }

  let returnValues = [
    isError,
    errorMessage,
    qSortsWithProblemsArray,
    qSortsWithProblemsArrayText,
    respondentNames,
    rawSortsArray
  ];

  return returnValues;
};

export default doInputErrorCheck;
