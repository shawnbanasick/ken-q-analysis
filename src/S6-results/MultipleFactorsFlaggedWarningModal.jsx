import React from "react";
import S6DataSlice from "../State/S6DataSlice";
import OnWhiteGeneralButton from "../ReusableComponents/OnWhiteGeneralButton";

const UnforcedWarningModal = () => {
  const { sortsFlaggedOnTwoFactors } = S6DataSlice();

  /*
  const handleClose = () => {
    S6DataSlice.setState({
      showOutputFactorSelection: false,
      shouldDisplayFactorVizOptions: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      userSelectedFactors: [],
      displayFactorVisualizations: false,
      isActiveNewDownloadButton: false,
      isActiveExcelDownloadButton: false,
      isActiveCsvDownloadButton: false,
    });
  };
 */

  return (
    <dialog id="multipleFactorsFlaggedWarningModal" className="modal">
      <form method="dialog" className="modal-box">
        <p className="text-2xl mb-4 font-bold">Output Selection Warning</p>
        <div>
          <p className="text-xl">
            There are Q sorts flagged on more than one factor
          </p>
          <p className="text-xl mt-8">
            Participant sorts: {sortsFlaggedOnTwoFactors}
          </p>
        </div>
        <OnWhiteGeneralButton
          buttonId="multipleFactorsFlaggedWarningModalGotItButton"
          otherFormatting="modal-action mt-6"
          buttonText="Close"
        />
      </form>
    </dialog>
  );
};
export default UnforcedWarningModal;
