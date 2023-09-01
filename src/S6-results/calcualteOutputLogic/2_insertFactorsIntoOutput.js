import S6DataSlice from "../../State/S6DataSlice";

const insertFactorsIntoOutput = function (
  analysisOutput,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const appendText1 = "Sorts Weight";
  const appendText3 = "Statement Number";
  const appendText4 = "Statement";
  const appendText5 = "Z score";
  const appendText7 = "Raw Sort";
  const appendText8 = "Q Sort Value";
  const appendText9 = "Sorts Correlations";
  const appendText10 = "Factor Scores for";

  const sheetNamesHolder1 = S6DataSlice.getState().sheetNamesHolder1;
  const sheetNamesHolder2 = S6DataSlice.getState().sheetNamesHolder2;
  const sheetNamesHolder3 = S6DataSlice.getState().sheetNamesHolder3;

  const factorWeightFactorArray =
    S6DataSlice.getState().factorWeightFactorArrayHolder;
  const miniCorrelationArray =
    S6DataSlice.getState().miniCorrelationArrayHolder;
  const compositeFactorMasterArray =
    S6DataSlice.getState().compositeFactorMasterArray;

  const userSelectedFactors = S6DataSlice.getState().userSelectedFactors;

  const sigSortsArray = S6DataSlice.getState().sigSortsArray;
  const maxStatementLength = S6DataSlice.getState().maxStatementLength;
  const spacer = ["", ""];

  for (let ii = 0, iiLen = userSelectedFactors.length; ii < iiLen; ii++) {
    const sheetHeaderArrayPartial = [
      appendText3,
      appendText4,
      appendText5,
      appendText8,
    ];

    // set weights name
    sheetNamesXlsx.push(sheetNamesHolder1[ii].sheetid);

    // set factor name text
    const factorName = `${"Factor"} ${userSelectedFactors[ii].slice(7)}`;

    // set weights columns
    const columns = [
      {
        wch: 8,
      },
      {
        wch: 8,
      },
    ];
    colSizes.push(columns);

    // set weights sheet
    factorWeightFactorArray[ii].unshift(
      ["weights", ""],
      spacer,
      [factorName, appendText1],
      spacer
    );
    outputData.push(factorWeightFactorArray[ii]);

    // set sorts corr name
    sheetNamesXlsx.push(sheetNamesHolder2[ii].sheetid);

    // set sorts corr cols
    const columns2 = [
      {
        wch: 8,
      },
    ];
    for (let ss = 0, ssLen = userSelectedFactors.length; ss < ssLen; ss++) {
      columns2.push({
        wch: 8,
      });
    }
    colSizes.push(columns2);

    // set sorts corr sheet
    miniCorrelationArray[ii].unshift(
      ["conCorr", ""],
      spacer,
      [factorName, appendText9],
      spacer
    );
    outputData.push(miniCorrelationArray[ii]);

    // set factor sheet name
    sheetNamesXlsx.push(sheetNamesHolder3[ii].sheetid);

    // set factor sheet cols
    const columns3 = [
      {
        wch: 8,
      },
      {
        wch: maxStatementLength,
      },
      {
        wch: 9,
      },
      {
        wch: 12,
      },
    ];
    for (
      let tt = 0, ttLen = sigSortsArray[ii].SigSorts.length;
      tt < ttLen;
      tt++
    ) {
      columns3.push({
        wch: 12,
      });
    }
    colSizes.push(columns3);

    // set factor sheets
    // re-sort to zScore
    compositeFactorMasterArray[ii].sort((a, b) => {
      if (a[2] === b[2]) {
        return a[0] < b[0] ? -1 : 1;
      }
      return b[2] < a[2] ? -1 : 1;
    });

    for (
      let jj = 0, jjLen = sigSortsArray[ii].SigSorts.length;
      jj < jjLen;
      jj++
    ) {
      sheetHeaderArrayPartial.push(
        `${appendText7} ${sigSortsArray[ii].SigSorts[jj]}`
      );
    }
    compositeFactorMasterArray[ii].unshift(
      ["facScore", ""],
      spacer,
      ["", `${appendText10}  ${factorName}`],
      spacer,
      sheetHeaderArrayPartial
    );
    outputData.push(compositeFactorMasterArray[ii]);
  } // end big loop

  console.log("dispatch - 12 - insertFactors complete");
  return [analysisOutput, outputData, sheetNamesXlsx, colSizes];
};

export default insertFactorsIntoOutput;
