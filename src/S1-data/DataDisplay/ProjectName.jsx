import React from "react";
import S1DataSlice from "../../State/S1DataSlice";
const DisplayProjectName = () => {
  const { projectName, hasImportedSorts, hasImportedStatements } =
    S1DataSlice();

  if (hasImportedSorts && hasImportedStatements) {
    return (
      <div className="mt-10 mb-4 font-bold text-4xl text-center">
        <div>
          <h2>{projectName}</h2>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DisplayProjectName;
