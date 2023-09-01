import React, { useState } from "react";
import getData from "./MotivationData";
import S1DataSlice from "../../State/S1DataSlice";
import DemoOnWhiteGeneralButton from "../../ReusableComponents/DemoOnWhiteGeneralButton";

const MotivationalButton = () => {
  const {
    isDataLoaded,
    setProjectName,
    setStatements,
    setQSortPattern,
    setNumStatements,
    setNumQsorts,
    setSortsDisplayText,
    setMainDataObject,
    setMultiplierArray,
    setStatementNumArray,
    setRespondentNames,
    setHasImportedSorts,
    setProjectHistoryArray,
    setHasImportedStatements,
    setIsDataLoaded,
    setShowInputErrorModal,
  } = S1DataSlice();

  const [buttonColor, setButtonColor] = useState("bg-gray-300");

  const data = getData();

  const handleClick = () => {
    if (isDataLoaded) {
      setShowInputErrorModal({
        showModal: true,
        titleText: "Data Loading Error",
        bodyText: "Data are already loaded.",
        bodyText2: "Reload the webpage to start a new project.",
      });
      return;
    }
    setProjectName("Motivation Demo");
    setStatements([...data.statements]);
    setQSortPattern([...data.qSortPattern]);
    setNumStatements(data.numStatements);
    setNumQsorts(data.numQsorts);
    setSortsDisplayText(data.sortsDisplayText);
    setMainDataObject(data.mainDataObject);
    setMultiplierArray(data.multiplierArray);
    setStatementNumArray(data.statementNumArray);
    setProjectHistoryArray(data.projectHistoryArray);
    setRespondentNames(data.respondentNames);
    setHasImportedSorts(true);
    setHasImportedStatements(true);
    setButtonColor("bg-green-300");
    setIsDataLoaded(true);
  };
  return (
    <div>
      <DemoOnWhiteGeneralButton
        id="motivationalButton"
        handleClick={handleClick}
        buttonText="Load Motivation"
        buttonColor={buttonColor}
      />
    </div>
  );
};

export default MotivationalButton;
