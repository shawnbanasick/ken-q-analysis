const transformExcelType1Ver2Statements = (statementsArray: any[]) => {
  let newStatementsArray: string[] = [];
  statementsArray[0].forEach((item: any) => {
    if (typeof item.Statements !== "undefined") {
      let text = item.Statements.trim();
      newStatementsArray.push(text);
    }
  });
  return newStatementsArray;
};

export default transformExcelType1Ver2Statements;
