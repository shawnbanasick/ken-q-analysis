import S6DataSlice from "../../State/S6DataSlice";

const data = () => {
  let outputForDataViz = S6DataSlice.getState().outputForDataViz;
  // let outputForDataViz2 = S6DataSlice.getState().outputForDataViz2;
  // getState - if first time -> get data from output function

  if (outputForDataViz.length !== 0) {
    // outputForDataViz = outputForDataViz2;
  }

  for (let j = 0; j < outputForDataViz.length; j += 1) {
    for (let k = 0; k < outputForDataViz[j].length; k += 1) {
      const stateNum = outputForDataViz[j][k].statement;
      const statement = outputForDataViz[j][k].sortStatement;
      outputForDataViz[j][k].sortStatementAndNums = `${stateNum}. ${statement}`;
    }
  }

  // sort by sort values, then by Z-scores
  for (let i = 0; i < outputForDataViz.length; i += 1) {
    outputForDataViz[i].sort((a, b) => {
      if (a.sortValue > b.sortValue) {
        return 1;
      }
      if (a.sortValue < b.sortValue) {
        return -1;
      }
      // secondary sorting to make it easier to check results - high zscore to low
      if (a.zScore < b.zScore) {
        return 1;
      }
      if (a.zScore > b.zScore) {
        return -1;
      }
      return 0;
    });
  }
  return outputForDataViz;
};

export default data;
