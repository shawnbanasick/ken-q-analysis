import React from "react";
import S5DataSlice from "../../State/S5DataSlice";
import S6DataSlice from "../../State/S6DataSlice";
import OnWhiteGeneralButton from "../../ReusableComponents/OnWhiteGeneralButton";

const NoLoadingsFlaggedWarningModal = () => {
  const {
    showNoLoadingsFlaggedWarningModal,
    setSendDataToOutputButtonColor,
    //    setShowNoLoadingsFlaggedWarningModal,
  } = S5DataSlice();

  const {
    factorsWithoutLoading,
    setShowOutputFactorSelection,
    setShowFactorCorrelationsTable,
    setShowStandardErrorsDifferences,
    setShowFactorCharacteristicsTable,
    setShowDownloadOutputButtons,
    setShouldDisplayFactorVizOptions,
    setDisplayFactorVisualizations,
  } = S6DataSlice();

  const handleClose = () => {
    setShowOutputFactorSelection(false);
    setShowFactorCorrelationsTable(false);
    setShowStandardErrorsDifferences(false);
    setShowFactorCharacteristicsTable(false);
    setShowDownloadOutputButtons(false);
    setShouldDisplayFactorVizOptions(false);
    setDisplayFactorVisualizations(false);
    setSendDataToOutputButtonColor("bg-gray-100");
  };

  if (showNoLoadingsFlaggedWarningModal) {
    window.noLoadingsFlaggedModal.showModal();
  }

  return (
    <dialog id="noLoadingsFlaggedModal" className="modal">
      <p className="text-2xl">Error Checking</p>
      <form method="dialog" className="modal-box border-2 border-gray-600">
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-bold ">Output Error</p>
          <hr className="w-full mb-4 mt-4 border border-gray-700" />
          <p className="mb-4">
            A factor without a flagged loading was selected.
          </p>
          <span>Problem factors: {factorsWithoutLoading}</span>
          <OnWhiteGeneralButton
            buttonId="noLoadingsFlaggedModalGotItButton"
            otherFormatting="modal-action mt-6"
            handleClick={handleClose}
            buttonText="Close"
          />
        </div>
      </form>
    </dialog>
  );
};
export default NoLoadingsFlaggedWarningModal;
