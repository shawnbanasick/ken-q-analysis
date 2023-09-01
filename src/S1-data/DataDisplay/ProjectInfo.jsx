import React from "react";
import S1DataSlice from "../../State/S1DataSlice";

const DisplayProjectInfo = () => {
  const { numStatements, numQsorts, qSortPattern } = S1DataSlice();

  let newQSortPattern;
  if (qSortPattern !== undefined) {
    newQSortPattern = qSortPattern.toString();
  }

  // const numStatementsInfo = numStatements;
  const numStatementsInfo = numStatements;

  const numStatementsText =
    numStatementsInfo + " statements, " + numQsorts + " participants";

  if (numStatementsInfo) {
    return (
      <div>
        <div className="w-full text-center mb-14">
          <h3>{numStatementsText}</h3>
          <h3 className="break-words  mt-4">
            Q-sort Design: {" " + newQSortPattern}
          </h3>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DisplayProjectInfo;
