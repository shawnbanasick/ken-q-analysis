import React from "react";
import HelpGeneralButton from "../ReusableComponents/HelpGeneralButton";

const Section4HelpButton = () => {
  return (
    <div className="my-7">
      <a
        href="https://github.com/shawnbanasick/ken-q-analysis/wiki/4.-FACTOR-ROTATION"
        target="_blank"
        rel="noopener noreferrer"
        style={{ targetNew: "tab" }}
      >
        <HelpGeneralButton
          buttonColor="bg-gray-100"
          buttonText="Help - Section 4"
        />
      </a>
    </div>
  );
};
export default Section4HelpButton;
