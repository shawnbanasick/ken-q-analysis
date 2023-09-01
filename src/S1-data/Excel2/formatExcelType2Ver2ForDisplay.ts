import S1DataSlice from "../../State/S1DataSlice";
import cloneDeep from "lodash/cloneDeep";
/*
import transformExcelType1Ver2Statements from "./transformExcelType1Ver2Statements";
import checkUniqueParticipantNames from "../DataDisplay/checkUniqueParticipantName";
*/
import createStatementNumArray from "../Kade/createStatementNumArray";
import calcQsortPatternArray from "../Kade/calcQsortPatternArray";
//import transformExcelType1Ver2Statements from "../Excel1/transformExcelType1Ver2Statements";
import cleanMultiplierArray from "../Excel1/cleanMultiplierArray";
import calcStatementsNum from "../Excel1/calcStatementsNum";
import transformExcelType2Ver2Sorts from "./transformExcelType2Ver2Sorts";
import createExcelType1NonsymmetricalArrayText from "../Kade/createExcelType1NonsymmetricalArray";
import createSortsDisplayText from "../Kade/createSortsDisplayText";
import createMainDataObject from "../dataUtilities/createMainDataObject";
import transformExcelType2Ver2Statements from "../Excel1/transformExcelType2Ver2Statements";

const formatExcelType2Ver2ForDisplay = (dataObject: any) => {
  //console.log(JSON.stringify(dataObject));
  let returnObject: any = {};

  // TODO - Add error handling

  try {
    // QAV#1  Project Name
    let projectName = dataObject.projectName;
    //console.log("projectName: ", projectName);

    // QAV#2  Multiplier Array
    let multiplierArray3 = cloneDeep(dataObject.multiplierArray);
    if (multiplierArray3 === undefined) {
      S1DataSlice.setState({ showWarningBox: true });
      alert(
        "Can't find the Q sort pattern worksheet! Check your Excel file, reload the webpage, and try again."
      );
      throw new Error("Can't find the Q sort pattern worksheet!");
    }
    let multiplierArray = cleanMultiplierArray(multiplierArray3);

    // QAV#8  Create Q sort Pattern Array
    let qSortPatternArray = calcQsortPatternArray(multiplierArray);
    //console.log("qSortPatternArray: ", qSortPatternArray);

    // QAV#3  Number of Statements
    let numberOfStatements2 = [...multiplierArray];
    const numStatements = calcStatementsNum(numberOfStatements2);
    //console.log("numStatements: ", numStatements);

    // QAV#6  Participant Sorts
    let sortData = cloneDeep(dataObject.sortsArray);
    const participantSorts2 = transformExcelType2Ver2Sorts(
      sortData,
      qSortPatternArray
    );
    const participantSorts = participantSorts2.sortsArray;
    if (participantSorts.length === 0) {
      S1DataSlice.setState({ showWarningBox: true });
      alert(
        "No sorts found. Check your Excel file, reload the webpage, and try again."
      );
      throw new Error("No sorts found");
    }

    // QAV#4  Participant Names
    const participantNames = participantSorts2.namesArray;
    //console.log("participantNames: ", participantNames);

    // QAV#5  Number of Participants
    let numberOfParticipants = participantNames.length;
    //console.log("numberOfParticipants: ", numberOfParticipants);

    // QAV#7  Project Statements
    let projectStatements2 = cloneDeep(dataObject.statementsArray);
    //console.log("projectStatements2: ", [projectStatements2]);
    let projectStatements =
      transformExcelType2Ver2Statements(projectStatements2);
    //console.log("projectStatements: ", projectStatements);

    // Create Statement Num Array
    let statementNumArray = createStatementNumArray(numStatements);
    //console.log("statementNumArray: ", statementNumArray);

    // Create Excel Type 1 Nonsymmetric Array Text
    let excelType1NonsymmetricArrayText =
      createExcelType1NonsymmetricalArrayText(participantNames);
    //console.log("nonsymmetricArrayText: ", excelType1NonsymmetricArrayText);

    // Create Sorts Display Text
    let sortsDisplayText = createSortsDisplayText(
      participantNames,
      participantSorts
    );
    //console.log("sortsDisplayText: ", sortsDisplayText);

    // Create Main Data Object
    let mainDataObject = createMainDataObject(
      participantNames,
      participantSorts
    );
    //console.log("mainDataObject: ", JSON.stringify(mainDataObject));

    // Create Return Object
    returnObject = {
      projectHistoryArray: [
        projectName + " data loaded from Excel Type 2 file",
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

export default formatExcelType2Ver2ForDisplay;
