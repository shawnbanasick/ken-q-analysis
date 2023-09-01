import React, { useState } from "react";
import kocData from "./kocData";
import S1DataSlice from "../../State/S1DataSlice";
import DemoOnWhiteGeneralButton from "../../ReusableComponents/DemoOnWhiteGeneralButton";

const KocButton = () => {
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

  const data = kocData();

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

    setProjectName("KOC Demo");
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
        id="kocButton"
        handleClick={handleClick}
        buttonText="Load KOC"
        buttonColor={buttonColor}
      ></DemoOnWhiteGeneralButton>
    </div>
  );
};

export default KocButton;
