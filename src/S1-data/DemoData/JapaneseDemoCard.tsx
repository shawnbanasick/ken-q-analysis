import React from "react";
import JapaneseButton from "../DemoData/JapaneseButton";

const JapaneseDemoDataCard = () => (
  <div className="mr-4">
    <div className="flex flex-col justify-center  items-center rounded-md bg-white h-[250px] w-[300px] p-3">
      <div className="font-bold">Japanese Survey</div>
      <div>
        <span className="">60 statements</span>
      </div>
      <div>
        <span> 80 Participants </span>
      </div>
      <div className="mt-2">
        <JapaneseButton />
      </div>
    </div>
  </div>
);

export default JapaneseDemoDataCard;
