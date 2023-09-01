export function getExcelT1SortText(inputData1, numStatements) {
  // console.log("getExcelT1SortText inputData1: ", JSON.stringify(inputData1));
  var sortData = [];
  // var sortLength = 29 + numStatements;
  var counter = inputData1[22].length - 1;

  for (var k = 22; k < inputData1.length; k++) {
    var key = inputData1[k][0];
    var value;
    var tempArray1 = [];

    // start from the second column
    var j = 1;
    var tempObj1;

    for (var kr = 0; kr < counter; kr++) {
      value = inputData1[k][j];

      // catch the respondent names first
      if (k === 22 && value !== "") {
        tempObj1 = {};
        tempObj1.sortValue = key;
        tempObj1.statementNum = value;
        tempArray1.push(tempObj1);
      } else {
        if (value !== "") {
          tempObj1 = {};
          tempObj1.sortValue = +key;
          tempObj1.statementNum = +value;
          tempArray1.push(tempObj1);
        }
      }
      j = j + 1;
    }
    sortData.push(tempArray1);
  }
  return sortData;
}
