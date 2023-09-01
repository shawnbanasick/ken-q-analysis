import React from "react";
import calculateRotatedFactors from "../rotationLogic/calculateRotatedFactors";
import S4DataSlice from "../../../State/S4DataSlice";
import OnGrayGeneralButton from "../../../ReusableComponents/OnGrayGeneralButton";

const ClockwiseButtons = (props) => {
  const { rotateByDegrees } = S4DataSlice();

  const handleClick = (event) => {
    const direction = event.target.id;
    event.stopPropagation();
    // get current setting of rotation degrees
    // call rotation
    calculateRotatedFactors(direction, rotateByDegrees, props.baselineData);
  };

  return (
    <div className="flex flex-row">
      <OnGrayGeneralButton
        otherFormatting="text-4xl ml-4 mt-1 mr-4 pt-1"
        buttonText={"\u21BB"}
        buttonColor="bg-gray-100"
        handleClick={handleClick}
        buttonId="clockwise"
      />
      <OnGrayGeneralButton
        otherFormatting="text-4xl mt-1 mr-4 pt-1"
        buttonText={"\u21BA"}
        buttonColor="bg-gray-100"
        handleClick={handleClick}
        buttonId="counterClockwise"
      />
    </div>
  );
};

export default ClockwiseButtons;
