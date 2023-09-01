import React from "react";
import Section4HelpButton from "./Section4HelpButton";

const S4Header = () => {
  return (
    <div className="m-8 w-10/12">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <p className="text-6xl my-4">4. Factor Rotation</p>
        </div>
        <Section4HelpButton />
      </div>
    </div>
  );
};

export default S4Header;
