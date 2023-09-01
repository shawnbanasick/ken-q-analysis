import React from "react";
import csvSampleSortsImage from "../../images/csvSampleSortsImage.png";
import DropzoneCsvQsorts from "./DropzoneCsvQsorts";

const CsvStatementCard = () => (
  <div className="w-[300px]">
    <div>
      <div className="flex flex-col justify-center  items-center rounded-md bg-gray-300 h-[450px] w-[300px]">
        <h6 className="text-[22px] font-bold tracking-tight text-gray-900 dark:text-white">
          2. Load Q Sorts CSV file
        </h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Comma Separated Values.
        </p>
        <img
          alt="statements"
          className="h-[175px] w-[250px] m-1"
          src={csvSampleSortsImage}
        />
        <div className="flex justify-center items-center mt-4 border-4 border-dashed hover:scale-105 border-black bg-gray-200 h-[150px] w-[250px] cursor-pointer p-4">
          <DropzoneCsvQsorts />
          {/*} <Button>
            Load File
            <svg
              className="ml-2 -mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
</Button> */}
        </div>
      </div>
    </div>
  </div>
  /*}
  <Card style={{ margin: 10 }}>
    <Card.Content>
      <Card.Header>
        <Image style={styles} src={csvStatementsImage} />
      </Card.Header>
      <Card.Meta>
        <span className="date" />
      </Card.Meta>
      <Card.Description>
        <DropzoneCsvQsorts />
      </Card.Description>
    </Card.Content>
    <Card.Content extra />
  </Card>
*/
);

export default CsvStatementCard;
