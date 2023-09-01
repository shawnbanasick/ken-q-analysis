import S1DataSlice from "../../State/S1DataSlice";
import S2DataSlice from "../../State/S2DataSlice";
import cloneDeep from "lodash/cloneDeep";

const pushCorrelationArray = function (outputData, sheetNamesXlsx, colSizes) {
  sheetNamesXlsx.push("Correlation Matrix");
  // getState
  const correlationMatrix = cloneDeep(
    S2DataSlice.getState().correlationTableArray
  );

  const respondentNames = cloneDeep(S1DataSlice.getState().respondentNames);

  // to add respondent names to matrix
  for (let i = 0, iLen = correlationMatrix.length; i < iLen; i++) {
    correlationMatrix[i].unshift(respondentNames[i]);
  }

  // to get max respondent name length
  let respondentNameMaxLength = 0;
  for (let j = 0, jLen = respondentNames.length; j < jLen; j++) {
    const temp1 = respondentNames[j].length;
    if (temp1 > respondentNameMaxLength) {
      respondentNameMaxLength = temp1;
    }
  }
  if (respondentNameMaxLength < 5) {
    respondentNameMaxLength = 5;
  }

  // to set up column spacing
  const columns = [];
  for (let j = 0, jLen = correlationMatrix[0].length + 1; j < jLen; j++) {
    columns.push({
      wch: respondentNameMaxLength,
    });
  }
  colSizes.push(columns);

  // to format table header correctly
  respondentNames.unshift("Participant");

  // to add headers to table display
  correlationMatrix.unshift(
    ["correlations", ""],
    ["", ""],
    ["Correlations between Q sorts"],
    ["", ""],
    respondentNames
  );
  outputData.push(correlationMatrix);

  console.log("dispatch - 4 - pushCorrelations complete");
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushCorrelationArray;
