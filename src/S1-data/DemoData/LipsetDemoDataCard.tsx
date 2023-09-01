import React from "react";
import LipsetButton from "../DemoData/LipsetButton";

const LipsetDemoDataCard = () => (
  <div className="mr-4">
    <div className="flex flex-col justify-center  items-center rounded-md bg-white h-[250px] w-[300px] p-3">
      <div className="font-bold">Lipset Demo Data</div>

      <div>
        <span className="date">33 statements</span>
      </div>
      <div>
        <span>9 Participants</span>
      </div>
      <div className="mt-2">
        <LipsetButton />
      </div>
    </div>
  </div>
);

export default LipsetDemoDataCard;
