import React from "react";
import excelType3 from "../../images/kenqSampleImage.png";
import DropzoneExcel3 from "./DropzoneExcel3";

const ExcelType3Card = () => (
  <div className="w-[300px] mr-4">
    <div className="flex flex-col justify-center  items-center rounded-md bg-gray-300 h-[500px] w-[300px]">
      <h6 className="text-[22px] font-bold tracking-tight text-gray-900">
        3. Load Ken-Q Analysis file
      </h6>
      <div>
        <img
          alt="excel type 3"
          className="w-[250px] h-[175px] m-4 mt-20"
          src={excelType3}
        />
        <div className="flex justify-center items-center ml-4 mt-1 border-4 border-dashed hover:scale-105 border-black bg-gray-200 h-[150px] w-[250px] cursor-pointer p-4 text-gray-700">
          <DropzoneExcel3 />
        </div>
      </div>
    </div>
  </div>
);

export default ExcelType3Card;
