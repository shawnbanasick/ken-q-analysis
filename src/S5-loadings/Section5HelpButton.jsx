import React from "react";
import HelpGeneralButton from "../ReusableComponents/HelpGeneralButton";

const Section5HelpButton = () => {
  // let showLoadingsTable = store.getState("showLoadingsTable");

  return (
    <div className="my-7">
      <a
        href="https://github.com/shawnbanasick/ken-q-analysis/wiki/5.-FACTOR-LOADINGS"
        target="_blank"
        rel="noopener noreferrer"
        style={{ targetNew: "tab" }}
      >
        <HelpGeneralButton
          buttonColor="bg-gray-100"
          buttonText="Help - Section 5"
        />
      </a>
    </div>
  );
};
export default Section5HelpButton;

/*
<button
          id="section5HelpButton"
          className="btn bg-gray-100 text-2xl hover:bg-gray-400 m-1 rounded-md ml-4 mr-2"
        >
          <strong style={{ color: "#2185d0" }}>Help - Section 5</strong>
        </button>
        */
