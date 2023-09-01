import React from "react";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const RotationButtonGroup = () => {
  const {
    shouldShowJudgeRotDiv,
    shouldDisplayFacKept,
    // judgeButtonActive,
    setShouldShowJudgeRotDiv,
    setJudgeButtonActive,
    setShouldDisplayRotFactorButtons,
  } = S4DataSlice();

  const { bipolarDisabled } = S5DataSlice();

  const onJudgeClick = (event) => {
    const shouldShowDiv = !shouldShowJudgeRotDiv;
    if (shouldShowDiv === true) {
      setShouldShowJudgeRotDiv(true);
      setJudgeButtonActive(true);
      setShouldDisplayRotFactorButtons(true);
    } else {
      setShouldShowJudgeRotDiv(false);
      setJudgeButtonActive(false);
    }
  };

  // getState and initialize judgment rot button
  const shouldDisplay = shouldDisplayFacKept;
  const isDisabled = bipolarDisabled;
  const showInitializeButton = true; // shouldShowJudgeRotDiv;
  /*
  if (varimaxButtonDisabled === true || isDisabled === true) {
    varimaxButtonDisabled = true;
  }
*/

  if (shouldDisplay) {
    if (showInitializeButton) {
      return (
        <div className="ml-8">
          <OnGrayGeneralButton
            buttonText="Judgmental Rotation"
            buttonColor="bg-gray-100"
            handleClick={onJudgeClick}
            disabled={isDisabled}
          />
        </div>
      );
    }
    return null;
  }
};

export default RotationButtonGroup;

/*
return (
  <p style={{ fontSize: 22 }}>
    Please select the number of factors to keep for rotation
  </p>
);
*/
