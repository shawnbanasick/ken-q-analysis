import React from "react";
// import ScreePlot from "./FactorScreePlot/ScreePlot";
import EigenTable from "./FactorTableEigen/EigenTable";
import FactorTable from "./FactorTable/FactorTable";
import S3DataSlice from "../State/S3DataSlice";
import ScreeContainer from "./FactorScreePlot/ScreeContainer";

const UnrotatedFactorsTransitionContainer = () => {
  const { showUnrotatedFactorTable } = S3DataSlice();

  // let showEigenvaluesTable = store.getState("showEigenvaluesTable");
  // let showScreePlot = store.getState("showScreePlot");
  // {/* <Transition visible={ showUnrotatedFactorTable } animation="fade" duration={ 10 }> */}
  // {/*  </Transition> */}

  if (showUnrotatedFactorTable) {
    return (
      <div className="flex flex-col items-center">
        <FactorTable />
        <EigenTable />
        <ScreeContainer />
      </div>
    );
  } else {
    return null;
  }
};

export default UnrotatedFactorsTransitionContainer;

/*


*/
