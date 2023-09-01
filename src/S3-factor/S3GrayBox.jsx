import React from "react";
import S3Header from "./S3Header";
import TypeOfAnalysisTransitionContainer from "./TypeOfAnalysisTransitionContainer";
import UnrotatedFactorsTransitionContainer from "./UnrotatedFactorsTransitionContainer";
import S2DataSlice from "../State/S2DataSlice";

const S3GrayBox = () => {
  const { showSection2 } = S2DataSlice();

  if (showSection2) {
    return (
      <div className="flex flex-col items-center bg-blue-100 rounded-md p-6">
        <S3Header />
        <div className="w-full bg-gray-300 p-8 rounded-md">
          <TypeOfAnalysisTransitionContainer />
          <UnrotatedFactorsTransitionContainer />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default S3GrayBox;
