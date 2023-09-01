import React from "react";
import S5Header from "./S5Header";
import LoadingsTableTransitionContainer from "./LoadingsTableTransitionContainer";
import S3DataSlice from "../State/S3DataSlice";

const S5GrayBox = () => {
  const { showSections45 } = S3DataSlice();

  if (showSections45) {
    return (
      <div className="flex flex-col items-center bg-blue-100 rounded-md p-6">
        <S5Header />
        <div className="w-full justify-center bg-gray-300 p-8 rounded-md">
          <LoadingsTableTransitionContainer />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default S5GrayBox;

/*
  return (
    <div className="section">
      <S5Header />
      <LoadingsTableTransitionContainer />
    </div>
  );
  */
