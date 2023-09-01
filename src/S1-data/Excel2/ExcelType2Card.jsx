import React, { useState } from "react";
import excelType2 from "../../images/Excel2.png";
import DropzoneExcel2 from "./DropzoneExcel2";

const ExcelType2Card = () => {
  const [zoneColor, setZoneColor] = useState("bg-gray-300 hover:bg-gray-400");

  const updateZoneColor = () => {
    setZoneColor("bg-green-300 hover:bg-green-400");
  };

  return (
    <div className="w-[300px] mr-4">
      <div className="flex flex-col justify-center  items-center rounded-md bg-white h-[500px] w-[300px]">
        <h6 className="text-[22px] font-bold tracking-tight text-gray-900">
          2. Load Excel Type 2 file
        </h6>
        <div className="text-gray-900"> Q sort Data in Rows</div>
        <a
          href="https://docs.google.com/spreadsheets/d/1Rr0XBwTVls1Z2b1ydzTCEKDqzMgJ0pRrhr5NAac4NTI/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{ targetNew: "tab", color: "firebrick", fontSize: 18 }}
        >
          Click here to get a sample file
        </a>
        <div>
          <img
            alt="excel type 1"
            className="w-[250px] h-[175px] m-4 border-2 border-black"
            src={excelType2}
          />
          <div
            className={`flex justify-center ${zoneColor} items-center ml-4 mt-1 border-4 border-dashed font-bold text-center hover:scale-105 border-black h-[150px] w-[250px] cursor-pointer p-4`}
          >
            <DropzoneExcel2 updateColor={updateZoneColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelType2Card;
