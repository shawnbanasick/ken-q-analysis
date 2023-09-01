import pushStatementsToOutputArray from "./2_pushStatementsToOutputArray";
import S1DataSlice from "../../State/S1DataSlice";
import S6DataSlice from "../../State/S6DataSlice";

const pushStatementsToOutputArrayDispatcher = (
  outputData,
  sheetNamesXlsx,
  colSizes
) => {
  // get translations
  const statementsTrans = "Statements";
  const statementNumTrans = "Statement Number";
  const stateTranslations = { statementsTrans, statementNumTrans };

  // getState
  let statements = S1DataSlice.getState().statements;

  const pushStatements = pushStatementsToOutputArray(
    outputData,
    sheetNamesXlsx,
    colSizes,
    statements,
    stateTranslations
  );

  // set maxStatementLength;
  S6DataSlice.setState({
    maxStatementLength: pushStatements[1],
  });

  console.log("dispatch - 2 - pushStatements complete");
  return pushStatements[0];
};

export default pushStatementsToOutputArrayDispatcher;
