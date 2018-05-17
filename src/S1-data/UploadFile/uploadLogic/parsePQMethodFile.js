// import cloneDeep from "lodash/cloneDeep";
import { sortsTextToArray } from "../uploadLogic/sortsTextToArray";

export function parsePQMethodFile(dataBlob) {
  // break by new lines
  var arr = dataBlob.split(/\r\n|\r|\n/g);
  // pull out first line
  var array1 = arr.slice(0, arr.length);

  // shift out first line
  var projectTitleString = array1.shift();

  // shift out number of sorts from first line
  var sortNumberString = array1.shift();

  // parsing first line of PQMethod file to set qav variables
  var numberSorts = parseInt(projectTitleString.slice(3, 6), 10); // lipset 9

  var numSortStatements = parseInt(projectTitleString.slice(6, 9), 10); // lipset 33
  var qavProjectName3 = projectTitleString.slice(10, 70);
  var qavProjectName = qavProjectName3.trim();
  // var qavProjectName = PASTE.sanitizeProjectName(qavProjectName2);

  // parsing and coercing second line of PQMethod file
  // warning - array temp1 has an extra "0" entry in position 0
  var temp1b = sortNumberString.replace(/\s\s/g, " ");
  var temp1a = temp1b.split(" ");
  var temp1 = temp1a.map(Number);
  var pyramidShapeNumbers = temp1.slice(3, temp1.length);

  // read qSortPattern from file
  let defaultValues = [
    -6,
    -5,
    -4,
    -3,
    -2,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13
  ];

  let qSortPattern = [];
  for (let i = 0; i < pyramidShapeNumbers.length; i++) {
    let fileNumber = pyramidShapeNumbers[i];
    let defaultNumber = defaultValues[i];
    if (fileNumber !== 0) {
      for (let j = 0; j < fileNumber; j++) {
        qSortPattern.push(defaultNumber);
      }
    }
  }

  // get max sort value to use in shift raw sorts to all positive
  let value = temp1.slice(0, 3);
  let min = value.reduce(function(a, b) {
    return Math.min(a, b);
  });

  // transform sorts text to name and sorts arrays - returns names, sorts, main data array
  let namesSortsMaindataArray = sortsTextToArray(
    array1,
    numSortStatements,
    min
  );

  return [
    numberSorts,
    qavProjectName,
    numSortStatements,
    pyramidShapeNumbers,
    namesSortsMaindataArray,
    qSortPattern
  ];
}
