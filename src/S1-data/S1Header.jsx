import React from "react";
// import './S2Header.css';
import Section1HelpButton from "./Section1HelpButton";
import WarningBox from "./WarningBox";

const S1Header = () => {
  return (
    <div id="section1Header" className="m-8 w-10/12">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <p className="text-6xl my-4">1. Data Input</p>
        </div>
        <Section1HelpButton />
      </div>
      <WarningBox />
    </div>
  );
};

export default S1Header;
