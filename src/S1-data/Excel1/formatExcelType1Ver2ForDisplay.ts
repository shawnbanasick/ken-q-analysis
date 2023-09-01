// import { getRespondentSortsExcelT1 } from "./getRespondentSortsExcelT1";
import cloneDeep from "lodash/cloneDeep";
import transformExcelType1Ver2Sorts from "./transformExcelType1Ver2Sorts";
import transformExcelType1Ver2Statements from "./transformExcelType1Ver2Statements";
import checkUniqueParticipantNames from "../DataDisplay/checkUniqueParticipantName";
import createMainDataObject from "../dataUtilities/createMainDataObject";
import calcQsortPatternArray from "../Kade/calcQsortPatternArray";
import createStatementNumArray from "../Kade/createStatementNumArray";
import createExcelType1NonsymmetricalArrayText from "../Kade/createExcelType1NonsymmetricalArray";
import createSortsDisplayText from "../Kade/createSortsDisplayText";
import cleanMultiplierArray from "./cleanMultiplierArray";
import calcStatementsNum from "./calcStatementsNum";
import sortErrorCheckT2 from "../Excel2/sortErrorCheckT2";
import extremeValueErrorCheck from "./extremeValueErrorCheck";

const formatExcelType1Ver2 = (dataObject: any) => {
  // console.log(JSON.stringify(dataObject));

  let returnObject: any = {};

  // TODO - Add error handling

  try {
    // QAV#1  Project Name
    let projectName = dataObject.projectName;

    // QAV#2  Multiplier Array
    let multiplierArray3 = cloneDeep(dataObject.multiplierArray);
    let multiplierArray = cleanMultiplierArray(multiplierArray3);
    let maxVal = Math.max(...multiplierArray);
    if (isNaN(maxVal)) {
      throw new Error("Multiplier Array contains non-numeric values");
    }

    // QAV#3  Number of Statements
    let numberOfStatements2 = [...multiplierArray];
    const numStatements = calcStatementsNum(numberOfStatements2);
    // console.log("numStatements: ", numStatements);

    // QAV#4  Participant Names
    let participantNames2 = [...dataObject.sortsArray[0]];
    let participantNames3 = participantNames2.filter((item: any) => item);
    participantNames3.shift();
    let participantNames = checkUniqueParticipantNames(participantNames3);
    // console.log("participantNames: ", participantNames);

    // QAV#5  Number of Participants
    let numberOfParticipants = participantNames.length;
    // console.log("numberOfParticipants: ", numberOfParticipants);

    // QAV#6  Participant Sorts
    let sortData = cloneDeep(dataObject.sortsArray);
    const participantSorts2 = transformExcelType1Ver2Sorts(
      sortData,
      numStatements,
      participantNames
    );
    let participantSorts = cloneDeep(participantSorts2.participantSorts);

    // Error Checking
    extremeValueErrorCheck(participantSorts2);

    // QAV#7  Project Statements
    let projectStatements2 = cloneDeep(dataObject.statementsArray);
    // console.log("projectStatements2: ", projectStatements2);
    let projectStatements =
      transformExcelType1Ver2Statements(projectStatements2);
    // console.log("projectStatements: ", projectStatements);

    // QAV#8  Create Q sort Pattern Array
    let qSortPatternArray = calcQsortPatternArray(multiplierArray);
    // console.log("qSortPatternArray: ", qSortPatternArray);

    // Error Checking
    sortErrorCheckT2(qSortPatternArray, participantSorts, participantNames);

    // Create Statement Num Array
    let statementNumArray = createStatementNumArray(numStatements);
    // console.log("statementNumArray: ", statementNumArray);

    // Create Excel Type 1 Nonsymmetric Array Text
    let excelType1NonsymmetricArrayText =
      createExcelType1NonsymmetricalArrayText(participantNames);
    // console.log("nonsymmetricArrayText: ", excelType1NonsymmetricArrayText);

    // Create Sorts Display Text
    let sortsDisplayText = createSortsDisplayText(
      participantNames,
      participantSorts
    );
    // console.log("sortsDisplayText: ", sortsDisplayText);

    // Create Main Data Object
    let mainDataObject = createMainDataObject(
      participantNames,
      participantSorts
    );
    // console.log("mainDataObject: ", JSON.stringify(mainDataObject));

    // Create Return Object
    returnObject = {
      projectHistoryArray: [
        projectName + " data loaded from Excel Type 1 file",
      ],
      statements: projectStatements,
      sortsDisplayText: sortsDisplayText,
      projectName: projectName,
      numQsorts: numberOfParticipants,
      numStatements: numStatements,
      qSortPattern: qSortPatternArray,
      mainDataObject: mainDataObject,
      multiplierArray: multiplierArray,
      statementNumArray: statementNumArray,
      respondentNames: participantNames,
      excelType1NonsymmetricArrayText,
    };
  } catch (error: any) {
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
  }

  return returnObject;
};

export default formatExcelType1Ver2;
