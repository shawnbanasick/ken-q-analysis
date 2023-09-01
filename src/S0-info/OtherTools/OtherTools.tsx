import React from "react";
import EqWebSortButton from "./EqWebSortButton";
// import KenQDataButton from "./KenQDataButton";
// import BetaLinkButton from "./BetaLinkButton";
import KadeButton from "./KadeButton";

const OtherTools = () => {
  return (
    <div
      className="flex flex-col items-center bg-gray-300 rounded-lg p-2  
      w-[1200px] justify-around"
    >
      <span className="m-5 py-3">
        <strong>Other Q Methodology Tools:</strong>
      </span>
      <div className="flex flex-row justify-center gap-4 m-2 w-10/12">
        <div className="flex flex-col items-center">
          <p className="mt-8 mb-2">Online Q Sorting</p>
          <EqWebSortButton />
        </div>
        <div className="flex flex-col items-center">
          <p className="">Desktop Software</p>
          <p className="mb-2">for Q Analysis</p>
          <KadeButton />
        </div>
      </div>
    </div>
  );
};

export default OtherTools;
