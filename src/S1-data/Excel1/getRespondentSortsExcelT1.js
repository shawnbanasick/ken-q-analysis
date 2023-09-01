import S1DataSlice from "../../State/S1DataSlice";

export function getRespondentSortsExcelT1(
  sortData,
  respondentNames,
  numStatements
) {
  // generate the original load value for statement number array
  let statementNumArray = [];
  for (let i = 0; i < numStatements; i++) {
    statementNumArray.push(i + 1);
  }
  let testValue = statementNumArray.join(",");
  //   let excelType1NonsymmetricArray = [];

  // transpose data
  // todo - check to see if util transposer will work for this
  let sortDataTransposed = sortData[0].map(function (col, i) {
    return sortData.map(function (row) {
      return row[i];
    });
  });

  if (sortDataTransposed.length !== respondentNames.length) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `The number of participants in the Excel file does not match the number of Q sorts listed in the file. Please check your Excel file`
    );
    throw new Error(
      "The number of participants in the Excel file does not match the number of participants in the Q sort pattern information!"
    );
  }

  sortDataTransposed.forEach((element, i) => {
    let tempArray = [];
    let name = respondentNames[i];
    //let respondentDataCheck = [...element];
    // let respondentDataCheck2 = respondentDataCheck.sort().join(",");
    // console.log("respondentDataCheck2: ", respondentDataCheck2);
    // console.log("testValue: ", testValue);
    // if (respondentDataCheck2 !== testValue) {
    // excelType1NonsymmetricArray.push(name);
    // }

    // console.log(name);
    element.forEach((element2, j) => {
      tempArray.push(+element2.statementNum);
      if (element2.statementNum > numStatements) {
        S1DataSlice.setState({ showWarningBox: true });
        alert(
          `A statement number for particpant ${name} is larger than the number of statements`
        );
        throw new Error(
          "The statement number is larger than the number of statements!"
        );
      }
    });
    let dataCheck = tempArray
      .sort(function (a, b) {
        return a - b;
      })
      .join(",");
    if (dataCheck !== testValue) {
      S1DataSlice.setState({ showWarningBox: true });
      alert(
        `There is a problem with the statement numbers for participant ${name}`
      );
      throw new Error(
        "The sort values for participant " + name + " are not correct!"
      );
    }
  });

  // sort data by statement number
  let sortBy = require("lodash/sortBy");
  let data2 = [];
  for (let p = 0; p < sortDataTransposed.length; p++) {
    let sortedArray1 = sortBy(sortDataTransposed[p], function (obj) {
      return obj.statementNum;
    });
    data2.push(sortedArray1);
  }

  // create array of sort values
  let temp2;
  let respondentDataSorts3 = [];
  for (let q = 0; q < data2.length; q++) {
    let temp11 = data2[q];
    let tempArray3 = [];
    let tempArray33 = [];
    for (let r = 0; r < temp11.length; r++) {
      temp2 = temp11[r].sortValue;
      tempArray3.push(temp2);
    }
    tempArray33.push(q + 1);
    respondentDataSorts3.push(tempArray3);
  }

  return [respondentDataSorts3, statementNumArray];
}
