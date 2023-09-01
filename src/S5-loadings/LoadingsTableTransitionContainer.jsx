import React from "react";
import LoadingsTable from "./LoadingsTable/LoadingsTable";
import S5DataSlice from "../State/S5DataSlice";

const LoadingsTableTransitionContainer = () => {
  const { showLoadingsTable } = S5DataSlice();
  if (showLoadingsTable) {
    return (
      <div className="flex flex-row justify-center">
        <LoadingsTable />
      </div>
    );
  }
  return null;
};

export default LoadingsTableTransitionContainer;
