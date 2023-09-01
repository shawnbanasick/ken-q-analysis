import React from "react";
import Section5HelpButton from "./Section5HelpButton";

const S5Header = () => {
  return (
    <div className="m-8 w-10/12">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <p className="text-6xl my-4">5. Factor Loadings Table</p>
        </div>
        <Section5HelpButton />
      </div>
    </div>
  );
};

export default S5Header;
