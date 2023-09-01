import shiftRawSortsPositive from "../../../S1-data/dataUtilities/shiftRawSortsPositive";

const parameter1 = [
  -3, 5, 5, -1, 0, -2, 0, 4, -1, 2, -5, 4, 2, -2, -1, 0, 1, -2, -3, 1, 4, -1,
  -4, 0, 4, 5, -3, 2, 0, 1, -5, -5, -3, 3, -3, 3, 1, -2, -1, -2, -2, 0, -4, -4,
  1, -3, -4, 3, -4, 2, 4, 1, 1, -2, 0, -2, 3, -1, 3, 5, 1, -1, 2, 3, -1, -5, 2,
  -3, 0, 0, 1, 4, 2, 2, 0, 3, -5, 5, -4, -1,
];
const parameter2 = -5;

const testValue1 = [
  3, 11, 11, 5, 6, 4, 6, 10, 5, 8, 1, 10, 8, 4, 5, 6, 7, 4, 3, 7, 10, 5, 2, 6,
  10, 11, 3, 8, 6, 7, 1, 1, 3, 9, 3, 9, 7, 4, 5, 4, 4, 6, 2, 2, 7, 3, 2, 9, 2,
  8, 10, 7, 7, 4, 6, 4, 9, 5, 9, 11, 7, 5, 8, 9, 5, 1, 8, 3, 6, 6, 7, 10, 8, 8,
  6, 9, 1, 11, 2, 5,
];

test("shift raw sorts positive", () => {
  let value1 = shiftRawSortsPositive(parameter1, parameter2);
  expect(value1).toEqual(testValue1);
});
