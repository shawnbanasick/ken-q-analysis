// import store from "../../../store";
import { getExcelT1SortText } from "./getExcelT1SortText";
import { getStatementsExcelT1 } from "../Excel1/getStatementsExcelT1";
import { getRespondentNamesExcelT1 } from "./getRespondentNamesExcelT1";
import { getRespondentSortsExcelT1 } from "../Excel1/getRespondentSortsExcelT1";
import createMainDataObject from "../dataUtilities/createMainDataObject";
import checkUniqueParticipantNames from "../DataDisplay/checkUniqueParticipantName";
import { createMultiplierArrayAndTriangleShape } from "./createMultiplierArrayAndTriangleShape";
import formatExcelType1Ver2ForDisplay from "./formatExcelType1Ver2ForDisplay";
import cloneDeep from "lodash/cloneDeep";
import S1DataSlice from "../../State/S1DataSlice";

export function formatExcelType1ForDisplay(dataObject) {
  let data = cloneDeep(dataObject.sortsArray);

  let statementsArray = dataObject.statementsArray;
  let returnObject = {};

  if (dataObject?.version) {
    // ***
    // ***
    // *** VERSION 2 PROCESSING
    // ***
    // ***
    console.log("version 2 processing");

    // console.log("dataObject.version: " + dataObject.version);
    returnObject = formatExcelType1Ver2ForDisplay(dataObject);
  } else {
    // ***
    // ***
    // *** VERSION 1 PROCESSING
    // ***
    // ***

    console.log("version 1 processing");
    // remove unnecessary data for old version - do not delete
    data.shift();
    try {
      // QAV #1  - Project Name
      let projectName = data[0][1];

      // QAV #2  -  Multiplier Array (todo - fix loop function)
      let inputData1 = data;

      let createMultiplierAndQShapeData =
        createMultiplierArrayAndTriangleShape(inputData1);

      let multiplierArray = [...createMultiplierAndQShapeData[0]];

      if (multiplierArray.length === 0 || Math.max(...multiplierArray) === 0) {
        S1DataSlice.setState({ showWarningBox: true });
        alert(`Can't find Q sort pattern information in the Excel file.`);
        throw new Error(
          "Can't find the number of sorts for each column on the 'sorts' worksheet!"
        );
      }

      let qSortPattern = [...createMultiplierAndQShapeData[1]];

      // QAV #3 - Number of Statements
      let numStatements = qSortPattern.length; // number of statements

      // creates array of objects with sort value and statement number

      let sortData = getExcelT1SortText(inputData1, numStatements);

      if (sortData[1].length === 0 && sortData[2].length === 0) {
        S1DataSlice.setState({ showWarningBox: true });
        alert(
          `Can't find any Q sorts on the 'sorts' worksheet! Check your Excel file, reload the webpage, and try again.`
        );
        throw new Error("Can't find any Q sorts on the 'sorts' worksheet!");
      }

      // QAV #4 - Respondent Names
      let namesData = sortData.shift();
      let respondentNames = getRespondentNamesExcelT1(namesData);
      let participantNames = checkUniqueParticipantNames(respondentNames);

      // QAV #5 - Number of Q sorts
      let numQsorts = respondentNames.length;

      // QAV #6   Participant Sorts
      let respondentDataSortsPrep = getRespondentSortsExcelT1(
        sortData,
        respondentNames,
        numStatements,
        qSortPattern
      );

      let respondentSorts = [...respondentDataSortsPrep[0]];
      let statementNumArray = [...respondentDataSortsPrep[1]];
      let excelType1NonsymmetricArrayText = respondentDataSortsPrep[2];

      // QAV #7   project statements
      let statementData1 = [...statementsArray];

      // check for no statements ERROR
      let statements = getStatementsExcelT1(statementData1);

      if (statements.length === 0) {
        S1DataSlice.setState({ showWarningBox: true });
        alert(
          `Can't find any statements on the statements worksheet! Check your Excel file, reload the webpage, and try again.`
        );
        throw new Error(
          "Can't find any statements on the 'statements' worksheet!"
        );
      }

      // Create Sorts Display Text
      let sortsDisplayText = respondentNames.map(function (item, i) {
        return item + ": " + respondentSorts[i];
      });

      // Create Main Data Object
      let mainDataObject = createMainDataObject(
        respondentNames,
        respondentSorts
      );

      // Create Return Object
      returnObject = {
        projectHistoryArray: [
          projectName + " data loaded from Excel Type 1 file",
        ],
        statements: statements,
        sortsDisplayText: sortsDisplayText,
        projectName: projectName,
        numQsorts: numQsorts,
        numStatements: numStatements,
        qSortPattern: qSortPattern,
        mainDataObject: mainDataObject,
        multiplierArray: multiplierArray,
        statementNumArray: statementNumArray,
        respondentNames: participantNames,
        excelType1NonsymmetricArrayText,
      };
    } catch (error) {
      console.log(error.message);
      console.log(error.stack);
      S1DataSlice.setState({
        showInputErrorModal: {
          showModal: true,
          titleText: "Data Error",
          bodyText: error.message,
        },
      });
      /* store.setState({
            excelErrorMessage1: error.message,
            showExcelErrorModal: true
        }); */
    }
  }
  return returnObject;
}
