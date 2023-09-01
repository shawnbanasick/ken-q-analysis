import calcMultiplierArray from "../../../S1-data/Excel2/calcMultiplierArrayT2";

const parameter1 = [
  -4, -4, -3, -3, -3, -2, -2, -2, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4,
];

const testValue1 = [0, 0, 2, 3, 4, 5, 5, 5, 4, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0];

test("calc multiplier array", () => {
  let value1 = calcMultiplierArray(parameter1);
  expect(value1).toEqual(testValue1);
});
