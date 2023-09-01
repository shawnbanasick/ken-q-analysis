import React from "react";
import pcaDispatch from "../PcaLogic/pcaDispatch";
import S3DataSlice from "../../State/S3DataSlice";
import S2DataSlice from "../../State/S2DataSlice";
import S1DataSlice from "../../State/S1DataSlice";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const ExtractPrinCompButton = () => {
  const {
    activePcaButton,
    disabledPcaButton,
    pcaButtonText,
    setCalculatingPca,
    setActivePcaButton,
    setDisabledPcaButton,
    setDisabledCentroidButton,
    setShowKeepFacForRotButton,
    setShowSections45,
  } = S3DataSlice();

  const { correlation5Calcs } = S2DataSlice();
  const { projectHistoryArray, respondentNames, numStatements } = S1DataSlice();

  let buttonBgColor = "bg-gray-100";
  if (activePcaButton === true) {
    buttonBgColor = "bg-green-300";
  }

  const handleClick = () => {
    if (disabledPcaButton === true) {
      return;
    }

    pcaDispatch(
      projectHistoryArray,
      correlation5Calcs,
      respondentNames,
      numStatements
    );

    setCalculatingPca(true);
    setActivePcaButton(true);
    setShowKeepFacForRotButton(true);
    setDisabledPcaButton(true);
    setDisabledCentroidButton(true);
    setShowSections45(true);
  };

  return (
    <div className="ml-24">
      <OnGrayGeneralButton
        handleClick={handleClick}
        buttonText={pcaButtonText}
        buttonColor={buttonBgColor}
        otherFormatting="w-[280px]"
      />
    </div>
  );
};
export default ExtractPrinCompButton;
