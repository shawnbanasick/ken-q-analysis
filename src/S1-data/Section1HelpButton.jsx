import React from "react";
import HelpGeneralButton from "../ReusableComponents/HelpGeneralButton";

const Section1HelpButton = () => (
  <div className="my-7">
    <a
      href="https://github.com/shawnbanasick/ken-q-analysis/wiki/1.-DATA-INPUT"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <HelpGeneralButton
        buttonText="Help - Section 1"
        buttonId="section1HelpButton"
        buttonColor="bg-gray-100"
      />
    </a>
  </div>
);

export default Section1HelpButton;
