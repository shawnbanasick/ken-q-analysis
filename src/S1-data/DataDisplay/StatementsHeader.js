import React from "react";
import S1DataSlice from "../../State/S1DataSlice";

const StatementsHeader = () => {
  const { hasImportedSorts, hasImportedStatements } = S1DataSlice();

  if (hasImportedSorts && hasImportedStatements) {
    return <h1 className="font-bold mt-4">Statement List</h1>;
  } else {
    return null;
  }
};

export default StatementsHeader;
