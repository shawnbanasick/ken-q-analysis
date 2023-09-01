import React from "react";
import S6DataSlice from "../../State/S6DataSlice";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

// todo - change this back to normal button
// display rules prevent premature click now
const DisplayVisualizationsButtons = () => {
  // hide button is only one factor selected
  const userSelectedFactors = S6DataSlice.getState().userSelectedFactors;

  let shouldDisplay = true;
  if (userSelectedFactors.length < 2) {
    shouldDisplay = false;
  }
  const handleOpenVizOptions = () => {
    // getState
    const shouldDisplayFactorVizOptions =
      S6DataSlice.getState().shouldDisplayFactorVizOptions;

    const shouldShow = !shouldDisplayFactorVizOptions;
    S6DataSlice.setState({
      shouldDisplayFactorVizOptions: shouldShow,
    });
  };

  // getState
  const showDownloadOutputButtons =
    S6DataSlice.getState().showDownloadOutputButtons;

  if (showDownloadOutputButtons && shouldDisplay) {
    return (
      <div style={{ display: "flex" }}>
        <OnGrayGeneralButton
          buttonId="displayVisualizationsButton"
          handleClick={handleOpenVizOptions}
          buttonText="View Display Options"
          otherFormatting="mr-2"
          buttonColor="bg-gray-100 hover:bg-gray-400"
        />
      </div>
    );
  }
};

export default DisplayVisualizationsButtons;
