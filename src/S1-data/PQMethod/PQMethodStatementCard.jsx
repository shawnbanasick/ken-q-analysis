import React, { useState } from "react";
import StatementDropzone from "./DropzonePqmStatements";
import pqmethodStatementsImage from "../../images/pqmethodStatementsImage.png";

const PQMethodStatementCard = () => {
  const [zoneColor, setZoneColor] = useState("bg-gray-300 hover:bg-gray-400");

  const updateZoneColor = () => {
    setZoneColor("bg-green-300 hover:bg-green-400");
  };

  return (
    <div className="w-[300px] mr-4">
      <div>
        <div className="flex flex-col justify-center  items-center rounded-md bg-white h-[500px] w-[300px]">
          <h6 className="text-[22px] font-bold tracking-tight text-gray-900">
            1. Load Statements STA file
          </h6>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            One statement per line
          </p>

          <div>
            <img
              alt="statements"
              className="h-[175px] w-[250px] m-6 border-2 border-black"
              src={pqmethodStatementsImage}
            />
          </div>

          <div
            className={`flex justify-center ${zoneColor} items-center mt-2 border-4 border-dashed font-bold text-gray-900 text-center hover:scale-105 border-black  h-[150px] w-[250px] cursor-pointer p-4`}
          >
            <StatementDropzone updateColor={updateZoneColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PQMethodStatementCard;
