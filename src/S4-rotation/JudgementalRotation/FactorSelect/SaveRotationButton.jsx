import React from "react";
import transposeMatrix from "../../../Utils/transposeMatrix";
import calcuateSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../../S5-loadings/LoadingsTable/loadingsTableDataPrep";
import S1DataSlice from "../../../State/S1DataSlice";
import S3DataSlice from "../../../State/S3DataSlice";
import S4DataSlice from "../../../State/S4DataSlice";
import S5DataSlice from "../../../State/S5DataSlice";
import S6DataSlice from "../../../State/S6DataSlice";
import cloneDeep from "lodash/cloneDeep";
import OnGrayGeneralButton from "../../../ReusableComponents/OnGrayGeneralButton";

const SaveRotationButton = () => {
  let { projectHistoryArray, setProjectHistoryArray } = S1DataSlice();

  const { setFactorMatrix } = S3DataSlice();

  let { tempRotFacStateArray, abFactors } = S4DataSlice();

  const { bipolarDisabled } = S5DataSlice();

  const {
    rotationDegrees,
    numFactorsKeptForRot,
    setRotationDegrees,
    setShowScatterPlotTableDiv,
    setUserSelectedRotFactors,
    setAbFactors,
    setNotifyForSavedRotations,
    setShouldClearRotButHigh,
  } = S4DataSlice();

  const {
    setShowOutputFactorSelection,
    setShouldDisplayFactorVizOptions,
    setShowFactorCorrelationsTable,
    setShowStandardErrorsDifferences,
    setShowFactorCharacteristicsTable,
    setShowDownloadOutputButtons,
    setDisplayFactorVisualizations,
    setUserSelectedFactors,
  } = S6DataSlice();

  const saveRotations = (e) => {
    // e.stopPropagation();

    // moved here to give faster DOM update
    setRotationDegrees(0);
    setShowScatterPlotTableDiv(false);

    // replace current rot factor matrix with tempRotFacStateArray
    tempRotFacStateArray = cloneDeep(tempRotFacStateArray);
    abFactors = cloneDeep(abFactors);
    const factorA = abFactors[0];
    const factorB = abFactors[1];

    // update state before re-drawing loadings table
    const tempRotFacStateArray2 = transposeMatrix(tempRotFacStateArray);
    setFactorMatrix(tempRotFacStateArray2);

    // re-draw loadings table
    const numFactors = numFactorsKeptForRot;

    calcuateSigCriterionValues("noFlag");

    loadingsTableDataPrep(numFactors);

    // getState - update Project History
    const projectHistoryArray2 = cloneDeep(projectHistoryArray);
    const projectHistoryText = `Factor ${factorA} and Factor ${factorB} rotation ${rotationDegrees} degrees`;
    projectHistoryArray2.push(projectHistoryText);
    setProjectHistoryArray(projectHistoryArray2);

    // remove plot and table from DOM and update state
    setUserSelectedRotFactors([]);
    setAbFactors([]);
    setShowScatterPlotTableDiv(false);

    // hide section 6
    setNotifyForSavedRotations(true);
    setShowOutputFactorSelection(false);
    setShouldDisplayFactorVizOptions(false);
    setShowFactorCorrelationsTable(false);
    setShowStandardErrorsDifferences(false);
    setShowFactorCharacteristicsTable(false);
    setShowDownloadOutputButtons(false);
    setDisplayFactorVisualizations(false);
    setUserSelectedFactors([]);
    setShouldClearRotButHigh(true);
  };

  const isDisabled = bipolarDisabled;

  let buttonColor;
  if (rotationDegrees !== 0) {
    buttonColor = "bg-orange-300";
  } else {
    buttonColor = "bg-gray-100";
  }

  return (
    <OnGrayGeneralButton
      buttonId="saveRotationButton"
      otherFormatting="m-1"
      handleClick={saveRotations}
      disabled={isDisabled}
      buttonColor={buttonColor}
      buttonText="Save Rotation"
    />
  );
};

export default SaveRotationButton;
