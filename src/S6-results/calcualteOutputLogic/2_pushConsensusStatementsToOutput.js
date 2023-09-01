import evenRound from "../../Utils/evenRound";
import variance from "../../Utils/variance";
import S6DataSlice from "../../State/S6DataSlice";

const pushConsensusStatementsToOutput = function (
  analysisOutput,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  // let chartText1 = "Z-Score Variance";
  const chartText2 = "Consensus-Disagreement";
  const chartText3 = "Nm";
  const chartText4 = "Statement";
  const chartText5 = "Ranking value";
  const chartText6 =
    "Factor Qsort Values for Statements sorted by Consensus vs Disagreement";
  const sigFactorNumbersArray = S6DataSlice.getState().sigFactorNumbersArray;
  const userSelectedFactors = S6DataSlice.getState().userSelectedFactors;
  const maxStatementLength = S6DataSlice.getState().maxStatementLength;
  const spacer = ["", ""];

  // add translations to user selected factors
  const translatedFactorNames = [];
  userSelectedFactors.forEach((item) => {
    const number = item.slice(7);
    translatedFactorNames.push(`${"Factor"} ${number}`);
  });

  sigFactorNumbersArray.sort();

  const tableHeader = [chartText3, chartText4];
  const tableHeader2 = tableHeader.concat(translatedFactorNames);
  tableHeader2.push(chartText5);

  sheetNamesXlsx.push(chartText2);

  // set factor sheet cols
  const columns = [
    {
      wch: 8,
    },
    {
      wch: maxStatementLength,
    },
  ];
  for (let tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
    columns.push({
      wch: 8,
    });
  }
  columns.push({
    wch: 15,
  });
  colSizes.push(columns);

  const consensusDisagreeArray = [];
  for (let i = 0; i < analysisOutput[0].length; i++) {
    const tempArray1a = [];
    tempArray1a.push(
      analysisOutput[0][i].statement,
      analysisOutput[0][i].sortStatement
    );
    const tempArray = [];
    for (let j = 0; j < analysisOutput.length; j++) {
      // let temp1 = sigFactorNumbersArray[j];
      tempArray1a.push(analysisOutput[j][i].sortValue);
      tempArray.push(analysisOutput[j][i].zScore);
    }
    const zScoreVariance = evenRound(variance(tempArray), 3);
    tempArray1a.push(zScoreVariance);
    consensusDisagreeArray.push(tempArray1a);
  }

  const locator = userSelectedFactors.length + 2;
  consensusDisagreeArray.sort((a, b) => {
    if (a[locator] === b[locator]) {
      return 0;
    }
    return a[locator] < b[locator] ? -1 : 1;
  });
  consensusDisagreeArray.unshift(
    ["con-dis", ""],
    spacer,
    [chartText6],
    spacer,
    tableHeader2
  );
  outputData.push(consensusDisagreeArray);

  console.log("dispatch - 14 - pushConsensusStatements complete");

  return [
    analysisOutput,
    sigFactorNumbersArray,
    outputData,
    sheetNamesXlsx,
    colSizes,
  ];
};

export default pushConsensusStatementsToOutput;
