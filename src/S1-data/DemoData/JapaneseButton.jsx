import React, { useState } from "react";
import getJData from "./japaneseData";
import S1DataSlice from "../../State/S1DataSlice";
import DemoOnWhiteGeneralButton from "../../ReusableComponents/DemoOnWhiteGeneralButton";

const JapaneseButton = () => {
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

  const data = getJData();

  const [buttonColor, setButtonColor] = useState("bg-gray-300");

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
    setProjectName("Japanese Demo");
    setStatements([...data.statements]);
    setQSortPattern([...data.qSortPattern]);
    setNumStatements(data.numStatements);
    setNumQsorts(data.numQsorts);
    setSortsDisplayText(data.sortsDisplayText);
    setMainDataObject(data.mainDataObject);
    setMultiplierArray(data.multiplierArray);
    setStatementNumArray(data.statementNumArray);
    setRespondentNames(data.respondentNames);
    setProjectHistoryArray(data.projectHistoryArray);
    setHasImportedSorts(true);
    setHasImportedStatements(true);
    setButtonColor("bg-green-300");
    setIsDataLoaded(true);
  };

  return (
    <div>
      <DemoOnWhiteGeneralButton
        handleClick={handleClick}
        buttonText={"Load iPad"}
        buttonColor={buttonColor}
      />
    </div>
  );
};

export default JapaneseButton;
