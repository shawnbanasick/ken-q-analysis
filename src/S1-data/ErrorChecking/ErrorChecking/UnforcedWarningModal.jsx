import React, { useEffect } from "react";
import S1DataSlice from "../../../State/S1DataSlice";
import S2DataSlice from "../../../State/S2DataSlice";
import OnWhiteGeneralButton from "../../../ReusableComponents/OnWhiteGeneralButton";
import calcMaxRespondentNameLength from "../../../S2-corr/calcMaxRespondentNameLength";
import cloneDeep from "lodash/cloneDeep";
import getRawSorts from "../../../S2-corr/getRawSorts";
import mainCorrCalcs from "../../../S2-corr/correlationsLogic/mainCorrCalcs";

const UnforcedWarningModal = () => {
  let { unforcedSorts, respondentNames, mainDataObject, setContinueAnalysis } =
    S1DataSlice();

  const {
    showUnforcedWarningModal,
    setShowCorrelationMatrix,
    setActiveStartAnalysisButton,
    setIsLoadingBeginAnalysis,
    setShowSection2,
    setShowUnforcedWarningModal,
  } = S2DataSlice();

  // console.log(showUnforcedWarningModal);

  useEffect(() => {
    if (showUnforcedWarningModal) {
      window.unforcedWarningModal.showModal();
      setShowUnforcedWarningModal(false);
    }
  }, [showUnforcedWarningModal, setShowUnforcedWarningModal]);

  const handleOnClick = () => {
    setContinueAnalysis(true);

    if (respondentNames) {
      calcMaxRespondentNameLength(respondentNames);
      mainDataObject = cloneDeep(mainDataObject);
      const rawSortsArray = getRawSorts(mainDataObject);

      mainCorrCalcs(respondentNames, rawSortsArray);
      setShowCorrelationMatrix(true);
      setActiveStartAnalysisButton(true);
      setIsLoadingBeginAnalysis(false);
      setShowSection2(true);
    }

    return;
  };

  return (
    <dialog id="unforcedWarningModal" className="modal">
      <form
        method="dialog"
        className="modal-box border-2 border-gray-600 rounded-md"
      >
        <p id="titleText" className="text-2xl mb-2 font-bold">
          Data Warning
        </p>
        <hr className="w-full mb-6 border border-gray-700" />
        <p className="w-[350px] text-center">
          {`There are Q sorts that don't follow the Q sort pattern - [ ${unforcedSorts.join(
            ", "
          )} ]`}
        </p>
        <p className="mt-4 w-[350px] text-center">
          If your project required forced sorting, these Q sorts have input
          errors. Check your Q sorts input file. <br />
          <br />
          If your project allowed free sorting, these Q sorts require manual
          checking for input errors.
        </p>
        <div className="">
          <div className="flex flex-row w-[450px] place-content-around mt-2 mb-2">
            <OnWhiteGeneralButton
              id="inputErrorModalCloseButton"
              buttonColor="bg-gray-300"
              otherFormatting="modal-action"
              buttonText="Close"
            />
            <OnWhiteGeneralButton
              id="inputErrorModalCloseButton"
              buttonColor="bg-orange-300"
              otherFormatting="modal-action"
              buttonText="Continue with Analysis"
              handleClick={handleOnClick}
            />
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default UnforcedWarningModal;

/*
              <OnWhiteGeneralButton
                id="invertFactorSubmitButton"
                buttonColor="bg-green-300"
                otherFormatting="modal-action"
                buttonText="Submit"
                handleClick={props.handleClick}
              />
  
            */
