import S1DataSlice from "../../State/S1DataSlice";

const extremeValueErrorCheck = (participantSorts) => {
  let overRangeSorts = participantSorts.overRangeSorts;
  let underRangeSorts = participantSorts.underRangeSorts;
  let nonNumericSorts = participantSorts.nonNumericSorts;

  if (overRangeSorts.length > 0) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are Q sorts with a value higher than the maximum allowed sort value! [ ${overRangeSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error(
      `There are Q sorts with a value higher than the maximum allowed sort value! [ ${overRangeSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }

  if (underRangeSorts.length > 0) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are Q sorts with a value lower than the minimum allowed sort value! [ ${underRangeSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error(
      `There are Q sorts with a value lower than the minimum allowed sort value! [ ${underRangeSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }
  if (nonNumericSorts.length > 0) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are problems with Q sort values in the participant sorts! [ ${nonNumericSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error(
      `There are problems with Q sort values in the participant sorts! [ ${nonNumericSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }
};

export default extremeValueErrorCheck;
