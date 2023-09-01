import S1DataSlice from "../../State/S1DataSlice";
import checkUniqueParticipantName from "../DataDisplay/checkUniqueParticipantName";

const transformExcelType2Ver2Sorts = (
  sortData: any,
  qSortPatternArray: number[]
) => {
  let maxValue = Math.max(...qSortPatternArray);
  let minValue = Math.min(...qSortPatternArray);
  let matchValue = qSortPatternArray.length;
  let matchArray: number[] = [];
  let maxValueArray: number[] = [];
  let minValueArray: number[] = [];
  let nonNumericArray: any[] = [];
  let sortsArray: any[] = [];
  let namesArray: string[] = [];

  sortData.forEach((row: any) => {
    let tempArray: any[] = [];
    row = row.split(",");
    if (row[0] !== "") {
      row.forEach((item: any, index: number) => {
        if (item !== "") {
          if (index > 0) {
            item = parseInt(item, 10);
            if (item > maxValue) {
              maxValueArray.push(row[0]);
            }
            if (item < minValue) {
              minValueArray.push(row[0]);
            }
            if (isNaN(item)) {
              nonNumericArray.push(row[0]);
            }
            tempArray.push(item);
          } else {
            namesArray.push(item);
          }
        }
      });
      if (tempArray.length !== matchValue) {
        matchArray.push(row[0]);
      }
      sortsArray.push(tempArray);
    }
  });

  if (maxValueArray.length > 0) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are Q sorts with values greater than allowed [ ${maxValueArray.join()} ]. Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error("Q sort values greater than allowed");
  }
  if (minValueArray.length > 0) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are Q sorts with values less than allowed [ ${minValueArray.join()} ]. Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error("Q sort values less than allowed");
  }
  if (nonNumericArray.length > 0) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are Q sorts with non-numeric values [ ${nonNumericArray.join()} ]. Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error("Q sort values non-numeric");
  }
  namesArray = checkUniqueParticipantName(namesArray);
  // console.log("matchArray: ", matchArray);
  return { sortsArray, namesArray };
};

export default transformExcelType2Ver2Sorts;
