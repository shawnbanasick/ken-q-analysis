import evenRound from "../../Utils/evenRound";
import S6DataSlice from "../../State/S6DataSlice";

const pushFactorPowerSetDiffsToOutput = function (
  analysisOutput,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const chartText1 = "Diff";
  const chartText2 = "Difference";
  const chartText3 = "Statement Number";
  const chartText4 = "Statement";
  const chartText5 = "Descending Array of Differences Between";
  const chartText6 = "and";
  let oneFactor, anotherFactor;

  const maxStatementLength = S6DataSlice.getState().maxStatementLength;

  const spacer = ["", ""];

  const factorPairs = [];
  for (let i = 0; i < analysisOutput.length - 1; i++) {
    for (let j = i; j < analysisOutput.length - 1; j++) {
      factorPairs.push([analysisOutput[i], analysisOutput[j + 1]]);
    }
  }
  // let diffArraySorted;
  const namesComboArray = [];
  const sheetHeader1Array = [];

  let number;
  let number2;
  for (let k = 0; k < factorPairs.length; k++) {
    const namesComboArrayFrag = [];
    const sheetHeader1 = [chartText3, chartText4];

    oneFactor = factorPairs[k][0][0].factor;
    const factorNumber2 =
      oneFactor.charAt(0).toUpperCase() + oneFactor.slice(1);
    number = factorNumber2.substring(factorNumber2.length - 1);

    // for bipolar split - catch "1a" as factor number
    if (isNaN(+number)) {
      number = `${factorNumber2.substring(factorNumber2.length - 2)}`;
    }

    // const factorNumber3 = factorNumber2.slice(0, -1);
    oneFactor = `${"Fac"} ${number}`;

    anotherFactor = factorPairs[k][1][0].factor;
    const factorNumber12 =
      anotherFactor.charAt(0).toUpperCase() + anotherFactor.slice(1);
    number2 = factorNumber12.substring(factorNumber12.length - 1);

    // for bipolar split - catch "1a" as factor number
    if (isNaN(+number2)) {
      number2 = `${factorNumber12.substring(factorNumber12.length - 2)}`;
    }

    // const factorNumber13 = factorNumber12.slice(0, -1);
    anotherFactor = `${"Fac"} ${number2}`;

    namesComboArrayFrag.push(oneFactor, anotherFactor);
    const temp1 = {};
    temp1.sheetid = `${chartText1 + oneFactor} ${anotherFactor}`;
    temp1.header = true;
    namesComboArray.push(namesComboArrayFrag);
    sheetNamesXlsx.push(`${chartText1} ${oneFactor}  ${anotherFactor}`);

    sheetHeader1.push(oneFactor, anotherFactor, chartText2);
    sheetHeader1Array.push(sheetHeader1);

    const columns = [
      {
        wch: 8,
      },
      {
        wch: maxStatementLength,
      },
      {
        wch: 8,
      },
      {
        wch: 8,
      },
      {
        wch: 10,
      },
    ];
    colSizes.push(columns);
  }

  // push each pair to output
  for (let m = 0; m < factorPairs.length; m++) {
    // let diffArray = [];
    const diffArrayXlsx = [];
    for (let p = 0; p < factorPairs[m][0].length; p++) {
      const tempArray = [];

      const temp1a = factorPairs[m][0][p].statement;
      const temp1b = factorPairs[m][0][p].sortStatement;
      const temp1c = factorPairs[m][0][p].zScore;
      const temp1d = factorPairs[m][1][p].zScore;
      const factorsDiff = evenRound(
        factorPairs[m][0][p].zScore - factorPairs[m][1][p].zScore,
        3
      );
      tempArray.push(temp1a, temp1b, temp1c, temp1d, factorsDiff);
      diffArrayXlsx.push(tempArray);
    }

    diffArrayXlsx.sort((a, b) => {
      if (a[4] === b[4]) {
        return 0;
      }
      return b[4] < a[4] ? -1 : 1;
    });
    diffArrayXlsx.unshift(
      ["descend", `${namesComboArray[m][0]} / ${namesComboArray[m][1]}`],
      spacer,
      [
        `${chartText5} ${namesComboArray[m][0]} ${chartText6} ${namesComboArray[m][1]}`,
      ],
      spacer,
      sheetHeader1Array[m]
    );
    outputData.push(diffArrayXlsx);
  }

  console.log("dispatch - 13 - pushFactorPowerSetDiffs complete");

  return [analysisOutput, outputData, sheetNamesXlsx, colSizes];
};

export default pushFactorPowerSetDiffsToOutput;
