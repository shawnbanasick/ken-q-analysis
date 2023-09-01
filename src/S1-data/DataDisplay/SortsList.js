import React from "react";
import { v4 as uuidv4 } from "uuid";

const SortsList = (props) => {
  return (
    <ul className="mt-8 flex flex-col items-center ml-6">
      {props.sortsDisplayText.map(function (listValue, index) {
        return (
          <div key={uuidv4()}>
            <h3 className="mb-2 text-left font-bold" key={listValue["key"]}>
              {`${index + 1}. ${props.respondentNames[index]}`}
            </h3>
            {listValue["sortArray"].map(function (item, index2) {
              if (index2 === 0) {
                return (
                  <li
                    className="whitespace-pre font-mono underline"
                    key={`${listValue["key"]}_${index2}`}
                  >
                    {item}
                  </li>
                );
              } else {
                return (
                  <li
                    className="whitespace-pre font-mono"
                    key={`${listValue["key"]}_${index2}_99`}
                  >
                    {item}
                  </li>
                );
              }
            })}
            <br />
            <br />
          </div>
        );
      })}
    </ul>
  );
};

export default SortsList;
