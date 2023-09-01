import React, { useState } from "react";
import downloadCsvOutputFile from "../downloadCsvLogic/downloadCsvOutputFile";
import S6DataSlice from "../../State/S6DataSlice";
import ExportGeneralButton from "../../ReusableComponents/ExportGeneralButton";

const DownloadResultsAsTxt = () => {
  const { userSelectedFactors } = S6DataSlice();
  const [buttonColor, setButtonColor] = useState(
    "bg-gray-100 hover:bg-gray-400"
  );

  const handleOnclick = () => {
    if (userSelectedFactors.length === 0) {
      window.DownloadResultsAsCsvModal.showModal();
    } else {
      downloadCsvOutputFile("txt");
      setButtonColor("bg-green-300 hover:bg-green-400");
    }
  };

  return (
    <>
      <ExportGeneralButton
        buttonText="Text File"
        buttonId="downloadResultsAsTxtButton"
        buttonColor={buttonColor}
        handleClick={handleOnclick}
        otherFormatting="min-w-[100px] mr-[20px]"
      />
      <dialog id="downloadResultsAsExcelModal" className="modal">
        <form method="dialog" className="modal-box border-2 border-gray-600">
          <p className="text-2xl">Analysis Output</p>
          <p style={{ fontSize: 30 }}>Select the factors to output first</p>
          <button
            className="btn min-w-[100px] mr-[20px] modal-action bg-gray-200 hover:bg-gray-400 rounded-md"
            id="downloadResultsAsCsvModalGotItButton"
          >
            Got it
          </button>
        </form>
      </dialog>
    </>
  );
};

export default DownloadResultsAsTxt;
