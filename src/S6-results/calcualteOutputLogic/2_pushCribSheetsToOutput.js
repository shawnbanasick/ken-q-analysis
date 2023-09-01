import { countBy, flatten, identity } from "lodash";
import getCribSheetsHighestStatements from "./3_getCribSheetsHighestStatements";
import getCribSheetsLowestStatements from "./3_getCribSheetsLowestStatements";
import getCribSheetsRankedHigherThanOtherFactors from "./3_getCribSheetsRankedHigherThanOtherFactors";
import getCribSheetsRankedLowerThanOtherFactors from "./3_getCribSheetsRankedLowerThanOtherFactors";
import cloneDeep from "lodash/cloneDeep";
import S6DataSlice from "../../State/S6DataSlice";
import S1DataSlice from "../../State/S1DataSlice";

const pushCribSheetsToOutput = function (outputData, sheetNamesXlsx, colSizes) {
  const appendText1 = "Rel Ranks";
  const appendText2 = `Relative Ranking of Statements in `;
  const statementNumTrans = "Statement Number";
  // const zScoreTrans = "Z score");
  const zScoreTrans = "Z-score";
  const statementTrans = "Statement";
  const sortValuesTrans = "Sort Values";
  // const appendText8 = "Consensus";
  const appendText9 = "Con/Dist"; // "Distinguishing");
  const statementsText = "Statements";
  const nmTrans = "Num.";

  const appendTextHeader1 = "Highest Ranked Statements";
  const appendTextHeader2a = `Positive Statements Ranked Higher in `;
  const appendTextHeader2b = ` Array than in Other Factor Arrays`;
  const appendTextHeader3a = `Negative Statements Ranked Lower in `;
  const appendTextHeader3b = ` Array than in Other Factor Arrays`;
  const appendTextHeader4 = "Lowest Ranked Statements";

  // State
  const statementRankingArray = S6DataSlice.getState().statementRankingArray;
  const userSelectedFactors = S6DataSlice.getState().userSelectedFactors;
  const synFactorArray1Holder = S6DataSlice.getState().synFactorArray1Holder;
  const sortTriangleShape = S1DataSlice.getState().qSortPattern;

  // initialize variables
  let cribArray2 = [];

  // determine the number of statements in the extreme positive / negative columns
  const arrayMax = +Math.max(...sortTriangleShape);
  const arrayMin = +Math.min(...sortTriangleShape);
  const triangleCounts = countBy(sortTriangleShape, identity);
  const maxCounts = triangleCounts[arrayMax];
  const minCounts = triangleCounts[arrayMin];

  // big loop through all factors
  for (let j = 0, jLen = userSelectedFactors.length; j < jLen; j++) {
    let name = userSelectedFactors[j];
    let facNum = name.slice(7);
    sheetNamesXlsx.push(`${"Fac"} ${facNum} - ${appendText1}`);

    const columns = [
      {
        wch: 8,
      },
      {
        wch: 80,
      },
      {
        wch: 8,
      },
      {
        wch: 12,
      },
    ];
    colSizes.push(columns);

    // highest, higher than all other factors, lower than all other factors, lowest
    cribArray2 = [[], [], [], []];

    const factorInformation2 = synFactorArray1Holder[j];

    // add sort key
    const factorInformation = factorInformation2.map((item, index) => {
      item.highLowZorder = index + 1;
      return item;
    });

    // sort by statement number
    factorInformation.sort(
      (a, b) => a[statementNumTrans] - b[statementNumTrans]
    );

    // append the ranking arrays
    for (let k = 0, kLen = factorInformation.length; k < kLen; k++) {
      factorInformation[k].rankArray = statementRankingArray[k];
    }

    // resort back to high to low z-score sort
    factorInformation.sort((a, b) => {
      if (b.highLowZorder === a.highLowZorder) {
        return a[statementNumTrans] - b[statementNumTrans];
      }
      return b[zScoreTrans] - a[zScoreTrans];
    });

    // push highest to cribArray
    const highestStatements = getCribSheetsHighestStatements(
      j,
      minCounts,
      factorInformation,
      statementNumTrans,
      statementTrans,
      sortValuesTrans
    );

    cribArray2[0] = [...highestStatements];

    // push lowest to cribArray
    const lowestStatements = getCribSheetsLowestStatements(
      j,
      maxCounts,
      factorInformation,
      statementNumTrans,
      statementTrans,
      sortValuesTrans
    );

    cribArray2[3] = [...lowestStatements];

    const higherStatements = getCribSheetsRankedHigherThanOtherFactors(
      j,
      factorInformation,
      sortValuesTrans,
      statementTrans,
      statementNumTrans
    );

    cribArray2[1] = [...higherStatements];

    const lowerStatements = getCribSheetsRankedLowerThanOtherFactors(
      j,
      factorInformation,
      sortValuesTrans,
      statementTrans,
      statementNumTrans
    );

    cribArray2[2] = [...lowerStatements];

    const spacerArray = ["", ""];

    // construct headers for statement groups
    const facName = `${"Factor"} ${userSelectedFactors[j].slice(7)}`;

    // create column headers for other factors
    const otherFactorNames = cloneDeep(userSelectedFactors);
    otherFactorNames.splice(j, 1);

    // translate user selected factors
    const translatedFactorNames = [];
    otherFactorNames.forEach((item) => {
      const number = item.slice(7);
      translatedFactorNames.push(`${"Factor"} ${number}`);
    });

    // format worksheet
    const higherRankedHeader = [
      "",
      appendTextHeader2a + facName + appendTextHeader2b,
    ];

    // "Relative Ranking of Statements in"
    const header1 = ["", appendText2 + facName];
    // header row
    const header0 = [nmTrans, statementsText, facName, appendText9].concat(
      translatedFactorNames
    );

    cribArray2[0].unshift(
      ["Relative Ranks", ""],
      spacerArray,
      header1,
      spacerArray,
      ["", appendTextHeader1], // "Highest Ranked Statements"
      // ["", "", "", appendText8],
      header0
    );

    cribArray2[1].unshift(spacerArray, higherRankedHeader, header0);

    const header3 = {};
    header3.stateNum = "";
    header3.statement = appendTextHeader3a + facName + appendTextHeader3b;
    header3.sortValue = "";
    cribArray2[2].unshift(
      spacerArray,
      ["", appendTextHeader3a + facName + appendTextHeader3b, ""],
      header0
    );

    const header4 = {};
    header4.stateNum = "";
    header4.statement = appendTextHeader4;
    header4.sortValue = "";
    cribArray2[3].unshift(spacerArray, ["", appendTextHeader4, ""], header0);

    outputData.push(flatten(cribArray2));
  }
  console.log("dispatch - 18 - pushCribSheets complete");
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushCribSheetsToOutput;
