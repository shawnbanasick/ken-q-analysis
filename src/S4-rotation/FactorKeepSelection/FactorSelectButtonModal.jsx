import React, { useState } from "react";
import loadingsTableDataPrep from "../../S5-loadings/LoadingsTable/loadingsTableDataPrep";
import cloneDeep from "lodash/cloneDeep";
import S1DataSlice from "../../State/S1DataSlice";
import S3DataSlice from "../../State/S3DataSlice";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import transposeMatrix from "../../Utils/transposeMatrix";
import calculateCommunalities from "../../S4-rotation/varimaxLogic/2calculateCommunalities";
import calculatefSigCriterionValues from "../../S4-rotation/varimaxLogic/2calculateSigCriterionValues";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";
import OnWhiteGeneralButton from "../../ReusableComponents/OnWhiteGeneralButton";

const FactorSelectButtonModal = () => {
  const { projectHistoryArray, setProjectHistoryArray } = S1DataSlice();
  const { showKeepFacForRotButton, factorMatrix } = S3DataSlice();
  const {
    numFactorsKeptForRot,
    setIsLoadingsFactorsKept,
    setIsFacSelectDisabled,
    setShouldDisplayFacKept,
  } = S4DataSlice();
  const { setShowLoadingsTable } = S5DataSlice();

  // isFacSelectDisabled,

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleOpen = () => {
    // getState and confirm that the number of factors has been selected

    if (+numFactorsKeptForRot === 0) {
      window.facKeptSubmitModal.showModal();
      return;
    }

    // update project history in dom and state
    const projectHistoryText = `Number of factors selected for rotation: ${numFactorsKeptForRot}`;

    const projectHistoryArray2 = cloneDeep(projectHistoryArray);

    projectHistoryArray2.push(projectHistoryText);

    // add history entry
    // projectHistoryArray.push(logMessageObj);

    // update state
    setProjectHistoryArray(projectHistoryArray2);

    // update state
    setIsLoadingsFactorsKept(true);

    // prepare loadings table data
    setTimeout(() => {
      // matrix in factor  format
      const factorMatrix1 = cloneDeep(factorMatrix);

      // transpose matrix to table display format
      const factorMatrixTransposed = transposeMatrix(factorMatrix1);

      // expects bare full array - required to calc significance levels for table/circles
      calculateCommunalities(factorMatrixTransposed);

      // gets array for fSig testing from LS of calculateCommunalities
      // - sets fSigCriterionResults for this factor matrix
      calculatefSigCriterionValues("flag");

      // draw table with loadings data
      loadingsTableDataPrep(numFactorsKeptForRot);
    }, 10);

    // show loadings table
    setIsFacSelectDisabled(true);
    setShouldDisplayFacKept(true);
    setShowLoadingsTable(true);
    setButtonDisabled(true);
  };

  // const isFacSelectDisabled = rotationState.isFacSelectDisabled;

  if (showKeepFacForRotButton) {
    return (
      <React.Fragment>
        <OnGrayGeneralButton
          buttonText="Submit"
          disabled={buttonDisabled}
          handleClick={handleOpen}
        />
        <dialog id="facKeptSubmitModal" className="modal">
          <form method="dialog" className="modal-box border-2 border-gray-500">
            <p className="font-bold text-2xl">Input Error</p>
            <span className="text-lg mt-4">
              Please select the number of factors to keep for rotation
            </span>
            <div className="modal-action">
              <OnWhiteGeneralButton buttonText="Close" />
            </div>
          </form>
        </dialog>
      </React.Fragment>
    );
  }
  return null;
};

export default FactorSelectButtonModal;
