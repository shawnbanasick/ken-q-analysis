import calcSortTriangleShapeT2 from "../../../S1-data/Excel2/calcSortTriangleShapeT2";

let parameter1 =
  "Sort Pattern,-4, -4, -3, -3, -3, -2, -2, -2, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,";
const testValue1 = [
  -4, -4, -3, -3, -3, -2, -2, -2, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4,
];

test("calc sort triangle shape T2", () => {
  let value1 = calcSortTriangleShapeT2(parameter1);
  expect(value1[0]).toEqual(testValue1);
  expect(value1[1]).toEqual(testValue1);
  expect(value1[2]).toEqual(testValue1);
});
