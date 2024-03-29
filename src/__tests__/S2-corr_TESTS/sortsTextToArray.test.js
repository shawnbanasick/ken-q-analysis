import { sortsTextToArray } from "../../S1-data/PQMethod/sortsTextToArray";

let originalSortSize = 33;
let array = [
  "US1       -1 0-2 0-2 1 0-1 0-1 1 1 2 3-1-4-3-3-1-4 3 2 3 1 1 0 4 2 2-3-2-2 4",
  "US2       -1 0-1-3 2 3 1 1-4 0 2-1 4-1 1-3 0-2-2 0 3-2 1 0 2 1 2 3-1-4-2-3 4",
  "US3        2-2-2 4-1 0-4-3 1-4-3 3 3 2 0-3 2-1 1 0 1-2 0 2-2 3 1-1 0-1-1 4 1",
  "US4        3 1-3-1-1 3-3-2 0-4-1 0 3-2-3-4-1 2 4-2 4 1 1-2 0 1-1 2 0 2 1 2 0",
  "JP5       -4-1 3-1 1 1 4 2-4 4 2 0-1 3 0 2 0-2-2 0-1 2 1-3-3-3 3 0 1-2 1-2-1",
  "CA6        1-3 0 3 3 4-2 0-2-2 1-1 1 0-4 3-1 0 1-1-2-3-1-4 2 2 0 4-1 2 1 2-3",
  "UK7        2 0-2 1 0 1-1-3 0-1 1-1 1 2-4 4 3 2 0 2-2-1-3-4 3-2 0 4-3 1-1 3-2",
  "US8       -2 2 0-3-4 4 0-1-1-1 1-1 1-1 4 0 0 1-3 1 2 2 3 3-3 1-4 3 0-2-2-2 2",
  "FR9        3 1 0 1-4-3 2 2-2 0 0-2 1 4-1-2 2-1 2 1 3-3-3-2 1 0-1-4 0-1 3-1 4",
  "",
];

let names = [
  "US1     ",
  "US2     ",
  "US3     ",
  "US4     ",
  "JP5     ",
  "CA6     ",
  "UK7     ",
  "US8     ",
  "FR9     ",
];
// let mainDataArray = [{"name":"US1     ","posShiftSort":[4,5,3,5,3,6,5,4,5,4,6,6,7,8,4,1,2,2,4,1,8,7,8,6,6,5,9,7,7,2,3,3,9],"rawSort":[-1,0,-2,0,-2,1,0,-1,0,-1,1,1,2,3,-1,-4,-3,-3,-1,-4,3,2,3,1,1,0,4,2,2,-3,-2,-2,4],"displaySort":"-1,0,-2,0,-2,1,0,-1,0,-1,1,1,2,3,-1,-4,-3,-3,-1,-4,3,2,3,1,1,0,4,2,2,-3,-2,-2,4"},{"name":"US2     ","posShiftSort":[4,5,4,2,7,8,6,6,1,5,7,4,9,4,6,2,5,3,3,5,8,3,6,5,7,6,7,8,4,1,3,2,9],"rawSort":[-1,0,-1,-3,2,3,1,1,-4,0,2,-1,4,-1,1,-3,0,-2,-2,0,3,-2,1,0,2,1,2,3,-1,-4,-2,-3,4],"displaySort":"-1,0,-1,-3,2,3,1,1,-4,0,2,-1,4,-1,1,-3,0,-2,-2,0,3,-2,1,0,2,1,2,3,-1,-4,-2,-3,4"},{"name":"US3     ","posShiftSort":[7,3,3,9,4,5,1,2,6,1,2,8,8,7,5,2,7,4,6,5,6,3,5,7,3,8,6,4,5,4,4,9,6],"rawSort":[2,-2,-2,4,-1,0,-4,-3,1,-4,-3,3,3,2,0,-3,2,-1,1,0,1,-2,0,2,-2,3,1,-1,0,-1,-1,4,1],"displaySort":"2,-2,-2,4,-1,0,-4,-3,1,-4,-3,3,3,2,0,-3,2,-1,1,0,1,-2,0,2,-2,3,1,-1,0,-1,-1,4,1"},{"name":"US4     ","posShiftSort":[8,6,2,4,4,8,2,3,5,1,4,5,8,3,2,1,4,7,9,3,9,6,6,3,5,6,4,7,5,7,6,7,5],"rawSort":[3,1,-3,-1,-1,3,-3,-2,0,-4,-1,0,3,-2,-3,-4,-1,2,4,-2,4,1,1,-2,0,1,-1,2,0,2,1,2,0],"displaySort":"3,1,-3,-1,-1,3,-3,-2,0,-4,-1,0,3,-2,-3,-4,-1,2,4,-2,4,1,1,-2,0,1,-1,2,0,2,1,2,0"},{"name":"JP5     ","posShiftSort":[1,4,8,4,6,6,9,7,1,9,7,5,4,8,5,7,5,3,3,5,4,7,6,2,2,2,8,5,6,3,6,3,4],"rawSort":[-4,-1,3,-1,1,1,4,2,-4,4,2,0,-1,3,0,2,0,-2,-2,0,-1,2,1,-3,-3,-3,3,0,1,-2,1,-2,-1],"displaySort":"-4,-1,3,-1,1,1,4,2,-4,4,2,0,-1,3,0,2,0,-2,-2,0,-1,2,1,-3,-3,-3,3,0,1,-2,1,-2,-1"},{"name":"CA6     ","posShiftSort":[6,2,5,8,8,9,3,5,3,3,6,4,6,5,1,8,4,5,6,4,3,2,4,1,7,7,5,9,4,7,6,7,2],"rawSort":[1,-3,0,3,3,4,-2,0,-2,-2,1,-1,1,0,-4,3,-1,0,1,-1,-2,-3,-1,-4,2,2,0,4,-1,2,1,2,-3],"displaySort":"1,-3,0,3,3,4,-2,0,-2,-2,1,-1,1,0,-4,3,-1,0,1,-1,-2,-3,-1,-4,2,2,0,4,-1,2,1,2,-3"},{"name":"UK7     ","posShiftSort":[7,5,3,6,5,6,4,2,5,4,6,4,6,7,1,9,8,7,5,7,3,4,2,1,8,3,5,9,2,6,4,8,3],"rawSort":[2,0,-2,1,0,1,-1,-3,0,-1,1,-1,1,2,-4,4,3,2,0,2,-2,-1,-3,-4,3,-2,0,4,-3,1,-1,3,-2],"displaySort":"2,0,-2,1,0,1,-1,-3,0,-1,1,-1,1,2,-4,4,3,2,0,2,-2,-1,-3,-4,3,-2,0,4,-3,1,-1,3,-2"},{"name":"US8     ","posShiftSort":[3,7,5,2,1,9,5,4,4,4,6,4,6,4,9,5,5,6,2,6,7,7,8,8,2,6,1,8,5,3,3,3,7],"rawSort":[-2,2,0,-3,-4,4,0,-1,-1,-1,1,-1,1,-1,4,0,0,1,-3,1,2,2,3,3,-3,1,-4,3,0,-2,-2,-2,2],"displaySort":"-2,2,0,-3,-4,4,0,-1,-1,-1,1,-1,1,-1,4,0,0,1,-3,1,2,2,3,3,-3,1,-4,3,0,-2,-2,-2,2"},{"name":"FR9     ","posShiftSort":[8,6,5,6,1,2,7,7,3,5,5,3,6,9,4,3,7,4,7,6,8,2,2,3,6,5,4,1,5,4,8,4,9],"rawSort":[3,1,0,1,-4,-3,2,2,-2,0,0,-2,1,4,-1,-2,2,-1,2,1,3,-3,-3,-2,1,0,-1,-4,0,-1,3,-1,4],"displaySort":"3,1,0,1,-4,-3,2,2,-2,0,0,-2,1,4,-1,-2,2,-1,2,1,3,-3,-3,-2,1,0,-1,-4,0,-1,3,-1,4"}];

let US1PosShiftSort = [
  4, 5, 3, 5, 3, 6, 5, 4, 5, 4, 6, 6, 7, 8, 4, 1, 2, 2, 4, 1, 8, 7, 8, 6, 6, 5,
  9, 7, 7, 2, 3, 3, 9,
];
let US1RawSort = [
  -1, 0, -2, 0, -2, 1, 0, -1, 0, -1, 1, 1, 2, 3, -1, -4, -3, -3, -1, -4, 3, 2,
  3, 1, 1, 0, 4, 2, 2, -3, -2, -2, 4,
];
let US1DisplaySort =
  "-1,0,-2,0,-2,1,0,-1,0,-1,1,1,2,3,-1,-4,-3,-3,-1,-4,3,2,3,1,1,0,4,2,2,-3,-2,-2,4";

test("pull names from sorts text", () => {
  let value1 = sortsTextToArray(array, originalSortSize, -4);
  expect(value1[0]).toEqual(names);
  expect(value1[1][0].posShiftSort).toEqual(US1PosShiftSort);
  expect(value1[1][0].rawSort).toEqual(US1RawSort);
  expect(value1[1][0].displaySort).toEqual(US1DisplaySort);
});
