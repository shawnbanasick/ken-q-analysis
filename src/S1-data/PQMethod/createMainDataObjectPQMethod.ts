import shiftRawSortsPositive from "../dataUtilities/shiftRawSortsPositive";

const createMainDataObjectPQMethod = (
  filteredLines4: any[],
  respondentNames: string[]
) => {
  let mainDataObjectArray: any[] = [];

  // get min value from 2D array
  let minValue = 0;
  if (filteredLines4.length > 0) {
    filteredLines4.forEach((item) => {
      let testVal = Math.min(...item);
      if (testVal < minValue) {
        minValue = testVal;
      }
    });
  }

  interface tempObj {
    name?: string;
    posShiftSort?: number[];
    rawSort?: number[];
    displaySort?: string;
  }

  filteredLines4.forEach((item, index) => {
    let tempObj: tempObj = {};

    let tempVar = shiftRawSortsPositive(item, minValue);

    tempObj.name = respondentNames[index];
    tempObj.rawSort = [...item];
    tempObj.displaySort = item.toString();
    tempObj.posShiftSort = [...tempVar];

    mainDataObjectArray.push(tempObj);
  });

  return mainDataObjectArray;
};

export default createMainDataObjectPQMethod;
