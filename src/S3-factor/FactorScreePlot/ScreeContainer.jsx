import React from "react";
import ScreePlot from "./ScreePlot";
import DownloadSvgButtons from "./DownloadSvgButtons";
import S1DataSlice from "../../State/S1DataSlice";
import S3DataSlice from "../../State/S3DataSlice";

const styles = {
  width: 800,
  height: 600,
  padding: 80,
};

const ScreeContainer = (props) => {
  // get State and adjust if number of sorts is less than 8

  const { screePlotData, numCentroidFactors } = S3DataSlice();
  const { numQsorts } = S1DataSlice();

  const maxLength1 = numCentroidFactors;
  let maxLength = parseInt(maxLength1, 10);

  if (numQsorts < maxLength) {
    maxLength = numQsorts;
  }
  // trim data from Horst
  screePlotData.length = maxLength;

  const numFactors = Number(numCentroidFactors) + 1;

  return (
    <div className="border-2 border-gray-400 bg-white p-4 rounded">
      <h1>Scree Plot</h1>
      <ScreePlot
        data={screePlotData}
        {...props}
        {...styles}
        numFacs={numFactors}
      />
      <div className="controls">
        <DownloadSvgButtons />
      </div>
    </div>
  );
};

export default ScreeContainer;
