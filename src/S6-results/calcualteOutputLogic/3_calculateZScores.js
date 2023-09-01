import evenRound from "../../Utils/evenRound";
import S1DataSlice from "../../State/S1DataSlice";
import S6DataSlice from "../../State/S6DataSlice";

const calculateZScores = function (summedWeightedSorts) {
  // changing format from MD array to array of objects
  // getState add in statements
  const statements = S1DataSlice.getState().statements;
  const sigFactorNumbersArray = S6DataSlice.getState().sigFactorNumbersArray;
  // so that the diff 2 factors output is correct
  sigFactorNumbersArray.sort();
  const length = summedWeightedSorts.length;
  const zScoreArray = [];

  for (let i = 0; i < length; i++) {
    const zScoreTempObj = {};
    zScoreTempObj.factor = sigFactorNumbersArray[i];
    const tempArray1 = [];
    const zScoreTempArray = [];
    for (let j = 0; j < summedWeightedSorts[0][2].length; j++) {
      const tempObj = {};
      const zScore = evenRound(summedWeightedSorts[i][2][j], 3);

      tempObj.factor = sigFactorNumbersArray[i];
      tempObj.statement = j + 1;
      tempObj.sortStatement = statements[j];
      tempObj.zScore = zScore;

      zScoreTempArray.push(zScore);
      tempArray1.push(tempObj);
    }
    zScoreArray.push(tempArray1);
    zScoreTempObj[`FactorZscores${sigFactorNumbersArray[i]}`] = zScoreTempArray;
  }
  return zScoreArray;
};

export default calculateZScores;
