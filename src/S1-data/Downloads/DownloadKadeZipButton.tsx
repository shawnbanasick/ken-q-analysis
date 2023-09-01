import React, { useState } from "react";
import * as FileSaver from "file-saver";
import S1DataSlice from "../../State/S1DataSlice";
import createStatementsStringKade from "./createStatementsStringKade";
import createSortsStringKade from "./createSortsStringKade";
import ExportGeneralButton from "../../ReusableComponents/ExportGeneralButton";

var JSZip = require("jszip");

const DownloadKadeZipButton = () => {
  const zip = new JSZip();

  const { mainDataObject, multiplierArray, statements, projectName } =
    S1DataSlice();

  const [buttonColor, setButtonColor] = useState(
    "bg-gray-100 hover:bg-gray-400"
  );

  let dateTime = "";

  const handleClick = async () => {
    // Create statements.txt
    let statementsString = createStatementsStringKade(statements);
    zip.file("statements.txt", statementsString);

    // Create sorts.txt
    let sortsString = createSortsStringKade(mainDataObject);
    zip.file("sorts.txt", sortsString);

    // Create name.txt
    zip.file("name.txt", projectName);

    // Create pattern.txt
    zip.file("pattern.txt", multiplierArray.toString());

    let currentdate = new Date();
    dateTime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      "_" +
      currentdate.getHours() +
      "-" +
      currentdate.getMinutes();

    zip.generateAsync({ type: "blob" }).then(function (content: any) {
      FileSaver.saveAs(content, `KADE ZIP - ${projectName} - ${dateTime}.zip`);
    });
    setButtonColor("bg-green-300 hover:bg-green-400");
  };

  return (
    <ExportGeneralButton
      handleClick={handleClick}
      buttonText="Download KADE Zip"
      buttonColor={buttonColor}
    />
  );
};
export default DownloadKadeZipButton;
