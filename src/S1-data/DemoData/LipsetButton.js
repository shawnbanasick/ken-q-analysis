import React, { useState } from "react";
import LipsetData from "./lipsetData";
import S1DataSlice from "../../State/S1DataSlice";
import DemoOnWhiteGeneralButton from "../../ReusableComponents/DemoOnWhiteGeneralButton";

const LipsetButton = () => {
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
    setHasImportedStatements,
    setProjectHistoryArray,
    setIsDataLoaded,
    setShowInputErrorModal,
  } = S1DataSlice();

  const [buttonColor, setButtonColor] = useState("bg-gray-300");

  const uploadLipsetData = (e) => {
    if (isDataLoaded) {
      setShowInputErrorModal({
        showModal: true,
        titleText: "Data Loading Error",
        bodyText: "Data are already loaded.",
        bodyText2: "Reload the webpage to start a new project.",
      });
      return;
    }

    const data = LipsetData();
    setProjectName("Lipset Demo");
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
        id="lipsetButton"
        handleClick={uploadLipsetData}
        buttonText="Load Lipset"
        buttonColor={buttonColor}
      />
    </div>
  );
};
export default LipsetButton;
