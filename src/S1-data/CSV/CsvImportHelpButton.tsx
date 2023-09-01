import React from "react";

const ButtonExampleBasic = () => (
  <div className="">
    <a
      href="https://github.com/shawnbanasick/ken-q-analysis/wiki/1.1-CSV-Data-Import"
      target="_blank"
      rel="noopener noreferrer"
      // style={{ targetNew: "tab" }}
    >
      <button
        id="csvInputHelpLink"
        className="btn min-w-[166px]"
        style={{ marginLeft: 66, marginTop: 20 }}
      >
        <strong>Help - CSV</strong>
      </button>
    </a>
  </div>
);

export default ButtonExampleBasic;
