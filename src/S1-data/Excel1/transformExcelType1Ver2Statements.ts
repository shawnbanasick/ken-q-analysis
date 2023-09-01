const transformExcelType1Ver2Statements = (statementsArray: any[]) => {
  // console.log("statementsArray: ", JSON.stringify(statementsArray));
  let newStatementsArray: string[] = [];
  statementsArray[0].forEach((item: any) => {
    if (typeof item.Statements !== "undefined") {
      let text = item.Statements.trim();
      newStatementsArray.push(text);
    }
  });
  // console.log("newStatementsArray: ", JSON.stringify(newStatementsArray));
  return newStatementsArray;
};

export default transformExcelType1Ver2Statements;
