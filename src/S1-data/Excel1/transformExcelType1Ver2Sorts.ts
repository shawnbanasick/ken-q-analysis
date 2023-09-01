import transposeMatrix from "../../Utils/transposeMatrix";
import uniq from "lodash/uniq";

const transformExcelType1Ver2Sorts = (
  sortData: any[],
  numStatements: number,
  participantNames: string[]
) => {
  function removeEmptyStrings(array: string[][]): string[][] {
    return array.map((subArray) => subArray.filter((str) => str !== ""));
  }

  function removeEmptyArrays(array: any[][]): any[][] {
    return array.filter((subArray) => subArray.length > 0);
  }

  // Format data
  const sortData2 = removeEmptyStrings(sortData);
  const sortData3 = removeEmptyArrays(sortData2);
  sortData3.shift();
  const sortData4 = transposeMatrix(sortData3);
  const sortPattern: any = sortData4.shift();

  let overRangeSorts: Array<string> = [];
  let underRangeSorts: Array<string> = [];
  let nonNumericSorts: Array<string> = [];

  // Create new array of sortable objects and text => number
  let newDataArray: any = [];
  let statementNum: number;
  let sortValue: number;
  sortData4.forEach((item: Array<any>, i: number) => {
    let tempArray: any = [];
    item.forEach((item2: any, index: number) => {
      let tempObject: any = {};
      sortValue = parseInt(sortPattern[index], 10);
      if (isNaN(sortValue)) {
        nonNumericSorts.push(participantNames[i]);
      }
      tempObject.sortValue = sortValue;
      statementNum = parseInt(item2, 10);
      tempObject.statementNum = statementNum;
      tempArray.push(tempObject);
      // error check - q sort pattern range
      if (statementNum > +numStatements) {
        overRangeSorts.push(participantNames[i]);
      }
      if (statementNum < 1) {
        underRangeSorts.push(participantNames[i]);
      }
      if (isNaN(statementNum)) {
        nonNumericSorts.push(participantNames[i]);
      }
    });
    newDataArray.push(tempArray);
  });

  let participantSorts: Array<number> = [];

  // Sort each array of objects and push sort values to new array
  newDataArray.forEach((item: any) => {
    let tempArray: any = [];
    // sort
    item.sort((a: any, b: any) => a.statementNum - b.statementNum);
    // assign
    item.forEach((item2: any) => {
      tempArray.push(item2.sortValue);
    });
    participantSorts.push(tempArray);
  });

  overRangeSorts = uniq(overRangeSorts);
  underRangeSorts = uniq(underRangeSorts);
  nonNumericSorts = uniq(nonNumericSorts);

  return { participantSorts, overRangeSorts, underRangeSorts, nonNumericSorts };
};
export default transformExcelType1Ver2Sorts;
