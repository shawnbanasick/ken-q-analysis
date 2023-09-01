import React from "react";
import S2Header from "./S2Header";
import { default as CorrelationTable } from "./CorrelationTable/CorrelationTable";
import S2DataSlice from "../State/S2DataSlice";

const S2GrayBox = () => {
  const { showSection2 } = S2DataSlice();

  if (showSection2) {
    return (
      <div className="flex flex-col items-center bg-blue-100 rounded-md p-6">
        <S2Header />
        <div className="flex flex-col w-full items-center bg-gray-300 h-auto pt-4 rounded-md">
          <div>
            <CorrelationTable />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default S2GrayBox;
