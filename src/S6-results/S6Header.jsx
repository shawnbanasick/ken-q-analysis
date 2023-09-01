import React from "react";
import Section6HelpButton from "./Section6HelpButton";

const S6Header = () => {
  return (
    <div className="m-8 w-10/12">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <p className="text-6xl my-4">6. Analysis Output</p>
        </div>
        <Section6HelpButton />
      </div>
    </div>
  );
};

export default S6Header;
