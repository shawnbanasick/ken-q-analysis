import React, { useState } from "react";
import * as FileSaver from "file-saver";
import S1DataSlice from "../../State/S1DataSlice";
import ExportGeneralButton from "../../ReusableComponents/ExportGeneralButton";

const DownloadPQMethodSTAButton = () => {
  const { statements, projectName } = S1DataSlice();
  const [buttonColor, setButtonColor] = useState(
    "bg-gray-100 hover:bg-gray-400"
  );

  const handleClick = async () => {
    // Create statements.txt
    let statementsString = "";
    statements.forEach((statement) => {
      statementsString += statement + "\n";
    });

    const blob = new Blob([statementsString], {
      type: "text/plain;charset=ascii",
    });
    FileSaver.saveAs(blob, `${projectName.substring(0, 8)}.STA`);
    setButtonColor("bg-green-300 hover:bg-green-400");
  };

  return (
    <ExportGeneralButton
      handleClick={handleClick}
      buttonText="Download PQMethod STA"
      buttonColor={buttonColor}
    />
  );
};
export default DownloadPQMethodSTAButton;
