import React from "react";
import csvStatementsImage from "../../images/jsonSampleImage2.png";
import DropzoneJsonSorts from "./DropzoneJsonSorts";

const JsonSortsCard = () => (
  <div className="w-[300px] mr-4">
    <div>
      <div className="flex flex-col justify-center  items-center rounded-md bg-gray-300 h-[500px] w-[300px]">
        <h6 className="text-[22px] font-bold tracking-tight text-gray-900">
          2. Load EQ Web Sort file
        </h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          JSON data format
        </p>

        <div>
          <img
            alt="statements"
            className="h-[175px] w-[250px] m-6"
            src={csvStatementsImage}
          />
        </div>

        <div className="flex justify-center items-center mt-2 border-4 border-dashed font-bold text-gray-900 hover:bg-gray-400 text-center hover:scale-105 border-black bg-gray-200 h-[150px] w-[250px] cursor-pointer p-4">
          <DropzoneJsonSorts />
        </div>
      </div>
    </div>
  </div>
);

/*
const styles = {
  width: 250,
  height: 175,
  margin: 10,
};

const CsvStatementCard = () => (
  <div style={{ margin: 10 }}>
    <div>
      <div>
        <img alt="csv statements" style={styles} src={csvStatementsImage} />
      </div>
      <div className="flex justify-center items-center mt-4 border-4 border-dashed hover:scale-105 border-black bg-gray-200 h-[150px] w-[250px] cursor-pointer p-4">
        <DropzoneJsonSorts />
      </div>
    </div>
  </div>
);
*/
export default JsonSortsCard;
