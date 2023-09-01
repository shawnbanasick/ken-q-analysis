import React from "react";
import varimaxDispatch from "../varimaxLogic/varimaxDispatch";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";

const RotationButtonGroup = () => {
  const {
    shouldShowJudgeRotDiv,
    varimaxButtonText,
    setRotationDegrees,
    setShowScatterPlotTableDiv,
    setUserSelectedRotFactors,
    setAbFactors,
    setIsCalculatingVarimax,
    setVarimaxButtonActive,
    setShouldShowJudgeRotDiv,
    setJudgeButtonActive,
    setShouldDisplayRotFactorButtons,
  } = S4DataSlice();

  const { bipolarDisabled } = S5DataSlice();

  const shouldShowDiv = shouldShowJudgeRotDiv;

  // const isDisabled = bipolarDisabled;

  // setRotationDegrees(0);

  const onVarimaxClick = (event) => {
    setUserSelectedRotFactors([]);
    setAbFactors([]);
    setShowScatterPlotTableDiv(false);
    setIsCalculatingVarimax(true);
    setVarimaxButtonActive(true);

    setTimeout(() => {
      varimaxDispatch();
    }, 50);
  };

  const onJudgeClick = (event) => {
    if (shouldShowDiv === false) {
      setShouldShowJudgeRotDiv(true);
      setShouldDisplayRotFactorButtons(true);
      setJudgeButtonActive(true);
    } else {
      setShouldShowJudgeRotDiv(false);
      setJudgeButtonActive(false);
    }
  };

  // const {active} = true;
  // const shouldDisplay = state.getState("shouldDisplayFacKept");
  /*
  let vButtonDisabled = false;
  if (varimaxButtonDisabled === true || isDisabled === true) {
    vButtonDisabled = true;
  }
  */

  // if (shouldDisplay) {
  return (
    <div>
      <button
        id="judgementalRotationButton"
        className="btn bg-gray-100 hover:bg-gray-400 m-1 rounded-md"
        onClick={onJudgeClick}
      >
        Judgmental Rotation
      </button>
      <button
        id="pcaRotationButton"
        className="btn bg-gray-100 hover:bg-gray-400 m-1 rounded-md"
        onClick={onVarimaxClick}
      >
        {varimaxButtonText}
      </button>
    </div>
  );
  //   }
  //   return null;
};

export default RotationButtonGroup;
