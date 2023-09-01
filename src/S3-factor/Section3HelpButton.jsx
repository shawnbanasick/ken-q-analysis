import React from "react";
import HelpGeneralButton from "../ReusableComponents/HelpGeneralButton";

const Section3HelpButton = () => {
  return (
    <div id="s3HelpButtonDiv" className="my-7">
      <a
        href="https://github.com/shawnbanasick/ken-q-analysis/wiki/3.-FACTOR-EXTRACTION"
        target="_blank"
        rel="noopener noreferrer"
        style={{ targetNew: "tab" }}
      >
        <HelpGeneralButton
          buttonId="Section3HelpButton"
          buttonText="Help - Section 3"
          buttonColor="bg-gray-100"
        />
      </a>
    </div>
  );
};

export default Section3HelpButton;
