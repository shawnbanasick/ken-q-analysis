import React from "react";

const OtherTools = () => {
  return (
    <div
      className="flex flex-col items-center bg-gray-300 rounded-lg p-2  
      w-[1200px] justify-around mb-8 p-8"
    >
      <span className=" py-3">
        <strong>Citation:</strong>
      </span>
      <div className="flex flex-col justify-center text-left -indent-8 pl-8 w-9/12">
        <p className="select-text">
          Banasick, S. (2023). Ken-Q Analysis (Version 2.0.1) [Computer
          software]. https://doi.org/10.5281/zenodo.8310377
        </p>
      </div>
    </div>
  );
};

export default OtherTools;
