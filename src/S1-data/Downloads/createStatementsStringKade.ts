const createStatementsString = (statements: string[]) => {
  let statementsString = "";
  statements.forEach((statement) => {
    statementsString += statement + "\n";
  });
  return statementsString;
};

export default createStatementsString;
