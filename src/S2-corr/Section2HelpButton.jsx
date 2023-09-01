import React from "react";
import S2DataSlice from "../State/S2DataSlice";
import HelpGeneralButton from "../ReusableComponents/HelpGeneralButton";

const Section2HelpButton = () => {
  const { showSection2 } = S2DataSlice();

  if (showSection2) {
    return (
      <div className="my-7">
        <a
          href="https://github.com/shawnbanasick/ken-q-analysis/wiki/2.-CORRELATION-MATRIX"
          target="_blank"
          rel="noopener noreferrer"
          style={{ targetNew: "tab" }}
        >
          <HelpGeneralButton
            buttonId="section2HelpButton"
            buttonText="Help - Section 2"
          />
        </a>
      </div>
    );
  } else {
    return null;
  }
};

export default Section2HelpButton;
