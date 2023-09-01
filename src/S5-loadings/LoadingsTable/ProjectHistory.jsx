import React from "react";
import S1DataSlice from "../../State/S1DataSlice";

const ProjectHistory = () => {
  const { projectHistoryArray } = S1DataSlice();

  let mapCounter = 1;
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h3>Project Log</h3>
      <ol className="flex flex-col items-center justify-center bg-gray-100 w-[900px]">
        {projectHistoryArray.map((listValue) => (
          <li key={mapCounter++}>{listValue}</li>
        ))}
      </ol>
    </div>
  );
};

export default ProjectHistory;
