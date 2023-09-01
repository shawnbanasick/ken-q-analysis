import includes from "lodash/includes";
import S6DataSlice from "../../State/S6DataSlice";

const checkIfDistinguishingOrConsensus = function (
  statementNumber,
  loopNumber
) {
  // getState
  const masterDistingStatementNumbersArray01 =
    S6DataSlice.getState().masterDistingStatementNumbersArray01;
  const masterDistingStatementNumbersArray05 =
    S6DataSlice.getState().masterDistingStatementNumbersArray05;

  const consensus05 = S6DataSlice.getState().consensus05Statements;
  const consensus01 = S6DataSlice.getState().consensus01Statements;

  if (
    includes(masterDistingStatementNumbersArray05[loopNumber], statementNumber)
  ) {
    return "  D";
  } else if (includes(consensus01, statementNumber)) {
    return "  C";
  } else if (
    includes(masterDistingStatementNumbersArray01[loopNumber], statementNumber)
  ) {
    return "  D*";
  } else if (includes(consensus05, statementNumber)) {
    return "  C*";
  }
  return "";
};

export default checkIfDistinguishingOrConsensus;
