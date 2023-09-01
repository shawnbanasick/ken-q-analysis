import React from "react";
import HelpGeneralButton from "../ReusableComponents/HelpGeneralButton";

const Section6HelpButton = () => {
  return (
    <div className="my-7">
      <a
        href="https://github.com/shawnbanasick/ken-q-analysis/wiki/6.-OUTPUT"
        target="_blank"
        rel="noopener noreferrer"
        style={{ targetNew: "tab" }}
      >
        <HelpGeneralButton
          buttonId="section6HelpButton"
          buttonText="Help - Section 6"
        />
      </a>
    </div>
  );
};

export default Section6HelpButton;
