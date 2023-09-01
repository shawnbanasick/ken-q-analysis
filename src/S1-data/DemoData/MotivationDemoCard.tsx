import React from "react";
import MotivationButton from "../DemoData/MotivationalButton";

const MotivationDemoDataCard = () => (
  <div className="mr-4">
    <div className="flex flex-col justify-center  items-center rounded-md bg-white h-[200px] w-[300px] p-3 h-[250px]">
      <div className="font-bold">Motivational</div>
      <div>
        <span className="">80 statements</span>
      </div>
      <div>
        <span> 120 Participants </span>
      </div>
      <div className="mt-2">
        <MotivationButton />{" "}
      </div>
    </div>
  </div>
);

export default MotivationDemoDataCard;
