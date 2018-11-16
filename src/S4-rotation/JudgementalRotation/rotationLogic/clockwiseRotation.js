import transposeMatrix from "../../../Utils/transposeMatrix";
import evenRound from "../../../Utils/evenRound";
import calcCosDegrees from "./calcCosDegrees";
import calcSinDegrees from "./calcSinDegrees";
import store from "../../../store";

const clockwiseRotation = function(
  calculateRotationsArray,
  rotationByDegree,
  rotationDegrees
) {
  let transposedArray = transposeMatrix(calculateRotationsArray);
  let sinDegreesValue = calcSinDegrees(rotationByDegree);
  let cosDegreesValue = calcCosDegrees(rotationByDegree);
  rotationDegrees = rotationDegrees + rotationByDegree;
  store.setState({
    rotationDegrees: rotationDegrees
  });

  let valueA, valueB, tempArray;
  let len = transposedArray[0].length;
  let a1Calculations, b1Calculations;
  let a2Calculations, b2Calculations;
  let rotatedFactorsArray = [];

  for (let k = 0; k < len; k++) {
    a1Calculations = transposedArray[1][k] * sinDegreesValue;
    b1Calculations = transposedArray[0][k] * cosDegreesValue;
    valueA = evenRound(a1Calculations + b1Calculations, 5);
    a2Calculations = transposedArray[0][k] * sinDegreesValue;
    b2Calculations = transposedArray[1][k] * cosDegreesValue;
    valueB = evenRound(-(a2Calculations - b2Calculations), 5);
    tempArray = [];
    tempArray[0] = valueA;
    tempArray[1] = valueB;
    rotatedFactorsArray.push(tempArray);
  }
  return rotatedFactorsArray;
};

export default clockwiseRotation;

// [[-0.19155,0.59172],[-0.33334,0.32119],[0.45511,0.46076],[0.41447,0.42274],[-0.63599,-0.44686],[0.4263,-0.33757],[0.52576,-0.37392],[-0.4641,0.33732],[0.02304,0.09988]]
