import React, { useEffect, useState } from "react";
import S3DataSlice from "../../State/S3DataSlice";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import S6DataSlice from "../../State/S6DataSlice";

const FactorSelectDropdown = () => {
  // const { isFacSelectDisabled } = S4DataSlice();

  const {
    activeCentroidFactorsButton,
    numCentroidFactors,
    numberofPrincipalComps,
  } = S3DataSlice();

  const {
    setShouldDisplayFacKept,
    setNumFactorsKeptForRot,
    setShouldShowJudgeRotDiv,
    setJudgeButtonActive,
    setShowScatterPlotTableDiv,
    setAbFactors,
    setUserSelectedRotFactors,
    setVarimaxButtonDisabled,
    setVarimaxButtonText,
    setVarimaxButtonActive,
  } = S4DataSlice();

  const { setShowLoadingsTable, setBipolarDisabled, setBipolarSplitCount } =
    S5DataSlice();

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

  const handleOnclick = (event) => {
    const value = event.target.value;

    // rotationState[`${factor}Active`] = true;

    const userSelectedRotFactors = [];
    const abFactors = [];

    setNumFactorsKeptForRot(+value);
    setShouldDisplayFacKept(false);
    // hide section 5
    setShowLoadingsTable(false);
    // hide section 6
    setShowOutputFactorSelection(false);
    setShouldDisplayFactorVizOptions(false);
    setShowFactorCorrelationsTable(false);
    setShowStandardErrorsDifferences(false);
    setShowFactorCharacteristicsTable(false);
    setShowDownloadOutputButtons(false);
    setDisplayFactorVisualizations(false);
    setUserSelectedFactors([]);
    // reset bipolar
    setBipolarDisabled(false);
    setBipolarSplitCount(0);
    // reset manual rotation
    setShouldShowJudgeRotDiv(false);
    setJudgeButtonActive(false);
    setShowScatterPlotTableDiv(false);
    setAbFactors(abFactors);
    setUserSelectedRotFactors(userSelectedRotFactors);
    // reset varimax
    setVarimaxButtonDisabled(false);
    setVarimaxButtonText("Varimax Rotation");
    setVarimaxButtonActive(false);
    // appState.isRotationButtonGreen = true;
  };

  const [optionItems, setOptionItems] = useState([]);

  useEffect(() => {
    let array = [1, 2, 3, 4, 5, 6, 7, 8];
    // shorten options list if using centroid
    if (activeCentroidFactorsButton) {
      array.length = +numCentroidFactors;
    } else {
      array.length = +numberofPrincipalComps;
    }

    let optionItems = array.map((number) => (
      <option key={number.toString()} value={number}>
        {number}
      </option>
    ));

    optionItems.unshift(
      <option key={0} className="text-right" value="default">
        ?
      </option>
    );

    setOptionItems(optionItems);
  }, [activeCentroidFactorsButton, numCentroidFactors, numberofPrincipalComps]);

  // let showKeepFacForRotButton = store.getState("showKeepFacForRotButton");
  return (
    <div className="flex flex-row items-center">
      <span className="text-2xl">How many factors to keep for rotation?</span>

      <select
        className="select select-bordered rounded-md max-w-xs ml-2 mr-2 text-xl hover:bg-gray-400 h-[30px] border border-gray-400"
        onChange={handleOnclick}
      >
        {optionItems}
      </select>
    </div>
  );
};
export default FactorSelectDropdown;
