import React from "react";
import DropzoneEqWebSortStatements from "./DropzoneEqWebSortStatements";
import pqmethodStatementsImage from "../../images/pqmethodStatementsImage.png";

const PQMethodStatementCard = () => (
  <div className="w-[300px] mr-4">
    <div>
      <div className="flex flex-col justify-center  items-center rounded-md bg-gray-300 h-[500px] w-[300px] ">
        <h6 className="text-[22px] font-bold tracking-tight text-gray-900">
          1. Load Statements TXT file
        </h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          One statement per line.
        </p>

        <div>
          <img
            alt="statements"
            className="h-[175px] w-[250px] m-6"
            src={pqmethodStatementsImage}
          />
        </div>

        <div className="flex justify-center items-center mt-2 border-4 border-dashed font-bold text-gray-900 hover:bg-gray-400 text-center hover:scale-105 border-black bg-gray-200 h-[150px] w-[250px] cursor-pointer p-4">
          <DropzoneEqWebSortStatements />
        </div>
      </div>
    </div>
  </div>
);

export default PQMethodStatementCard;
