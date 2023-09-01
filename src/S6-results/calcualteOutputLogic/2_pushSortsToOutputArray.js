import average from "../../Utils/average";
import evenRound from "../../Utils/evenRound";
import standardDeviation from "../../Utils/standardDeviation";
import cloneDeep from "lodash/cloneDeep";
import S1DataSlice from "../../State/S1DataSlice";
import S6DataSlice from "../../State/S6DataSlice";

const pushSortsToOutputArray = function (outputData, sheetNamesXlsx, colSizes) {
  // get translations
  const qSortsTrans = "Q sorts";
  const participantTrans = "Participant";
  const qSortTrans = "Q sorts";
  const meanTrans = "Mean";
  const stddevTrans = "St Dev";
  const standardDeviationTrans = "Standard Deviation";

  // no translation so that Excel Type 3 import continues to work
  sheetNamesXlsx.push("Q sorts");

  // getState
  const mainDataObject = cloneDeep(S1DataSlice.getState().mainDataObject);
  const respondentNames = cloneDeep(S1DataSlice.getState().respondentNames);
  const dataArray = [];

  // pull sorts from mainDataObject
  const sortsAsNumbers = [];
  const posShiftSort = [];
  for (let r = 0, rLen = mainDataObject.length; r < rLen; r++) {
    const temp1 = mainDataObject[r].rawSort;
    const temp2 = mainDataObject[r].posShiftSort;
    sortsAsNumbers.push(temp1);
    posShiftSort.push(temp2);
  }

  const sortsAsNumbers1 = cloneDeep(sortsAsNumbers);

  S6DataSlice.setState({ posShiftSortArray: posShiftSort });
  S6DataSlice.setState({ sortsAsNumbers: sortsAsNumbers1 });

  // set up column widths
  const columns = [
    {
      wch: 15,
    },
  ];
  for (let ii = 0, iiLen = sortsAsNumbers[0].length + 2; ii < iiLen; ii++) {
    columns.push({
      wch: 5,
    });
  }
  colSizes.push(columns);

  let stddev, statementSort;
  // create sheet header
  const headerArray = [participantTrans];
  for (let jj = 0, jjLen = sortsAsNumbers[0].length; jj < jjLen; jj++) {
    statementSort = `S${jj + 1}`;
    headerArray.push(statementSort);
  }
  headerArray.push(meanTrans, standardDeviationTrans);
  dataArray.push(
    ["sorts", ""],
    ["", ""],
    [qSortsTrans, ""],
    ["", ""],
    headerArray
  );

  const freeDistributionArray = [["", qSortTrans, meanTrans, stddevTrans]];
  // push in sorts, means, and standard devs
  for (let kk = 0, kkLen = sortsAsNumbers.length; kk < kkLen; kk++) {
    const tempArray1 = [];
    const resNum = kk + 1;
    const average3 = evenRound(average(sortsAsNumbers[kk]), 3);
    stddev = evenRound(standardDeviation(sortsAsNumbers[kk]), 3);
    sortsAsNumbers[kk].unshift(respondentNames[kk]);
    sortsAsNumbers[kk].push(average3, stddev);
    tempArray1.push(resNum, respondentNames[kk], average3, stddev);
    dataArray.push(sortsAsNumbers[kk]);
    freeDistributionArray.push(tempArray1);
  }
  outputData.push(dataArray);

  S6DataSlice.setState({ freeDistributionArray: freeDistributionArray });

  console.log("dispatch - 3 - pushSorts complete");

  return [outputData, sheetNamesXlsx, colSizes];
  // freeDistributionArray, posShiftSort, sortsAsNumbers1
};

export default pushSortsToOutputArray;
