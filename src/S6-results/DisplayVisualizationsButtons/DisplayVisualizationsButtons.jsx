import React from "react";
import S6DataSlice from "../../State/S6DataSlice";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

// todo - change this back to normal button
// display rules prevent premature click now
const DisplayVisualizationsButtons = () => {
  // hide button is only one factor selected
  const {
    userSelectedFactors,
    displayFactorVisualizations,
    showDownloadOutputButtons,
    setDisplayFactorVisualizations,
  } = S6DataSlice();

  let shouldDisplay = true;
  if (userSelectedFactors.length < 2) {
    shouldDisplay = false;
  }
  const handleDisplayViz = () => {
    const shouldShow = !displayFactorVisualizations;
    setDisplayFactorVisualizations(shouldShow);
  };

  if (showDownloadOutputButtons && shouldDisplay) {
    return (
      <div className="flex">
        <OnGrayGeneralButton
          buttonId="displayVisualizationsButton"
          handleClick={handleDisplayViz}
          buttonText="Display Composite Factors"
          otherFormatting="mr-2"
          buttonColor="bg-gray-100 hover:bg-gray-400"
        />
      </div>
    );
  }
  return null;
};

export default DisplayVisualizationsButtons;
