import React from "react";
import KocButton from "./kocButton";
// import kocDataImage from "../../images/kocDataImage.png";

const KocDemoDataCard = () => (
  <div className="mr-4">
    <div className="flex flex-col justify-center  items-center rounded-md bg-white h-[250px] w-[300px]">
      <div>
        <div className="font-bold">KOC Demo Data</div>
        <div>
          <span className="date">36 statements</span>
        </div>

        <div>
          <span> 38 Participants</span>
        </div>
      </div>
      <div className="mt-2">
        <KocButton />
      </div>
    </div>
  </div>
);

export default KocDemoDataCard;
