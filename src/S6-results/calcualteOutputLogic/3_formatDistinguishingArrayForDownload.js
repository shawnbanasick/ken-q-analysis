import S6DataSlice from "../../State/S6DataSlice";

// todo - create if statement for case of only two sig factors-bypass processing of second

const formatDistingArrayForDownload = (
  distingStatementsTransferArray01,
  distingStatementsTransferArray05,
  factorNumber,
  analysisOutput,
  sigFactorNumbersArray
) => {
  const chartText1 = "Distinguishing Statements for";
  // getState
  const distStateUpperValueText =
    S6DataSlice.getState().distStateUpperValueText;
  const distStateLowerValueText =
    S6DataSlice.getState().distStateLowerValueText;

  const chartText2 = `(${distStateLowerValueText} : ${"Asterisk Indicates Significance at"} ${distStateUpperValueText}`;
  const chartText3 =
    "Both the Factor Q Sort Value and the Z Score Z SCR are Shown";
  const chartText4 = "Significance";
  const chartText5 = "Statement";
  // const chartText6 = "Num";
  const chartText7 = "Nm";
  const chartText8 = "Z score";

  const outputLength = analysisOutput.length;
  const disting05Length = distingStatementsTransferArray05.length;
  const disting01Length = distingStatementsTransferArray01.length;

  const printArray = [];
  const printArray2 = [];
  const spacer = ["", ""];

  const distinguishingSheetArray = [];

  // line 1
  const factorNumber2 =
    factorNumber.charAt(0).toUpperCase() + factorNumber.slice(1);
  const number = factorNumber2.substring(factorNumber2.length - 1);
  const factorNumber3 = factorNumber2.slice(0, -1);
  factorNumber = `${factorNumber3} ${number}`;
  const line1Array = [chartText1 + factorNumber];
  distinguishingSheetArray.push(["distinguishing", ""], spacer, line1Array);

  // line 2
  distinguishingSheetArray.push(spacer, [chartText2]);

  // line 3
  distinguishingSheetArray.push(spacer, [chartText3], spacer, spacer);

  // line 4 - headers
  const line4Array = [chartText7, chartText5, chartText7];
  const line4aArray = [" ", " ", " "];

  // push headers
  const emptyLineObj = {};
  emptyLineObj["No."] = " ";
  emptyLineObj["Statement "] = " ";
  emptyLineObj["Num "] = " ";

  for (let i = 0; i < outputLength; i += 1) {
    emptyLineObj[`Q-SV-${sigFactorNumbersArray[i]}`] = " ";
    emptyLineObj[`Z-SCR-${sigFactorNumbersArray[i]}`] = " ";
    emptyLineObj[`SIG${sigFactorNumbersArray[i]}`] = " ";
  }

  const printHeaderObj0 = {};
  printHeaderObj0["No."] = "distinguishing";
  printArray.push(printHeaderObj0);
  printArray.push(emptyLineObj);
  const printHeaderObj1 = {};
  printHeaderObj1["No."] = chartText1 + factorNumber;
  printArray.push(printHeaderObj1);
  printArray.push(emptyLineObj);
  const printHeaderObj2 = {};
  printHeaderObj2["No."] = chartText2;
  printArray.push(printHeaderObj2);
  printArray.push(emptyLineObj);
  const printHeaderObj3 = {};
  printHeaderObj3["No."] = chartText3;
  printArray.push(printHeaderObj3);
  printArray.push(emptyLineObj);
  printArray.push(emptyLineObj);
  const printHeaderObj4 = {};
  printHeaderObj4["No."] = chartText7;
  printHeaderObj4["Statement "] = chartText5;
  printHeaderObj4["Num "] = chartText7;

  for (let j = 0; j < outputLength; j += 1) {
    printHeaderObj4[
      `Q-SV-${sigFactorNumbersArray[j]}`
    ] = `${sigFactorNumbersArray[j]} Q-SV`;
    printHeaderObj4[
      `Z-SCR-${sigFactorNumbersArray[j]}`
    ] = `${sigFactorNumbersArray[j]} ${chartText8}`;
    printHeaderObj4[`SIG${sigFactorNumbersArray[j]}`] = chartText4;

    let statementNum = sigFactorNumbersArray[j].slice(6);

    line4aArray.push(
      `${"Factor"} ${statementNum}`,
      `${"Factor"} ${statementNum}`,
      `${"Factor"} ${statementNum}`
    );

    line4Array.push(`Q-SV`, `${chartText8}`, chartText4);
  }
  printArray.push(printHeaderObj4);
  distinguishingSheetArray.push(line4aArray, line4Array);

  let tempObj;
  let tempObj2;
  let kShift;
  let pShift;

  // line 5
  const distinguishingSheetArray2 = [];

  // push 05 statements
  for (let k = 0; k < disting05Length; k += 1) {
    const line5Array = [];
    tempObj = {};
    kShift = distingStatementsTransferArray05[k];

    // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to ""
    tempObj["No."] = kShift;
    line5Array.push(kShift);

    tempObj["Statement "] = analysisOutput[0][kShift - 1].sortStatement;
    line5Array.push(analysisOutput[0][kShift - 1].sortStatement, kShift);

    tempObj["Num "] = kShift;
    for (let m = 0; m < outputLength; m += 1) {
      tempObj[`Q-SV-${sigFactorNumbersArray[m]}`] =
        analysisOutput[m][kShift - 1].sortValue;
      tempObj[`Z-SCR-${sigFactorNumbersArray[m]}`] =
        analysisOutput[m][kShift - 1].zScore;
      tempObj[`SIG${sigFactorNumbersArray[m]}`] = "";
      line5Array.push(
        analysisOutput[m][kShift - 1].sortValue,
        analysisOutput[m][kShift - 1].zScore,
        ""
      );
    }
    printArray2.push(tempObj);
    distinguishingSheetArray2.push(line5Array);
  }

  // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to "*"
  for (let p = 0; p < disting01Length; p += 1) {
    const line6Array = [];
    tempObj2 = {};
    pShift = distingStatementsTransferArray01[p];

    tempObj2["No."] = pShift;
    tempObj2["Statement "] = analysisOutput[0][pShift - 1].sortStatement;
    tempObj2["Num "] = pShift;

    line6Array.push(
      pShift,
      analysisOutput[0][pShift - 1].sortStatement,
      pShift
    );

    for (let q = 0; q < outputLength; q += 1) {
      tempObj2[`Q-SV-${sigFactorNumbersArray[q]}`] =
        analysisOutput[q][pShift - 1].sortValue;
      tempObj2[`Z-SCR-${sigFactorNumbersArray[q]}`] =
        analysisOutput[q][pShift - 1].zScore;

      line6Array.push(
        analysisOutput[q][pShift - 1].sortValue,
        analysisOutput[q][pShift - 1].zScore
      );

      if (q === formatDistingArrayForDownload.calledTimes) {
        tempObj2[`SIG${sigFactorNumbersArray[q]}`] = "*";
        line6Array.push("*");
      } else {
        tempObj2[`SIG${sigFactorNumbersArray[q]}`] = "";
        line6Array.push("");
      }
    }
    printArray2.push(tempObj2);
    distinguishingSheetArray2.push(line6Array);
  }

  const lookupValue =
    sigFactorNumbersArray[formatDistingArrayForDownload.calledTimes];

  const sortFactorValue = `Z-SCR-${lookupValue}`;

  // sort desc
  const printArray3 = printArray2.sort(
    (a, b) => b[sortFactorValue] - a[sortFactorValue]
  );

  for (let r = 0; r < printArray3.length; r += 1) {
    printArray.push(printArray3[r]);
  }

  const lookupValue2 = formatDistingArrayForDownload.calledTimes;

  const modifiedIndexValue = [4, 7, 10, 13, 16, 19, 22, 25];

  const indexer = modifiedIndexValue[lookupValue2];

  distinguishingSheetArray2.sort((a, b) => {
    if (a[indexer] === b[indexer]) {
      return 0;
    }
    return b[indexer] < a[indexer] ? -1 : 1;
  });

  const finalSheetArray = distinguishingSheetArray.concat(
    distinguishingSheetArray2
  );

  formatDistingArrayForDownload.calledTimes += 1;

  return [printArray, finalSheetArray];
};

export default formatDistingArrayForDownload;
