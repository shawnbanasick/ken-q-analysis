import React from "react";
import BrowserInfo from "./BrowserInfo";
import BrowserCheck from "./browserCheck";

const SupportedBrowsers = () => {
  return (
    <div className="flex flex-col items-center">
      <span>
        <strong>Supported Browsers:</strong>
      </span>
      <div>
        <BrowserInfo />
      </div>
      <div className="m-8">
        {" "}
        <BrowserCheck />{" "}
      </div>
    </div>
  );
};

export default SupportedBrowsers;
