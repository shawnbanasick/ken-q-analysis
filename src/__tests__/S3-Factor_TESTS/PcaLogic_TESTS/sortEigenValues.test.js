import sortEigenValues from "../../../S3-factor/PcaLogic/sortEigenValues";

const parameter1 = [
  2.383773189005688,
  2.01532507454543,
  1.3408286262679792,
  1.1273546328374817,
  0.16789266285013338,
  0.7322316184562889,
  0.31957480438566027,
  0.5116923670933565,
  0.4013270245579843
];

const testValue1 = [
  2.383773189005688,
  2.01532507454543,
  1.3408286262679792,
  1.1273546328374817,
  0.7322316184562889,
  0.5116923670933565,
  0.4013270245579843,
  0.31957480438566027,
  0.16789266285013338
];

test("sort eigen values", () => {
  let value1 = sortEigenValues(parameter1);
  expect(value1).toEqual(testValue1);
});