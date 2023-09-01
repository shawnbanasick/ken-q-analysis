import React from "react";
// import S5DataSlice from "../../State/S5DataSlice";
import S3DataSlice from "../../State/S3DataSlice";
import S2DataSlice from "../../State/S2DataSlice";
import S1DataSlice from "../../State/S1DataSlice";
import centroidDispatch from "../centroidLogic/centroidDispatch";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";
import OnWhiteGeneralButton from "../../ReusableComponents/OnWhiteGeneralButton";

const CentroidSelectButton = () => {
  const {
    /*
    setEigenvalues,
    setExplainedVariance,
    setUnrotatedFactorMatrix,
    setEigensPercentExpVar,
    setCumulEigenPerVar,
    setScreePlotData,
    setGridColDefsFacTableEigen,
    setGridRowDataFacTableEigen,
    setCalculateCommunalityArray,
    setRowH2,
    setGridColDefsFactorTable,
    setGridRowDataFactorTable,
    setUnrotatedFactorMatrixOutput,
    setFactorMatrix,
    */
    numCentroidFactors,
    activeCentroidFactorsButton,
    disabledCentroidButton,
    setActiveCentroidFactorsButton,
    setIsCentroidLoading,
    setShowUnrotatedFactorTable,
    setDisabledCentroidButton,
    setDisabledPcaButton,
    setShowKeepFacForRotButton,
    setShowEigenvaluesTable,
    setShowSections45,
  } = S3DataSlice();

  // const { setNumFacsForTableWidth, setFSigCriterion } = S5DataSlice();
  const { correlation5Calcs } = S2DataSlice();
  const { projectHistoryArray, numQsorts, respondentNames } = S1DataSlice();

  let buttonBgColor = "bg-gray-100";
  if (activeCentroidFactorsButton === true) {
    buttonBgColor = "bg-green-300";
  }

  const handleClick = () => {
    if (disabledCentroidButton === true) {
      return;
    }

    if (numCentroidFactors === 0) {
      // show error model when no factors selected
      window.centroidFactorSelectError.showModal();
    } else {
      // flow control for Centroid Factors
      setActiveCentroidFactorsButton(true);
      centroidDispatch(
        numCentroidFactors,
        correlation5Calcs,
        projectHistoryArray,
        numQsorts,
        respondentNames
      );

      // *** set state for centroid factors
      /*
      setFactorMatrix(dispatch.factorMatrix);
      setEigenvalues(dispatch.eigenvalues);
      setExplainedVariance(dispatch.explainedVariance);
      setUnrotatedFactorMatrix(dispatch.unrotatedFactorMatrix);
      setEigensPercentExpVar(dispatch.eigensPercentExpVar);
      setCumulEigenPerVar(dispatch.cumulEigenPerVar);
      setScreePlotData(dispatch.screePlotData);
      setProjectHistoryArray(dispatch.projectHistoryArray);

      setGridColDefsFacTableEigen(dispatch.gridColDefsFacTableEigen);
      setGridRowDataFacTableEigen(dispatch.gridRowDataFacTableEigen);
      setCalculateCommunalityArray(dispatch.calculateCommunalityArray);
      setRowH2(dispatch.rowH2);
      setFSigCriterion(dispatch.fSigCriterion);
      // setNumFacsForTableWidth(numCentroidFactors);
      setUnrotatedFactorMatrixOutput(dispatch.unrotatedFactorMatrixOutput);
      setGridColDefsFactorTable(dispatch.gridColDefsFactorTable);
      setGridRowDataFactorTable(dispatch.gridRowDataFactorTable);
      */
      setIsCentroidLoading(false);
      setShowUnrotatedFactorTable(true);
      setShowKeepFacForRotButton(true);
      setShowEigenvaluesTable(true);
      setDisabledCentroidButton(true);
      setDisabledPcaButton(true);
      setShowSections45(true);
    }
  };

  return (
    <div>
      <dialog id="centroidFactorSelectError" className="modal">
        <form method="dialog" className="modal-box  border-2 border-gray-600">
          <p className="font-bold text-2xl">Input Error</p>
          <p className="p-4 pb-0">Select the number of</p>
          <p className="py-0">centroid factors to extract.</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <OnWhiteGeneralButton buttonText={"Close"} />
          </div>
        </form>
      </dialog>
      <OnGrayGeneralButton
        handleClick={handleClick}
        buttonText={"Centroid Factors"}
        buttonColor={buttonBgColor}
      />
    </div>
  );
};
export default CentroidSelectButton;
