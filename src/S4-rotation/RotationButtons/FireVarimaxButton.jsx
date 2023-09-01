import React from "react";
import varimaxDispatch from "../varimaxLogic/varimaxDispatch";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const RotationButtonGroup = () => {
  const {
    setUserSelectedRotFactors,
    setAbFactors,
    setRotationDegrees,
    setShowScatterPlotTableDiv,
    setIsCalculatingVarimax,
    setVarimaxButtonActive,
    shouldDisplayFacKept,
    varimaxButtonActive,
    varimaxButtonText,
  } = S4DataSlice();

  const { bipolarDisabled } = S5DataSlice();

  const onVarimaxClick = (event) => {
    if (varimaxButtonActive === true || bipolarDisabled === true) {
      return;
    }

    setRotationDegrees(0);
    setUserSelectedRotFactors([]);
    setAbFactors([]);

    setShowScatterPlotTableDiv(false);
    setIsCalculatingVarimax(true);
    setVarimaxButtonActive(true);

    varimaxDispatch();
    return;
  };

  const shouldDisplay = shouldDisplayFacKept;

  if (varimaxButtonActive === true) {
  }
  let backgroundColor = varimaxButtonActive ? "bg-green-300" : "bg-gray-100";

  if (shouldDisplay) {
    return (
      <div>
        <OnGrayGeneralButton
          buttonText={varimaxButtonText}
          handleClick={onVarimaxClick}
          buttonColor={backgroundColor}
          disabled={bipolarDisabled}
          otherFormatting="w-[200px]"
        />
      </div>
    );
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
