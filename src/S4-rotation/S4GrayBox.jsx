import React from "react";
import S4Header from "./S4Header";
import FactorSelectButtons from "./FactorKeepSelection/FactorSelectDropdown";
import FactorsKeptNotification from "./FactorKeepSelection/FactorsKeptNotification";
import JudgementalRotationContainer from "./JudgementalRotation/JudgementalRotationContainer";
import FactorSelectButtonModal from "./FactorKeepSelection/FactorSelectButtonModal";
import InitializeJudgmentalButton from "./RotationButtons/InitializeJudgmentalButton";
import FireVarimaxButton from "./RotationButtons/FireVarimaxButton";
import VarimaxHeywoodWarning from "./RotationButtons/VarimaxHeywoodWarning";
import S3DataSlice from "../State/S3DataSlice";

const S4GrayBox = () => {
  const { showSections45 } = S3DataSlice();

  if (showSections45) {
    return (
      <div className="flex flex-col items-center bg-blue-100 rounded-md p-6">
        <S4Header />
        <div className="w-full bg-gray-300 p-8 rounded-md">
          <div>
            <div className="flex flex-row justify-center ">
              <FactorSelectButtons />
              <FactorSelectButtonModal />
            </div>
            <div className="flex flex-row justify-center ">
              <FactorsKeptNotification />
            </div>
            <div className="flex flex-row justify-center mt-8">
              <div>
                <FireVarimaxButton />
                <VarimaxHeywoodWarning />
              </div>
              <InitializeJudgmentalButton />
            </div>
            <div className="flex flex-col mt-8">
              <JudgementalRotationContainer />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default S4GrayBox;

/*
<RotationButtonGroup />



<div style={{ maxWidth: 1197 }}>
  <FactorSelectDropdown />
  <FactorsKeptNotification />
</div>
<div>
  <RotationButtonGroup />
</div>
<JudgementalRotationContainer />

*/
