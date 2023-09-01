import S1DataSlice from "../../State/S1DataSlice";
import uniq from "lodash/uniq";

const sortErrorCheckT2 = (
  newQsortPattern,
  symmetryCheckArray,
  respondentNames
) => {
  // check for out of range values in Q sorts
  let maxVal = Math.max(...newQsortPattern);
  let minVal = Math.min(...newQsortPattern);
  let maxArray = [];
  let minArray = [];
  let matchArray = [];
  let testVal1 = [...newQsortPattern];
  symmetryCheckArray.forEach((sort, i) => {
    let checkVal = [...sort];
    if (checkVal.length !== testVal1.length) {
      matchArray.push(respondentNames[i]);
    }
    sort.forEach((item) => {
      if (+item > maxVal) {
        maxArray.push(respondentNames[i]);
      }
      if (+item < minVal) {
        minArray.push(item);
      }
    });
  });

  maxArray = uniq(maxArray);
  minArray = uniq(minArray);
  matchArray = uniq(matchArray);

  if (maxArray.length > 0) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are Q sorts with a value higher than the maximum allowed sort value! [ ${maxArray.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error(
      `There are Q sorts with a value higher than the maximum allowed sort value! [ ${maxArray.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }
  if (minArray.length > 0) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are Q sorts with a value lower than the minimum allowed sort value! [ ${minArray.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error(
      `There are Q sorts with a value lower than the minimum allowed sort value! [ ${minArray.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }
  if (matchArray.length > 0) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are problems with Q sort values in the participant sorts! [ ${matchArray.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error(
      `There are problems with Q sort values in the participant sorts! [ ${matchArray.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }
};

export default sortErrorCheckT2;
