import React from "react";
import DropzoneCsvStatements from "./DropzoneCsvStatements";
import pqmethodStatementsImage from "../../images/pqmethodStatementsImage.png";

const CsvStatementCard = () => (
  <div className="w-[300px] mr-4">
    <div>
      <div className="flex flex-col justify-center  items-center rounded-md bg-gray-300 h-[450px] w-[300px]">
        <h6 className="text-[22px] font-bold tracking-tight text-gray-900 dark:text-white">
          1. Load Statements TXT file
        </h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          One statement per line.
        </p>
        <div>
          <img
            alt="statements"
            className="h-[175px] w-[250px] m-1"
            src={pqmethodStatementsImage}
          />
        </div>
        <div className="flex justify-center items-center mt-4 border-4 border-dashed hover:scale-105 border-black bg-gray-200 h-[150px] w-[250px] cursor-pointer p-4">
          {<DropzoneCsvStatements />}
        </div>
      </div>
    </div>
  </div>
);

export default CsvStatementCard;
