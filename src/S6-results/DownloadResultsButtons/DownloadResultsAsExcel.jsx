import React, { useState } from "react";
import downloadExcelDispatch from "../downloadExcelLogic/1_downloadExcelDispatch";
import S6DataSlice from "../../State/S6DataSlice";
import ExportGeneralButton from "../../ReusableComponents/ExportGeneralButton";

const DownloadResultsAsExcel = () => {
  const { userSelectedFactors } = S6DataSlice();
  const [buttonColor, setButtonColor] = useState(
    "bg-gray-100 hover:bg-gray-400"
  );

  const handleOnclick = () => {
    if (userSelectedFactors.length === 0) {
      window.DownloadResultsAsExcelModal.showModal();
    } else {
      downloadExcelDispatch();
      setButtonColor("bg-green-300 hover:bg-green-400");
    }
  };

  return (
    <>
      <ExportGeneralButton
        buttonText="Excel File"
        buttonId="downloadResultsAsExcelButton"
        buttonColor={buttonColor}
        handleClick={handleOnclick}
        otherFormatting="min-w-[100px] mr-[20px]"
      />
      <dialog id="downloadResultsAsExcelModal" className="modal">
        <form method="dialog" className="modal-box border-2 border-gray-600">
          <p className="text-2xl text-bold">Analysis Output Error</p>
          <div>
            <p className="text-2xl">Select the factors to output first</p>
          </div>
          <button
            className="btn min-w-[100px] mr-[20px] modal-action bg-gray-200 hover:bg-gray-400 rounded-md"
            id="downloadResultsAsExcelModalGotItButton"
          >
            Got it
          </button>
        </form>
      </dialog>
    </>
  );
};

export default DownloadResultsAsExcel;
