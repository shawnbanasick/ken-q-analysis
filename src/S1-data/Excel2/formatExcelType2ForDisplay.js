import S1DataSlice from "../../State/S1DataSlice";
import grabProjectStatements from "../Excel1/grabProjectStatements";
import calcMultiplierArrayT2 from "./calcMultiplierArrayT2";
import createMainDataObject from "../dataUtilities/createMainDataObject";
import calcSortTriangleShapeT2 from "./calcSortTriangleShapeT2";
import grabRespondentNamesAndSorts from "../Excel1/grabRespondentNamesAndSorts";
import checkUniqueParticipantNames from "../DataDisplay/checkUniqueParticipantName";
import formatExcelType2Ver2ForDisplay from "./formatExcelType2Ver2ForDisplay";
import sortErrorCheckT2 from "./sortErrorCheckT2";

export default function formaType2ForDisplay(dataObject) {
  // let multiplierArray = [];
  let data = dataObject.sortsArray;
  let returnObject = {};
  let projectName = "my Project";

  // ***
  // *** VERSION 2 PROCESSING
  // ***
  // ***
  if (dataObject?.version) {
    // console.log("dataObject.version: " + dataObject.version);
    returnObject = formatExcelType2Ver2ForDisplay(dataObject);
  } else {
    // ***
    // ***
    // *** OLD VERSION PROCESSING
    // ***
    // ***
    try {
      // QAV #1 - Project Name
      let projectName1 = data[1];
      let projectName2 = projectName1.toString().replace(/,/g, "");
      if (projectName2.length > 0) {
        projectName = projectName2;
      }

      // Create Q Sort Pattern
      let calcSortTriangleT2 = calcSortTriangleShapeT2(data[2]);

      let copyTriangleShape = calcSortTriangleT2[0];
      if (copyTriangleShape.length < 3) {
        S1DataSlice.setState({ showWarningBox: true });
        alert(
          "Can't find the Q sort pattern on the 'sorts' worksheet! Check your Excel file, reload the webpage, and try again."
        );
        throw new Error(
          "Can't find the Q sort pattern on the 'sorts' worksheet!"
        );
      }
      let newQsortPattern = calcSortTriangleT2[2];

      //　QAV #2 - Multiplier Array
      let multiplierArray = [];
      multiplierArray = calcMultiplierArrayT2(copyTriangleShape);

      // QAV #3 - Number of Statements
      let originalSortSize = newQsortPattern.length; // number of statements

      // QAV #6  Participant Sorts
      let sortsDataT2 = data;
      let calcSorts = grabRespondentNamesAndSorts(sortsDataT2);
      let sortsDisplayText = calcSorts[1];
      let symmetryCheckArray = calcSorts[2];
      if (symmetryCheckArray.length === 0) {
        S1DataSlice.setState({ showWarningBox: true });
        alert(
          "Can't find any sorts on the 'sorts' worksheet tab! Check your Excel file, reload the webpage, and try again."
        );
        throw new Error("Can't find any Q sorts on the 'sorts' worksheet!");
      }

      // QAV #4 - Respondent Names
      let respondentNames = calcSorts[0];
      let participantNames = checkUniqueParticipantNames(respondentNames);

      // *** check for out of range values in Q sorts
      sortErrorCheckT2(newQsortPattern, symmetryCheckArray, respondentNames);

      // QAV #5 - Number of Q sorts
      let totalNumberSorts = respondentNames.length;

      // QAV #7 - Project Statements
      let statementsDataT2 = dataObject.statementsArray;
      let currentStatements = grabProjectStatements(statementsDataT2[0]);
      if (currentStatements.length === 0) {
        S1DataSlice.setState({ showWarningBox: true });
        alert(
          "Can't find any statements on the 'statements' worksheet! Check your statements worksheet, reload the webpage, and try again."
        );
        throw new Error(
          "Can't find any statements on the 'statements' worksheet! Check your statements worksheet, reload the webpage, and try again."
        );
      }

      // Create Statement Number Array
      let statementNumArray = [];
      for (let i = 0; i < currentStatements.length; i++) {
        statementNumArray.push(i + 1);
      }

      // Create Project History array
      let projectHistoryArray = [
        projectName + " data loaded from Excel Type 2 file",
      ];

      // Create Main Data Object
      let mainDataObject = createMainDataObject(
        respondentNames,
        symmetryCheckArray
      );

      returnObject = {
        projectName: projectName,
        projectHistoryArray: projectHistoryArray,
        multiplierArray: multiplierArray,
        statements: currentStatements,
        numQsorts: totalNumberSorts,
        qSortPattern: newQsortPattern,
        numStatements: originalSortSize,
        mainDataObject: mainDataObject,
        statementNumArray: statementNumArray,
        sortsDisplayText: sortsDisplayText,
        respondentNames: participantNames,
      };
    } catch (error) {
      console.log(error.message);
      console.log(error.stack);
      // store.setState({
      //  excelErrorMessage1: error.message,
      //  showExcelErrorModal: true
      // });
    }
  }
  return returnObject;
}
