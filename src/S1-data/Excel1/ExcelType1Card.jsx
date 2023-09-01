import React, { useState } from "react";
import excelType1 from "../../images/Excel1.png";
import DropzoneExcel1 from "./DropzoneExcel1";
// import S1DataSlice from "../../State/S1DataSlice";

const ExcelType1Card = () => {
  // const { hasImportedSorts } = S1DataSlice();

  const [zoneColor, setZoneColor] = useState("bg-gray-300 hover:bg-gray-400");

  const updateZoneColor = () => {
    setZoneColor("bg-green-300 hover:bg-green-400");
  };

  /*
  let backgroundColor = ``;
  if (hasImportedSorts) {
    backgroundColor = `bg-green-400`;
  }
  */

  return (
    <div className="w-[300px] mr-4">
      <div className="flex flex-col justify-center  items-center rounded-md bg-white h-[500px] w-[300px]">
        <h6 className="text-[22px] font-bold tracking-tight text-gray-900">
          1. Load Excel Type 1 file
        </h6>
        <div className="text-gray-900"> Q sort Data in Columns</div>
        <a
          href="https://docs.google.com/spreadsheets/d/1vsz-X9_EIo3bi4nxBTtQbEWB21qOxBLprWaluaNmvec/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{ targetNew: "tab", color: "firebrick", fontSize: 18 }}
        >
          Click here to get a sample file
        </a>
        <div>
          <div className="">
            <img
              alt="excel type 1"
              className="w-[250px] h-[175px] m-4 border-2 border-black"
              src={excelType1}
            />
          </div>
          <div
            className={`flex justify-center ${zoneColor} text-center items-center ml-4 mt-1 border-4 border-dashed hover:scale-105 border-black h-[150px] w-[250px] cursor-pointer p-4 font-bold`}
          >
            <DropzoneExcel1 updateColor={updateZoneColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelType1Card;
