import React, { useState } from "react";
import S1DataSlice from "../State/S1DataSlice";
import S2DataSlice from "../State/S2DataSlice";
import getRawSorts from "./getRawSorts";
import calcMaxRespondentNameLength from "./calcMaxRespondentNameLength";
import mainCorrCalcs from "./correlationsLogic/mainCorrCalcs";
import cloneDeep from "lodash/cloneDeep";
import doInputErrorCheck from "../S1-data/ErrorChecking/ErrorChecking/doInputErrorCheck";
import doUnforcedSortsCheck from "../S1-data/ErrorChecking/ErrorChecking/doUnforcedSortsCheck";

const StartNewAnalysisButton = () => {
  let {
    respondentNames,
    mainDataObject,
    qSortPattern,
    continueAnalysis,
    setShowInputErrorModal,
    setUnforcedSorts,
  } = S1DataSlice();

  respondentNames = cloneDeep(respondentNames);

  const {
    setShowCorrelationMatrix,
    setActiveStartAnalysisButton,
    setIsLoadingBeginAnalysis,
    setShowSection2,
    setShowUnforcedWarningModal,
  } = S2DataSlice();

  const [buttonColor, setButtonColor] = useState(
    "bg-orange-300 hover:bg-orange-400"
  );

  const handleOnclick = () => {
    let errorCheck = doInputErrorCheck();

    if (errorCheck[0] === true) {
      setShowInputErrorModal(errorCheck[1]);
      S1DataSlice.setState({ showWarningBox: true });
      throw new Error("Input Error");
      // return;
    }

    let unforcedCheck = doUnforcedSortsCheck(
      mainDataObject,
      qSortPattern,
      respondentNames
    );

    if (unforcedCheck.length > 0) {
      setUnforcedSorts(unforcedCheck);
      if (continueAnalysis === false) {
        setShowUnforcedWarningModal(true);
        // return;
      }
      setButtonColor("bg-green-300 hover:bg-green-400");
    }

    if (respondentNames) {
      calcMaxRespondentNameLength(respondentNames);
      mainDataObject = cloneDeep(mainDataObject);
      const rawSortsArray = getRawSorts(mainDataObject);

      mainCorrCalcs(respondentNames, rawSortsArray);
      setShowCorrelationMatrix(true);
      setActiveStartAnalysisButton(true);
      setIsLoadingBeginAnalysis(false);
      setShowSection2(true);
      setButtonColor("bg-green-300 hover:bg-green-400");
    } else {
      S1DataSlice.setState({
        showErrorMessageBar: true,
        errorMessage: "No data to calculate correlations",
      });
    }
  };

  return (
    <div className="">
      <button
        className={`flex flex-row items-center h-[80px] w-[220px] ${buttonColor} rounded-md font-4xl font-bold border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-70"`}
        id="startAnalysisButton"
        onClick={handleOnclick}
      >
        <svg
          className="mt-[1px] mr-2 ml-4"
          width="30"
          height="30"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM1.69669 10C1.69669 14.5858 5.41421 18.3033 10 18.3033C14.5858 18.3033 18.3033 14.5858 18.3033 10C18.3033 5.41421 14.5858 1.69669 10 1.69669C5.41421 1.69669 1.69669 5.41421 1.69669 10Z"
            fill="#1E1E1E"
          />
          <path d="M15 10L7.5 14.3301L7.5 5.66987L15 10Z" fill="#1E1E1E" />
        </svg>
        Start Analysis
      </button>
    </div>
  );
};

export default StartNewAnalysisButton;
