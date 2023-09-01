import React from "react";
import Section3HelpButton from "./Section3HelpButton";

const S3Header = () => {
  return (
    <div id="section3Header" className="m-8 w-10/12">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <p className="text-6xl my-4">3. Factor Extraction</p>
        </div>
        <Section3HelpButton />
      </div>
    </div>
  );
};

export default S3Header;
