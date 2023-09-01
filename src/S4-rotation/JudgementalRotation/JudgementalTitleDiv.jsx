import React, { useEffect } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import transposeMatrix from "../../Utils/transposeMatrix";
import FactorSelectButtons from "./FactorSelect/FactorSelectButtons";
import ScatterPlotAndTableTransitionContainer from "./plot/ScatterPlotAndTableTransitionContainer";
import cloneDeep from "lodash/cloneDeep";
import S3DataSlice from "../../State/S3DataSlice";
import S4DataSlice from "../../State/S4DataSlice";

const JudgementalTitleDiv = () => {
  let { factorMatrix } = S3DataSlice();
  let { notifyForSavedRotations, setNotifyForSavedRotations } = S4DataSlice();

  let factorMatrix1 = cloneDeep(factorMatrix);
  const baselineData = transposeMatrix(factorMatrix1);

  useEffect(() => {
    if (notifyForSavedRotations) {
      toast.success("Rotation Data Saved to Loadings Table", {
        autoClose: 5000,
      });
      setNotifyForSavedRotations(false);
    }
  }, [notifyForSavedRotations, setNotifyForSavedRotations]);

  return (
    <div id="outmostDiv" className="flex flex-col items-center">
      <div className="flex flex-row mt-4 mb-4 items-center" id="selectButton">
        <p className="text-2xl mr-2">Select Factors:</p>
        <FactorSelectButtons baselineData={baselineData} />
        <ToastContainer transition={Zoom} />
      </div>
      <ScatterPlotAndTableTransitionContainer baselineData={baselineData} />
    </div>
  );
};

export default JudgementalTitleDiv;

/*
const JudgeTitleDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const FactorSelectionBar = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  font-size: 20px;
  height: 50px;
  width: 100%;
`;

const SelectLabel = styled.div`
  margin-right: 3px;
`;
*/
