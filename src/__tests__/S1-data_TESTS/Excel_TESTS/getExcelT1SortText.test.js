import { getExcelT1SortText } from "../../../S1-data/Excel1/getExcelT1SortText";

// prettier-ignore
const parameter1 =  [["Number of Statements in Each Sort Column?","","","","","","","","","","","","","","","","","","","","","","","","",""],["-6","","","","","","","","","","","","","","","","","","","","","","","","",""],["-5","","","","","","","","","","","","","","","","","","","","","","","","",""],["-4","2","","","","","","","","","","","","","","","","","","","","","","","",""],["-3","3","","","","","","","","","","","","","","","","","","","","","","","",""],["-2","4","","","","","","","","","","","","","","","","","","","","","","","",""],["-1","5","","","","","","","","","","","","","","","","","","","","","","","",""],["0","5","","","","","","","","","","","","","","","","","","","","","","","",""],["1","5","","","","","","","","","","","","","","","","","","","","","","","",""],["2","4","","","","","","","","","","","","","","","","","","","","","","","",""],["3","3","","","","","","","","","","","","","","","","","","","","","","","",""],["4","2","","","","","","","","","","","","","","","","","","","","","","","",""],["5","","","","","","","","","","","","","","","","","","","","","","","","",""],["6","","","","","","","","","","","","","","","","","","","","","","","","",""],["7","","","","","","","","","","","","","","","","","","","","","","","","",""],["8","","","","","","","","","","","","","","","","","","","","","","","","",""],["9","","","","","","","","","","","","","","","","","","","","","","","","",""],["10","","","","","","","","","","","","","","","","","","","","","","","","",""],["11","","","","","","","","","","","","","","","","","","","","","","","","",""],["12","","","","","","","","","","","","","","","","","","","","","","","","",""],["13","","","","","","","","","","","","","","","","","","","","","","","","",""],["","Respondent Name and Statement Number:","","","","","","","","","","","","","","","","","","","","","","","",""],["Sort Value","US1","US2","US3","US4","JP5","CA6","UK7","US8","FR9","","","","","","","","","","","","","","","",""],["-4","16","30","10","10","9","24","24","27","5","","","","","","","","","","","","","","","",""],["-4","20","9","7","16","1","15","15","5","28","","","","","","","","","","","","","","","",""],["-3","17","16","16","7","24","33","29","19","22","","","","","","","","","","","","","","","",""],["-3","18","32","8","3","25","2","23","4","23","","","","","","","","","","","","","","","",""],["-3","30","4","11","15","26","22","8","25","6","","","","","","","","","","","","","","","",""],["-2","3","18","22","8","30","9","33","31","12","","","","","","","","","","","","","","","",""],["-2","5","31","3","20","18","21","21","30","9","","","","","","","","","","","","","","","",""],["-2","31","19","2","14","32","10","3","1","16","","","","","","","","","","","","","","","",""],["-2","32","22","25","24","19","7","26","32","24","","","","","","","","","","","","","","","",""],["-1","1","3","30","11","4","20","22","8","27","","","","","","","","","","","","","","","",""],["-1","8","1","18","5","33","17","10","10","30","","","","","","","","","","","","","","","",""],["-1","10","12","31","27","2","12","7","12","32","","","","","","","","","","","","","","","",""],["-1","15","29","5","17","13","29","12","9","18","","","","","","","","","","","","","","","",""],["-1","19","14","28","4","21","23","31","14","15","","","","","","","","","","","","","","","",""],["0","2","20","29","25","15","18","2","29","10","","","","","","","","","","","","","","","",""],["0","4","17","20","29","20","8","9","3","29","","","","","","","","","","","","","","","",""],["0","7","10","15","9","17","3","27","7","3","","","","","","","","","","","","","","","",""],["0","9","2","23","33","12","14","19","17","26","","","","","","","","","","","","","","","",""],["0","26","24","6","12","28","27","5","16","11","","","","","","","","","","","","","","","",""],["1","6","8","9","22","5","1","13","26","4","","","","","","","","","","","","","","","",""],["1","11","15","19","2","29","19","11","13","25","","","","","","","","","","","","","","","",""],["1","12","7","27","31","31","13","30","11","13","","","","","","","","","","","","","","","",""],["1","24","26","21","23","23","31","4","20","20","","","","","","","","","","","","","","","",""],["1","25","23","33","26","6","11","6","18","2","","","","","","","","","","","","","","","",""],["2","13","5","1","30","16","25","20","33","19","","","","","","","","","","","","","","","",""],["2","22","11","14","18","8","26","18","21","8","","","","","","","","","","","","","","","",""],["2","28","25","17","28","11","30","14","22","7","","","","","","","","","","","","","","","",""],["2","29","27","24","32","22","32","1","2","17","","","","","","","","","","","","","","","",""],["3","14","6","12","6","3","4","17","24","31","","","","","","","","","","","","","","","",""],["3","21","28","26","1","14","5","25","23","1","","","","","","","","","","","","","","","",""],["3","23","21","13","13","27","16","32","28","21","","","","","","","","","","","","","","","",""],["4","27","13","32","19","10","28","16","15","14","","","","","","","","","","","","","","","",""],["4","33","33","4","21","7","6","28","6","33","","","","","","","","","","","","","","","",""]];
// prettier-ignore

const parameter2 = 33;

const testValue1 = [
  [
    {
      sortValue: "Sort Value",
      statementNum: "US1",
    },
    {
      sortValue: "Sort Value",
      statementNum: "US2",
    },
    {
      sortValue: "Sort Value",
      statementNum: "US3",
    },
    {
      sortValue: "Sort Value",
      statementNum: "US4",
    },
    {
      sortValue: "Sort Value",
      statementNum: "JP5",
    },
    {
      sortValue: "Sort Value",
      statementNum: "CA6",
    },
    {
      sortValue: "Sort Value",
      statementNum: "UK7",
    },
    {
      sortValue: "Sort Value",
      statementNum: "US8",
    },
    {
      sortValue: "Sort Value",
      statementNum: "FR9",
    },
  ],
  [
    {
      sortValue: -4,
      statementNum: 16,
    },
    {
      sortValue: -4,
      statementNum: 30,
    },
    {
      sortValue: -4,
      statementNum: 10,
    },
    {
      sortValue: -4,
      statementNum: 10,
    },
    {
      sortValue: -4,
      statementNum: 9,
    },
    {
      sortValue: -4,
      statementNum: 24,
    },
    {
      sortValue: -4,
      statementNum: 24,
    },
    {
      sortValue: -4,
      statementNum: 27,
    },
    {
      sortValue: -4,
      statementNum: 5,
    },
  ],
  [
    {
      sortValue: -4,
      statementNum: 20,
    },
    {
      sortValue: -4,
      statementNum: 9,
    },
    {
      sortValue: -4,
      statementNum: 7,
    },
    {
      sortValue: -4,
      statementNum: 16,
    },
    {
      sortValue: -4,
      statementNum: 1,
    },
    {
      sortValue: -4,
      statementNum: 15,
    },
    {
      sortValue: -4,
      statementNum: 15,
    },
    {
      sortValue: -4,
      statementNum: 5,
    },
    {
      sortValue: -4,
      statementNum: 28,
    },
  ],
  [
    {
      sortValue: -3,
      statementNum: 17,
    },
    {
      sortValue: -3,
      statementNum: 16,
    },
    {
      sortValue: -3,
      statementNum: 16,
    },
    {
      sortValue: -3,
      statementNum: 7,
    },
    {
      sortValue: -3,
      statementNum: 24,
    },
    {
      sortValue: -3,
      statementNum: 33,
    },
    {
      sortValue: -3,
      statementNum: 29,
    },
    {
      sortValue: -3,
      statementNum: 19,
    },
    {
      sortValue: -3,
      statementNum: 22,
    },
  ],
  [
    {
      sortValue: -3,
      statementNum: 18,
    },
    {
      sortValue: -3,
      statementNum: 32,
    },
    {
      sortValue: -3,
      statementNum: 8,
    },
    {
      sortValue: -3,
      statementNum: 3,
    },
    {
      sortValue: -3,
      statementNum: 25,
    },
    {
      sortValue: -3,
      statementNum: 2,
    },
    {
      sortValue: -3,
      statementNum: 23,
    },
    {
      sortValue: -3,
      statementNum: 4,
    },
    {
      sortValue: -3,
      statementNum: 23,
    },
  ],
  [
    {
      sortValue: -3,
      statementNum: 30,
    },
    {
      sortValue: -3,
      statementNum: 4,
    },
    {
      sortValue: -3,
      statementNum: 11,
    },
    {
      sortValue: -3,
      statementNum: 15,
    },
    {
      sortValue: -3,
      statementNum: 26,
    },
    {
      sortValue: -3,
      statementNum: 22,
    },
    {
      sortValue: -3,
      statementNum: 8,
    },
    {
      sortValue: -3,
      statementNum: 25,
    },
    {
      sortValue: -3,
      statementNum: 6,
    },
  ],
  [
    {
      sortValue: -2,
      statementNum: 3,
    },
    {
      sortValue: -2,
      statementNum: 18,
    },
    {
      sortValue: -2,
      statementNum: 22,
    },
    {
      sortValue: -2,
      statementNum: 8,
    },
    {
      sortValue: -2,
      statementNum: 30,
    },
    {
      sortValue: -2,
      statementNum: 9,
    },
    {
      sortValue: -2,
      statementNum: 33,
    },
    {
      sortValue: -2,
      statementNum: 31,
    },
    {
      sortValue: -2,
      statementNum: 12,
    },
  ],
  [
    {
      sortValue: -2,
      statementNum: 5,
    },
    {
      sortValue: -2,
      statementNum: 31,
    },
    {
      sortValue: -2,
      statementNum: 3,
    },
    {
      sortValue: -2,
      statementNum: 20,
    },
    {
      sortValue: -2,
      statementNum: 18,
    },
    {
      sortValue: -2,
      statementNum: 21,
    },
    {
      sortValue: -2,
      statementNum: 21,
    },
    {
      sortValue: -2,
      statementNum: 30,
    },
    {
      sortValue: -2,
      statementNum: 9,
    },
  ],
  [
    {
      sortValue: -2,
      statementNum: 31,
    },
    {
      sortValue: -2,
      statementNum: 19,
    },
    {
      sortValue: -2,
      statementNum: 2,
    },
    {
      sortValue: -2,
      statementNum: 14,
    },
    {
      sortValue: -2,
      statementNum: 32,
    },
    {
      sortValue: -2,
      statementNum: 10,
    },
    {
      sortValue: -2,
      statementNum: 3,
    },
    {
      sortValue: -2,
      statementNum: 1,
    },
    {
      sortValue: -2,
      statementNum: 16,
    },
  ],
  [
    {
      sortValue: -2,
      statementNum: 32,
    },
    {
      sortValue: -2,
      statementNum: 22,
    },
    {
      sortValue: -2,
      statementNum: 25,
    },
    {
      sortValue: -2,
      statementNum: 24,
    },
    {
      sortValue: -2,
      statementNum: 19,
    },
    {
      sortValue: -2,
      statementNum: 7,
    },
    {
      sortValue: -2,
      statementNum: 26,
    },
    {
      sortValue: -2,
      statementNum: 32,
    },
    {
      sortValue: -2,
      statementNum: 24,
    },
  ],
  [
    {
      sortValue: -1,
      statementNum: 1,
    },
    {
      sortValue: -1,
      statementNum: 3,
    },
    {
      sortValue: -1,
      statementNum: 30,
    },
    {
      sortValue: -1,
      statementNum: 11,
    },
    {
      sortValue: -1,
      statementNum: 4,
    },
    {
      sortValue: -1,
      statementNum: 20,
    },
    {
      sortValue: -1,
      statementNum: 22,
    },
    {
      sortValue: -1,
      statementNum: 8,
    },
    {
      sortValue: -1,
      statementNum: 27,
    },
  ],
  [
    {
      sortValue: -1,
      statementNum: 8,
    },
    {
      sortValue: -1,
      statementNum: 1,
    },
    {
      sortValue: -1,
      statementNum: 18,
    },
    {
      sortValue: -1,
      statementNum: 5,
    },
    {
      sortValue: -1,
      statementNum: 33,
    },
    {
      sortValue: -1,
      statementNum: 17,
    },
    {
      sortValue: -1,
      statementNum: 10,
    },
    {
      sortValue: -1,
      statementNum: 10,
    },
    {
      sortValue: -1,
      statementNum: 30,
    },
  ],
  [
    {
      sortValue: -1,
      statementNum: 10,
    },
    {
      sortValue: -1,
      statementNum: 12,
    },
    {
      sortValue: -1,
      statementNum: 31,
    },
    {
      sortValue: -1,
      statementNum: 27,
    },
    {
      sortValue: -1,
      statementNum: 2,
    },
    {
      sortValue: -1,
      statementNum: 12,
    },
    {
      sortValue: -1,
      statementNum: 7,
    },
    {
      sortValue: -1,
      statementNum: 12,
    },
    {
      sortValue: -1,
      statementNum: 32,
    },
  ],
  [
    {
      sortValue: -1,
      statementNum: 15,
    },
    {
      sortValue: -1,
      statementNum: 29,
    },
    {
      sortValue: -1,
      statementNum: 5,
    },
    {
      sortValue: -1,
      statementNum: 17,
    },
    {
      sortValue: -1,
      statementNum: 13,
    },
    {
      sortValue: -1,
      statementNum: 29,
    },
    {
      sortValue: -1,
      statementNum: 12,
    },
    {
      sortValue: -1,
      statementNum: 9,
    },
    {
      sortValue: -1,
      statementNum: 18,
    },
  ],
  [
    {
      sortValue: -1,
      statementNum: 19,
    },
    {
      sortValue: -1,
      statementNum: 14,
    },
    {
      sortValue: -1,
      statementNum: 28,
    },
    {
      sortValue: -1,
      statementNum: 4,
    },
    {
      sortValue: -1,
      statementNum: 21,
    },
    {
      sortValue: -1,
      statementNum: 23,
    },
    {
      sortValue: -1,
      statementNum: 31,
    },
    {
      sortValue: -1,
      statementNum: 14,
    },
    {
      sortValue: -1,
      statementNum: 15,
    },
  ],
  [
    {
      sortValue: 0,
      statementNum: 2,
    },
    {
      sortValue: 0,
      statementNum: 20,
    },
    {
      sortValue: 0,
      statementNum: 29,
    },
    {
      sortValue: 0,
      statementNum: 25,
    },
    {
      sortValue: 0,
      statementNum: 15,
    },
    {
      sortValue: 0,
      statementNum: 18,
    },
    {
      sortValue: 0,
      statementNum: 2,
    },
    {
      sortValue: 0,
      statementNum: 29,
    },
    {
      sortValue: 0,
      statementNum: 10,
    },
  ],
  [
    {
      sortValue: 0,
      statementNum: 4,
    },
    {
      sortValue: 0,
      statementNum: 17,
    },
    {
      sortValue: 0,
      statementNum: 20,
    },
    {
      sortValue: 0,
      statementNum: 29,
    },
    {
      sortValue: 0,
      statementNum: 20,
    },
    {
      sortValue: 0,
      statementNum: 8,
    },
    {
      sortValue: 0,
      statementNum: 9,
    },
    {
      sortValue: 0,
      statementNum: 3,
    },
    {
      sortValue: 0,
      statementNum: 29,
    },
  ],
  [
    {
      sortValue: 0,
      statementNum: 7,
    },
    {
      sortValue: 0,
      statementNum: 10,
    },
    {
      sortValue: 0,
      statementNum: 15,
    },
    {
      sortValue: 0,
      statementNum: 9,
    },
    {
      sortValue: 0,
      statementNum: 17,
    },
    {
      sortValue: 0,
      statementNum: 3,
    },
    {
      sortValue: 0,
      statementNum: 27,
    },
    {
      sortValue: 0,
      statementNum: 7,
    },
    {
      sortValue: 0,
      statementNum: 3,
    },
  ],
  [
    {
      sortValue: 0,
      statementNum: 9,
    },
    {
      sortValue: 0,
      statementNum: 2,
    },
    {
      sortValue: 0,
      statementNum: 23,
    },
    {
      sortValue: 0,
      statementNum: 33,
    },
    {
      sortValue: 0,
      statementNum: 12,
    },
    {
      sortValue: 0,
      statementNum: 14,
    },
    {
      sortValue: 0,
      statementNum: 19,
    },
    {
      sortValue: 0,
      statementNum: 17,
    },
    {
      sortValue: 0,
      statementNum: 26,
    },
  ],
  [
    {
      sortValue: 0,
      statementNum: 26,
    },
    {
      sortValue: 0,
      statementNum: 24,
    },
    {
      sortValue: 0,
      statementNum: 6,
    },
    {
      sortValue: 0,
      statementNum: 12,
    },
    {
      sortValue: 0,
      statementNum: 28,
    },
    {
      sortValue: 0,
      statementNum: 27,
    },
    {
      sortValue: 0,
      statementNum: 5,
    },
    {
      sortValue: 0,
      statementNum: 16,
    },
    {
      sortValue: 0,
      statementNum: 11,
    },
  ],
  [
    {
      sortValue: 1,
      statementNum: 6,
    },
    {
      sortValue: 1,
      statementNum: 8,
    },
    {
      sortValue: 1,
      statementNum: 9,
    },
    {
      sortValue: 1,
      statementNum: 22,
    },
    {
      sortValue: 1,
      statementNum: 5,
    },
    {
      sortValue: 1,
      statementNum: 1,
    },
    {
      sortValue: 1,
      statementNum: 13,
    },
    {
      sortValue: 1,
      statementNum: 26,
    },
    {
      sortValue: 1,
      statementNum: 4,
    },
  ],
  [
    {
      sortValue: 1,
      statementNum: 11,
    },
    {
      sortValue: 1,
      statementNum: 15,
    },
    {
      sortValue: 1,
      statementNum: 19,
    },
    {
      sortValue: 1,
      statementNum: 2,
    },
    {
      sortValue: 1,
      statementNum: 29,
    },
    {
      sortValue: 1,
      statementNum: 19,
    },
    {
      sortValue: 1,
      statementNum: 11,
    },
    {
      sortValue: 1,
      statementNum: 13,
    },
    {
      sortValue: 1,
      statementNum: 25,
    },
  ],
  [
    {
      sortValue: 1,
      statementNum: 12,
    },
    {
      sortValue: 1,
      statementNum: 7,
    },
    {
      sortValue: 1,
      statementNum: 27,
    },
    {
      sortValue: 1,
      statementNum: 31,
    },
    {
      sortValue: 1,
      statementNum: 31,
    },
    {
      sortValue: 1,
      statementNum: 13,
    },
    {
      sortValue: 1,
      statementNum: 30,
    },
    {
      sortValue: 1,
      statementNum: 11,
    },
    {
      sortValue: 1,
      statementNum: 13,
    },
  ],
  [
    {
      sortValue: 1,
      statementNum: 24,
    },
    {
      sortValue: 1,
      statementNum: 26,
    },
    {
      sortValue: 1,
      statementNum: 21,
    },
    {
      sortValue: 1,
      statementNum: 23,
    },
    {
      sortValue: 1,
      statementNum: 23,
    },
    {
      sortValue: 1,
      statementNum: 31,
    },
    {
      sortValue: 1,
      statementNum: 4,
    },
    {
      sortValue: 1,
      statementNum: 20,
    },
    {
      sortValue: 1,
      statementNum: 20,
    },
  ],
  [
    {
      sortValue: 1,
      statementNum: 25,
    },
    {
      sortValue: 1,
      statementNum: 23,
    },
    {
      sortValue: 1,
      statementNum: 33,
    },
    {
      sortValue: 1,
      statementNum: 26,
    },
    {
      sortValue: 1,
      statementNum: 6,
    },
    {
      sortValue: 1,
      statementNum: 11,
    },
    {
      sortValue: 1,
      statementNum: 6,
    },
    {
      sortValue: 1,
      statementNum: 18,
    },
    {
      sortValue: 1,
      statementNum: 2,
    },
  ],
  [
    {
      sortValue: 2,
      statementNum: 13,
    },
    {
      sortValue: 2,
      statementNum: 5,
    },
    {
      sortValue: 2,
      statementNum: 1,
    },
    {
      sortValue: 2,
      statementNum: 30,
    },
    {
      sortValue: 2,
      statementNum: 16,
    },
    {
      sortValue: 2,
      statementNum: 25,
    },
    {
      sortValue: 2,
      statementNum: 20,
    },
    {
      sortValue: 2,
      statementNum: 33,
    },
    {
      sortValue: 2,
      statementNum: 19,
    },
  ],
  [
    {
      sortValue: 2,
      statementNum: 22,
    },
    {
      sortValue: 2,
      statementNum: 11,
    },
    {
      sortValue: 2,
      statementNum: 14,
    },
    {
      sortValue: 2,
      statementNum: 18,
    },
    {
      sortValue: 2,
      statementNum: 8,
    },
    {
      sortValue: 2,
      statementNum: 26,
    },
    {
      sortValue: 2,
      statementNum: 18,
    },
    {
      sortValue: 2,
      statementNum: 21,
    },
    {
      sortValue: 2,
      statementNum: 8,
    },
  ],
  [
    {
      sortValue: 2,
      statementNum: 28,
    },
    {
      sortValue: 2,
      statementNum: 25,
    },
    {
      sortValue: 2,
      statementNum: 17,
    },
    {
      sortValue: 2,
      statementNum: 28,
    },
    {
      sortValue: 2,
      statementNum: 11,
    },
    {
      sortValue: 2,
      statementNum: 30,
    },
    {
      sortValue: 2,
      statementNum: 14,
    },
    {
      sortValue: 2,
      statementNum: 22,
    },
    {
      sortValue: 2,
      statementNum: 7,
    },
  ],
  [
    {
      sortValue: 2,
      statementNum: 29,
    },
    {
      sortValue: 2,
      statementNum: 27,
    },
    {
      sortValue: 2,
      statementNum: 24,
    },
    {
      sortValue: 2,
      statementNum: 32,
    },
    {
      sortValue: 2,
      statementNum: 22,
    },
    {
      sortValue: 2,
      statementNum: 32,
    },
    {
      sortValue: 2,
      statementNum: 1,
    },
    {
      sortValue: 2,
      statementNum: 2,
    },
    {
      sortValue: 2,
      statementNum: 17,
    },
  ],
  [
    {
      sortValue: 3,
      statementNum: 14,
    },
    {
      sortValue: 3,
      statementNum: 6,
    },
    {
      sortValue: 3,
      statementNum: 12,
    },
    {
      sortValue: 3,
      statementNum: 6,
    },
    {
      sortValue: 3,
      statementNum: 3,
    },
    {
      sortValue: 3,
      statementNum: 4,
    },
    {
      sortValue: 3,
      statementNum: 17,
    },
    {
      sortValue: 3,
      statementNum: 24,
    },
    {
      sortValue: 3,
      statementNum: 31,
    },
  ],
  [
    {
      sortValue: 3,
      statementNum: 21,
    },
    {
      sortValue: 3,
      statementNum: 28,
    },
    {
      sortValue: 3,
      statementNum: 26,
    },
    {
      sortValue: 3,
      statementNum: 1,
    },
    {
      sortValue: 3,
      statementNum: 14,
    },
    {
      sortValue: 3,
      statementNum: 5,
    },
    {
      sortValue: 3,
      statementNum: 25,
    },
    {
      sortValue: 3,
      statementNum: 23,
    },
    {
      sortValue: 3,
      statementNum: 1,
    },
  ],
  [
    {
      sortValue: 3,
      statementNum: 23,
    },
    {
      sortValue: 3,
      statementNum: 21,
    },
    {
      sortValue: 3,
      statementNum: 13,
    },
    {
      sortValue: 3,
      statementNum: 13,
    },
    {
      sortValue: 3,
      statementNum: 27,
    },
    {
      sortValue: 3,
      statementNum: 16,
    },
    {
      sortValue: 3,
      statementNum: 32,
    },
    {
      sortValue: 3,
      statementNum: 28,
    },
    {
      sortValue: 3,
      statementNum: 21,
    },
  ],
  [
    {
      sortValue: 4,
      statementNum: 27,
    },
    {
      sortValue: 4,
      statementNum: 13,
    },
    {
      sortValue: 4,
      statementNum: 32,
    },
    {
      sortValue: 4,
      statementNum: 19,
    },
    {
      sortValue: 4,
      statementNum: 10,
    },
    {
      sortValue: 4,
      statementNum: 28,
    },
    {
      sortValue: 4,
      statementNum: 16,
    },
    {
      sortValue: 4,
      statementNum: 15,
    },
    {
      sortValue: 4,
      statementNum: 14,
    },
  ],
  [
    {
      sortValue: 4,
      statementNum: 33,
    },
    {
      sortValue: 4,
      statementNum: 33,
    },
    {
      sortValue: 4,
      statementNum: 4,
    },
    {
      sortValue: 4,
      statementNum: 21,
    },
    {
      sortValue: 4,
      statementNum: 7,
    },
    {
      sortValue: 4,
      statementNum: 6,
    },
    {
      sortValue: 4,
      statementNum: 28,
    },
    {
      sortValue: 4,
      statementNum: 6,
    },
    {
      sortValue: 4,
      statementNum: 33,
    },
  ],
];

test("get excel T1 sort text", () => {
  let value1 = getExcelT1SortText(parameter1, parameter2);
  expect(value1).toEqual(testValue1);
});
