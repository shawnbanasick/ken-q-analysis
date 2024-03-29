import grabRespondentNamesAndSorts from "../../../S1-data/Excel1/grabRespondentNamesAndSorts";

// prettier-ignore
const parameter1 =  ["Project Name,,,,,,,Do not change the blue cells,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","lipset unforced,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","Sort Pattern,-4,-4,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,4,4,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","participants,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","US1,-1,0,-2,0,-2,1,0,-1,0,-1,1,1,2,3,-1,-4,-3,-3,-1,-4,3,2,3,1,1,0,4,2,2,-3,-2,-2,4,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","US2,-1,0,-1,-3,2,3,1,1,-4,0,2,-1,4,-1,1,-3,0,-2,-2,0,3,-2,1,0,2,1,2,3,-1,-4,-2,-3,4,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","US3,2,-2,-2,4,-1,0,-4,-3,1,-4,-3,3,3,2,0,-3,2,-1,1,0,1,-2,0,2,-2,3,1,-1,0,-1,-1,4,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","US4,3,1,-3,-1,-1,3,-3,-2,0,-4,-1,0,3,-2,-3,-4,-1,2,4,-2,4,1,1,-2,0,1,-1,2,0,2,1,2,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","JP5,-4,-1,3,-1,1,1,4,2,-4,4,2,0,-1,3,0,2,0,-2,-2,0,-1,2,1,-3,-3,-3,3,0,1,-2,1,-2,-1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","CA6,1,-3,0,3,3,4,-2,0,-2,-2,1,-1,1,0,-4,3,-1,0,1,-1,-2,-3,-1,-4,2,2,0,4,-1,2,1,2,-3,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","UK7,2,0,-2,1,0,1,-1,-3,0,-1,1,-1,1,2,-4,4,3,2,0,2,-2,-1,-3,-4,3,-2,0,4,-3,1,-1,3,-2,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","US8,-2,2,0,-3,-4,4,0,-1,-1,-1,1,-1,1,-1,4,0,0,1,-3,1,2,2,3,3,-3,1,-4,3,0,-2,-2,-2,2,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,","FR9,3,1,0,1,-4,-3,2,2,-2,0,0,-2,1,4,-1,-2,2,-1,2,1,3,-3,-3,-2,1,0,-1,-4,0,-1,3,-1,4,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"]; // prettier-ignore

const testValue1 = [
  "US1",
  "US2",
  "US3",
  "US4",
  "JP5",
  "CA6",
  "UK7",
  "US8",
  "FR9",
];

const testValue2 = [
  "US1,-1,0,-2,0,-2,1,0,-1,0,-1,1,1,2,3,-1,-4,-3,-3,-1,-4,3,2,3,1,1,0,4,2,2,-3,-2,-2,4",
  "US2,-1,0,-1,-3,2,3,1,1,-4,0,2,-1,4,-1,1,-3,0,-2,-2,0,3,-2,1,0,2,1,2,3,-1,-4,-2,-3,4",
  "US3,2,-2,-2,4,-1,0,-4,-3,1,-4,-3,3,3,2,0,-3,2,-1,1,0,1,-2,0,2,-2,3,1,-1,0,-1,-1,4,1",
  "US4,3,1,-3,-1,-1,3,-3,-2,0,-4,-1,0,3,-2,-3,-4,-1,2,4,-2,4,1,1,-2,0,1,-1,2,0,2,1,2,0",
  "JP5,-4,-1,3,-1,1,1,4,2,-4,4,2,0,-1,3,0,2,0,-2,-2,0,-1,2,1,-3,-3,-3,3,0,1,-2,1,-2,-1",
  "CA6,1,-3,0,3,3,4,-2,0,-2,-2,1,-1,1,0,-4,3,-1,0,1,-1,-2,-3,-1,-4,2,2,0,4,-1,2,1,2,-3",
  "UK7,2,0,-2,1,0,1,-1,-3,0,-1,1,-1,1,2,-4,4,3,2,0,2,-2,-1,-3,-4,3,-2,0,4,-3,1,-1,3,-2",
  "US8,-2,2,0,-3,-4,4,0,-1,-1,-1,1,-1,1,-1,4,0,0,1,-3,1,2,2,3,3,-3,1,-4,3,0,-2,-2,-2,2",
  "FR9,3,1,0,1,-4,-3,2,2,-2,0,0,-2,1,4,-1,-2,2,-1,2,1,3,-3,-3,-2,1,0,-1,-4,0,-1,3,-1,4",
];
const testValue3 = [
  [
    -1, 0, -2, 0, -2, 1, 0, -1, 0, -1, 1, 1, 2, 3, -1, -4, -3, -3, -1, -4, 3, 2,
    3, 1, 1, 0, 4, 2, 2, -3, -2, -2, 4,
  ],
  [
    -1, 0, -1, -3, 2, 3, 1, 1, -4, 0, 2, -1, 4, -1, 1, -3, 0, -2, -2, 0, 3, -2,
    1, 0, 2, 1, 2, 3, -1, -4, -2, -3, 4,
  ],
  [
    2, -2, -2, 4, -1, 0, -4, -3, 1, -4, -3, 3, 3, 2, 0, -3, 2, -1, 1, 0, 1, -2,
    0, 2, -2, 3, 1, -1, 0, -1, -1, 4, 1,
  ],
  [
    3, 1, -3, -1, -1, 3, -3, -2, 0, -4, -1, 0, 3, -2, -3, -4, -1, 2, 4, -2, 4,
    1, 1, -2, 0, 1, -1, 2, 0, 2, 1, 2, 0,
  ],
  [
    -4, -1, 3, -1, 1, 1, 4, 2, -4, 4, 2, 0, -1, 3, 0, 2, 0, -2, -2, 0, -1, 2, 1,
    -3, -3, -3, 3, 0, 1, -2, 1, -2, -1,
  ],
  [
    1, -3, 0, 3, 3, 4, -2, 0, -2, -2, 1, -1, 1, 0, -4, 3, -1, 0, 1, -1, -2, -3,
    -1, -4, 2, 2, 0, 4, -1, 2, 1, 2, -3,
  ],
  [
    2, 0, -2, 1, 0, 1, -1, -3, 0, -1, 1, -1, 1, 2, -4, 4, 3, 2, 0, 2, -2, -1,
    -3, -4, 3, -2, 0, 4, -3, 1, -1, 3, -2,
  ],
  [
    -2, 2, 0, -3, -4, 4, 0, -1, -1, -1, 1, -1, 1, -1, 4, 0, 0, 1, -3, 1, 2, 2,
    3, 3, -3, 1, -4, 3, 0, -2, -2, -2, 2,
  ],
  [
    3, 1, 0, 1, -4, -3, 2, 2, -2, 0, 0, -2, 1, 4, -1, -2, 2, -1, 2, 1, 3, -3,
    -3, -2, 1, 0, -1, -4, 0, -1, 3, -1, 4,
  ],
];

test("", () => {
  let value1 = grabRespondentNamesAndSorts(parameter1);
  expect(value1[0]).toEqual(testValue1);
  expect(value1[1]).toEqual(testValue2);
  expect(value1[2]).toEqual(testValue3);
});
