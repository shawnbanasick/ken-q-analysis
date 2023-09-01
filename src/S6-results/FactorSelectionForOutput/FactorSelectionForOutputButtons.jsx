import React, { useState, useEffect } from "react";
import includes from "lodash/includes";
import outputDispatch from "../calcualteOutputLogic/1_outputDispatch";
import S6DataSlice from "../../State/S6DataSlice";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const FactorSelectionForOutputButtons = () => {
  // getState
  let {
    outputButtonsArray,
    showOutputFactorSelection,
    outputFactorSelectButtonsDisabled,
    userSelectedFactors,
    userSelectedDistStateSigLevel1,
    userSelectedDistStateSigLevel2,
  } = S6DataSlice();

  const btnId = outputButtonsArray;
  const areDisabled = outputFactorSelectButtonsDisabled;
  const sigLevel1 = userSelectedDistStateSigLevel1;
  const sigLevel2 = userSelectedDistStateSigLevel2;

  const [buttonColorObject, setButtonColorObject] = useState({
    factor0: "bg-gray-100",
    factor1: "bg-gray-100",
    factor2: "bg-gray-100",
    factor3: "bg-gray-100",
    factor4: "bg-gray-100",
    factor5: "bg-gray-100",
    factor6: "bg-gray-100",
    factor7: "bg-gray-100",
    factor8: "bg-gray-100",
  });

  const clearAllFactors = () => {
    const clearAllObj = {
      factor0: "bg-gray-100",
      factor1: "bg-gray-100",
      factor2: "bg-gray-100",
      factor3: "bg-gray-100",
      factor4: "bg-gray-100",
      factor5: "bg-gray-100",
      factor6: "bg-gray-100",
      factor7: "bg-gray-100",
      factor8: "bg-gray-100",
    };

    setButtonColorObject(clearAllObj);

    S6DataSlice.setState({
      userSelectedFactors: [],
      showFactorCorrelationsTable: false,
      showFactorCharacteristicsTable: false,
      showStandardErrorsDifferences: false,
      showDownloadOutputButtons: false,
      displayFactorVisualizations: false,
      shouldDisplayFactorVizOptions: false,
      outputFactorSelectButtonsDisabled: false,
      outputForDataViz2: [],
    });
  };

  const highlightAllFactors = () => {
    userSelectedFactors = [];
    for (let i = 0; i < btnId.length; i += 1) {
      const temp1 = `factor ${btnId[i]}`;
      userSelectedFactors.push(temp1);
    }

    const allObj = {
      factor0: "bg-green-300",
      factor1: "bg-green-300",
      factor2: "bg-green-300",
      factor3: "bg-green-300",
      factor4: "bg-green-300",
      factor5: "bg-green-300",
      factor6: "bg-green-300",
      factor7: "bg-green-300",
      factor8: "bg-green-300",
    };

    setButtonColorObject(allObj);

    S6DataSlice.setState({
      userSelectedFactors: userSelectedFactors,
      showDownloadOutputButtons: false,
      showFactorCorrelationsTable: false,
      showFactorCharacteristicsTable: false,
      showStandardErrorsDifferences: false,
      displayFactorVisualizations: false,
      shouldDisplayFactorVizOptions: false,
    });
  };

  useEffect(() => {
    if (showOutputFactorSelection) {
      clearAllFactors();
    }
  }, [showOutputFactorSelection]);

  const handleSubmit = () => {
    // getState
    if (sigLevel1 <= sigLevel2) {
      S6DataSlice.setState({ notifyOutputDistStateError: true });
      return;
    }
    // also dismiss dist state threshold error toast if present
    // toast.dismiss();
    // if no error calc output
    if (userSelectedFactors.length !== 0) {
      let outputProcessing = outputDispatch();

      if (outputProcessing === "error") {
        window.noLoadingsFlaggedModal.showModal();
      } else {
        S6DataSlice.setState({
          showDownloadOutputButtons: true,
          outputFactorSelectButtonsDisabled: true,
        });
      }
    }
  };

  const handleOnclick = (event) => {
    const factor = event.target.id;

    if (!includes(userSelectedFactors, factor)) {
      userSelectedFactors.push(factor);
      userSelectedFactors.sort();

      let newFactorId = factor.split(" ").join("");

      buttonColorObject[newFactorId] = "bg-green-300";
      setButtonColorObject(buttonColorObject);

      S6DataSlice.setState({
        userSelectedFactors: userSelectedFactors,
        showDownloadOutputButtons: false,
        showFactorCorrelationsTable: false,
        showFactorCharacteristicsTable: false,
        showStandardErrorsDifferences: false,
        displayFactorVisualizations: false,
        shouldDisplayFactorVizOptions: false,
      });
    }
  };

  if (showOutputFactorSelection) {
    return (
      <div className="flex flex-row items-center h-[50px] w-[850px] align-baseline">
        <p className="text-2xl mr-2">Select Factors:</p>
        {btnId.map((item) => (
          <OnGrayGeneralButton
            key={`f${item}`}
            buttonId={`factor ${item}`}
            handleClick={handleOnclick}
            buttonText={item}
            buttonColor={buttonColorObject[`factor${item}`]}
            otherFormatting="mr-2 w-[50px]"
          />
        ))}
        <OnGrayGeneralButton
          buttonId="selectAllFacs"
          handleClick={highlightAllFactors}
          buttonText="All"
          disabled={areDisabled}
          otherFormatting="mr-2 w-[75px]"
          buttonColor="bg-gray-100"
        />
        <OnGrayGeneralButton
          buttonId="clearAllFacs"
          handleClick={clearAllFactors}
          buttonText="Clear"
          buttonColor="bg-gray-100"
          otherFormatting="mr-2 w-[75px]"
        />
        <OnGrayGeneralButton
          buttonId="startOutput"
          handleClick={handleSubmit}
          buttonText="Submit"
          disabled={areDisabled}
          buttonColor="bg-gray-100"
          otherFormatting="w-[75px]"
        />
      </div>
    );
  } else {
    return null;
  }
};

export default FactorSelectionForOutputButtons;

/*
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 900px;
  align-items: baseline;
`;

const NumButtons = styled.div`
  width: 50px;
`;

const SelectButtons = styled.div`
  min-width: 75px;
`;
*/
