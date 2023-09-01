import React, { useState } from "react";
import * as FileSaver from "file-saver";
import S1DataSlice from "../../State/S1DataSlice";
import createPQMethodDAT from "./createPQMethodDAT";
import ExportGeneralButton from "../../ReusableComponents/ExportGeneralButton";

const DownloadKadeZipButton = () => {
  const {
    respondentNames,
    mainDataObject,
    multiplierArray,
    statements,
    projectName,
  } = S1DataSlice();

  const [buttonColor, setButtonColor] = useState(
    "bg-gray-100 hover:bg-gray-400"
  );

  const handleClick = async () => {
    // Create statements.txt
    let datString: any = createPQMethodDAT(
      mainDataObject,
      multiplierArray,
      projectName,
      statements.length,
      respondentNames
    );

    var blob = new Blob([datString], {
      type: "text/plain;charset=ascii",
    });
    FileSaver.saveAs(blob, `${projectName.substring(0, 8)}.DAT`);
    setButtonColor("bg-green-300 hover:bg-green-400");
  };

  return (
    <ExportGeneralButton
      handleClick={handleClick}
      buttonText="Download PQMethod DAT"
      buttonColor={buttonColor}
    />
  );
};
export default DownloadKadeZipButton;
