import React from "react";
import S6DataSlice from "../../State/S6DataSlice";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const RefreshFactorVizButton = (props) => {
  const {
    factorVizOptions,
    factorVizOptionsHolder,
    shouldDisplayFactorVizOptions,
    updateFactorVisualizationsButtonColor,
    setFactorVizOptions,
    setFactorVizOptionsHolder,
    setUpdateFactorVisualizationsButtonColor,
  } = S6DataSlice();

  const refresh = () => {
    const updateKeys = Object.keys(factorVizOptionsHolder);
    for (let i = 0; i < updateKeys.length; i += 1) {
      factorVizOptions[updateKeys[i]] = factorVizOptionsHolder[updateKeys[i]];
    }
    setFactorVizOptions(factorVizOptions);
    setFactorVizOptionsHolder({});
    setUpdateFactorVisualizationsButtonColor("#83cafe");
  };

  if (shouldDisplayFactorVizOptions) {
    return (
      <div
        className={`mt-[10px] bg-[${updateFactorVisualizationsButtonColor}] mb-[10px]`}
      >
        <OnGrayGeneralButton
          buttonId="refreshFactorVizButton"
          handleClick={refresh}
          buttonColor={updateFactorVisualizationsButtonColor}
          buttonText="Update Factor Visualizations"
          otherFormatting="mr-2"
        />
      </div>
    );
  } else {
    return null;
  }
};

export default RefreshFactorVizButton;

/*
const RefreshButtonContainerDiv = styled.div`
  margin-top: 10px;
  /* margin-top: ${(props) => `${props.marginTop}px`}; */
/* margin-bottom: ${(props) => `${props.marginBottom}px`}; */
/*
  margin-bottom: 10px;
  margin-left: 20px;
  display: inline-flex;
`;

const RefreshButton = styled.div`
  background-color: ${(props) => props.buttonColor};
`;
*/
