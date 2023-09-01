import React from "react";
// import ResetAnalysisButton from "./ResetAnalysisButton";
import PcaButton from "./factorSelection/ExtractPrinCompButton";
// import NoFacSelectedModal from "./factorSelection/NoFacSelectedModal";
import CentroidDropdownMenu from "./factorSelection/CentroidSelectDropdown";

const TypeOfAnalysisTransitionContainer = () => {
  return (
    <div className="flex justify-center  w-full">
      <CentroidDropdownMenu />
      <PcaButton />
    </div>
  );
};

export default TypeOfAnalysisTransitionContainer;

/*
<NoFacSelectedModal />

   let showFactorExtractionButtons = store.getState(
      "showFactorExtractionButtons"
    );


        
        
        <ResetAnalysisButton />
*/
