import currentDate1 from "../../Utils/currentDate1";
import currentTime1 from "../../Utils/currentTime1";
import exportToCsv from "./exportToCsv";
import S1DataSlice from "../../State/S1DataSlice";
import S6DataSlice from "../../State/S6DataSlice";

const downloadCsvOutputFile = function (filetype) {
  const projectName = S1DataSlice.getState().projectName;
  const data = S6DataSlice.getState().outputData;
  let shouldIncludeTimestamp = S6DataSlice.getState().shouldIncludeTimestamp;

  const spacer = ["", "", ""];

  const newDataArray = [];
  for (let i = 0, iLen = data.length; i < iLen; i++) {
    for (let j = 0, jLen = data[i].length; j < jLen; j++) {
      newDataArray.push(data[i][j]);
    }
    newDataArray.push(spacer, spacer, spacer, spacer, spacer, spacer);
  }

  newDataArray.shift();

  const timeStamp = `${currentDate1()}_${currentTime1()}`;
  // getState

  let nameFile;
  shouldIncludeTimestamp = true;
  if (shouldIncludeTimestamp === true) {
    nameFile = `KADE_results_${projectName}_${timeStamp}.${filetype}`;
  } else {
    nameFile = `KADE_results_${projectName}.${filetype}`;
  }

  exportToCsv(nameFile, newDataArray, filetype);
};

export default downloadCsvOutputFile;
