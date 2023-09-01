import React, { useState } from "react";
import DropzoneKadeFile from "./DropzoneKadeFile";
import kadeZip from "../../images/kadeZip.png";

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
            1. KADE Zip File
          </h6>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            A compressed zip file.
          </p>

          <div>
            <img
              alt="kade zip file"
              src={kadeZip}
              className="h-[175px] w-[250px] m-4 border-2 border-black"
            />
          </div>

          <div
            className={`flex justify-center ${zoneColor} items-center mt-2 border-4 border-dashed font-bold text-center hover:scale-105 border-black h-[150px] w-[250px] cursor-pointer p-4`}
          >
            <DropzoneKadeFile updateColor={updateZoneColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PQMethodStatementCard;

/*
https://codesandbox.io/s/jszip-example-br1y8
https://codesandbox.io/s/ozirov
https://codesandbox.io/s/download-multiple-images-as-a-zip-with-jszip-file-saver-and-reactjs-iykufe?file=/src/App.js
*/
